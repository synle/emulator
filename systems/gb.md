# Game Boy / Game Boy Color

- Released: 1989 (GB) / 1998 (GBC)
- ROM extensions: `.gb`, `.gbc`
- BIOS required: **optional** — `dmg_boot.bin`, `cgb_boot.bin` enable the startup chime/animation

## Recommended emulators

| Emulator | Type | Notes |
|---|---|---|
| **SameBoy** | libretro core + standalone | Most accurate; Pixel-Art GBC palette switcher |
| Gambatte | libretro core + standalone | Extremely accurate, older |
| mGBA | libretro core + standalone | Also plays GBA; see [gba.md](gba.md) |

Default pick: **SameBoy** or **mGBA** (unified with GBA).

## Per-platform install

### Android

- RetroArch → Core Downloader → **SameBoy** or **mGBA**.
- Standalone: **My OldBoy!** (paid, polished), **Pizza Boy GBC** (free tier).

### iOS

- **Delta** (App Store, free) — supports GB/GBC natively. No sideloading needed.
- RetroArch sideload with mGBA core.
- **Provenance**.

### macOS

- **OpenEmu** (Mac-native, wraps SameBoy/mGBA).
- **SameBoy.app**: https://sameboy.github.io — direct download.
- RetroArch.

### Windows

- RetroArch + SameBoy/mGBA.
- **SameBoy.exe**: https://sameboy.github.io — drop-in standalone.
- **mGBA**: https://mgba.io.

### Linux (Ubuntu)

```bash
sudo apt install retroarch libretro-sameboy libretro-mgba libretro-gambatte
flatpak install flathub io.mgba.mGBA
```

## Per-frontend setup

### RetroArch

1. Core: **SameBoy**. For Super Game Boy border + palette, use **bsnes** with an SGB BIOS and the `.gb` ROM.
2. `Quick Menu → Core Options → Color Palette` — pick GBC palettes for original GB games.
3. Shader: `lcd-grid` or `zfast_lcd` for authentic DMG look.

### EmuDeck

- Default core: **SameBoy** (or mGBA).
- ROM folder: `~/Emulation/roms/gb/` and `~/Emulation/roms/gbc/`.

### RetroDeck

- Default core: **SameBoy** or **mGBA**.
- ROM folder: `~/retrodeck/roms/gb/` and `~/retrodeck/roms/gbc/`.

## Tips

- Super Game Boy enhancements: load the `.gb` in **bsnes** inside RetroArch with the SGB BIOS (`sgb.boot.rom` + `sgb1.sfc`/`sgb2.sfc`) in `system/`.
- Game Boy Printer: mGBA and SameBoy both emulate it — capture screenshots mimicking the thermal printer output.
- Real-time clock games (Pokémon Gold/Silver/Crystal): all recommended cores handle RTC via save file metadata.
