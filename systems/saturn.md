# Sega Saturn

- Released: 1994
- Disc formats: `.cue`+`.bin`, `.chd`, `.ccd`+`.img`+`.sub`
- BIOS required: **yes** — `sega_101.bin` (JP), `mpr-17933.bin` (US/EU), `mpr-18811-mx.ic1` & `mpr-19367-mx.ic1` (Saturn Video CD card)

## Recommended emulators

| Emulator | Type | Notes |
|---|---|---|
| **Beetle Saturn** | libretro core | Cycle-accurate port of Mednafen |
| **Kronos** | libretro core + standalone | OpenGL/Vulkan; upscales, runs better on weaker hardware |
| **YabaSanshiro** | libretro core + standalone | Focused on Android |
| **Mednafen** | standalone | CLI-driven, very accurate — base of Beetle Saturn |
| **SSF** | standalone (Windows) | Historically the most compatible; Windows only |

Default pick: **Beetle Saturn** (accuracy) or **Kronos** (performance + upscaling).

## Per-platform install

### Android

- RetroArch → Core Downloader → **YabaSanshiro** or **Beetle Saturn** (demanding).
- Standalone: **YabaSanshiro Pro** (paid).
- Snapdragon 888+ recommended for Beetle Saturn.

### iOS

- RetroArch sideload + Beetle Saturn — performance marginal on A15+.
- **Provenance** with YabaSanshiro-derived core.

### macOS

- RetroArch + Beetle Saturn / Kronos.
- Mednafen via `brew install mednafen`.

### Windows

- RetroArch + Beetle Saturn / Kronos.
- **SSF**: https://www.satakore.com/ssf.html — Windows-only classic.

### Linux (Ubuntu)

```bash
sudo apt install retroarch libretro-beetle-saturn libretro-kronos mednafen
```

## Per-frontend setup

### RetroArch

1. Core: **Beetle Saturn** for accuracy, **Kronos** for upscaling.
2. BIOS in `system/`: `sega_101.bin`, `mpr-17933.bin`.
3. Kronos: `Options → Resolution Mode → 2×/4×`. Beetle Saturn is native-only (no upscaling).

### EmuDeck

- Default: Beetle Saturn or Kronos (depends on version).
- BIOS: `~/Emulation/bios/sega_101.bin`, `mpr-17933.bin`.
- ROM folder: `~/Emulation/roms/saturn/`.

### RetroDeck

- Default: Beetle Saturn via RetroArch.
- BIOS: `~/retrodeck/bios/`.
- ROM folder: `~/retrodeck/roms/saturn/`.

## Tips

- Saturn emulation is **notoriously hard** — expect lower compatibility than PS1/N64 equivalents.
- `.chd` is well supported; preferred over `.cue`+`.bin` multi-disc mess.
- Multi-disc games: `.m3u` playlist referencing each disc.
- **Dreamcast-style texture dump/replace** is not available on Saturn.
- Controller: Saturn's "Fighting Pad" / 3D Control Pad — map L2/R2 to Z buttons (Saturn had 6-face-button + L/R + Z stick button).
- **Virtua Fighter 2**, **Panzer Dragoon**, **Nights into Dreams** work well on both cores.
