# Repository conventions

Notes for Claude Code (and any other contributor) working in this repo.

## Pre-commit / Pre-push

Before creating a commit, run in this order:

1. **`npm test`** — must pass (covers `clean.js` rules and integration). If tests fail, fix them before committing.
2. **`npm run format`** — formats Markdown, JS, and JSON with Prettier; include any resulting changes in the same commit.

The workflow is: **edit → `npm test` → `npm run format` → `git add` → commit → push**. If a commit is already made and `npm run format` only then produces changes, amend is not allowed — create a follow-up `style: prettier` commit instead.

**Enforcement:** a git pre-commit hook in `.githooks/pre-commit` runs both checks automatically. It's activated by running `npm install` once per clone (the `prepare` script points `core.hooksPath` at `.githooks`). If the hook blocks a commit, fix the tests / run `npm run format`, then re-stage and commit.

## Inline Documentation

When adding or modifying any function, class, or exported symbol in JS, include inline **JSDoc** comments documenting purpose, parameters, and return values:

```js
/**
 * Short summary of what the function does.
 * @param {string} name - Description of the parameter.
 * @returns {boolean} What the return value represents.
 */
function doThing(name) { ... }
```

Prefer JSDoc over free-form comments for anything a caller needs to understand. Keep non-JSDoc comments only for explaining _why_ something non-obvious is done inside a function body.

## Repo layout

- `apps/` — per-frontend setup docs (RetroArch, EmuDeck, RetroDeck).
- `systems/` — per-system docs (one file per console). Each covers install on Android, iOS, macOS, Windows, and Linux (Ubuntu), plus how the system maps onto the three frontends.
- `README.md` — index plus the aggregate support matrix and per-device compatibility grid.
- `clean.js` — Node.js ROM filename cleaner (zero deps, uses `fs`/`path` only). Strips GoodTools/No-Intro junk (`[!]`, `[a1]`, `(Hack)`, `(Beta)`, etc.) while preserving region/language/version/disc tags. Run with `node clean.js <rom-folder> [<rom-folder>...] [--dry-run]`. Tested via `npm test`.
- `pack.js` — ROM library packer + deduper. Two sub-commands:
  - `node pack.js zip <folder> [--dry-run]` — flattens nested folders into the top level, then archives each universal-zip-eligible cartridge ROM (`UNIVERSAL_ZIP_EXTENSIONS` — see "systems with universal `.zip` support" above) into `<name>.zip`. Disc-based formats (`.iso`, `.chd`, `.cue`, etc.) are intentionally not touched. On collision: identical content (MD5 match) → source dropped; different content → new zip written with a `<name> - <timestamp>.zip` suffix.
  - `node pack.js dedup <folder> [--dry-run]` — walks the folder, groups files by MD5+size, moves the older copies of each duplicate set into `<folder>/_recycleBin` (newest kept). Mirrors the bash `dedup` function in `~/git/bashrc/software/scripts/bash-file-utils.profile.bash`.

## When adding a new system doc

1. Create `systems/<slug>.md`.
2. Include a **Prerequisites** section with:
   - Firmware / BIOS glossary (what each file is, whether it is required).
   - System requirements for Desktop / Android / iOS / Handhelds, with explicit verdicts for the user's known devices (Galaxy S24 Ultra, Z Fold 5, Tab S9 Ultra, iPad Pro 12.9" M1, Steam Deck, Legion Go).
3. Add the system to `README.md`:
   - Link in the "By System" section.
   - Row in the support matrix table.
4. If the system has unique setup steps, also add a row to the per-system tables in `apps/retroarch.md`, `apps/emudeck.md`, and `apps/retrodeck.md`.
5. Run `npm test` and `npm run format` before committing (the pre-commit hook will refuse the commit otherwise).

## Reference: systems with universal `.zip` support

When writing about ROM file formats, these systems accept `.zip` files as direct input across **every common emulator** and **every major OS** (Windows, macOS, Linux, Android, iOS) without configuration:

**8/16-bit cartridge:** NES, SNES, GB/GBC, GBA, Genesis/Mega Drive, Master System, Game Gear, 32X, PC Engine HuCard, Atari 2600.

**Arcade (zip is canonical, not just supported):** Arcade (MAME / FBNeo), Neo Geo AES / MVS.

Everything else either needs the system's native compressed format (`.chd`, `.rvz`, `.nsz`, `.cso`, `.vpk`) or has mixed support — notably N64 standalones (simple64, Ares) often want raw `.z64`, and NDS forks vary on `.nds.zip`. All disc-based systems (PS1/PS2/Saturn/Dreamcast/Sega CD/PCE CD/Neo Geo CD/PSP) need `.chd` or `.cue`+`.bin`.

Rule of thumb: if the original media was a **cartridge** or **single-chip arcade board**, `.zip` is fine. If it was a **disc** or **modern encrypted package**, use the native format.

## Writing style

- Short, dense, reference-grade. Prefer tables over prose for lookup content.
- Mark required vs. optional firmware explicitly; never assume the reader knows.
- When tech landscape is unstable (Switch, 3DS), flag it with a short "Context" note so the doc doesn't mislead when forks rename or disappear.
- No emojis in prose; status icons (✅ ⚠️ ❌ 🟢 🟡 🟠 🔴 ⚫) are allowed in tables.
- No ROM or BIOS download links. Refer to "dump from your own console."
