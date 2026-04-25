# EmuDeck

EmuDeck is an **installer** (not an emulator) that downloads RetroArch + standalone emulators (PCSX2, Dolphin, Cemu, Ryujinx, DuckStation, PPSSPP, etc.) and auto-configures:

- Folder layout (one `Emulation/` tree)
- Controller mappings for Steam Deck / generic gamepads
- Shaders, bezels, resolution presets
- Steam ROM Manager integration (adds games to Steam as shortcuts)
- ES-DE or Pegasus as a unified frontend (optional)

- Official site: https://www.emudeck.com
- Wiki: https://emudeck.github.io/

## Supported platforms

| Platform | Supported | Notes |
|---|---|---|
| Steam Deck (SteamOS) | ✅ primary target | Recommended setup |
| Linux (Ubuntu/Arch/etc.) | ✅ | Installer shell script |
| Windows 10/11 | ✅ | EmuDeck for Windows (separate build) |
| macOS 12+ | ✅ (beta) | EmuDeck for macOS, Apple Silicon/Intel |
| Android | ❌ | Not supported — use [RetroArch](retroarch.md) or Daijishō directly |
| iOS | ❌ | Not supported |

## Install

### Steam Deck (SteamOS)

1. Switch to **Desktop Mode** (power button → Switch to Desktop).
2. Download https://www.emudeck.com — the site auto-detects Steam Deck and gives you a `.desktop` installer.
3. Double-click the installer on the Desktop.
4. Choose **Easy Mode** (defaults) or **Custom Mode** (pick cores, resolution, aspect ratio, bezels).
5. When asked, pick storage location:
   - Internal: `~/Emulation`
   - SD card: `/run/media/deck/<SD-label>/Emulation`
6. After install, ROMs go in `Emulation/roms/<system>/`. BIOS go in `Emulation/bios/`.
7. Run **Steam ROM Manager** from the EmuDeck launcher to push games into Gaming Mode.

### Linux (Ubuntu / Debian / Arch)

```bash
# Pull the installer (uses Flatpak under the hood for emulators)
curl -L https://www.emudeck.com/EmuDeck.desktop -o ~/Desktop/EmuDeck.desktop
chmod +x ~/Desktop/EmuDeck.desktop
# Double-click it, or run the embedded script:
bash <(curl -sL https://raw.githubusercontent.com/dragoonDorise/EmuDeck/main/install.sh)
```

Requirements: Flatpak installed (`sudo apt install flatpak` + Flathub remote). EmuDeck installs its emulators as Flatpaks.

### Windows

1. Download `EmuDeck-Windows.exe` from https://www.emudeck.com.
2. Run installer — EmuDeck lives in `%USERPROFILE%\AppData\Roaming\EmuDeck\`.
3. ROMs default to `%USERPROFILE%\Emulation\roms\`.
4. EmuDeck on Windows uses the **native Windows builds** of each emulator (not Flatpak).
5. Use **Steam ROM Manager** (included) to populate Steam.

### macOS

1. Download `EmuDeck.dmg` from https://www.emudeck.com (Apple Silicon and Intel builds).
2. Drag to `/Applications` and open. If Gatekeeper blocks:
   ```bash
   xattr -dr com.apple.quarantine /Applications/EmuDeck.app
   ```
3. macOS support covers: RetroArch, Dolphin, DuckStation, PCSX2, PPSSPP, MAME, melonDS, Citra (archive), Ryujinx. **Xenia and Cemu are not supported** (Windows-only emulators).
4. ROMs: `~/Emulation/roms/`.

## First run

1. Pick **Hardware profile** (Steam Deck LCD / OLED / custom).
2. Select **emulators** — uncheck anything you don't want (saves ~10 GB each for big cores).
3. Set **aspect ratio** — 16:9 stretched, 4:3 black bars, or per-system.
4. Choose **autosave / bezels / shaders** defaults.
5. Wait for downloads (15 min – 1 hour depending on selection).
6. Drop BIOS into `~/Emulation/bios/` — EmuDeck has a BIOS checker: **Manage Emulators → BIOS Checker**.
7. Copy ROMs into `~/Emulation/roms/<system>/` (folder names follow EmuDeck conventions; see system docs).
8. Run **Steam ROM Manager** → pick parsers → preview → save to Steam.

## Folder layout

```
~/Emulation/
├── bios/
├── roms/
│   ├── nes/
│   ├── snes/
│   ├── psx/
│   ├── ps2/
│   └── …
├── saves/
├── storage/           # shared screenshots, states
└── tools/             # Steam ROM Manager, ES-DE, etc.
```

## Updating

Open EmuDeck → **Manage Emulators** → **Update**. Or run the updater from the installer. On Linux the installer pulls Flatpak updates via `flatpak update`.

## Uninstall

EmuDeck installer → **Uninstall EmuDeck** (removes emulators and shortcuts but leaves your `~/Emulation/` intact by default).

## See also

- [RetroArch](retroarch.md) — one of the cores EmuDeck installs
- [RetroDeck](retrodeck.md) — alternative all-in-one Flatpak
