# Nintendo Wii U

- Released: 2012
- Game formats: `.wud`, `.wux`, or **loadable folders** containing `code/`, `content/`, `meta/` (exported with DumpMii or via `.rpx` files)
- BIOS required: **no**, but system keys (`keys.txt`) recommended for some titles; online features need MLC dump

## Prerequisites

### Firmware / BIOS

- **Keys** — Wii U titles are encrypted; Cemu needs your console's keys (`keys.txt`) dumped from your own Wii U via dumpling/CFW.
- **MLC dump** — optional; the Wii U's internal flash memory. Dumping it unlocks system apps (Friend List, Mii Maker), online features, and makes some games more compatible.

| File       | For                         | Required?                         |
| ---------- | --------------------------- | --------------------------------- |
| `keys.txt` | Cemu decryption             | Required for most encrypted dumps |
| MLC01 dump | System apps / eShop content | Optional                          |

### System requirements

**Desktop (Windows / macOS / Linux)**

- Minimum: Intel i5 6th gen / Ryzen 5 1600, GTX 1060 / RX 580, 8 GB RAM, Vulkan 1.2+.
- Recommended: Ryzen 5 5600 / i5 12400 + RTX 3060 / RX 6600 XT for 4K via graphic packs.
- Apple Silicon: M1 Pro and up — Cemu performs surprisingly well on M-series Macs.

**Android**

- ❌ **Not officially supported.** Community Cemu Android forks exist but are experimental.

**iOS / iPadOS**

- ❌ **Not supported.**

**Handhelds (SteamOS / Windows handhelds)**

- ⚠️ **Steam Deck** — many games playable with the FPS++ graphic pack (BOTW, MK8, Wind Waker HD); others hitch badly. Use native res.
- ✅ **Legion Go** — comfortably handles the Cemu library at 1080p with FPS++.

**Raspberry Pi**

- ❌ **Pi 3B+ / Pi 4 / Pi 5** — Cemu is x86-64-only and GPU-bound. No ARM port exists. Not a realistic target.
- See [arcade-retro.md](../arcade-retro.md) for Pi-realistic targets.

## Recommended emulator

**Cemu** — formerly Windows-only, now cross-platform since Cemu 2.x went open-source.

- Official site: https://cemu.info
- GitHub: https://github.com/cemu-project/Cemu

There is no libretro core for Cemu. **Cemu is standalone only.**

## Per-platform install

### Android

- **Not officially supported.**
- Community forks exist (CemuAndroid) but are experimental and crash-prone. Revisit in future.

### iOS

- **Not supported.**

### macOS

- Download `.dmg` for Apple Silicon from https://cemu.info/download.
- `brew install --cask cemu` also works.
- Metal backend; Apple Silicon handles most Wii U games at playable speed.

### Windows

- Download installer or portable ZIP from https://cemu.info.
- `winget install Cemu.Cemu`.
- Requires Vulkan-capable GPU (preferred) or DX12.

### Linux (Ubuntu)

```bash
# Flatpak (recommended)
flatpak install flathub info.cemu.Cemu

# AppImage alternative
wget https://github.com/cemu-project/Cemu/releases/latest/download/Cemu.AppImage
chmod +x Cemu.AppImage
./Cemu.AppImage
```

## Per-frontend setup

### RetroArch

Not applicable. No Wii U core.

### EmuDeck

- Installs **Cemu** (native Linux/Windows/macOS; Flatpak on Linux).
- ROM folder: `~/Emulation/roms/wiiu/` — subfolders per game or `.wua` files.
- EmuDeck applies optimized GPU buffer cache location and default controller profile.
- Steam ROM Manager parser: **Cemu** — adds Wii U games directly to Steam.

### RetroDeck

- Bundled **Cemu** (Flatpak-in-Flatpak approach).
- ROM folder: `~/retrodeck/roms/wiiu/`
- Saves: inside the sandbox at `~/.var/app/net.retrodeck.retrodeck/data/cemu/mlc01/`.

## Recommended Cemu settings

- `Options → GPU buffer cache accuracy → Medium` (balanced), High for perfectionists.
- `Graphics Packs` — download via **Options → Graphic packs → Download latest community graphic packs**. These unlock 60fps hacks, resolution scaling, FPS++ for BOTW/Wind Waker/Mario Kart 8.
- Controller: `Options → Input settings` → Gamepad = DRC emulated (touchscreen via mouse/touch). Controller Profile "DRC" for gamepad, "Pro" for Pro Controller.

## Game dump tips

- Use **Disc2App** or **dumpling** homebrew to rip your own games to the Cemu loadable format.
- Single-file `.wua` archives (Wii U Archive) are preferred — Cemu supports them natively.
- Online Play: requires dumping your console's account keys. See Cemu wiki.

## Tips

- BOTW runs better on Cemu than Switch emulators for many GPUs — enable FPS++ graphic pack for 60fps.
- `Options → Graphics Packs → <game> → Resolution` for 4K. Watch VRAM — some games balloon.
- Save folder location: Cemu's portable mode keeps saves in the install directory; non-portable uses `~/.local/share/Cemu/` on Linux.
