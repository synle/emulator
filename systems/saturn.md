# Sega Saturn

- Released: 1994
- Disc formats: `.cue`+`.bin`, `.chd`, `.ccd`+`.img`+`.sub`
- BIOS required: **yes** — `sega_101.bin` (JP), `mpr-17933.bin` (US/EU), `mpr-18811-mx.ic1` & `mpr-19367-mx.ic1` (Saturn Video CD card)

## Prerequisites

### Firmware / BIOS

- **BIOS** — **required**. Saturn boot ROM, one per region.
- **Video CD card BIOS** — separate firmware for the Video CD expansion card; optional, only for VCD playback.

| File                                   | For           | Required?                |
| -------------------------------------- | ------------- | ------------------------ |
| `sega_101.bin`                         | JP Saturn     | Required for JP discs    |
| `mpr-17933.bin`                        | US/EU Saturn  | Required for US/EU discs |
| `mpr-18811-mx.ic1`, `mpr-19367-mx.ic1` | Video CD card | Optional                 |

### System requirements

**Desktop (Windows / macOS / Linux)**

- Minimum: Intel i5 6th gen / Ryzen 5 1600, 8 GB RAM (Saturn is CPU-heavy, not GPU-heavy).
- Recommended: modern i5 / Ryzen 5 for reliable full speed. Single-threaded performance matters more than GPU.

**Android**

- Minimum: Snapdragon 888, 8 GB RAM. Saturn is the **hardest** sub-6th-gen console for ARM chips.
- ⚠️ **S24 Ultra** (SD 8 Gen 3) — playable for most games via Beetle Saturn; the toughest titles (Virtua Fighter 2, Burning Rangers) still drop frames occasionally.
- ⚠️ **Z Fold 5 / Tab S9 Ultra** (SD 8 Gen 2) — marginal; favor YabaSanshiro over Beetle Saturn. Expect compromises.

**iOS / iPadOS**

- ⚠️ **iPad Pro 12.9" M1** — Beetle Saturn works but is not full-speed on every title; M2/M4 iPads do better.

**Handhelds (SteamOS / Windows handhelds)**

- ✅ **Steam Deck** — Beetle Saturn runs the vast majority of the library at full speed. A handful of VDP2-heavy titles hitch.
- ✅ **Legion Go** — full-speed across the library.

**Raspberry Pi**

- ❌ **Pi 3B+** — not enough single-thread performance for Saturn's dual-CPU design.
- ⚠️ **Pi 4** — YabaSanshiro or Kronos at native resolution playable for many titles; Virtua Fighter 2, Burning Rangers struggle.
- ✅ **Pi 5** — Beetle Saturn runs the vast majority of the library at full speed.
- `sega_101.bin` (JP) / `mpr-17933.bin` (US/EU) in `/userdata/bios/`.
- See [arcade-retro.md](../arcade-retro.md) for the full Pi build guide.

## Recommended emulators

| Emulator          | Type                       | Notes                                                   |
| ----------------- | -------------------------- | ------------------------------------------------------- |
| **Beetle Saturn** | libretro core              | Cycle-accurate port of Mednafen                         |
| **Kronos**        | libretro core + standalone | OpenGL/Vulkan; upscales, runs better on weaker hardware |
| **YabaSanshiro**  | libretro core + standalone | Focused on Android                                      |
| **Mednafen**      | standalone                 | CLI-driven, very accurate — base of Beetle Saturn       |
| **SSF**           | standalone (Windows)       | Historically the most compatible; Windows only          |

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
