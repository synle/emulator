# Repository conventions

Notes for Claude Code (and any other contributor) working in this repo.

## Formatting — always run before commit and push

All Markdown in this repo is formatted with **Prettier**. Before creating a commit and pushing, you **must** run:

```bash
npm run format
```

If dependencies are missing, install them first:

```bash
npm install
```

Then verify nothing is broken:

```bash
npm run format:check
```

The workflow is: **edit → `npm run format` → `git add` → commit → push**. Do not push unformatted Markdown.

## Repo layout

- `apps/` — per-frontend setup docs (RetroArch, EmuDeck, RetroDeck).
- `systems/` — per-system docs (one file per console). Each covers install on Android, iOS, macOS, Windows, and Linux (Ubuntu), plus how the system maps onto the three frontends.
- `README.md` — index plus the aggregate support matrix and per-device compatibility grid.

## When adding a new system doc

1. Create `systems/<slug>.md`.
2. Include a **Prerequisites** section with:
   - Firmware / BIOS glossary (what each file is, whether it is required).
   - System requirements for Desktop / Android / iOS / Handhelds, with explicit verdicts for the user's known devices (Galaxy S24 Ultra, Z Fold 5, Tab S9 Ultra, iPad Pro 12.9" M1, Steam Deck, Legion Go).
3. Add the system to `README.md`:
   - Link in the "By System" section.
   - Row in the support matrix table.
4. If the system has unique setup steps, also add a row to the per-system tables in `apps/retroarch.md`, `apps/emudeck.md`, and `apps/retrodeck.md`.
5. Run `npm run format` before committing.

## Writing style

- Short, dense, reference-grade. Prefer tables over prose for lookup content.
- Mark required vs. optional firmware explicitly; never assume the reader knows.
- When tech landscape is unstable (Switch, 3DS), flag it with a short "Context" note so the doc doesn't mislead when forks rename or disappear.
- No emojis in prose; status icons (✅ ⚠️ ❌ 🟢 🟡 🟠 🔴 ⚫) are allowed in tables.
- No ROM or BIOS download links. Refer to "dump from your own console."
