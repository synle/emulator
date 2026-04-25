# Emulator Setup Guides

Documentation for setting up retro gaming emulation across platforms (Android, iOS, macOS, Windows, Linux/Ubuntu).

## Organization

Docs are grouped two ways so you can read either by **what tool you're installing** or by **what system you want to play**.

### By App (frontend / launcher)

| App                            | Platforms                         | Best for                                           |
| ------------------------------ | --------------------------------- | -------------------------------------------------- |
| [RetroArch](apps/retroarch.md) | All                               | Power users, per-core tuning, shader work, netplay |
| [EmuDeck](apps/emudeck.md)     | Steam Deck, Linux, Windows, macOS | Fastest "everything works" setup                   |
| [RetroDeck](apps/retrodeck.md) | Linux / SteamOS (Flatpak)         | Self-contained sandbox on Steam Deck / Linux       |

See [Choosing a frontend](#choosing-a-frontend-retroarch-vs-emudeck-vs-retrodeck) below for a detailed comparison and decision guide.

### Streaming (play your emulator host from anywhere)

If you want to run emulators on one machine and play from another — iPad on the couch, phone in bed, Apple TV in the living room — these are the options. Think of this category as **"the spiritual replacement for Plex Arcade."**

| App                                                          | Platforms (host → client)                                               | Best for                                                    |
| ------------------------------------------------------------ | ----------------------------------------------------------------------- | ----------------------------------------------------------- |
| [Sunshine + Moonlight](apps/streaming/sunshine-moonlight.md) | Windows/macOS/Linux → everywhere (Win/Mac/Lin/Android/iOS/Apple TV/TVs) | Best overall. Open-source, lowest latency, HDR + 4K + HEVC. |
| [Parsec](apps/streaming/parsec.md)                           | Windows/macOS/Linux → Win/Mac/Lin/Android/iOS/browser                   | The engine Plex Arcade actually used. Simpler setup.        |
| [Steam Remote Play](apps/streaming/steam-remote-play.md)     | Steam host → Steam Link on phone / TV / tablet / PC                     | Free and zero-config if you already use Steam + EmuDeck.    |

### Library frontends (pretty grid UI for your games)

These give you the "box art, cover flow, pick and play" experience on top of whatever emulators you installed.

| App                                               | Platforms                   | Highlight                                                      |
| ------------------------------------------------- | --------------------------- | -------------------------------------------------------------- |
| [Playnite](apps/launchers/playnite.md)            | Windows                     | Unifies Steam + Epic + GOG + emulators. Best Windows choice.   |
| [ES-DE](apps/launchers/es-de.md)                  | Win / Mac / Linux / Android | Bundled inside EmuDeck and RetroDeck. Cross-platform standard. |
| [Pegasus Frontend](apps/launchers/pegasus.md)     | Win / Mac / Linux / Android | Lightweight, fast, stunning themes.                            |
| [LaunchBox / BigBox](apps/launchers/launchbox.md) | Windows                     | Commercial, most polished out-of-box 10-foot UI.               |
| [OpenEmu](apps/launchers/openemu.md)              | macOS                       | Mac-native iTunes-style library. Zero config.                  |

### Management (sync, verification, conversion)

Tools that keep your setup organized and in sync across devices.

| App                                                       | Purpose                                                                 |
| --------------------------------------------------------- | ----------------------------------------------------------------------- |
| [Syncthing](apps/management/syncthing.md)                 | P2P save-file sync across devices (PC ↔ Deck ↔ phone).                  |
| [rclone](apps/management/rclone.md)                       | Cloud sync to Google Drive, Dropbox, S3, 70+ providers.                 |
| [RomVault / clrmamepro](apps/management/romvault.md)      | Verify and rebuild MAME / FBNeo / No-Intro / Redump ROM sets.           |
| [Disc tools](apps/management/disc-tools.md)               | `chdman`, `maxcso`, dolphin-tool — compress discs losslessly.           |
| [RetroAchievements](apps/management/retroachievements.md) | Community achievement service, like Steam achievements for retro games. |

### By System

Each system doc explains how to get that console running on **Android, iOS, macOS, Windows, Linux**, and how it maps onto **RetroArch / EmuDeck / RetroDeck**.

**Nintendo**

- [NES](systems/nes.md)
- [SNES](systems/snes.md)
- [Nintendo 64](systems/n64.md)
- [GameCube](systems/gamecube.md)
- [Wii](systems/wii.md)
- [Wii U](systems/wiiu.md)
- [Switch](systems/switch.md)
- [Game Boy / Game Boy Color](systems/gb.md)
- [Game Boy Advance](systems/gba.md)
- [Nintendo DS](systems/nds.md)
- [Nintendo 3DS](systems/3ds.md)

**Sony**

- [PlayStation 1](systems/ps1.md)
- [PlayStation 2](systems/ps2.md)
- [PlayStation 3](systems/ps3.md)
- [PSP](systems/psp.md)
- [PS Vita](systems/psvita.md)

**Sega**

- [Master System / Game Gear](systems/sms.md)
- [Genesis / Mega Drive](systems/genesis.md)
- [Saturn](systems/saturn.md)
- [Dreamcast](systems/dreamcast.md)

**Other**

- [Arcade (MAME / FBNeo)](systems/arcade.md)
- [Neo Geo (AES/MVS/CD)](systems/neogeo.md)
- [TurboGrafx-16 / PC Engine](systems/pcengine.md)
- [Atari 2600](systems/atari2600.md)

## Support matrix

**BIOS key**: ✅ required · ⚪ optional · — none · **Specs key**: "(any)" = any modern device works; "(SD 8xx)" = Snapdragon 8 Gen X+ for Android; "(A12+)" = iOS chip. See each system doc for detail.

| System                                     | BIOS             | Windows / macOS                  | Linux                | RetroArch core                 | Android                         | iOS                          |
| ------------------------------------------ | ---------------- | -------------------------------- | -------------------- | ------------------------------ | ------------------------------- | ---------------------------- |
| [NES](systems/nes.md)                      | — (FDS ⚪)       | Mesen, RA (any PC)               | Mesen, RA (any)      | ✅ Mesen / FCEUmm              | RA, Nostalgia.NES (any)         | RA, Delta (A9+)              |
| [SNES](systems/snes.md)                    | — (SGB ⚪)       | bsnes, Snes9x, OpenEmu (any)     | Snes9x, bsnes (any)  | ✅ Snes9x / bsnes              | RA, Snes9x EX+ (any)            | Delta (A9+)                  |
| [N64](systems/n64.md)                      | —                | simple64, Ares (i3+)             | simple64, Ares (i3+) | ✅ Mupen64Plus-Next / ParaLLEl | M64Plus FZ (SD 660+)            | RA (A12+)                    |
| [GameCube](systems/gamecube.md)            | —                | Dolphin (i5-8/GTX 1050 Ti)       | Dolphin (same)       | ⚠️ Dolphin lr (old)            | Dolphin MMJR2 (SD 845+)         | Dolphin iOS (A13+)           |
| [Wii](systems/wii.md)                      | — (WAD ⚪)       | Dolphin (same)                   | Dolphin              | ⚠️ Dolphin lr                  | Dolphin MMJR2 (SD 845+)         | Dolphin iOS (A13+)           |
| [Wii U](systems/wiiu.md)                   | Keys ✅          | Cemu (i5-8/GTX 1060)             | Cemu (Flatpak)       | ❌                             | ❌ (experimental)               | ❌                           |
| [Switch](systems/switch.md)                | Keys + FW ✅     | Ryubing / Suyu (i5-10/GTX 1650)  | same                 | ❌                             | Sudachi / Citron (SD 8 Gen 1+)  | ❌                           |
| [GB / GBC](systems/gb.md)                  | ⚪               | SameBoy, mGBA, OpenEmu (any)     | SameBoy, mGBA (any)  | ✅ SameBoy / mGBA              | RA, My OldBoy! (any)            | Delta (any)                  |
| [GBA](systems/gba.md)                      | ⚪               | mGBA, OpenEmu (any)              | mGBA (any)           | ✅ mGBA                        | My Boy!, RA (any)               | Delta (any)                  |
| [NDS](systems/nds.md)                      | DSi ✅ / DS ⚪   | melonDS (i3+)                    | melonDS              | ✅ melonDS / DeSmuME           | DraStic, melonDS (SD 660+)      | Delta, RA (A11+)             |
| [3DS](systems/3ds.md)                      | Keys ✅          | Azahar, Lime3DS (i5/GTX 1060)    | Azahar (same)        | ❌ (Citra lr is old)           | Azahar, Lime3DS (SD 855+)       | Folium (A12+)                |
| [PS1](systems/ps1.md)                      | ✅               | DuckStation (any modern)         | DuckStation          | ✅ SwanStation / Beetle PSX    | DuckStation (SD 665+)           | RA, Delta, Provenance (A11+) |
| [PS2](systems/ps2.md)                      | ✅               | PCSX2 (i5-8/GTX 1050 Ti)         | PCSX2 Flatpak        | ⚠️ LRPS2 (old)                 | AetherSX2 / NetherSX2 (SD 855+) | ❌                           |
| [PS3](systems/ps3.md)                      | FW ✅            | RPCS3 (i5-10/GTX 1060)           | RPCS3                | ❌                             | ❌                              | ❌                           |
| [PSP](systems/psp.md)                      | —                | PPSSPP (any)                     | PPSSPP (any)         | ✅ PPSSPP                      | PPSSPP (any)                    | PPSSPP, RA (A10+)            |
| [PS Vita](systems/psvita.md)               | FW ✅            | Vita3K (i5-8 / Vulkan 1.2)       | Vita3K               | ❌                             | Vita3K (SD 8 Gen 1+)            | ❌                           |
| [Master System / GG](systems/sms.md)       | ⚪               | OpenEmu, RA (any)                | RA (any)             | ✅ Genesis Plus GX             | RA (any)                        | RA, Provenance (any)         |
| [Genesis / Mega Drive](systems/genesis.md) | CD ✅ / cart —   | RA, BlastEm (any)                | RA, BlastEm          | ✅ Genesis Plus GX / PicoDrive | RA, MD.emu (any)                | Delta (any)                  |
| [Saturn](systems/saturn.md)                | ✅               | SSF (Win), Mednafen (i5-6+)      | Mednafen, RA (i5-6+) | ✅ Beetle Saturn / Kronos      | RA, YabaSanshiro (SD 888+)      | RA (A14+)                    |
| [Dreamcast](systems/dreamcast.md)          | ✅               | Flycast, Redream (any modern)    | Flycast (Flatpak)    | ✅ Flycast                     | Flycast, Redream (SD 660+)      | RA Flycast (A11+)            |
| [Arcade (MAME / FBNeo)](systems/arcade.md) | per-board ✅     | MAME, FBNeo (varies)             | MAME, FBNeo          | ✅ FBNeo / MAME                | RA, MAME4droid (any for 2D)     | MAME4iOS, RA (any for 2D)    |
| [Neo Geo](systems/neogeo.md)               | ✅ `neogeo.zip`  | RA, MAME (any)                   | RA, MAME             | ✅ FB Neo / NeoCD              | RA (any)                        | RA (any)                     |
| [PC Engine / TG-16](systems/pcengine.md)   | CD ✅ / HuCard — | Ootake (Win), Mednafen, RA (any) | RA, Mednafen         | ✅ Beetle PCE                  | RA (any)                        | RA (any)                     |
| [Atari 2600](systems/atari2600.md)         | —                | Stella, OpenEmu (any)            | Stella, RA (any)     | ✅ Stella                      | RA, 2600.emu (any)              | RA, Provenance (any)         |

### Performance tiers (quick legend)

- **🟢 Trivial** (any modern device): NES, SNES, GB/GBC, GBA, Genesis, SMS/GG, PC Engine (HuCard), Atari 2600, Neo Geo AES/MVS, most 2D arcade
- **🟡 Light** (2014+ dual-core / SD 660+ / A11+): N64, PS1, PSP, Dreamcast, DS, PC Engine CD, Neo Geo CD
- **🟠 Medium** (i5 8th gen / SD 855+ / A13+): GameCube, Wii, 3DS, Saturn, Naomi arcade
- **🔴 Heavy** (i5 10th gen / GTX 1060+ / SD 8 Gen 1+ / no iOS): PS2, Wii U, Vita
- **⚫ Very Heavy** (modern mid-range desktop / no iOS): PS3, Switch

### Your device verdicts (quick summary)

|                       | S24 Ultra (SD 8 Gen 3) | Z Fold 5 (SD 8 Gen 2) | Tab S9 Ultra (SD 8 Gen 2) | iPad Pro 12.9" M1 | Steam Deck          | Legion Go |
| --------------------- | ---------------------- | --------------------- | ------------------------- | ----------------- | ------------------- | --------- |
| 8/16-bit & handhelds  | ✅                     | ✅                    | ✅                        | ✅                | ✅                  | ✅        |
| N64, PS1, PSP, DC, DS | ✅                     | ✅                    | ✅                        | ✅                | ✅                  | ✅        |
| GameCube, Wii         | ✅                     | ✅                    | ✅                        | ✅                | ✅                  | ✅        |
| 3DS, Saturn           | ✅                     | ⚠️                    | ⚠️                        | ✅ / ⚠️           | ✅                  | ✅        |
| PS2                   | ✅                     | ✅                    | ✅                        | ❌                | ✅                  | ✅        |
| Wii U                 | ❌                     | ❌                    | ❌                        | ❌                | ⚠️                  | ✅        |
| Vita                  | ⚠️                     | ⚠️                    | ⚠️                        | ❌                | ⚠️                  | ✅        |
| Switch (2D/indie)     | ⚠️                     | ⚠️                    | ⚠️                        | ❌                | ⚠️                  | ✅        |
| Switch (AAA 3D)       | ❌                     | ❌                    | ❌                        | ❌                | ⚠️                  | ✅        |
| PS3                   | ❌                     | ❌                    | ❌                        | ❌                | ⚠️ (lighter titles) | ⚠️        |

## Choosing a frontend: RetroArch vs EmuDeck vs RetroDeck

All three can get you playing. They differ in scope, platform reach, how much you can customize, and how much maintenance you sign up for.

### Feature matrix

| Feature                             | RetroArch                               | EmuDeck                                           | RetroDeck                             |
| ----------------------------------- | --------------------------------------- | ------------------------------------------------- | ------------------------------------- |
| What it is                          | A frontend that loads libretro cores    | An installer + configurator for many emulators    | A single Flatpak that bundles it all  |
| Platforms                           | Windows / macOS / Linux / Android / iOS | SteamOS / Linux / Windows / macOS (beta)          | SteamOS / Linux (Flatpak only)        |
| Install effort                      | Low                                     | Medium                                            | Very low                              |
| Update model                        | Manual + in-app Online Updater          | Per-emulator via EmuDeck GUI                      | One `flatpak update` command          |
| Configuration depth                 | Very high (every setting exposed)       | Medium — sensible defaults; per-emulator GUIs     | Low — Configurator hides most knobs   |
| Uses upstream standalone emulators? | No (libretro cores only)                | Yes (Dolphin, PCSX2, Cemu, RPCS3, Ryujinx fork…)  | Yes (bundled inside the Flatpak)      |
| Steam integration                   | Manual (add each as non-Steam game)     | Steam ROM Manager bundled                         | Add single Flatpak as non-Steam game  |
| Cloud save sync                     | DIY (rclone, Syncthing)                 | DIY                                               | Built-in (Configurator → Cloud Sync)  |
| Per-core / per-system tuning        | Best-in-class                           | Good (defaults + edit each emulator's own config) | Limited (Configurator toggles)        |
| Covers Switch / PS3 / Wii U         | ❌ no libretro cores                    | ✅ bundles the right standalones                  | ✅ bundles the right standalones      |
| Runs on Android / iOS               | ✅                                      | ❌                                                | ❌                                    |
| Disk footprint (everything enabled) | ~2 GB + cores                           | 20–60 GB                                          | ~15 GB                                |
| Uninstall cleanliness               | Delete folder                           | Uninstall script                                  | `flatpak uninstall` — fully sandboxed |

### RetroArch

**Pros**

- Runs on **everything**, including iOS and Android — the only option on mobile.
- Unified controller config, shader pipeline, and netplay across every system it supports.
- Per-core run-ahead and input-latency controls are best-in-class.
- Open source; plain-text `retroarch.cfg`; portable (copy the folder, copy your setup).
- One learning curve works for 40+ systems.

**Cons**

- **No cores for Switch, PS3, Wii U, Xbox 360, PS Vita.**
- libretro-wrapped versions of Dolphin and PCSX2 lag significantly behind the upstream standalones.
- UI is dense and punishing for first-timers — every setting is reachable, none is signposted.
- Unsigned macOS and iOS builds require one-time Gatekeeper override / sideloading.

### EmuDeck

**Pros**

- One installer bootstraps RetroArch **plus** Dolphin, PCSX2, Cemu, RPCS3, the current Switch fork, DuckStation, PPSSPP, MAME, melonDS, Vita3K, and more — with solid defaults.
- **Best Steam Deck integration**: Steam ROM Manager adds tiles to Gaming Mode in one click; bezels, aspect ratios, and controller profiles are Deck-tuned out of the box.
- You get **standalone** emulators, so Switch / PS3 / Wii U are covered properly.
- BIOS Checker, hardware profiles, and per-system presets reduce "why doesn't this work?" friction.
- Cross-platform: SteamOS, Linux, Windows, and macOS (beta).

**Cons**

- Larger install (20–60 GB depending on which emulators you enable).
- Not a single app — each bundled emulator still has its own GUI for deep tweaks.
- **No Android / iOS.**
- macOS track is beta and lags the Linux / Windows builds.
- Emulator versions are decoupled; something can be bleeding edge while its neighbor is a release behind.

### RetroDeck

**Pros**

- **Easiest setup on Steam Deck and Linux**: one Flatpak, one update command.
- Fully sandboxed — cannot pollute your system, trivial to uninstall.
- ES-DE frontend built in with sensible defaults; the Configurator centralizes common toggles (bezels, shaders, rewind, autosave).
- Built-in cloud save sync (Syncthing / rclone).
- Updates ship as a single package — no per-emulator version drift.

**Cons**

- **Linux / SteamOS only.** Dead end for Windows, macOS, Android, iOS.
- Per-emulator config is behind sandbox paths (`~/.var/app/net.retrodeck.retrodeck/…`) — power-user tweaks are clumsy.
- Updates are all-or-nothing; you can't pin a specific emulator version.
- Less configurable than running emulators directly — if you want to, say, use a specific bsnes fork, you're better off with RetroArch or EmuDeck.

### Quick decision guide

| Your situation                                                           | Pick                                                            |
| ------------------------------------------------------------------------ | --------------------------------------------------------------- |
| Steam Deck, want the least fuss                                          | **RetroDeck**                                                   |
| Steam Deck, want to tweak individual emulators                           | **EmuDeck**                                                     |
| Windows or macOS, want one-install                                       | **EmuDeck**                                                     |
| Linux desktop, want full control, don't need Switch / PS3 / Wii U        | **RetroArch**                                                   |
| Same config across phone, tablet, PC                                     | **RetroArch** (only option on mobile)                           |
| Want Switch / PS3 / Wii U                                                | **EmuDeck** (or install RPCS3 / Cemu / Ryujinx fork standalone) |
| Want a single-folder portable setup you can copy between Windows PCs     | **RetroArch** (portable install)                                |
| Prioritize lowest input latency for fighting-game / shmup play           | **RetroArch** (run-ahead is unmatched)                          |
| Already have OpenEmu on a Mac and just want to add a few PSP / PS2 games | **Install PPSSPP / PCSX2 standalone** directly; skip all three  |

Note: **RetroArch + EmuDeck are not mutually exclusive** — EmuDeck installs RetroArch as one of its components. Many people run EmuDeck to get the bundle, then configure RetroArch directly for the systems it handles best.

## Legal note

This guide only covers software setup. You are responsible for providing legally-dumped BIOS files and game backups from hardware you own. No ROMs or BIOS links are provided here.

## Conventions

- Commands assume `bash` / `zsh`.
- Linux instructions target Ubuntu 22.04+ (or any Debian/Ubuntu derivative). Steam Deck is SteamOS 3 (Arch-based) — Flatpak paths apply.
- macOS assumes Apple Silicon or Intel; Homebrew where relevant.
- iOS assumes non-jailbroken sideloading via AltStore / SideStore unless otherwise noted.
