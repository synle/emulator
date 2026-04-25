const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  cleanRomName,
  parseDryRun,
  parsePaths,
  _processWork,
} = require("./clean.js");

// ---------------------------------------------------------------------------
// cleanRomName — pure string transform. Locks in current behavior so the
// rule list can be evolved with confidence.
// ---------------------------------------------------------------------------

// --- Square-bracket dump-quality tags ([!], [a1], [b], [T+Eng], etc.) ---

test("strips [!] verified-good-dump tag", () => {
  assert.equal(
    cleanRomName("Super Mario World (USA) [!].smc"),
    "Super Mario World (USA).smc",
  );
});

test("strips [a1] alternate-dump tag", () => {
  assert.equal(
    cleanRomName("Sonic the Hedgehog (W) [a1].md"),
    "Sonic the Hedgehog (W).md",
  );
});

test("strips [b1] bad-dump tag", () => {
  assert.equal(cleanRomName("Doom (USA) [b1].iso"), "Doom (USA).iso");
});

test("strips [h] hack tag (square-bracket form)", () => {
  assert.equal(cleanRomName("Game (USA) [h1].nes"), "Game (USA).nes");
});

test("strips [f] fixed tag", () => {
  assert.equal(cleanRomName("Game (USA) [f1].sfc"), "Game (USA).sfc");
});

test("strips [t] trained tag", () => {
  assert.equal(cleanRomName("Game (USA) [t1].nes"), "Game (USA).nes");
});

test("strips [o] overdump tag", () => {
  assert.equal(cleanRomName("Game (USA) [o1].nes"), "Game (USA).nes");
});

test("strips [T+Eng] translation tag with version suffix", () => {
  assert.equal(
    cleanRomName("Final Fantasy VI (J) [T+Eng1.0_RPGOne].smc"),
    "Final Fantasy VI (J).smc",
  );
});

test("strips [T-Eng] in-progress translation tag", () => {
  assert.equal(cleanRomName("Game (J) [T-Eng0.99].smc"), "Game (J).smc");
});

test("strips multiple consecutive bracket tags", () => {
  assert.equal(
    cleanRomName("Pokemon Red (U) [S][!].gbc"),
    "Pokemon Red (U).gbc",
  );
});

// --- Parenthesized junk tags (Hack, Beta, Proto, etc.) ---

test("strips (Hack) tag", () => {
  assert.equal(cleanRomName("Game (Hack).sfc"), "Game.sfc");
});

test("strips (Trainer) tag", () => {
  assert.equal(cleanRomName("Game (Trainer).nes"), "Game.nes");
});

test("strips (Beta) tag", () => {
  assert.equal(cleanRomName("Game (Beta).gba"), "Game.gba");
});

test("strips numbered (Beta 2) tag", () => {
  assert.equal(cleanRomName("Game (Beta 2).gba"), "Game.gba");
});

test("strips (Proto) tag", () => {
  assert.equal(cleanRomName("Game (Proto).gba"), "Game.gba");
});

test("strips (Prototype) tag", () => {
  assert.equal(cleanRomName("Game (Prototype).nes"), "Game.nes");
});

test("strips (Sample) tag", () => {
  assert.equal(cleanRomName("Game (Sample).nes"), "Game.nes");
});

test("strips (Demo) tag", () => {
  assert.equal(cleanRomName("Game (Demo).iso"), "Game.iso");
});

test("strips (Unl) unlicensed tag", () => {
  assert.equal(cleanRomName("Action 52 (Unl).nes"), "Action 52.nes");
});

test("strips (Unlicensed) full-word tag", () => {
  assert.equal(cleanRomName("Game (Unlicensed).nes"), "Game.nes");
});

test("strips (Pirate) tag", () => {
  assert.equal(cleanRomName("Game (Pirate).bin"), "Game.bin");
});

test("strips (Bootleg) tag", () => {
  assert.equal(cleanRomName("Game (Bootleg).bin"), "Game.bin");
});

test("strips (Aftermarket) tag", () => {
  assert.equal(
    cleanRomName("Modern Game (Aftermarket).nes"),
    "Modern Game.nes",
  );
});

test("strips (Alt) variant tag", () => {
  assert.equal(cleanRomName("Game (Alt).sfc"), "Game.sfc");
});

test("strips numbered (Alt 1) variant tag", () => {
  assert.equal(cleanRomName("Game (Alt 1).sfc"), "Game.sfc");
});

test("strips multiple junk parens at once", () => {
  assert.equal(cleanRomName("Game (Hack) (Beta) (USA).sfc"), "Game (USA).sfc");
});

// --- Tags that should NOT match (word-boundary safety) ---

test("preserves (Hackathon) — word-boundary keeps non-flag tokens intact", () => {
  // "(Hackathon)" begins with "Hack" but isn't the flag — \b after "Hack"
  // requires a non-word char, which "a" is not, so the regex doesn't match.
  assert.equal(
    cleanRomName("Hackathon Special (USA).nes"),
    "Hackathon Special (USA).nes",
  );
});

// --- Region / language / version / disc tags must be preserved ---

test("preserves (USA) region tag", () => {
  assert.equal(
    cleanRomName("Super Mario Bros (USA).nes"),
    "Super Mario Bros (USA).nes",
  );
});

test("preserves (Japan) region tag", () => {
  assert.equal(
    cleanRomName("Super Mario Bros (Japan).nes"),
    "Super Mario Bros (Japan).nes",
  );
});

test("preserves (Europe) region tag", () => {
  assert.equal(
    cleanRomName("Super Mario Bros (Europe).nes"),
    "Super Mario Bros (Europe).nes",
  );
});

test("preserves (World) region tag", () => {
  assert.equal(
    cleanRomName("Super Mario Bros (World).nes"),
    "Super Mario Bros (World).nes",
  );
});

test("preserves multi-region (USA, Europe)", () => {
  assert.equal(
    cleanRomName("Mega Man X (USA, Europe).smc"),
    "Mega Man X (USA, Europe).smc",
  );
});

test("preserves single-letter region codes like (U), (J), (E), (W)", () => {
  assert.equal(cleanRomName("Game (U).smc"), "Game (U).smc");
  assert.equal(cleanRomName("Game (J).smc"), "Game (J).smc");
  assert.equal(cleanRomName("Game (E).smc"), "Game (E).smc");
  assert.equal(cleanRomName("Game (W).smc"), "Game (W).smc");
});

test("preserves combined region codes like (JUE), (UE)", () => {
  assert.equal(cleanRomName("Game (JUE).smc"), "Game (JUE).smc");
  assert.equal(cleanRomName("Game (UE).smc"), "Game (UE).smc");
});

test("preserves language list (En,Fr,De,Es,It)", () => {
  assert.equal(
    cleanRomName("Game (Europe) (En,Fr,De,Es,It).nds"),
    "Game (Europe) (En,Fr,De,Es,It).nds",
  );
});

test("preserves (Rev 1) revision tag", () => {
  assert.equal(
    cleanRomName("Zelda (USA) (Rev 1).sfc"),
    "Zelda (USA) (Rev 1).sfc",
  );
});

test("preserves (Rev A) revision tag", () => {
  assert.equal(
    cleanRomName("Game (USA) (Rev A).sfc"),
    "Game (USA) (Rev A).sfc",
  );
});

test("preserves (V1.0) version tag", () => {
  assert.equal(cleanRomName("Game (J) (V1.0).smc"), "Game (J) (V1.0).smc");
});

test("preserves (Disc 1) for multi-disc ROMs", () => {
  assert.equal(
    cleanRomName("Final Fantasy VII (USA) (Disc 1).bin"),
    "Final Fantasy VII (USA) (Disc 1).bin",
  );
});

test("preserves (Disc 2 of 3) extended disc-info form", () => {
  assert.equal(
    cleanRomName("Game (USA) (Disc 2 of 3).bin"),
    "Game (USA) (Disc 2 of 3).bin",
  );
});

// --- Whitespace / underscore handling ---

test("converts underscores to spaces", () => {
  assert.equal(cleanRomName("Super_Mario_World.smc"), "Super Mario World.smc");
});

test("collapses multiple spaces left behind by stripped tags", () => {
  assert.equal(cleanRomName("Game [!]   (USA) [a].sfc"), "Game (USA).sfc");
});

// --- File extension handling ---

test("preserves file extension verbatim", () => {
  assert.equal(cleanRomName("Game [!].SMC"), "Game.SMC");
});

test("handles files with no extension", () => {
  assert.equal(
    cleanRomName("Super Mario World (USA) [!]"),
    "Super Mario World (USA)",
  );
});

// --- Real-world combinations ---

test("real-world: GoodTools-era SNES with translation patch", () => {
  assert.equal(
    cleanRomName("Final Fantasy VI (J) (V1.0) [T+Eng1.0_RPGOne].smc"),
    "Final Fantasy VI (J) (V1.0).smc",
  );
});

test("real-world: No-Intro SNES with revision", () => {
  assert.equal(
    cleanRomName("The Legend of Zelda - A Link to the Past (USA) (Rev 1).sfc"),
    "The Legend of Zelda - A Link to the Past (USA) (Rev 1).sfc",
  );
});

test("real-world: NES with verification tag", () => {
  assert.equal(cleanRomName("Mega Man 2 (U) [!].nes"), "Mega Man 2 (U).nes");
});

test("real-world: hacked DS rom", () => {
  assert.equal(
    cleanRomName("Pokemon Diamond Version (USA) (Hack).nds"),
    "Pokemon Diamond Version (USA).nds",
  );
});

test("real-world: underscore-style filename with mixed junk", () => {
  assert.equal(
    cleanRomName("Sonic_the_Hedgehog_(W)_[a1][!].md"),
    "Sonic the Hedgehog (W).md",
  );
});

// ---------------------------------------------------------------------------
// parseDryRun
// ---------------------------------------------------------------------------

const baseArgv = ["node", "clean.js"];

test("parseDryRun: defaults false", () => {
  assert.equal(parseDryRun({ argv: baseArgv, env: {} }), false);
});

test("parseDryRun: --dry-run flag enables", () => {
  assert.equal(
    parseDryRun({ argv: [...baseArgv, "--dry-run"], env: {} }),
    true,
  );
});

test("parseDryRun: DRY_RUN=1 env enables", () => {
  assert.equal(parseDryRun({ argv: baseArgv, env: { DRY_RUN: "1" } }), true);
});

// ---------------------------------------------------------------------------
// parsePaths
// ---------------------------------------------------------------------------

test("parsePaths: returns positional paths only", () => {
  assert.deepEqual(
    parsePaths({
      argv: ["node", "clean.js", "/roms/snes", "--dry-run", "/roms/nes"],
    }),
    ["/roms/snes", "/roms/nes"],
  );
});

test("parsePaths: empty when no positional args", () => {
  assert.deepEqual(parsePaths({ argv: ["node", "clean.js", "--dry-run"] }), []);
});

// ---------------------------------------------------------------------------
// _processWork — real filesystem integration
// ---------------------------------------------------------------------------

/**
 * Silence console.log/error during fn() so test output stays clean.
 * @param {() => void} fn
 * @returns {void}
 */
function silenced(fn) {
  const origLog = console.log;
  const origErr = console.error;
  const origWarn = console.warn;
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
  try {
    fn();
  } finally {
    console.log = origLog;
    console.error = origErr;
    console.warn = origWarn;
  }
}

test("_processWork: renames junk-tagged ROMs and preserves region/version", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "rom-clean-test-"));
  try {
    // ROM with junk that should be cleaned.
    const dirty = path.join(root, "Super Mario World (USA) [!].smc");
    fs.writeFileSync(dirty, "fake rom content");

    // ROM that's already clean — shouldn't be touched.
    const clean = path.join(root, "Mega Man X (USA).smc");
    fs.writeFileSync(clean, "fake rom content");

    // Non-ROM file (e.g. save state) — must NOT be renamed.
    const save = path.join(root, "Super Mario World (USA) [!].srm");
    fs.writeFileSync(save, "fake save");

    silenced(() => _processWork(root));

    const files = fs.readdirSync(root).sort();
    assert.deepEqual(files, [
      // .srm is unchanged because .srm is not in ROM_EXTENSIONS.
      "Mega Man X (USA).smc",
      "Super Mario World (USA) [!].srm",
      "Super Mario World (USA).smc",
    ]);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("_processWork: collision guard skips rename when target exists", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "rom-clean-test-"));
  try {
    // Both of these clean to "Game (USA).smc".
    const a = path.join(root, "Game (USA) [!].smc");
    const b = path.join(root, "Game (USA).smc");
    fs.writeFileSync(a, "rom A");
    fs.writeFileSync(b, "rom B");

    silenced(() => _processWork(root));

    const files = fs.readdirSync(root).sort();
    // 'b' was already correctly named; 'a' should be skipped due to collision.
    assert.deepEqual(files, ["Game (USA) [!].smc", "Game (USA).smc"]);

    // Original file contents intact (no clobbering).
    assert.equal(fs.readFileSync(b, "utf8"), "rom B");
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("_processWork: recurses into subdirectories", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "rom-clean-test-"));
  try {
    const snesDir = path.join(root, "SNES");
    fs.mkdirSync(snesDir);
    const dirty = path.join(snesDir, "Final_Fantasy_VI_(J)_[T+Eng].smc");
    fs.writeFileSync(dirty, "fake");

    silenced(() => _processWork(root));

    const files = fs.readdirSync(snesDir);
    assert.deepEqual(files, ["Final Fantasy VI (J).smc"]);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
