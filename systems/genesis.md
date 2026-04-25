# Sega Genesis / Mega Drive (+ Sega CD, 32X)

- Released: 1988 (JP) / 1989 (NA)
- ROM extensions: `.md`, `.gen`, `.smd`, `.bin`
- Sega CD disc: `.cue`+`.bin`, `.chd`
- BIOS required:
  - Genesis/Mega Drive: **no**
  - Sega CD: **yes** — `bios_CD_U.bin`, `bios_CD_E.bin`, `bios_CD_J.bin`
  - 32X: **no**

## Recommended emulators

| Emulator | Type | Notes |
|---|---|---|
| **Genesis Plus GX** | libretro core | Default; Master System, Game Gear, Genesis, Sega CD |
| **PicoDrive** | libretro core | Handles 32X too; fast |
| **BlastEm** | libretro core + standalone | Cycle-accurate Genesis |

Default: **Genesis Plus GX** for Genesis + Sega CD; add **PicoDrive** for 32X.

## Per-platform install

### Android

- RetroArch → Core Downloader → Genesis Plus GX, PicoDrive.
- Standalone: **MD.emu** (paid, Play Store).

### iOS

- RetroArch sideload + Genesis Plus GX.
- **Delta** supports Genesis.
- **Provenance**.

### macOS

- **OpenEmu** (wraps Genesis Plus GX).
- RetroArch + core.

### Windows

- RetroArch + Genesis Plus GX / PicoDrive.
- Standalone **BlastEm**: https://www.retrodev.com/blastem/.

### Linux (Ubuntu)

```bash
sudo apt install retroarch libretro-genesis-plus-gx libretro-picodrive libretro-blastem
```

## Per-frontend setup

### RetroArch

1. Genesis: Genesis Plus GX or BlastEm.
2. Sega CD: Genesis Plus GX (BIOS files in `system/`).
3. 32X: PicoDrive (load `.32x` / `.bin`).
4. `Options → Audio Filter → Low-Pass` approximates the bass-heavy Model 1 sound.

### EmuDeck

- ROM folders:
  - `~/Emulation/roms/genesis/`
  - `~/Emulation/roms/megadrive/` (same thing; EmuDeck may use either)
  - `~/Emulation/roms/segacd/`
  - `~/Emulation/roms/sega32x/`
- BIOS: `~/Emulation/bios/bios_CD_U.bin` etc.

### RetroDeck

- ROM folders: `~/retrodeck/roms/megadrive/`, `~/retrodeck/roms/segacd/`, `~/retrodeck/roms/sega32x/`.

## Tips

- Genesis Plus GX option "Low-Pass Filter" reduces the harsh high frequencies typical of Model 2/VA7.
- Sega CD disc swap (Lunar, Final Fight CD): use `.m3u` playlists.
- 32X is demanding on PicoDrive — use a modern core build; upstream merge for full HW is recent.
- Sonic CD has a dedicated standalone port (Sonic 1/2/3/CD Retro Engine decompilations) — preferable for Sonic CD specifically.
