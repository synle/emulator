# RetroDeck

RetroDeck is a **single Flatpak** that bundles RetroArch, standalone emulators, ES-DE frontend, BIOS checker, and save sync. Unlike EmuDeck (which installs many separate apps), RetroDeck is one sandboxed package — easier to update, fully contained, but less flexible.

- Official site: https://retrodeck.net
- Wiki: https://github.com/RetroDECK/RetroDECK/wiki

## Supported platforms

| Platform                           | Supported         | Notes                                            |
| ---------------------------------- | ----------------- | ------------------------------------------------ |
| Steam Deck (SteamOS)               | ✅ primary target | Flatpak via Discover                             |
| Linux (any Flatpak-capable distro) | ✅                | Ubuntu, Fedora, Arch, etc.                       |
| Windows                            | ❌                | Flatpak-only — use [EmuDeck](emudeck.md) instead |
| macOS                              | ❌                | Not supported                                    |
| Android                            | ❌                | Not supported                                    |
| iOS                                | ❌                | Not supported                                    |

If you are on Windows or macOS, skip this doc and use [EmuDeck](emudeck.md) or individual emulators.

## Install

### Steam Deck (SteamOS)

1. Desktop Mode → open **Discover** (KDE app store).
2. Search **RetroDECK** → Install.
3. Alternatively from terminal (Konsole):
   ```bash
   flatpak install flathub net.retrodeck.retrodeck
   ```
4. Launch from the app grid. Pick storage target on first run:
   - Internal: `~/retrodeck/`
   - SD card: `/run/media/deck/<SD>/retrodeck/`
5. Add to Steam (Gaming Mode): right-click RetroDECK in the app menu → **Add to Steam** (or use Steam → Add Non-Steam Game).

### Linux (Ubuntu)

```bash
# Ensure Flatpak + Flathub
sudo apt install flatpak
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

# Install RetroDECK
flatpak install flathub net.retrodeck.retrodeck

# Launch
flatpak run net.retrodeck.retrodeck
```

First launch walks you through storage, controller layout, aspect ratio, and BIOS placement.

## First run

1. Pick storage location (internal vs SD card). RetroDeck creates `~/retrodeck/` with full directory tree.
2. Drop ROMs into `~/retrodeck/roms/<system>/`.
3. Drop BIOS into `~/retrodeck/bios/`. Use **Configurator → Tools → BIOS Checker** to verify.
4. Launch **ES-DE** from inside RetroDeck — it scans `roms/` and builds your library.
5. Configure controllers in ES-DE: `Menu → Input Device Settings`.

## Folder layout

```
~/retrodeck/              # or /run/media/deck/<SD>/retrodeck/
├── bios/
├── roms/
│   ├── nes/
│   ├── snes/
│   └── …
├── saves/
├── states/
├── screenshots/
└── .config/              # per-emulator config lives here, inside the sandbox
```

Because RetroDeck is a Flatpak, host paths are mapped through Flatpak's filesystem sandbox. If you want to access RetroDeck's config from outside the Flatpak:

```bash
ls ~/.var/app/net.retrodeck.retrodeck/
```

## Configurator

RetroDeck ships with its own GUI called the **Configurator**. From inside RetroDeck, press the **Start button** → Configurator. Useful options:

- **Preset toggles**: bezels, shaders, widescreen, rewind, autosave per system.
- **BIOS Checker**: lists missing/incorrect BIOS hashes.
- **Reset**: reset a specific emulator or whole app to defaults.
- **Tools**: move save data to cloud, open shell inside the sandbox.

## Updating

```bash
flatpak update net.retrodeck.retrodeck
```

Or via Discover → Updates.

## Cloud save sync

RetroDeck supports Syncthing and rclone via Configurator → **Tools → Cloud Sync**. Point it at Google Drive, Dropbox, or a self-hosted target.

## RetroDeck vs EmuDeck — which to use?

|                  | RetroDeck                              | EmuDeck                                |
| ---------------- | -------------------------------------- | -------------------------------------- |
| Install          | One Flatpak                            | Many separate installs                 |
| Update           | One command                            | Per-emulator                           |
| Flexibility      | Low (sandboxed)                        | High (edit each emu's config directly) |
| Windows/macOS    | No                                     | Yes                                    |
| Desktop frontend | ES-DE built in                         | ES-DE or Pegasus optional              |
| Good for         | "Set and forget" on Steam Deck / Linux | Power users, multi-platform households |

## Per-system setup

RetroDeck uses a unified layout under `~/retrodeck/` (or your chosen SD card path). Drop ROMs in the correct subfolder and BIOS into `~/retrodeck/bios/`. After adding BIOS, run **Configurator → Tools → BIOS Checker** to verify hashes.

Because RetroDeck is a Flatpak sandbox, per-emulator configuration lives at `~/.var/app/net.retrodeck.retrodeck/config/` — you usually don't need to touch it directly; use the Configurator instead.

| System                                        | ROM folder (`~/retrodeck/roms/…`) | BIOS in `~/retrodeck/bios/`                             | Bundled emulator                     |
| --------------------------------------------- | --------------------------------- | ------------------------------------------------------- | ------------------------------------ |
| [NES](../systems/nes.md)                      | `nes/`                            | FDS: `disksys.rom`                                      | RetroArch + Mesen / FCEUmm           |
| [SNES](../systems/snes.md)                    | `snes/`                           | —                                                       | RetroArch + Snes9x                   |
| [N64](../systems/n64.md)                      | `n64/`                            | —                                                       | RetroArch + Mupen64Plus-Next         |
| [GameCube](../systems/gamecube.md)            | `gc/`                             | —                                                       | Dolphin                              |
| [Wii](../systems/wii.md)                      | `wii/`                            | —                                                       | Dolphin                              |
| [Wii U](../systems/wiiu.md)                   | `wiiu/`                           | Cemu keys (via Cemu GUI)                                | Cemu                                 |
| [Switch](../systems/switch.md)                | `switch/`                         | `switch/keys/prod.keys`, `title.keys`; firmware via GUI | (current fork — check release notes) |
| [GB / GBC](../systems/gb.md)                  | `gb/`, `gbc/`                     | —                                                       | RetroArch + SameBoy                  |
| [GBA](../systems/gba.md)                      | `gba/`                            | `gba_bios.bin`                                          | RetroArch + mGBA                     |
| [NDS](../systems/nds.md)                      | `nds/`                            | `bios7.bin`, `bios9.bin`, `firmware.bin`                | RetroArch + melonDS                  |
| [3DS](../systems/3ds.md)                      | `n3ds/`                           | `aes_keys.txt`                                          | Azahar / Lime3DS                     |
| [PS1](../systems/ps1.md)                      | `psx/`                            | `scph5500.bin`, `scph5501.bin`, `scph5502.bin`          | DuckStation                          |
| [PS2](../systems/ps2.md)                      | `ps2/`                            | PS2 BIOS `.bin`                                         | PCSX2                                |
| [PS3](../systems/ps3.md)                      | `ps3/`                            | `PS3UPDAT.PUP` via RPCS3 GUI                            | RPCS3                                |
| [PSP](../systems/psp.md)                      | `psp/`                            | —                                                       | PPSSPP                               |
| [PS Vita](../systems/psvita.md)               | `psvita/`                         | `PSVUPDAT.PUP` + `.rif` licenses via Vita3K GUI         | Vita3K (version-dependent)           |
| [Master System](../systems/sms.md)            | `mastersystem/`                   | —                                                       | RetroArch + Genesis Plus GX          |
| [Game Gear](../systems/sms.md)                | `gamegear/`                       | —                                                       | RetroArch + Genesis Plus GX          |
| [Genesis / Mega Drive](../systems/genesis.md) | `megadrive/`                      | —                                                       | RetroArch + Genesis Plus GX          |
| [Sega CD](../systems/genesis.md)              | `segacd/`                         | `bios_CD_U.bin`, `bios_CD_E.bin`, `bios_CD_J.bin`       | RetroArch + Genesis Plus GX          |
| [32X](../systems/genesis.md)                  | `sega32x/`                        | —                                                       | RetroArch + PicoDrive                |
| [Saturn](../systems/saturn.md)                | `saturn/`                         | `sega_101.bin`, `mpr-17933.bin`                         | RetroArch + Beetle Saturn            |
| [Dreamcast](../systems/dreamcast.md)          | `dreamcast/`                      | `dc/dc_boot.bin`, `dc/dc_flash.bin`                     | RetroArch + Flycast                  |
| [Arcade](../systems/arcade.md)                | `arcade/`, `mame/`                | Per-board BIOS alongside ROMs                           | RetroArch + MAME / FB Neo            |
| [Neo Geo](../systems/neogeo.md)               | `neogeo/`                         | `neogeo.zip` alongside ROMs                             | RetroArch + FB Neo                   |
| [Neo Geo CD](../systems/neogeo.md)            | `neogeocd/`                       | `neocd.bin`, `neocd_f.bin`, `neocd_z.bin`               | RetroArch + NeoCD                    |
| [PC Engine](../systems/pcengine.md)           | `pcengine/`                       | —                                                       | RetroArch + Beetle PCE               |
| [PC Engine CD](../systems/pcengine.md)        | `pcenginecd/`                     | `syscard3.pce`                                          | RetroArch + Beetle PCE               |
| [SuperGrafx](../systems/pcengine.md)          | `supergrafx/`                     | —                                                       | RetroArch + Beetle PCE               |
| [Atari 2600](../systems/atari2600.md)         | `atari2600/`                      | —                                                       | RetroArch + Stella                   |

### After dropping ROMs

1. Launch **ES-DE** from RetroDeck's main menu (or boot straight into it via the Configurator).
2. ES-DE scans `roms/` automatically and builds the system list.
3. Configure controllers in ES-DE: `Menu → Input Device Settings`.
4. For Steam integration (Gaming Mode), use **Configurator → Tools → Add to Steam** or manually add the RetroDeck Flatpak as a non-Steam game.

### Common setup gotchas

- **Folder names differ from EmuDeck** — e.g., RetroDeck uses `megadrive/` where EmuDeck may use `genesis/`; `n3ds/` vs `3ds/`. If in doubt, check the empty folder layout RetroDeck creates on first run.
- **BIOS Checker flags missing files after an update** — RetroDeck occasionally renames or relocates expected BIOS paths between versions. Re-run the BIOS Checker after every Flatpak update.
- **Can't find my save files on disk** — they're inside the Flatpak sandbox at `~/.var/app/net.retrodeck.retrodeck/`. Use **Configurator → Tools → Cloud Sync** or `cp` from that path.

## Backup & restore

RetroDeck has two parallel trees you must preserve together:

1. **`~/retrodeck/`** — user data (BIOS, saves, states, screenshots, and optionally ROMs).
2. **`~/.var/app/net.retrodeck.retrodeck/`** — the Flatpak sandbox, which holds per-emulator configs (Dolphin graphics, PCSX2 game fixes, RetroArch per-core options, etc.).

Backing up only `~/retrodeck/` loses your per-emulator tweaks. Backing up only the Flatpak dir loses your saves. Do both.

### What lives where

| Path                                         | What it holds                                   | Worth backing up? |
| -------------------------------------------- | ----------------------------------------------- | ----------------- |
| `~/retrodeck/bios/`                          | BIOS / firmware                                 | Yes               |
| `~/retrodeck/saves/`                         | Save files across all bundled emulators         | Yes               |
| `~/retrodeck/states/`                        | Save states                                     | Yes               |
| `~/retrodeck/screenshots/`                   | Captures                                        | Optional          |
| `~/retrodeck/roms/`                          | ROMs                                            | Optional (large)  |
| `~/.var/app/net.retrodeck.retrodeck/config/` | Per-emulator configuration files                | Yes               |
| `~/.var/app/net.retrodeck.retrodeck/data/`   | Per-emulator runtime data (Wii NAND, VMU, etc.) | Yes               |

### Script

Use [`scripts/retrodeck-backup.sh`](../scripts/retrodeck-backup.sh). It archives both trees at once, labels them inside the tarball, and routes each back to the correct location on restore.

```bash
# Back up
./scripts/retrodeck-backup.sh backup /mnt/external

# Restore (existing dirs moved aside as <dir>.bak-<timestamp>)
./scripts/retrodeck-backup.sh restore /mnt/external/retrodeck-backup-20260424-120000.tar.gz
```

To include ROMs or change paths, edit the `SOURCES` array at the top of the script — each entry is `LABEL|ROOT_DIR|rel_path1,rel_path2,...`.

### Cloud sync alternative

RetroDeck has built-in sync via the Configurator → **Tools → Cloud Sync** (Syncthing, rclone). Use that for continuous save sync and the script above for full snapshots before major updates.

## See also

- [EmuDeck](emudeck.md) — alternative approach, multi-platform
- [RetroArch](retroarch.md) — one of the bundled components
