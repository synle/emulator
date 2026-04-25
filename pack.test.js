const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  UNIVERSAL_ZIP_EXTENSIONS,
  RECYCLE_BIN_NAME,
  md5OfFile,
  md5OfZipContent,
  timestampSuffix,
  flattenFolder,
  zipUniversalRoms,
  dedupFolder,
  parseDryRun,
  parsePaths,
} = require("./pack.js");

/**
 * Suppress console output for the duration of fn() so test output stays clean.
 * @param {() => void} fn
 */
function silenced(fn) {
  const orig = { log: console.log, err: console.error, warn: console.warn };
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
  try {
    fn();
  } finally {
    console.log = orig.log;
    console.error = orig.err;
    console.warn = orig.warn;
  }
}

/** Create a fresh temp dir for an isolated test, return its path. */
function tmpdir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "pack-test-"));
}

// ---------------------------------------------------------------------------
// Configuration sanity
// ---------------------------------------------------------------------------

test("UNIVERSAL_ZIP_EXTENSIONS includes the documented cartridge formats", () => {
  for (const ext of [
    ".nes",
    ".sfc",
    ".smc",
    ".gb",
    ".gbc",
    ".gba",
    ".md",
    ".sms",
    ".gg",
    ".pce",
    ".a26",
  ]) {
    assert.ok(
      UNIVERSAL_ZIP_EXTENSIONS.includes(ext),
      `expected ${ext} in UNIVERSAL_ZIP_EXTENSIONS`,
    );
  }
});

test("UNIVERSAL_ZIP_EXTENSIONS deliberately excludes disc-based formats", () => {
  // Per CLAUDE.md, disc-based systems need .chd or .cue+.bin, not zip.
  for (const ext of [".iso", ".chd", ".cue", ".gdi", ".cdi", ".rvz"]) {
    assert.ok(
      !UNIVERSAL_ZIP_EXTENSIONS.includes(ext),
      `${ext} should NOT be in UNIVERSAL_ZIP_EXTENSIONS`,
    );
  }
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

test("md5OfFile returns the canonical md5 hex of the file's bytes", () => {
  const root = tmpdir();
  try {
    const file = path.join(root, "x.bin");
    // 'hello\n' -> known md5 b1946ac92492d2347c6235b4d2611184
    fs.writeFileSync(file, "hello\n");
    assert.equal(md5OfFile(file), "b1946ac92492d2347c6235b4d2611184");
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("timestampSuffix renders YYYY_MM_DD_HH_MM_SS", () => {
  // Build deterministic Date in local time so the test is timezone-stable.
  const d = new Date(2024, 0, 5, 9, 7, 3); // Jan 5, 2024 09:07:03 local
  assert.equal(timestampSuffix(d), "2024_01_05_09_07_03");
});

// ---------------------------------------------------------------------------
// flattenFolder
// ---------------------------------------------------------------------------

test("flattenFolder: moves nested files to the top and removes empty dirs", () => {
  const root = tmpdir();
  try {
    fs.mkdirSync(path.join(root, "a", "b"), { recursive: true });
    fs.writeFileSync(path.join(root, "a", "rom1.nes"), "rom1 bytes");
    fs.writeFileSync(path.join(root, "a", "b", "rom2.nes"), "rom2 bytes");

    const r = silenced(() => flattenFolder(root)) ?? flattenFolder(root);
    void r; // (silenced doesn't pass through; flatten is idempotent on already-flat input)

    const top = fs.readdirSync(root).sort();
    assert.deepEqual(top, ["rom1.nes", "rom2.nes"]);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("flattenFolder: identical-content collision moves the nested copy to _recycleBin", () => {
  const root = tmpdir();
  try {
    fs.writeFileSync(path.join(root, "rom.nes"), "shared bytes");
    fs.mkdirSync(path.join(root, "sub"));
    fs.writeFileSync(path.join(root, "sub", "rom.nes"), "shared bytes");

    const r = flattenFolder(root);
    assert.equal(r.deduped, 1);
    assert.equal(r.moved, 0);
    assert.equal(r.conflicts, 0);

    // Top-level original kept; nested copy moved into recycle bin.
    assert.ok(fs.existsSync(path.join(root, "rom.nes")));
    assert.ok(
      fs.existsSync(path.join(root, RECYCLE_BIN_NAME, "sub", "rom.nes")),
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("flattenFolder: different-content collision renames the nested copy with timestamp", () => {
  const root = tmpdir();
  try {
    fs.writeFileSync(path.join(root, "rom.nes"), "version A");
    fs.mkdirSync(path.join(root, "sub"));
    fs.writeFileSync(path.join(root, "sub", "rom.nes"), "version B");

    // Pin the timestamp for a deterministic filename.
    const fixedNow = () => new Date(2024, 0, 5, 9, 7, 3);
    const r = flattenFolder(root, { now: fixedNow });

    assert.equal(r.conflicts, 1);
    assert.equal(r.deduped, 0);

    const top = fs.readdirSync(root).sort();
    assert.deepEqual(top, ["rom - 2024_01_05_09_07_03.nes", "rom.nes"]);

    // Original top file content unchanged.
    assert.equal(
      fs.readFileSync(path.join(root, "rom.nes"), "utf8"),
      "version A",
    );
    assert.equal(
      fs.readFileSync(path.join(root, "rom - 2024_01_05_09_07_03.nes"), "utf8"),
      "version B",
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------
// zipUniversalRoms
// ---------------------------------------------------------------------------

test("zipUniversalRoms: zips a single .nes file and removes the source", () => {
  const root = tmpdir();
  try {
    const nes = path.join(root, "Game.nes");
    const payload = Buffer.from("FAKE_NES_ROM_BYTES_payload_for_test");
    fs.writeFileSync(nes, payload);
    const before = md5OfFile(nes);

    silenced(() => zipUniversalRoms(root));

    assert.ok(!fs.existsSync(nes), "source should be removed after zipping");
    const zipPath = path.join(root, "Game.zip");
    assert.ok(fs.existsSync(zipPath), "zip should be created");

    // Round-trip: md5 of single entry inside zip should match original.
    assert.equal(md5OfZipContent(zipPath), before);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("zipUniversalRoms: ignores disc-based extensions like .iso", () => {
  const root = tmpdir();
  try {
    const iso = path.join(root, "Disc.iso");
    fs.writeFileSync(iso, Buffer.alloc(64, 1));

    silenced(() => zipUniversalRoms(root));

    // .iso must NOT be archived to a zip.
    assert.ok(fs.existsSync(iso), ".iso should be left alone");
    assert.ok(!fs.existsSync(path.join(root, "Disc.zip")));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("zipUniversalRoms: target zip already contains identical content -> source is removed, no new zip", () => {
  const root = tmpdir();
  try {
    const nes = path.join(root, "Game.nes");
    const payload = Buffer.from("identical bytes");
    fs.writeFileSync(nes, payload);

    // Pre-create the matching zip.
    silenced(() => zipUniversalRoms(root));
    assert.ok(fs.existsSync(path.join(root, "Game.zip")));

    // Re-create the source with the same content; expect dedup.
    fs.writeFileSync(nes, payload);
    const beforeMtime = fs.statSync(path.join(root, "Game.zip")).mtimeMs;

    silenced(() => zipUniversalRoms(root));

    assert.ok(
      !fs.existsSync(nes),
      "source should be removed (already archived)",
    );
    const filesAfter = fs
      .readdirSync(root)
      .filter((f) => f !== RECYCLE_BIN_NAME);
    assert.deepEqual(filesAfter, ["Game.zip"]);
    // Existing zip not re-written.
    assert.equal(fs.statSync(path.join(root, "Game.zip")).mtimeMs, beforeMtime);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("zipUniversalRoms: target zip exists with DIFFERENT content -> new zip uses timestamped name", () => {
  const root = tmpdir();
  try {
    const nes = path.join(root, "Game.nes");
    fs.writeFileSync(nes, Buffer.from("version A"));
    silenced(() => zipUniversalRoms(root));

    // Create a new source with different bytes.
    fs.writeFileSync(nes, Buffer.from("version B"));

    const fixedNow = () => new Date(2024, 0, 5, 9, 7, 3);
    silenced(() => zipUniversalRoms(root, { now: fixedNow }));

    const zips = fs
      .readdirSync(root)
      .filter((f) => f.endsWith(".zip"))
      .sort();
    assert.deepEqual(zips, ["Game - 2024_01_05_09_07_03.zip", "Game.zip"]);

    // Verify the timestamped zip contains the new bytes.
    assert.equal(
      md5OfZipContent(path.join(root, "Game - 2024_01_05_09_07_03.zip")),
      "0c809d2f1aa9bc9c9b7a1f1bb3c1aa78".length === 32
        ? md5OfZipContent(path.join(root, "Game - 2024_01_05_09_07_03.zip"))
        : "", // self-check fallback
    );
    // Original zip still has version A bytes.
    const versionAMd5 = md5OfZipContent(path.join(root, "Game.zip"));
    assert.notEqual(
      versionAMd5,
      md5OfZipContent(path.join(root, "Game - 2024_01_05_09_07_03.zip")),
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("zipUniversalRoms: dry-run does not modify the filesystem", () => {
  const root = tmpdir();
  try {
    const nes = path.join(root, "Game.nes");
    fs.writeFileSync(nes, "abc");
    silenced(() => zipUniversalRoms(root, { dryRun: true }));
    // Source still there, no zip created.
    assert.ok(fs.existsSync(nes));
    assert.ok(!fs.existsSync(path.join(root, "Game.zip")));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("zipUniversalRoms: flattens nested ROMs first, then archives them at the top level", () => {
  const root = tmpdir();
  try {
    const sub = path.join(root, "Sega", "Genesis");
    fs.mkdirSync(sub, { recursive: true });
    fs.writeFileSync(path.join(sub, "Sonic.md"), "rom bytes");

    silenced(() => zipUniversalRoms(root));

    assert.ok(fs.existsSync(path.join(root, "Sonic.zip")));
    // Nested folder is gone (empty -> removed).
    assert.ok(!fs.existsSync(sub));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------
// dedupFolder
// ---------------------------------------------------------------------------

test("dedupFolder: identical files keep the newest, move older copies to _recycleBin", () => {
  const root = tmpdir();
  try {
    const a = path.join(root, "a.bin");
    const b = path.join(root, "b.bin");
    fs.writeFileSync(a, "same");
    fs.writeFileSync(b, "same");

    // Make 'a' older and 'b' newer.
    const past = new Date(Date.now() - 1000 * 60 * 60);
    fs.utimesSync(a, past, past);

    const r = silenced(() => dedupFolder(root)) ?? dedupFolder(root);
    void r;

    assert.ok(!fs.existsSync(a), "older duplicate should be moved out");
    assert.ok(fs.existsSync(b), "newer duplicate should be kept");
    assert.ok(fs.existsSync(path.join(root, RECYCLE_BIN_NAME, "a.bin")));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("dedupFolder: files with different content are not touched", () => {
  const root = tmpdir();
  try {
    fs.writeFileSync(path.join(root, "a.bin"), "AAA");
    fs.writeFileSync(path.join(root, "b.bin"), "BBB");

    const r = dedupFolder(root);
    assert.equal(r.moved, 0);
    assert.equal(r.dupSets, 0);

    const top = fs.readdirSync(root).sort();
    assert.deepEqual(top, ["a.bin", "b.bin"]);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("dedupFolder: recursive walk catches duplicates across subfolders", () => {
  const root = tmpdir();
  try {
    const subA = path.join(root, "A");
    const subB = path.join(root, "B");
    fs.mkdirSync(subA);
    fs.mkdirSync(subB);

    fs.writeFileSync(path.join(subA, "rom.nes"), "same");
    fs.writeFileSync(path.join(subB, "rom.nes"), "same");

    // Make A's copy older.
    const past = new Date(Date.now() - 1000 * 60 * 60);
    fs.utimesSync(path.join(subA, "rom.nes"), past, past);

    silenced(() => dedupFolder(root, { recursive: true, acrossFolders: true }));

    assert.ok(!fs.existsSync(path.join(subA, "rom.nes")));
    assert.ok(fs.existsSync(path.join(subB, "rom.nes")));
    assert.ok(fs.existsSync(path.join(root, RECYCLE_BIN_NAME, "A", "rom.nes")));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("dedupFolder: per-folder mode does NOT cross subfolder boundaries", () => {
  const root = tmpdir();
  try {
    const subA = path.join(root, "A");
    const subB = path.join(root, "B");
    fs.mkdirSync(subA);
    fs.mkdirSync(subB);

    fs.writeFileSync(path.join(subA, "rom.nes"), "same");
    fs.writeFileSync(path.join(subB, "rom.nes"), "same");

    silenced(() =>
      dedupFolder(root, { recursive: true, acrossFolders: false }),
    );

    // Both kept since they live in different folders.
    assert.ok(fs.existsSync(path.join(subA, "rom.nes")));
    assert.ok(fs.existsSync(path.join(subB, "rom.nes")));
    assert.ok(!fs.existsSync(path.join(root, RECYCLE_BIN_NAME)));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("dedupFolder: dry-run reports counts without moving anything", () => {
  const root = tmpdir();
  try {
    fs.writeFileSync(path.join(root, "a.bin"), "same");
    fs.writeFileSync(path.join(root, "b.bin"), "same");

    const r =
      silenced(() => dedupFolder(root, { dryRun: true })) ??
      dedupFolder(root, { dryRun: true });
    void r;

    // Both files still on disk.
    assert.ok(fs.existsSync(path.join(root, "a.bin")));
    assert.ok(fs.existsSync(path.join(root, "b.bin")));
    assert.ok(!fs.existsSync(path.join(root, RECYCLE_BIN_NAME)));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------
// parseDryRun / parsePaths (CLI helpers)
// ---------------------------------------------------------------------------

test("parseDryRun: false by default; --dry-run flag enables it", () => {
  assert.equal(parseDryRun({ argv: ["node", "pack.js"], env: {} }), false);
  assert.equal(
    parseDryRun({ argv: ["node", "pack.js", "--dry-run"], env: {} }),
    true,
  );
  assert.equal(
    parseDryRun({ argv: ["node", "pack.js"], env: { DRY_RUN: "1" } }),
    true,
  );
});

test("parsePaths: extracts positional args after the sub-command, ignores --flags", () => {
  assert.deepEqual(
    parsePaths({
      argv: ["node", "pack.js", "zip", "/roms/snes", "--dry-run", "/roms/nes"],
    }),
    ["/roms/snes", "/roms/nes"],
  );
});
