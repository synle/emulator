# Game Boy Advance

- Released: 2001
- ROM extensions: `.gba`, `.zip` (bundled)
- BIOS required: **optional** but recommended — `gba_bios.bin` (SHA-1 `300c20df6731a33952ded8c436f7f186d25d3492`)

## Recommended emulators

| Emulator | Type | Notes |
|---|---|---|
| **mGBA** | libretro core + standalone | Default; excellent accuracy and feature set |
| VBA-M | libretro core + standalone | Older, still supported |
| NanoBoyAdvance | standalone | Cycle-accurate, slower |
| gpSP | libretro core | Fast, good for low-end ARM devices |

Default pick: **mGBA**.

## Per-platform install

### Android

- RetroArch → Core Downloader → **mGBA** (or **gpSP** for older phones).
- Standalone: **My Boy!** (paid, battery-optimized), **Pizza Boy GBA** (free).

### iOS

- **Delta** (App Store, free) — native GBA support.
- **GBA4iOS** archive (older).
- RetroArch + mGBA.

### macOS

- `brew install --cask mgba`.
- **OpenEmu**.
- RetroArch.

### Windows

- **mGBA**: https://mgba.io → download installer or portable.
- RetroArch + mGBA.

### Linux (Ubuntu)

```bash
sudo apt install retroarch libretro-mgba
flatpak install flathub io.mgba.mGBA
```

## Per-frontend setup

### RetroArch

1. Core: **mGBA**.
2. Place `gba_bios.bin` in `system/`.
3. `Quick Menu → Core Options → Use BIOS file if found` → enabled.
4. Shader: `handheld/gba-color.glslp` simulates GBA LCD colors.

### EmuDeck

- Default core: **mGBA**.
- BIOS: `~/Emulation/bios/gba_bios.bin`
- ROM folder: `~/Emulation/roms/gba/`.

### RetroDeck

- Default core: **mGBA**.
- BIOS: `~/retrodeck/bios/gba_bios.bin`
- ROM folder: `~/retrodeck/roms/gba/`.

## Tips

- GBA SP color palette is darker than GBA; use the `gba-color` shader or mGBA's internal palette emulation.
- Real-time clock (Pokémon Ruby/Sapphire/Emerald): handled via save metadata by all modern cores.
- GameShark/AR codes: mGBA has a built-in cheat engine — `Tools → Cheats`.
- Solar Sensor (Boktai): mGBA emulates via hotkeys.
- Tilt sensor (Yoshi's Universal Gravitation): mGBA maps to keyboard or controller gyro.
- Multiboot (GBA–GameCube link) is supported by mGBA in combination with Dolphin using `Link Port`.
