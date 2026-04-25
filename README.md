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

## Legal note

This guide only covers software setup. You are responsible for providing legally-dumped BIOS files and game backups from hardware you own. No ROMs or BIOS links are provided here.

## Conventions

- Commands assume `bash` / `zsh`.
- Linux instructions target Ubuntu 22.04+ (or any Debian/Ubuntu derivative). Steam Deck is SteamOS 3 (Arch-based) — Flatpak paths apply.
- macOS assumes Apple Silicon or Intel; Homebrew where relevant.
- iOS assumes non-jailbroken sideloading via AltStore / SideStore unless otherwise noted.
