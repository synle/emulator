# Sega Dreamcast

- Released: 1998 (JP) / 1999 (NA)
- Disc formats: `.gdi`, `.cdi`, `.chd` (preferred)
- BIOS required: **yes** — `dc_boot.bin` (aka `dc_bios.bin`) and `dc_flash.bin`. Naomi/Atomiswave arcade variants need separate BIOSes.

## Prerequisites

### Firmware / BIOS

- **BIOS** — the Dreamcast's boot ROM. **Required** for Flycast and most other emulators. Comes as two files: the boot ROM and the VMU flash chip.
- **Naomi / Atomiswave BIOS** — separate firmware files for the related arcade boards; needed only if you want to run Naomi/Atomiswave arcade games on Flycast.

| File | For | Required? |
|---|---|---|
| `dc_boot.bin` (a.k.a. `dc_bios.bin`) | Dreamcast boot | Yes |
| `dc_flash.bin` | Dreamcast VMU flash data | Yes |
| `naomi.zip` | Naomi arcade | Yes for Naomi |
| `awbios.zip` | Atomiswave arcade | Yes for Atomiswave |

### System requirements

**Desktop (Windows / macOS / Linux)**
- Minimum: 2010-era dual-core + integrated GPU, 4 GB RAM.
- Recommended: any modern CPU; internal res 4× on any discrete GPU.

**Android**
- Minimum: Snapdragon 660, 4 GB RAM.
- ✅ **S24 Ultra / Z Fold 5 / Tab S9 Ultra** — Flycast at 4× upscale + widescreen, no issues.

**iOS / iPadOS**
- ✅ **iPad Pro 12.9" M1** — 4× upscale effortless.

**Handhelds (SteamOS / Windows handhelds)**
- ✅ **Steam Deck** — Flycast at 4× upscale + widescreen is flawless.
- ✅ **Legion Go** — same, 6–8× upscale comfortable.

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
