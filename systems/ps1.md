# Sony PlayStation 1 (PSX)

- Released: 1994
- Disc formats: `.cue`+`.bin`, `.chd` (preferred — compressed, multi-track), `.pbp` (PSP EBOOT), `.ecm`
- BIOS required: **yes** — `scph5500.bin` (Japan), `scph5501.bin` (US), `scph5502.bin` (EU). Or `scph101.bin` (PSone, US, works regionless for most games)

## Prerequisites

### Firmware / BIOS

- **BIOS** — the PlayStation's boot ROM. **Required** for all cores. Region matters (US / EU / JP); DuckStation autodetects and picks the right one.

| File           | Region                                      | Required?                              |
| -------------- | ------------------------------------------- | -------------------------------------- |
| `scph5500.bin` | Japan                                       | One of these matching your disc region |
| `scph5501.bin` | US                                          | —                                      |
| `scph5502.bin` | EU                                          | —                                      |
| `scph101.bin`  | PSone (US, works regionless for most games) | Alternative                            |

Legal source: dumped from your own PS1/PS2 using a softmod + tool like PS2 BIOS Dumper.

### System requirements

**Desktop (Windows / macOS / Linux)**

- Minimum: 2010-era dual-core + integrated GPU, 4 GB RAM.
- Recommended: any modern CPU + any discrete GPU for 8× upscaling + PGXP.

**Android**

- Minimum: Snapdragon 665 / Dimensity 700, 4 GB RAM.
- ✅ **S24 Ultra / Z Fold 5 / Tab S9 Ultra** — DuckStation at 8× + PGXP is buttery.

**iOS / iPadOS**

- Minimum: A11 Bionic.
- ✅ **iPad Pro 12.9" M1** — effortless at 8× upscale with PGXP.

**Handhelds (SteamOS / Windows handhelds)**

- ✅ **Steam Deck** — DuckStation at 4–8× upscale + PGXP is flawless.
- ✅ **Legion Go** — same, with headroom for high-res shaders.

## Recommended emulators

| Emulator        | Type                         | Notes                                                  |
| --------------- | ---------------------------- | ------------------------------------------------------ |
| **DuckStation** | libretro core + standalone   | Best overall — fast, accurate, great upscaling         |
| Beetle PSX HW   | libretro core                | Accurate; Vulkan/HW rendering                          |
| PCSX-ReARMed    | libretro core                | Fastest on weak ARM hardware                           |
| SwanStation     | libretro fork of DuckStation | In RetroArch when DuckStation upstream core is missing |

Default: **DuckStation** (standalone on desktop, Beetle PSX HW on Android).

## Per-platform install

### Android

- RetroArch → Core Downloader → **PCSX-ReARMed** (fast) or **SwanStation** (accurate).
- Standalone: **DuckStation** on Play Store (free).

### iOS

- RetroArch → PCSX-ReARMed / SwanStation.
- **Provenance** supports PS1.
- **Delta** — PS1 support added 2024.

### macOS

- **DuckStation**: download Universal `.dmg` from https://www.duckstation.org.
- `brew install --cask duckstation`.
- OpenEmu.

### Windows

- **DuckStation**: https://www.duckstation.org → installer or portable.
- `winget install stenzek.DuckStation`.

### Linux (Ubuntu)

```bash
# DuckStation Flatpak (recommended)
flatpak install flathub org.duckstation.DuckStation

# libretro cores in apt
sudo apt install retroarch libretro-pcsx-rearmed libretro-beetle-psx
```

## Per-frontend setup

### RetroArch

1. Core: **SwanStation** or **Beetle PSX HW**.
2. BIOS in `system/`: `scph5500.bin`, `scph5501.bin`, `scph5502.bin`.
3. Load `.cue` files (not `.bin`) to get correct track layout. `.chd` is simplest.
4. Resolution: `Options → Internal GPU Resolution → 4×–8×`.

### EmuDeck

- Default: **DuckStation standalone** (preferred) + SwanStation libretro as fallback.
- BIOS: `~/Emulation/bios/scph5500.bin`, `scph5501.bin`, `scph5502.bin`.
- ROM folder: `~/Emulation/roms/psx/`.
- Memory cards: `~/Emulation/saves/duckstation/memcards/`.

### RetroDeck

- Default: **DuckStation** (bundled) + SwanStation in RetroArch.
- BIOS: `~/retrodeck/bios/` (same filenames).
- ROM folder: `~/retrodeck/roms/psx/`.

## Settings worth tweaking (DuckStation)

- **GPU Renderer**: Vulkan (Linux/Android), Metal (macOS), D3D12 (Windows).
- **Internal Resolution Scale**: 4× (native 720p→2880×2160). Above 4× needs a decent GPU.
- **PGXP (Precision Geometry Transform Pipeline)**: **On** — fixes the famous PS1 polygon jitter.
- **PGXP CPU Mode**: On for additional stability, slight perf cost.
- **Texture Filtering**: xBR or JINC2 for 2D-heavy games.
- **CD-ROM Read-Ahead Sectors**: 8 to hide disc-swap load stutter.

## ROM format tips

- Convert `.bin`/`.cue` → `.chd` with `chdman createcd -i game.cue -o game.chd`. Saves 40–60% space, fully supported by DuckStation, Beetle, PCSX.
- `.pbp` (PSP eboot format): supported by DuckStation and PCSX-ReARMed.
- Multi-disc games: use a `.m3u` playlist file referencing each disc; RetroArch and DuckStation both support disc switching.

## Tips

- **PGXP makes a huge visual difference** — enable it and forget about the old wobbly polygon issue.
- Memory cards are per-game by default in DuckStation — avoids Final Fantasy saves clashing.
- Light gun games (Time Crisis): DuckStation supports mouse as Guncon; some controllers expose absolute pointer input too.
