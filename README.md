# Emulator Setup Guides

Documentation for setting up retro gaming emulation across platforms (Android, iOS, macOS, Windows, Linux/Ubuntu).

## Organization

Docs are grouped two ways so you can read either by **what tool you're installing** or by **what system you want to play**.

### By App (frontend / launcher)

| App | Platforms | Best for |
|---|---|---|
| [RetroArch](apps/retroarch.md) | All | Power users, per-core tuning, shader work, netplay |
| [EmuDeck](apps/emudeck.md) | Steam Deck, Linux, Windows, macOS | Fastest "everything works" setup |
| [RetroDeck](apps/retrodeck.md) | Linux / SteamOS (Flatpak) | Self-contained sandbox on Steam Deck / Linux |

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

## Legal note

This guide only covers software setup. You are responsible for providing legally-dumped BIOS files and game backups from hardware you own. No ROMs or BIOS links are provided here.

## Conventions

- Commands assume `bash` / `zsh`.
- Linux instructions target Ubuntu 22.04+ (or any Debian/Ubuntu derivative). Steam Deck is SteamOS 3 (Arch-based) — Flatpak paths apply.
- macOS assumes Apple Silicon or Intel; Homebrew where relevant.
- iOS assumes non-jailbroken sideloading via AltStore / SideStore unless otherwise noted.
