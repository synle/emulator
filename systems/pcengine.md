# TurboGrafx-16 / PC Engine (+ CD, SuperGrafx)

- Released: 1987 (JP PC Engine) / 1989 (NA TurboGrafx)
- ROM extensions: `.pce`, `.sgx` (SuperGrafx), `.cue`+`.bin` or `.chd` (CD)
- BIOS required:
  - HuCard: **no**
  - CD / Super CD-ROM²: **yes** — `syscard3.pce` (Super CD), `syscard1.pce` / `syscard2.pce` (older), `gexpress.pce` (Games Express variant)

## Recommended emulators

| Emulator | Type | Notes |
|---|---|---|
| **Beetle PCE / Beetle PCE Fast** | libretro core | Definitive; PCE + SuperGrafx + CD |
| **Ootake** | standalone (Windows) | Windows-focused, per-game settings |
| **Mednafen** | standalone | Base of Beetle |

Default: **Beetle PCE** (accuracy) or **Beetle PCE Fast** (low-power devices).

## Per-platform install

### Android

- RetroArch → Core Downloader → **Beetle PCE Fast**.

### iOS

- RetroArch + Beetle PCE / PCE Fast.
- **Provenance**.

### macOS

- **OpenEmu** wraps Mednafen PCE.
- RetroArch + Beetle PCE.
- `brew install mednafen`.

### Windows

- RetroArch + Beetle PCE.
- **Ootake**: https://www.ouken.net/ootake/.

### Linux (Ubuntu)

```bash
sudo apt install retroarch libretro-beetle-pce libretro-beetle-pce-fast mednafen
```

## Per-frontend setup

### RetroArch

1. Core: **Beetle PCE**.
2. BIOS in `system/`: `syscard3.pce`.
3. CD game: load `.cue` or `.chd`.
4. SuperGrafx titles (there are only ~5): load `.sgx`.

### EmuDeck

- ROM folders:
  - `~/Emulation/roms/pcengine/` — HuCard
  - `~/Emulation/roms/pcenginecd/` — CD
  - `~/Emulation/roms/supergrafx/` — SGX
- BIOS: `~/Emulation/bios/syscard3.pce`

### RetroDeck

- ROM folders: `~/retrodeck/roms/pcengine/`, `~/retrodeck/roms/pcenginecd/`, `~/retrodeck/roms/supergrafx/`.

## Tips

- `.chd` is supported and recommended for CD games.
- Some Japanese CD games need region Auto or JP; set in Core Options.
- PC Engine has a 6-button pad (Arcade Card titles like Fighting Street) — enable in Core Options.
- SuperGrafx = PC Engine with more VRAM. Only 5 games exist natively for it.
