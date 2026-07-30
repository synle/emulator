const fs = require("fs");
const path = require("path");

/**
 * File extensions treated as ROM files for the on-disk rename pass.
 * Anything outside this list is left alone (save states, screenshots, BIOS,
 * .cue sheets paired with .bin, etc.).
 */
const ROM_EXTENSIONS = [
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
  // Nintendo DS / 3DS
  ".nds",
  ".dsi",
  ".3ds",
  ".cia",
  // Sega Genesis / Mega Drive / 32X / Master System / Game Gear
  ".md",
  ".gen",
  ".smd",
  ".32x",
  ".sms",
  ".gg",
  // PC Engine / TurboGrafx-16
  ".pce",
  // Nintendo 64
  ".n64",
  ".z64",
  ".v64",
  // GameCube / Wii / Wii U
  ".gcm",
  ".wbfs",
  ".wad",
  ".rvz",
  ".wud",
  ".wux",
  ".wua",
  // Disc-based (PSX, PS2, PSP, Saturn, Dreamcast, etc.)
  ".iso",
  ".bin",
  ".cue",
  ".chd",
  ".img",
  ".gdi",
  ".cdi",
  ".pbp",
  ".cso",
  // Switch
  ".nsp",
  ".xci",
  // Atari
  ".a26",
  ".a52",
  ".a78",
  // Misc handhelds
  ".lnx",
  ".ngp",
  ".ngc",
  ".vb",
  ".ws",
  ".wsc",
  // Generic / archived
  ".rom",
  ".zip",
  ".7z",
];

/**
 * Parenthesized tag words that almost always mean "this ROM is junk for the
 * average user" (status flags, beta dumps, hacks, etc.). Region/language/
 * version/disc parens (USA, En,Fr,De, Rev 1, Disc 2) are preserved by
 * being absent from this list.
 */
const JUNK_PAREN_TAGS = [
  // Dump status / quality
  "Hack",
  "Trainer",
  "Trained",
  "Cracked",
  "Fixed",
  // Release stage
  "Beta",
  "Proto",
  "Prototype",
  "Sample",
  "Demo",
  // Legitimacy
  "Unl",
  "Unlicensed",
  "Pirate",
  "Bootleg",
  "Aftermarket",
  // Variants / ambiguous dumps
  "Alt",
  "Alternate",
];

/**
 * Strip GoodTools / No-Intro / TOSEC junk from a ROM filename while preserving
 * region, language, version, and disc tags.
 *
 * Rules applied in order:
 *  1. Underscores → spaces.
 *  2. Square-bracket tags (e.g. `[!]`, `[a1]`, `[T+Eng]`, `[b]`) — fully removed.
 *  3. Parenthesized junk tags from `JUNK_PAREN_TAGS` (e.g. `(Hack)`, `(Beta 2)`).
 *  4. Whitespace collapsed and trimmed.
 *
 * The file extension is preserved verbatim and reattached at the end.
 *
 * @param {string} filename - Raw filename (with or without extension).
 * @returns {string} Cleaned filename suitable for emulator frontends.
 */
function cleanRomName(filename) {
  const ext = path.extname(filename);
  let name = ext ? filename.slice(0, -ext.length) : filename;

  // 1. Underscores → spaces
  name = name.replace(/_/g, " ");

  // 2. Strip [..] dump-quality tags entirely
  name = name.replace(/\[[^\]]*\]/g, " ");

  // 3. Strip junk parenthesized tags. Word boundary after the tag name so
  //    "(Hackathon)" or "(Alterria)" don't match — only the actual flags.
  for (const tag of JUNK_PAREN_TAGS) {
    name = name.replace(new RegExp(`\\(${tag}\\b[^)]*\\)`, "gi"), " ");
  }

  // 4. Collapse whitespace and trim
  name = name.replace(/\s+/g, " ").trim();

  return ext ? `${name}${ext}` : name;
}

/**
 * Returns true when DRY_RUN should be enabled — either `--dry-run` on argv or
 * `DRY_RUN=1` / `DRY_RUN=true` in the environment.
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
 * Extract positional folder-path arguments from argv (everything after node
 * and the script path that isn't a `--flag`).
 *
 * @param {{argv?: string[]}} [opts]
 * @returns {string[]}
 */
function parsePaths({ argv = process.argv } = {}) {
  return argv.slice(2).filter((arg) => !arg.startsWith("--"));
}

/**
 * Recursively list every ROM file (filtered by `ROM_EXTENSIONS`) under
 * `dirPath`. Non-ROM files are skipped so save states and BIOS don't get
 * accidentally renamed.
 *
 * @param {string} dirPath
 * @param {string[]} [acc] - accumulator (internal)
 * @returns {string[]} Absolute paths of ROM files.
 */
function listRomFiles(dirPath, acc = []) {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    if (item.isDirectory()) {
      listRomFiles(fullPath, acc);
    } else if (ROM_EXTENSIONS.includes(path.extname(item.name).toLowerCase())) {
      acc.push(fullPath);
    }
  }
  return acc;
}

const DRY_RUN = parseDryRun();

/**
 * Walk a ROM root directory, compute a cleaned filename for each ROM, and
 * rename in place. Skips renames whose target file already exists (collision
 * guard) and skips files where the cleaned name equals the original.
 *
 * Honors `DRY_RUN` — logs intended renames without touching the filesystem.
 *
 * @param {string} rootDir - Absolute path to a ROM library root.
 * @returns {void}
 */
function _processWork(rootDir) {
  console.log("🎮 Scanning ROMs:", rootDir, DRY_RUN ? "(DRY RUN)" : "");
  const files = listRomFiles(rootDir);
  let renamed = 0;
  let skipped = 0;

  for (const oldPath of files) {
    const dir = path.dirname(oldPath);
    const oldName = path.basename(oldPath);
    const newName = cleanRomName(oldName);
    if (newName === oldName) continue;

    const newPath = path.join(dir, newName);

    if (fs.existsSync(newPath)) {
      console.warn(`⚠️  Collision: target exists, skipping: "${newPath}" (would overwrite)`);
      skipped++;
      continue;
    }

    if (DRY_RUN) {
      console.log(`💧 [DRY RUN] would rename: "${oldName}" -> "${newName}"`);
      continue;
    }

    try {
      fs.renameSync(oldPath, newPath);
      console.log(`✅ Renamed: "${oldName}" -> "${newName}"`);
      renamed++;
    } catch (err) {
      console.error(`❌ Failed to rename "${oldPath}" -> "${newPath}": ${err.message}`);
    }
  }

  console.log(
    `Done: ${renamed} renamed, ${skipped} skipped (collision), ${files.length} ROM files scanned`,
  );
}

if (require.main === module) {
  const paths = parsePaths();
  if (paths.length === 0) {
    console.error(
      "usage: node clean.js <rom-folder> [<rom-folder>...] [--dry-run]\n" +
        "example: node clean.js /mnt/c/ROMs/SNES --dry-run",
    );
    process.exit(1);
  }
  paths.forEach(_processWork);
}

module.exports = {
  cleanRomName,
  parseDryRun,
  parsePaths,
  _processWork,
  ROM_EXTENSIONS,
  JUNK_PAREN_TAGS,
};
