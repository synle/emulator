# Nintendo Wii U

- Released: 2012
- Game formats: `.wud`, `.wux`, or **loadable folders** containing `code/`, `content/`, `meta/` (exported with DumpMii or via `.rpx` files)
- BIOS required: **no**, but system keys (`keys.txt`) recommended for some titles; online features need MLC dump

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
