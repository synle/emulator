# Sega Dreamcast

- Released: 1998 (JP) / 1999 (NA)
- Disc formats: `.gdi`, `.cdi`, `.chd` (preferred)
- BIOS required: **yes** — `dc_boot.bin` (aka `dc_bios.bin`) and `dc_flash.bin`. Naomi/Atomiswave arcade variants need separate BIOSes.

## Recommended emulators

| Emulator | Type | Notes |
|---|---|---|
| **Flycast** | libretro core + standalone | Best general-purpose; Vulkan; widescreen |
| **Redream** | standalone | Clean GUI, per-game upscaling; paid for upscaling |
| **DEmul** | standalone (Windows) | Older, arcade-focused |

Default pick: **Flycast**.

## Per-platform install

### Android

- RetroArch → Core Downloader → **Flycast**.
- Standalone: **Redream** (free tier @ 480p, paid for HD), **Flycast** Android APK.

### iOS

- RetroArch + Flycast.
- **Provenance** supports Dreamcast.

### macOS

- **Redream**: https://redream.io — native Apple Silicon.
- RetroArch + Flycast.

### Windows

- **Flycast**: https://flycast-builds.emudev.org.
- **Redream**: https://redream.io.
- RetroArch + Flycast.

### Linux (Ubuntu)

```bash
flatpak install flathub org.flycast.Flycast
# or libretro core
sudo apt install retroarch libretro-flycast
```

## Per-frontend setup

### RetroArch

1. Core: **Flycast**.
2. BIOS in `system/dc/`: `dc_boot.bin`, `dc_flash.bin`.
3. `Options → Video → Resolution Multiplier → 2×–8×`.
4. Widescreen: `Options → Widescreen Mode → on` (works on most titles).

### EmuDeck

- Default: Flycast (libretro).
- BIOS: `~/Emulation/bios/dc/dc_boot.bin`, `dc_flash.bin`.
- ROM folder: `~/Emulation/roms/dreamcast/`.

### RetroDeck

- Default: Flycast.
- BIOS: `~/retrodeck/bios/dc/`.
- ROM folder: `~/retrodeck/roms/dreamcast/`.

## Tips

- `.chd` is the recommended format — convert `.gdi`/`.cdi` with `chdman createcd`.
- Internal resolution 4× = 1080p effective. Apple Silicon handles 8× (4K) easily.
- VMU (Visual Memory Unit): Flycast emulates the tiny LCD; Redream displays it as a window.
- Naomi/Atomiswave arcade games: use Flycast with separate arcade BIOSes (Naomi `naomi.zip`, Atomiswave `awbios.zip`).
- Light gun games (House of the Dead 2): Flycast supports mouse or absolute-pointer input.
