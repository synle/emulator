# Atari 2600

- Released: 1977
- ROM extensions: `.a26`, `.bin`
- BIOS required: **no**

## Prerequisites

### Firmware / BIOS

- **BIOS** — not used. Atari 2600 had no boot ROM; the console just jumps into the cartridge.

### System requirements

**Desktop (Windows / macOS / Linux)**

- Any hardware from the last 20 years. 1 GB RAM.

**Android**

- ✅ **S24 Ultra / Z Fold 5 / Tab S9 Ultra** — trivial.

**iOS / iPadOS**

- ✅ **iPad Pro 12.9" M1** — trivial.

**Handhelds (SteamOS / Windows handhelds)**

- ✅ **Steam Deck** — trivial.
- ✅ **Legion Go** — trivial.

## Recommended emulator

**Stella** — the definitive Atari 2600 emulator.

- Official site: https://stella-emu.github.io
- libretro core also available.

## Per-platform install

### Android

- RetroArch → Core Downloader → **Stella**.
- Standalone: **2600.emu** (paid Play Store).

### iOS

- RetroArch + Stella.
- **Provenance**.

### macOS

- `brew install --cask stella`.
- **OpenEmu**.

### Windows

- Stella installer: https://stella-emu.github.io/downloads.html.
- RetroArch + Stella.

### Linux (Ubuntu)

```bash
sudo apt install stella retroarch libretro-stella
```

## Per-frontend setup

### RetroArch

- Core: **Stella**.
- No BIOS needed.
- Paddle controllers (Breakout, Kaboom): bind analog stick or mouse to paddle axis.

### EmuDeck

- ROM folder: `~/Emulation/roms/atari2600/`.

### RetroDeck

- ROM folder: `~/retrodeck/roms/atari2600/`.

## Tips

- Stella has accurate phosphor/blur simulation — enable for authentic CRT look (`TV Effects → Phosphor`).
- The 2600 used region-specific NTSC vs PAL palettes — Stella autodetects based on ROM header.
- **Homebrew scene** is very active; many new games released yearly, all run in Stella.
- Related Atari hardware also emulated well:
  - Atari 5200: core **a5200** in RetroArch
  - Atari 7800: core **ProSystem**
  - Atari Lynx: core **Handy** or **Beetle Lynx** (BIOS `lynxboot.img` optional)
  - Atari Jaguar: core **Virtual Jaguar** (demanding, mixed compatibility)
