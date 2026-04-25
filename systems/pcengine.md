# TurboGrafx-16 / PC Engine (+ CD, SuperGrafx)

- Released: 1987 (JP PC Engine) / 1989 (NA TurboGrafx)
- ROM extensions: `.pce`, `.sgx` (SuperGrafx), `.cue`+`.bin` or `.chd` (CD)
- BIOS required:
  - HuCard: **no**
  - CD / Super CD-ROM²: **yes** — `syscard3.pce` (Super CD), `syscard1.pce` / `syscard2.pce` (older), `gexpress.pce` (Games Express variant)

## Prerequisites

### Firmware / BIOS

- **BIOS** — boot ROM. HuCard (cartridge) games don't need one.
- **System Card** — required to boot CD-ROM² and Super CD-ROM² discs. The System Card is the physical card/firmware the real PC Engine CD attachment required; modern cores need a dump of its ROM.

| File | For | Required? |
|---|---|---|
| `syscard3.pce` | Super CD-ROM² (recommended; plays all CD games) | Required for CD |
| `syscard1.pce` / `syscard2.pce` | Early CD-ROM² games | Legacy |
| `gexpress.pce` | Games Express (unlicensed) | Optional |

### System requirements

**Desktop (Windows / macOS / Linux)**
- Any hardware. 2 GB RAM.

**Android**
- ✅ **S24 Ultra / Z Fold 5 / Tab S9 Ultra** — trivial.

**iOS / iPadOS**
- ✅ **iPad Pro 12.9" M1** — trivial.

**Handhelds (SteamOS / Windows handhelds)**
- ✅ **Steam Deck** — trivial.
- ✅ **Legion Go** — trivial.

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
