# Sega Master System & Game Gear

- Released: 1985 (SMS) / 1990 (GG)
- ROM extensions: `.sms`, `.gg`
- BIOS required: **no** (Master System BIOS `bios.sms` optional for a few unlicensed titles)

## Recommended emulators

| Emulator | Type | Notes |
|---|---|---|
| **Genesis Plus GX** | libretro core + standalone | Best SMS/GG compatibility; also does Genesis |
| **PicoDrive** | libretro core | Fast, for low-end ARM |

Default pick: **Genesis Plus GX**.

## Per-platform install

### Android

- RetroArch → Core Downloader → **Genesis Plus GX** or **PicoDrive**.
- ROM folder: `Internal Storage/RetroArch/downloads/`.

### iOS

- RetroArch (sideload) → Genesis Plus GX.
- **Provenance**.

### macOS

- `brew install --cask openemu` (OpenEmu wraps Genesis Plus GX).
- Or RetroArch + core.

### Windows

- RetroArch + Genesis Plus GX.

### Linux (Ubuntu)

```bash
sudo apt install retroarch libretro-genesis-plus-gx libretro-picodrive
```

## Per-frontend setup

### RetroArch

1. Core: **Genesis Plus GX**.
2. `Options → System Region → Auto / US / EU / JP` — switches 60Hz vs 50Hz.
3. Shader: `handheld/lcd-grid` for GG's LCD look.

### EmuDeck

- Default: RetroArch + Genesis Plus GX.
- ROM folder: `~/Emulation/roms/mastersystem/` and `~/Emulation/roms/gamegear/`.

### RetroDeck

- Same core.
- ROM folder: `~/retrodeck/roms/mastersystem/` and `~/retrodeck/roms/gamegear/`.

## Tips

- Game Gear has a notoriously dim/washed-out screen in real life — the LCD shader replicates this, but you can also enable color correction in Genesis Plus GX options.
- Master System 3D glasses games: not emulated.
- SG-1000 (Sega's pre-SMS console) also runs in Genesis Plus GX.
