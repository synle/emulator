# RetroArch

RetroArch is a cross-platform frontend that loads emulator backends called **libretro cores**. One UI, one controller config, many consoles.

- Official site: https://www.retroarch.com
- Core list: https://docs.libretro.com/library/

## Install

### Windows

1. Download the installer from https://www.retroarch.com/?page=platforms.
2. Run the installer — choose "Install for all users" if you want it in `C:\RetroArch-Win64\`.
3. Alternative: install from Steam (free). Steam build auto-updates but stores config in Steam's prefix.
4. First launch: `Main Menu → Online Updater → Update Core Info Files`, then `Update Assets`, `Update Controller Profiles`, `Update Databases`.

```powershell
# winget alternative
winget install Libretro.RetroArch
```

### macOS

RetroArch ships as a universal binary (Apple Silicon + Intel) with a native Metal renderer. Builds are unsigned, so Gatekeeper will complain once; dismiss it and macOS remembers.

**Requirements**

- macOS 11.0 Big Sur or later (for the Metal build — the default).
- Apple Silicon (M1 / M2 / M3 / M4) is native; Intel Macs run the universal build natively too. No Rosetta needed.

**Install — option A: DMG (always has the latest upstream)**

1. Download `RetroArch_Metal.dmg` from https://www.retroarch.com/?page=platforms.
2. Open the DMG and drag **RetroArch.app** to `/Applications`.
3. First launch: right-click the app → **Open** (unsigned builds need this one-time override). If Gatekeeper still blocks it:
   ```bash
   xattr -dr com.apple.quarantine /Applications/RetroArch.app
   ```

**Install — option B: Homebrew**

```bash
brew install --cask retroarch          # universal Metal build
# or the legacy OpenGL build for macOS 10.13–10.14:
brew install --cask retroarch-metal
```

**Config / data paths on macOS**

| Directory       | Path                                                    |
| --------------- | ------------------------------------------------------- |
| Config root     | `~/Library/Application Support/RetroArch/`              |
| `retroarch.cfg` | `~/Library/Application Support/RetroArch/retroarch.cfg` |
| System (BIOS)   | `~/Library/Application Support/RetroArch/system/`       |
| Saves / states  | `…/saves/`, `…/states/`                                 |
| Playlists       | `…/playlists/`                                          |
| Cores           | `…/cores/`                                              |

Open the config dir in Finder:

```bash
open ~/Library/Application\ Support/RetroArch
```

**Apple Silicon vs Intel performance**

- **Apple Silicon (M1+)**: everything in this guide runs at max upscale. GameCube, Wii, PS1, PS2, N64 ParaLLEl-RDP, Dreamcast all hit native speed comfortably.
- **Intel Macs**: RetroArch itself is native, but cores vary. 8-bit through PS1 is trivial. GameCube / Wii via the Dolphin libretro core run but with frame-pacing hiccups a fast Mac Pro masks. PS2 (LRPS2) is marginal even on top-end Intel chips; prefer [standalone PCSX2 Qt](../systems/ps2.md).

**Recommended macOS-specific settings**

- `Settings → Drivers → Video`: **metal** (default — leave it).
- `Settings → Drivers → Audio`: **coreaudio3**.
- `Settings → Video → Threaded Video`: **Off**. macOS compositor handles timing well; threaded video adds latency.
- `Settings → Latency → Run-Ahead`: 1 for 2D systems; 0 on Intel under heavy cores.

**Controllers on macOS**

macOS natively pairs MFi, DualSense, DualShock 4, Xbox Series, Joy-Cons, and Switch Pro Controller over Bluetooth (System Settings → Bluetooth). Once paired, RetroArch's `Settings → Input → Port 1 Controls` auto-config picks them up.

Wired Xbox controllers: pair fine via USB. GameCube controllers need the Mayflash or official Nintendo adapter.

**Updating**

RetroArch has no self-update on macOS. Re-download the DMG (or `brew upgrade --cask retroarch`) and drag to `/Applications` — your config under `~/Library/Application Support/RetroArch/` is preserved.

### Linux (Ubuntu / Debian)

```bash
# PPA — has the latest stable
sudo add-apt-repository ppa:libretro/stable
sudo apt update
sudo apt install retroarch retroarch-assets libretro-*
```

Or Flatpak (recommended on SteamOS / immutable distros):

```bash
flatpak install flathub org.libretro.RetroArch
flatpak run org.libretro.RetroArch
```

Snap is also available but has sandbox issues with controllers; prefer apt or Flatpak.

### Android

1. Install from Google Play: "RetroArch" (32-bit) or "RetroArch Plus" (64-bit, more cores).
2. Or sideload the latest APK from https://www.retroarch.com/?page=platforms (Play Store lags several versions).
3. Grant storage permission on first launch. ROMs go in `Internal Storage/RetroArch/downloads` or any folder you point it at.

### iOS / iPadOS

Apple does not allow RetroArch in the App Store. Options:

1. **AltStore / SideStore** (easiest, free):
   - Install AltServer on your Mac/PC.
   - Download `RetroArch.ipa` from https://www.retroarch.com/?page=platforms.
   - Drag the IPA into AltStore on your device. Re-sign every 7 days (free Apple ID) or yearly (paid developer account).
2. **TrollStore** (iOS 14–17.0 on some devices): permanent install, no re-sign.
3. **Jailbreak**: install from the RetroArch team's Cydia/Sileo repo.

ROMs are copied via Files.app → "On My iPhone" → RetroArch, or via iTunes/Finder file sharing.

## First-Time Configuration

1. **Update everything**: `Main Menu → Online Updater` → Update Core Info Files, Assets, Controller Profiles, Databases, GLSL/Slang Shaders.
2. **Install cores**: `Load Core → Download a Core`. See each system doc for recommended cores.
3. **Directories**: `Settings → Directory` — set System/BIOS, Saves, States, Screenshots, Thumbnails to folders you back up.
4. **Controller**: plug in, `Settings → Input → Port 1 Controls` → auto-config should work. If not, bind manually.
5. **Scan content**: `Import Content → Scan Directory` — RetroArch builds playlists by hashing against its DB.

## BIOS

Place BIOS files in `system/` under your RetroArch config directory:

| OS              | Path                                                         |
| --------------- | ------------------------------------------------------------ |
| Windows         | `C:\RetroArch-Win64\system\`                                 |
| macOS           | `~/Library/Application Support/RetroArch/system/`            |
| Linux (apt)     | `~/.config/retroarch/system/`                                |
| Linux (Flatpak) | `~/.var/app/org.libretro.RetroArch/config/retroarch/system/` |
| Android         | `Internal Storage/RetroArch/system/`                         |
| iOS             | `On My iPhone/RetroArch/system/`                             |

Check required BIOS for each core at `Information → Core Information` after loading a core.

## Recommended global settings

- `Settings → Video → Threaded Video`: **On** (Android/low-end); **Off** on desktop for lowest input lag.
- `Settings → Latency → Run-Ahead to Reduce Latency`: 1–2 frames for 2D systems.
- `Settings → Saving → Auto Save State`: **On** if you want seamless resume.
- `Settings → User Interface → Menu → Menu Driver`: **Ozone** (desktop) or **XMB** (couch).

## Playlists & Scraping

`Import Content → Scan Directory` uses libretro DAT hashes. For box art, set `Settings → Online Updater → Update Thumbnails` after scanning. For richer metadata, pair with a frontend like **Playnite**, **LaunchBox**, or **ES-DE**.

## Netplay

`Main Menu → Netplay → Host` / `Refresh Room List`. Works cross-platform as long as the same core + same ROM hash are loaded.

## Per-system setup

For each system, this table lists the **best libretro core** (in bold), when to prefer an alternative, the BIOS files you need to drop into `system/`, and notable gotchas. See the [BIOS paths](#bios) above for where `system/` lives on each OS, and the individual system docs under [systems/](../systems/) for full detail.

| System                                        | Best core (and why)                                                                    | Alternatives                                                                                   | BIOS in `system/`                                                                                                                                           |
| --------------------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [NES](../systems/nes.md)                      | **Mesen** — most accurate; supports HD packs, Famicom Disk System, VS. System          | FCEUmm (lighter, great compat) for low-end phones; Nestopia UE middle-ground                   | FDS: `disksys.rom`                                                                                                                                          |
| [SNES](../systems/snes.md)                    | **Snes9x** — best compat-per-CPU-cycle; just works                                     | bsnes-mercury-accuracy for cycle accuracy + Super Game Boy; bsnes-hd-beta for widescreen hacks | SGB: `sgb.boot.rom`, `sgb1.sfc` / `sgb2.sfc` (optional)                                                                                                     |
| [N64](../systems/n64.md)                      | **Mupen64Plus-Next** — default, fastest, most portable                                 | ParaLLEl N64 on desktop Vulkan when you hit graphical bugs (Majora's Mask, Rare titles)        | —                                                                                                                                                           |
| [GameCube](../systems/gamecube.md)            | **Dolphin** (libretro) — only option inside RetroArch                                  | —                                                                                              | —                                                                                                                                                           |
| [Wii](../systems/wii.md)                      | **Dolphin** (libretro) — only option inside RetroArch                                  | —                                                                                              | —                                                                                                                                                           |
| [Wii U](../systems/wiiu.md)                   | — no libretro core                                                                     | —                                                                                              | —                                                                                                                                                           |
| [Switch](../systems/switch.md)                | — no libretro core                                                                     | —                                                                                              | —                                                                                                                                                           |
| [GB / GBC](../systems/gb.md)                  | **SameBoy** — most accurate; pixel-perfect color math                                  | Gambatte if SameBoy isn't built for your platform; mGBA to unify with GBA                      | `dmg_boot.bin`, `cgb_boot.bin` (optional — startup chime only)                                                                                              |
| [GBA](../systems/gba.md)                      | **mGBA** — the definitive GBA core                                                     | VBA-M (older); gpSP on very old ARM hardware                                                   | `gba_bios.bin` (recommended — enable "Use BIOS if found")                                                                                                   |
| [NDS](../systems/nds.md)                      | **melonDS** — active, accurate, DSi-capable                                            | DeSmuME for a few compat edge cases                                                            | `bios7.bin`, `bios9.bin`, `firmware.bin` (optional for DS, required for DSi); DSi adds `dsi_bios7.bin`, `dsi_bios9.bin`, `dsi_firmware.bin`, `dsi_nand.bin` |
| [3DS](../systems/3ds.md)                      | — (libretro Citra is obsolete)                                                         | Use [standalone Azahar / Lime3DS](../systems/3ds.md)                                           | —                                                                                                                                                           |
| [PS1](../systems/ps1.md)                      | **Beetle PSX HW** — desktop best: Vulkan upscaling + high accuracy                     | SwanStation for speed+accuracy balance (default on Deck); PCSX-ReARMed for low-end ARM         | `scph5500.bin` (JP), `scph5501.bin` (US), `scph5502.bin` (EU)                                                                                               |
| [PS2](../systems/ps2.md)                      | **LRPS2 / PCSX2** (libretro) — only option inside RetroArch                            | Prefer [standalone PCSX2](../systems/ps2.md) — libretro lags significantly                     | PS2 BIOS `.bin` (e.g. `SCPH-70012.bin`)                                                                                                                     |
| [PSP](../systems/psp.md)                      | **PPSSPP** — only core                                                                 | — (but standalone PPSSPP has more per-game settings)                                           | —                                                                                                                                                           |
| [PS Vita](../systems/psvita.md)               | — no libretro core                                                                     | Use [standalone Vita3K](../systems/psvita.md)                                                  | —                                                                                                                                                           |
| [PS3](../systems/ps3.md)                      | — no libretro core                                                                     | Use [standalone RPCS3](../systems/ps3.md)                                                      | —                                                                                                                                                           |
| [SMS / Game Gear](../systems/sms.md)          | **Genesis Plus GX** — best overall; also does SG-1000                                  | PicoDrive on weak ARM                                                                          | `bios.sms`, `bios_J.sms` (optional)                                                                                                                         |
| [Genesis / Mega Drive](../systems/genesis.md) | **Genesis Plus GX** — default; Genesis + Sega CD + SMS + GG                            | BlastEm for cycle-accurate playback; **PicoDrive for 32X**                                     | Sega CD: `bios_CD_U.bin`, `bios_CD_E.bin`, `bios_CD_J.bin`                                                                                                  |
| [Saturn](../systems/saturn.md)                | **Beetle Saturn** — most accurate (native-res only)                                    | Kronos if you want 2×/4× upscaling (sacrifices some accuracy); YabaSanshiro on Android         | `sega_101.bin` (JP), `mpr-17933.bin` (US/EU)                                                                                                                |
| [Dreamcast](../systems/dreamcast.md)          | **Flycast** — only serious option; Naomi + Atomiswave too                              | —                                                                                              | `dc/dc_boot.bin`, `dc/dc_flash.bin`. Naomi: `naomi.zip` in `system/dc/`. Atomiswave: `awbios.zip`                                                           |
| [Arcade](../systems/arcade.md)                | **FB Neo** for CPS1/2/3 + Neo Geo + Cave + Taito; **MAME Current** for everything else | MAME 2003-Plus for Raspberry Pi / very old Android                                             | Per-board BIOS (e.g. `cps2_bios.zip`) alongside ROM zips, not in `system/`                                                                                  |
| [Neo Geo](../systems/neogeo.md)               | **FB Neo** — fastest + most accurate                                                   | MAME Current if your set is MAME-only; NeoCD for Neo Geo CD                                    | Neo Geo CD: `neocd.bin`, `neocd_f.bin`, `neocd_z.bin` in `system/neocd/`. AES/MVS: `neogeo.zip` (or UniBIOS) in the ROM folder                              |
| [PC Engine / TG-16](../systems/pcengine.md)   | **Beetle PCE** — accurate; HuCard + CD + SuperGrafx                                    | Beetle PCE Fast on low-end ARM                                                                 | `syscard3.pce` (CD only)                                                                                                                                    |
| [Atari 2600](../systems/atari2600.md)         | **Stella** — only option                                                               | —                                                                                              | —                                                                                                                                                           |

### Common setup gotchas

- **"ROM didn't load / core reported missing BIOS"** — check the hash of your BIOS files against the [libretro BIOS reference](https://docs.libretro.com/guides/bios/). RetroArch shows the required BIOS under `Information → Core Information` after loading a core.
- **"Scan directory didn't add my games"** — scanning uses RedumpDB / No-Intro hashes. If your dumps are trimmed or intro-patched, they won't match; use `Import Content → Manual Scan` with the parent playlist, or load manually via `Load Content`.
- **Disc-based cores want `.cue` or `.chd`, not `.bin`** — the `.cue` file is the table of contents. For CHD (Compressed Hunks of Data) use `chdman createcd` from the MAME tools to convert.
- **Multi-disc games** — create an `.m3u` text file with one disc path per line, then load the `.m3u` instead of any individual disc.

## Backup & restore

RetroArch stores everything in a single config directory. Back up that one tree and you preserve your entire setup — controllers, core options, save files, save states, scanned playlists, cheats, shader presets, BIOS.

### What lives where

| Directory (relative to config root) | What it holds                                   | Worth backing up?              |
| ----------------------------------- | ----------------------------------------------- | ------------------------------ |
| `retroarch.cfg`                     | Main config (video, input, audio, paths)        | Yes                            |
| `config/`                           | Per-core option overrides, remap files          | Yes                            |
| `system/`                           | BIOS / firmware dumps                           | Yes (hard to re-collect)       |
| `saves/`                            | SRAM, memory-card, and cart saves               | Yes (unique)                   |
| `states/`                           | Save states                                     | Yes                            |
| `playlists/`                        | Scanned content playlists (`.lpl`)              | Yes                            |
| `cheats/`                           | User cheat files                                | Yes                            |
| `screenshots/`                      | In-game captures                                | Optional                       |
| `overlays/`, `shaders/`             | Custom overlays/bezels/shader presets you added | Yes                            |
| `downloads/`                        | ROMs/cores pulled via the in-app updater        | Usually skip (re-downloadable) |
| `thumbnails/`                       | Scraped box art                                 | Skip (large, re-downloadable)  |
| `assets/`                           | Default UI assets                               | Skip (re-downloadable)         |

### Config root per OS

| OS                     | Default path                                               |
| ---------------------- | ---------------------------------------------------------- |
| Windows                | `C:\RetroArch-Win64\` (portable) or `%APPDATA%\RetroArch\` |
| macOS                  | `~/Library/Application Support/RetroArch/`                 |
| Linux (apt / AppImage) | `~/.config/retroarch/` + `~/.local/share/retroarch/`       |
| Linux (Flatpak)        | `~/.var/app/org.libretro.RetroArch/config/retroarch/`      |
| Android                | `Internal Storage/RetroArch/`                              |
| iOS                    | `On My iPhone/RetroArch/` (access via Files.app)           |

### Script

Use [`scripts/retroarch-backup.sh`](../scripts/retroarch-backup.sh). It auto-detects the config root on Linux (native + Flatpak) and macOS; the `PATHS` list at the top of the script is easy to edit.

```bash
# Back up to the current directory
./scripts/retroarch-backup.sh backup

# Back up to a specific location
./scripts/retroarch-backup.sh backup /mnt/external

# Restore (existing config is moved aside as retroarch.bak-<timestamp>)
./scripts/retroarch-backup.sh restore retroarch-backup-20260424-120000.tar.gz

# Override the source dir (portable installs, Windows via WSL, etc.)
SRC_DIR=/path/to/RetroArch ./scripts/retroarch-backup.sh backup
```

On Android / iOS, copy the `RetroArch/` folder manually via your file manager (Files.app on iOS, any file manager with storage access on Android).

## See also

- [EmuDeck](emudeck.md) — configures RetroArch automatically for you
- [RetroDeck](retrodeck.md) — bundles RetroArch inside a single Flatpak
