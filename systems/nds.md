# Nintendo DS / DSi

- Released: 2004 (DS) / 2008 (DSi)
- ROM extensions: `.nds`, `.dsi`
- BIOS required: **optional for DS**, **required for DSi** (`bios7.bin`, `bios9.bin`, `firmware.bin`; DSi needs `dsi_bios7.bin`, `dsi_bios9.bin`, `dsi_firmware.bin`, `dsi_nand.bin`)

## Recommended emulators

| Emulator | Type | Notes |
|---|---|---|
| **melonDS** | libretro core + standalone | Actively developed; DSi + local WiFi multiplayer |
| DeSmuME | libretro core + standalone | Older; still has best compatibility for some titles |

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
