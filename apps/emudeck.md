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

| Platform                 | Supported         | Notes                                                              |
| ------------------------ | ----------------- | ------------------------------------------------------------------ |
| Steam Deck (SteamOS)     | ✅ primary target | Recommended setup                                                  |
| Linux (Ubuntu/Arch/etc.) | ✅                | Installer shell script                                             |
| Windows 10/11            | ✅                | EmuDeck for Windows (separate build)                               |
| macOS 12+                | ✅ (beta)         | EmuDeck for macOS, Apple Silicon/Intel                             |
| Android                  | ❌                | Not supported — use [RetroArch](retroarch.md) or Daijishō directly |
| iOS                      | ❌                | Not supported                                                      |

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

## Per-system setup

EmuDeck creates a unified layout under `~/Emulation/` (or your chosen drive). Drop ROMs in the correct subfolder and BIOS into `~/Emulation/bios/`; EmuDeck's per-emulator defaults take care of the rest. After adding BIOS, run **EmuDeck → Manage Emulators → BIOS Checker** to verify every file hashes correctly — missing or wrong-hash BIOS is the #1 reason cores refuse to boot.

| System                                        | ROM folder (`~/Emulation/roms/…`) | BIOS in `~/Emulation/bios/`                                    | Default emulator              |
| --------------------------------------------- | --------------------------------- | -------------------------------------------------------------- | ----------------------------- |
| [NES](../systems/nes.md)                      | `nes/`                            | FDS: `disksys.rom`                                             | RetroArch + FCEUmm / Mesen    |
| [SNES](../systems/snes.md)                    | `snes/`                           | —                                                              | RetroArch + Snes9x            |
| [N64](../systems/n64.md)                      | `n64/`                            | —                                                              | RetroArch + Mupen64Plus-Next  |
| [GameCube](../systems/gamecube.md)            | `gamecube/`                       | —                                                              | Dolphin (standalone)          |
| [Wii](../systems/wii.md)                      | `wii/`                            | —                                                              | Dolphin (standalone)          |
| [Wii U](../systems/wiiu.md)                   | `wiiu/`                           | Cemu `keys.txt` installed via Cemu GUI                         | Cemu                          |
| [Switch](../systems/switch.md)                | `switch/`                         | `keys/prod.keys`, `keys/title.keys`; firmware via emulator GUI | Ryubing / Suyu (current fork) |
| [GB / GBC](../systems/gb.md)                  | `gb/`, `gbc/`                     | —                                                              | RetroArch + SameBoy           |
| [GBA](../systems/gba.md)                      | `gba/`                            | `gba_bios.bin`                                                 | RetroArch + mGBA              |
| [NDS](../systems/nds.md)                      | `nds/`                            | `bios7.bin`, `bios9.bin`, `firmware.bin`                       | RetroArch + melonDS           |
| [3DS](../systems/3ds.md)                      | `3ds/`                            | `aes_keys.txt`                                                 | Azahar / Lime3DS (standalone) |
| [PS1](../systems/ps1.md)                      | `psx/`                            | `scph5500.bin`, `scph5501.bin`, `scph5502.bin`                 | DuckStation (standalone)      |
| [PS2](../systems/ps2.md)                      | `ps2/`                            | PS2 BIOS `.bin` (e.g. `SCPH-70012.bin`)                        | PCSX2 (standalone)            |
| [PS3](../systems/ps3.md)                      | `ps3/`                            | `PS3UPDAT.PUP` installed via RPCS3 GUI                         | RPCS3                         |
| [PSP](../systems/psp.md)                      | `psp/`                            | —                                                              | PPSSPP (standalone)           |
| [PS Vita](../systems/psvita.md)               | `vita/`                           | `PSVUPDAT.PUP` + per-game `.rif` via Vita3K GUI                | Vita3K                        |
| [Master System](../systems/sms.md)            | `mastersystem/`                   | —                                                              | RetroArch + Genesis Plus GX   |
| [Game Gear](../systems/sms.md)                | `gamegear/`                       | —                                                              | RetroArch + Genesis Plus GX   |
| [Genesis / Mega Drive](../systems/genesis.md) | `genesis/` or `megadrive/`        | —                                                              | RetroArch + Genesis Plus GX   |
| [Sega CD](../systems/genesis.md)              | `segacd/`                         | `bios_CD_U.bin`, `bios_CD_E.bin`, `bios_CD_J.bin`              | RetroArch + Genesis Plus GX   |
| [32X](../systems/genesis.md)                  | `sega32x/`                        | —                                                              | RetroArch + PicoDrive         |
| [Saturn](../systems/saturn.md)                | `saturn/`                         | `sega_101.bin`, `mpr-17933.bin`                                | RetroArch + Beetle Saturn     |
| [Dreamcast](../systems/dreamcast.md)          | `dreamcast/`                      | `dc/dc_boot.bin`, `dc/dc_flash.bin`                            | RetroArch + Flycast           |
| [Arcade](../systems/arcade.md)                | `arcade/`                         | Per-board BIOSes alongside ROM zips                            | RetroArch + MAME / FB Neo     |
| [Neo Geo](../systems/neogeo.md)               | `neogeo/`                         | `neogeo.zip` alongside ROMs                                    | RetroArch + FB Neo            |
| [Neo Geo CD](../systems/neogeo.md)            | `neogeocd/`                       | `neocd.bin`, `neocd_f.bin`, `neocd_z.bin`                      | RetroArch + NeoCD             |
| [PC Engine](../systems/pcengine.md)           | `pcengine/`                       | —                                                              | RetroArch + Beetle PCE        |
| [PC Engine CD](../systems/pcengine.md)        | `pcenginecd/`                     | `syscard3.pce`                                                 | RetroArch + Beetle PCE        |
| [SuperGrafx](../systems/pcengine.md)          | `supergrafx/`                     | —                                                              | RetroArch + Beetle PCE        |
| [Atari 2600](../systems/atari2600.md)         | `atari2600/`                      | —                                                              | RetroArch + Stella            |

### After dropping ROMs

1. Open **EmuDeck → Steam ROM Manager**.
2. Select which parsers to use (one per system).
3. **Preview** — Steam ROM Manager scrapes SteamGridDB for box art and backgrounds.
4. **Save to Steam**. Restart Steam to see the tiles.

### Common setup gotchas

- **BIOS Checker shows red for a file you added** — hash mismatch. Re-dump from your own hardware; random "BIOS packs" on the internet are often wrong or corrupted.
- **Empty ROM folder after install** — EmuDeck only creates folders you chose to install emulators for. Missing a system? Run **Manage Emulators → [System] → Install**.
- **Deck switches emulator at every update** — pin your choice under **Manage Emulators → [System] → Emulator** (e.g., force DuckStation standalone over RetroArch for PS1).

## See also

- [RetroArch](retroarch.md) — one of the cores EmuDeck installs
- [RetroDeck](retrodeck.md) — alternative all-in-one Flatpak
