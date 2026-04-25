# Super Nintendo (SNES / Super Famicom)

- Released: 1990 (JP) / 1991 (NA)
- Common ROM extensions: `.sfc`, `.smc`, `.swc`, `.fig`
- BIOS required: **no** (some Satellaview games need `BS-X.bin`; Sufami Turbo needs `STBIOS.bin`)

## Prerequisites

### Firmware / BIOS

- **BIOS** — a copy of the console's boot ROM. SNES doesn't need one for stock cartridges.
- **SGB BIOS** (Super Game Boy) — optional; required only if you want to play Game Boy games through the Super Game Boy adapter, which adds borders and SNES-enhanced audio.
- **BS-X BIOS / Sufami Turbo BIOS** — optional; for obscure Japanese-only peripherals.

| File                                   | For                      | Required? |
| -------------------------------------- | ------------------------ | --------- |
| `sgb.boot.rom` + `sgb1.sfc`/`sgb2.sfc` | Super Game Boy via bsnes | Optional  |
| `BS-X.bin`                             | Satellaview titles       | Optional  |
| `STBIOS.bin`                           | Sufami Turbo             | Optional  |

### System requirements

**Desktop (Windows / macOS / Linux)**

- Minimum: any CPU, integrated GPU, 2 GB RAM.
- Only bsnes-mercury-accuracy or standalone bsnes at high run-ahead benefits from a modern CPU (Intel i3 / Ryzen 3 and up).

**Android**

- Minimum: Snapdragon 400-class, 2 GB RAM.
- ✅ **Galaxy S24 Ultra / Z Fold 5 / Tab S9 Ultra** — trivial; bsnes run-ahead works smoothly.

**iOS / iPadOS**

- ✅ **iPad Pro 12.9" M1** — trivial at any upscale/run-ahead.

**Handhelds (SteamOS / Windows handhelds)**

- ✅ **Steam Deck** (Van Gogh APU, 16 GB) — effortless, even cycle-accurate bsnes.
- ✅ **Legion Go** (Ryzen Z1 Extreme, 16 GB) — effortless.

## Recommended emulators

| Emulator             | Type                       | Notes                                           |
| -------------------- | -------------------------- | ----------------------------------------------- |
| **bsnes / bsnes-hd** | libretro core + standalone | Cycle-accurate; "bsnes-hd beta" adds widescreen |
| Snes9x               | libretro core + standalone | Best speed/compat balance                       |
| Snes9x Current       | libretro core              | Latest upstream Snes9x                          |
| Mesen-S (now Mesen2) | libretro + standalone      | Unified Mesen for SNES/NES/GB                   |

Default pick: **Snes9x** for anything that isn't a desktop. Use **bsnes** on desktop if you want accuracy.

## Per-platform install

### Android

- RetroArch → Core Downloader → **Snes9x** (or **Snes9x 2010** for low-end).
- Standalone: **Snes9x EX+** (free).

### iOS

- RetroArch (sideload) → Snes9x core.
- **Delta** (App Store, iOS 14+): free, supports SNES natively — no sideloading needed.
- **Provenance**.

### macOS

- `brew install --cask openemu` — **OpenEmu** is Mac-native, wraps Snes9x/bsnes cores.
- Or RetroArch + Snes9x.

### Windows

- RetroArch + Snes9x / bsnes.
- Standalone **Snes9x**: https://www.snes9x.com.
- Standalone **bsnes-hd**: https://github.com/DerKoun/bsnes-hd (for widescreen hacks).

### Linux (Ubuntu)

```bash
sudo apt install retroarch libretro-snes9x libretro-bsnes-mercury-accuracy
# or
flatpak install flathub org.snes9x.Snes9x
```

## Per-frontend setup

### RetroArch

1. Core: **Snes9x** (balanced) or **bsnes-mercury-accuracy** (accurate).
2. For Super Game Boy games: load with bsnes and attach the SGB BIOS (`sgb.boot.rom`).
3. `Quick Menu → Options` → try the built-in widescreen for bsnes-hd.

### EmuDeck

- Default: **RetroArch + Snes9x**.
- ROM folder: `~/Emulation/roms/snes/`.
- Optional: enable bsnes-hd widescreen via **EmuDeck → Manage Emulators → RetroArch → bsnes-hd**.

### RetroDeck

- Default core: **Snes9x** (swappable to bsnes inside RetroArch).
- ROM folder: `~/retrodeck/roms/snes/`.

## Chip-enhanced games (SuperFX, SA-1, etc.)

All modern cores support Star Fox, Yoshi's Island, Super Mario RPG, etc. No extra BIOS needed. If a game won't boot, try bsnes-mercury-accuracy.

## Tips

- CRT shader recommendation: `crt-royale` or `crt-guest-advanced`.
- Super Game Boy: use the **bsnes** core with `sgb1.sfc` and `sgb.boot.rom` in `system/`.
- MSU-1 music hacks: drop `.msu`/`.pcm` files next to the ROM; bsnes auto-detects.
