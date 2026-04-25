# Nintendo DS / DSi

- Released: 2004 (DS) / 2008 (DSi)
- ROM extensions: `.nds`, `.dsi`
- BIOS required: **optional for DS**, **required for DSi** (`bios7.bin`, `bios9.bin`, `firmware.bin`; DSi needs `dsi_bios7.bin`, `dsi_bios9.bin`, `dsi_firmware.bin`, `dsi_nand.bin`)

## Prerequisites

### Firmware / BIOS

- **BIOS** — original Nintendo DS boot ROMs for each CPU (ARM7 and ARM9). Optional on melonDS (HLE boot is good), **required** for DSi mode.
- **Firmware** — the DS's configuration/settings data (`firmware.bin`).
- **DSi BIOS + NAND** — required for DSi games; must be dumped from a real DSi.

| File                               | For                     | Required?                       |
| ---------------------------------- | ----------------------- | ------------------------------- |
| `bios7.bin`                        | DS ARM7                 | Optional (melonDS), recommended |
| `bios9.bin`                        | DS ARM9                 | Optional, recommended           |
| `firmware.bin`                     | DS settings / Pictochat | Optional, recommended           |
| `dsi_bios7.bin`, `dsi_bios9.bin`   | DSi ARM7/ARM9           | Required for DSi mode           |
| `dsi_firmware.bin`, `dsi_nand.bin` | DSi firmware + flash    | Required for DSi mode           |

### System requirements

**Desktop (Windows / macOS / Linux)**

- Minimum: 2012-era dual-core + integrated GPU, 4 GB RAM.
- Recommended: any modern CPU for upscaling.

**Android**

- Minimum: Snapdragon 660 / Dimensity 800, 4 GB RAM.
- ✅ **S24 Ultra / Z Fold 5 / Tab S9 Ultra** — DraStic / melonDS at high resolution, silky.

**iOS / iPadOS**

- ✅ **iPad Pro 12.9" M1** — melonDS handles everything.

**Handhelds (SteamOS / Windows handhelds)**

- ✅ **Steam Deck** — melonDS at high upscale, trackpad as stylus.
- ✅ **Legion Go** — comfortable; its touchscreen is well-suited for DS games.

**Raspberry Pi**

- ⚠️ **Pi 3B+** — DeSmuME at native; struggles on 3D-heavy titles (Mario Kart DS, Metroid Prime Hunters).
- ✅ **Pi 4** — melonDS smooth; dual-screen layouts including hybrid work well.
- ✅ **Pi 5** — melonDS at 2× upscale comfortable.
- Controls: use a touchscreen Pi hat for stylus games, or map the right analog stick as stylus.
- See [arcade-retro.md](../arcade-retro.md) for the full Pi build guide.

## Recommended emulators

| Emulator    | Type                       | Notes                                               |
| ----------- | -------------------------- | --------------------------------------------------- |
| **melonDS** | libretro core + standalone | Actively developed; DSi + local WiFi multiplayer    |
| DeSmuME     | libretro core + standalone | Older; still has best compatibility for some titles |

Default pick: **melonDS** (standalone on desktop, core on mobile).

## Per-platform install

### Android

- RetroArch → Core Downloader → **melonDS** or **DeSmuME**.
- Standalone: **DraStic** (paid, now freeware as of 2024, discontinued but excellent), **melonDS Android**.
- Dual-screen layout: configure portrait vs. landscape in RetroArch Quick Menu.

### iOS

- RetroArch + melonDS core (sideloaded).
- **Delta** — DS support added in recent versions.

### macOS

- `brew install --cask melonds`.
- **OpenEmu**.

### Windows

- **melonDS**: https://melonds.kuribo64.net/downloads.php.
- RetroArch + melonDS.

### Linux (Ubuntu)

```bash
sudo apt install retroarch libretro-melonds libretro-desmume
flatpak install flathub net.kuribo64.melonDS
```

## Per-frontend setup

### RetroArch

1. Core: **melonDS**.
2. BIOS in `system/`.
3. `Quick Menu → Core Options → Screen Layout` → Top/Bottom, Left/Right, or Hybrid.
4. Touchscreen: mouse (desktop), finger (mobile), or right stick as pointer.

### EmuDeck

- Default: melonDS (libretro in RetroArch, or standalone as an option).
- BIOS: `~/Emulation/bios/bios7.bin`, `bios9.bin`, `firmware.bin`.
- ROM folder: `~/Emulation/roms/nds/`.
- Steam Deck trackpad = touchscreen by default.

### RetroDeck

- Default: melonDS.
- BIOS: `~/retrodeck/bios/` (same filenames).
- ROM folder: `~/retrodeck/roms/nds/`.

## Screen & touch tips

- **Hybrid layout** (one large + one small): great for Zelda: Phantom Hourglass.
- **Single-screen mode**: useful for racing games that ignore the bottom screen.
- Steam Deck: assign the **right trackpad** to mouse input for touchscreen games.
- Stylus accuracy: enable "Pointer is relative to touch screen" in RetroArch input settings.

## Local wireless multiplayer

melonDS supports **local multiplayer** between two running instances (Pokémon trades, Mario Kart DS). Configure via `Settings → Wi-Fi` in melonDS standalone.

## DSi

- DSiWare requires a DSi NAND dump.
- melonDS boots DSi mode with full BIOS + NAND — Settings → Emulator Settings → DSi Mode.
