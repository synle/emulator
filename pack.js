const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execFileSync } = require("child_process");

/**
 * File extensions for ROM systems where `.zip` is universally accepted across
 * every common emulator and OS without configuration. Per CLAUDE.md, this
 * covers cartridge-based 8/16-bit consoles + arcade boards. Disc-based formats
 * (PSX, Saturn, Dreamcast, etc.) are intentionally absent — they need `.chd`
 * or `.cue`+`.bin`, not zip.
 */
const UNIVERSAL_ZIP_EXTENSIONS = [
  // NES / Famicom
  ".nes",
  ".fds",
  ".unf",
  ".unif",
  // SNES / Super Famicom
  ".smc",
  ".sfc",
  ".fig",
  ".swc",
  // Game Boy / Color / Advance
  ".gb",
  ".gbc",
  ".gba",
  // Genesis / Mega Drive / 32X / Master System / Game Gear
  ".md",
  ".gen",
  ".smd",
  ".32x",
  ".sms",
  ".gg",
  // PC Engine / TurboGrafx-16 (HuCard only)
  ".pce",
  // Atari 2600
  ".a26",
];

const RECYCLE_BIN_NAME = "_recycleBin";

/**
 * Compute the MD5 hex digest of a file's bytes.
 * @param {string} filePath
 * @returns {string} 32-char hex MD5.
 */
function md5OfFile(filePath) {
  return crypto.createHash("md5").update(fs.readFileSync(filePath)).digest("hex");
}

/**
 * Compute the MD5 of the (single) entry inside a zip file by piping `unzip -p`
 * to a hash. Returns `null` when extraction fails (corrupt zip, missing
 * `unzip` binary, etc.).
 *
 * @param {string} zipPath
 * @returns {string | null}
 */
function md5OfZipContent(zipPath) {
  try {
    const buf = execFileSync("unzip", ["-p", zipPath], {
      maxBuffer: 1024 * 1024 * 1024,
    });
    return crypto.createHash("md5").update(buf).digest("hex");
  } catch {
    return null;
  }
}

/**
 * Format the current date/time as `YYYY_MM_DD_HH_MM_SS`, suitable for embedding
 * in filenames as a uniqueness suffix. Mirrors the `fmtTimestamp` helper in
 * `bashrc/.../bash-file-utils.profile.bash` but with seconds for finer
 * granularity.
 *
 * @param {Date} [now] - override for tests.
 * @returns {string}
 */
function timestampSuffix(now = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  return [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ].join("_");
}

/**
 * Recursively list every file under `dirPath`, skipping a top-level directory
 * named `_recycleBin` and any of its descendants.
 *
 * @param {string} dirPath
 * @param {string[]} [acc] - accumulator (internal)
 * @returns {string[]} Absolute file paths.
 */
function listAllFiles(dirPath, acc = []) {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory() && item.name === RECYCLE_BIN_NAME) continue;
    const fullPath = path.join(dirPath, item.name);
    if (item.isDirectory()) {
      listAllFiles(fullPath, acc);
    } else {
      acc.push(fullPath);
    }
  }
  return acc;
}

/**
 * Remove now-empty directories under `rootPath` (post-flatten cleanup).
 * Skips `_recycleBin` and `rootPath` itself.
 *
 * @param {string} rootPath
 * @returns {void}
 */
function removeEmptyDirs(rootPath) {
  const walk = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (entry.name === RECYCLE_BIN_NAME) continue;
      walk(path.join(dir, entry.name));
    }
    if (dir === rootPath) return;
    if (fs.readdirSync(dir).length === 0) {
      fs.rmdirSync(dir);
    }
  };
  walk(rootPath);
}

/**
 * Move a file into the recycle bin under `rootPath`, preserving its relative
 * path. Creates parent directories as needed. Used for files we've decided to
 * remove but want recoverable.
 *
 * @param {string} srcAbs - absolute source path (must live under rootPath).
 * @param {string} rootPath - root being processed (the recycle bin lives here).
 * @returns {string} absolute path of the file in the recycle bin.
 */
function moveToRecycleBin(srcAbs, rootPath) {
  const recycleBin = path.join(rootPath, RECYCLE_BIN_NAME);
  const rel = path.relative(rootPath, srcAbs);
  const dest = path.join(recycleBin, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.renameSync(srcAbs, dest);
  return dest;
}

/**
 * Move every nested file in `rootPath` to the top level. On name collision:
 *
 * - Identical content (MD5 match): the nested copy is moved to `_recycleBin`
 *   (the top-level file wins).
 * - Different content: the nested copy is moved to top level with a
 *   `<stem> - <timestamp><ext>` suffix.
 *
 * After moving, empty intermediate directories are removed.
 *
 * @param {string} rootPath
 * @param {{now?: () => Date}} [opts]
 * @returns {{moved: number, deduped: number, conflicts: number}}
 */
function flattenFolder(rootPath, { now = () => new Date() } = {}) {
  let moved = 0;
  let deduped = 0;
  let conflicts = 0;

  const allFiles = listAllFiles(rootPath);
  const nested = allFiles.filter((f) => path.dirname(f) !== rootPath);

  for (const src of nested) {
    const baseName = path.basename(src);
    const target = path.join(rootPath, baseName);

    if (!fs.existsSync(target)) {
      fs.renameSync(src, target);
      moved++;
      continue;
    }

    if (md5OfFile(src) === md5OfFile(target)) {
      moveToRecycleBin(src, rootPath);
      deduped++;
      continue;
    }

    const ext = path.extname(baseName);
    const stem = ext ? baseName.slice(0, -ext.length) : baseName;
    const ts = timestampSuffix(now());
    const renamed = path.join(rootPath, `${stem} - ${ts}${ext}`);
    fs.renameSync(src, renamed);
    conflicts++;
  }

  removeEmptyDirs(rootPath);
  return { moved, deduped, conflicts };
}

/**
 * Create a zip file containing a single source file (no directory structure
 * preserved — `-j` strips paths so emulators see just the ROM filename).
 * Errors propagate; the caller decides what to do on failure.
 *
 * @param {string} srcPath
 * @param {string} zipPath
 * @returns {void}
 */
function zipFile(srcPath, zipPath) {
  execFileSync("zip", ["-j", "-X", "-q", zipPath, srcPath]);
}

/**
 * Walk `rootPath` (after flattening), and for each top-level ROM file with an
 * extension in `UNIVERSAL_ZIP_EXTENSIONS`, create `<stem>.zip` containing it
 * and remove the source file.
 *
 * Conflict handling when `<stem>.zip` already exists:
 *   - MD5 of source == MD5 of single entry inside existing zip → already
 *     archived; remove the source file and leave the existing zip alone.
 *   - Otherwise → write the new zip as `<stem> - <timestamp>.zip` and remove
 *     the source.
 *
 * Honors `dryRun` — logs intended actions without touching the filesystem.
 *
 * @param {string} rootPath
 * @param {{dryRun?: boolean, now?: () => Date}} [opts]
 * @returns {{zipped: number, alreadyZipped: number, conflicts: number}}
 */
function zipUniversalRoms(rootPath, { dryRun = false, now = () => new Date() } = {}) {
  let zipped = 0;
  let alreadyZipped = 0;
  let conflicts = 0;

  if (!dryRun) flattenFolder(rootPath, { now });

  const top = fs
    .readdirSync(rootPath, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => path.join(rootPath, d.name))
    .filter((f) => UNIVERSAL_ZIP_EXTENSIONS.includes(path.extname(f).toLowerCase()));

  for (const src of top) {
    const ext = path.extname(src);
    const stem = path.basename(src, ext);
    const targetZip = path.join(rootPath, `${stem}.zip`);
    let actualTarget = targetZip;

    if (fs.existsSync(targetZip)) {
      const srcMd5 = md5OfFile(src);
      const existingMd5 = md5OfZipContent(targetZip);
      if (srcMd5 === existingMd5) {
        if (dryRun) {
          console.log(`💧 [DRY RUN] would remove duplicate source: ${src}`);
        } else {
          fs.unlinkSync(src);
          console.log(`✓ Already archived; removed source: ${path.basename(src)}`);
        }
        alreadyZipped++;
        continue;
      }
      const ts = timestampSuffix(now());
      actualTarget = path.join(rootPath, `${stem} - ${ts}.zip`);
      conflicts++;
    }

    if (dryRun) {
      console.log(
        `💧 [DRY RUN] would zip: "${path.basename(src)}" -> "${path.basename(actualTarget)}"`,
      );
      continue;
    }

    try {
      zipFile(src, actualTarget);
      fs.unlinkSync(src);
      zipped++;
      console.log(`✅ Zipped: "${path.basename(src)}" -> "${path.basename(actualTarget)}"`);
    } catch (err) {
      console.error(`❌ Failed to zip "${src}" -> "${actualTarget}": ${err.message}`);
    }
  }

  return { zipped, alreadyZipped, conflicts };
}

/**
 * Move duplicate files (by MD5+size) into `<rootPath>/_recycleBin`, keeping
 * the newest copy of each duplicate set. Mirrors the bash `dedup` function in
 * `bash-file-utils.profile.bash`.
 *
 * @param {string} rootPath
 * @param {{recursive?: boolean, acrossFolders?: boolean, dryRun?: boolean}} [opts]
 *   - `recursive` (default true): descend into subdirectories.
 *   - `acrossFolders` (default true): treat all files as one comparison scope;
 *     when false, dedup is performed per-directory.
 * @returns {{scanned: number, dupSets: number, moved: number, freed: number}}
 */
function dedupFolder(rootPath, { recursive = true, acrossFolders = true, dryRun = false } = {}) {
  const files = recursive
    ? listAllFiles(rootPath)
    : fs
        .readdirSync(rootPath, { withFileTypes: true })
        .filter((d) => d.isFile())
        .map((d) => path.join(rootPath, d.name));

  // Group files for comparison.
  const groups = {};
  for (const file of files) {
    const scope = acrossFolders ? "__global__" : path.dirname(file);
    if (!groups[scope]) groups[scope] = [];
    groups[scope].push(file);
  }

  let scanned = 0;
  let dupSets = 0;
  let moved = 0;
  let freed = 0;

  for (const scopeFiles of Object.values(groups)) {
    /** @type {Record<string, {path: string, mtime: number, size: number}[]>} */
    const hashMap = {};
    for (const file of scopeFiles) {
      scanned++;
      try {
        const stat = fs.statSync(file);
        const hash = md5OfFile(file);
        const key = `${hash}:${stat.size}`;
        if (!hashMap[key]) hashMap[key] = [];
        hashMap[key].push({ path: file, mtime: stat.mtimeMs, size: stat.size });
      } catch (err) {
        console.warn(`WARN ${file}: ${err.message}`);
      }
    }

    for (const dupes of Object.values(hashMap)) {
      if (dupes.length < 2) continue;
      dupSets++;
      // Keep the newest (highest mtime); move the rest.
      dupes.sort((a, b) => b.mtime - a.mtime);
      for (let i = 1; i < dupes.length; i++) {
        const dup = dupes[i];
        if (dryRun) {
          console.log(`💧 [DRY RUN] would move duplicate to recycle bin: ${dup.path}`);
          moved++;
          freed += dup.size;
          continue;
        }
        try {
          moveToRecycleBin(dup.path, rootPath);
          moved++;
          freed += dup.size;
          console.log(`🗑️  Duplicate moved to recycle bin: ${path.relative(rootPath, dup.path)}`);
        } catch (err) {
          console.error(`❌ Failed to recycle ${dup.path}: ${err.message}`);
        }
      }
    }
  }

  return { scanned, dupSets, moved, freed };
}

/**
 * Returns true when DRY_RUN should be enabled (`--dry-run` argv or
 * `DRY_RUN=1` / `DRY_RUN=true` env).
 *
 * @param {{argv?: string[], env?: NodeJS.ProcessEnv}} [opts]
 * @returns {boolean}
 */
function parseDryRun({ argv = process.argv, env = process.env } = {}) {
  if (env.DRY_RUN === "1" || env.DRY_RUN === "true") return true;
  if (argv.includes("--dry-run")) return true;
  return false;
}

/**
 * Extract positional folder-path arguments from argv (the sub-command and
 * `--flag`s removed).
 *
 * @param {{argv?: string[]}} [opts]
 * @returns {string[]}
 */
function parsePaths({ argv = process.argv } = {}) {
  return argv
    .slice(3) // node, pack.js, sub-command
    .filter((arg) => !arg.startsWith("--"));
}

if (require.main === module) {
  const sub = process.argv[2];
  const dryRun = parseDryRun();
  const paths = parsePaths();

  if (!sub || paths.length === 0) {
    console.error(
      "usage:\n" +
        "  node pack.js zip <folder> [<folder>...] [--dry-run]\n" +
        "  node pack.js dedup <folder> [<folder>...] [--dry-run]\n" +
        "\n" +
        "  zip    flatten the folder, then archive each universal-zip-eligible ROM into <name>.zip.\n" +
        "  dedup  walk the folder; move identical files (by MD5+size) into <folder>/_recycleBin,\n" +
        "         keeping the newest copy of each set.",
    );
    process.exit(1);
  }

  for (const p of paths) {
    if (sub === "zip") {
      console.log(`🎮 Packing ROMs:`, p, dryRun ? "(DRY RUN)" : "");
      const r = zipUniversalRoms(p, { dryRun });
      console.log(
        `   zipped: ${r.zipped}, already-archived: ${r.alreadyZipped}, conflicts: ${r.conflicts}`,
      );
    } else if (sub === "dedup") {
      console.log(`🔍 Dedup:`, p, dryRun ? "(DRY RUN)" : "");
      const r = dedupFolder(p, { dryRun });
      console.log(
        `   scanned: ${r.scanned}, duplicate-sets: ${r.dupSets}, moved: ${r.moved}, freed: ${r.freed} bytes`,
      );
    } else {
      console.error(`unknown sub-command: ${sub}`);
      process.exit(1);
    }
  }
}

module.exports = {
  UNIVERSAL_ZIP_EXTENSIONS,
  RECYCLE_BIN_NAME,
  md5OfFile,
  md5OfZipContent,
  timestampSuffix,
  flattenFolder,
  zipFile,
  zipUniversalRoms,
  dedupFolder,
  parseDryRun,
  parsePaths,
};
