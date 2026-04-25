# Sony PSP

- Released: 2004
- Game formats: `.iso`, `.cso` (compressed ISO, preferred), `.chd`, `.pbp` (EBOOT)
- BIOS required: **no**

## Prerequisites

### Firmware / BIOS

- **BIOS** — not required. PPSSPP includes a HLE (high-level emulation) implementation.

### System requirements

**Desktop (Windows / macOS / Linux)**

- Minimum: 2012-era dual-core + integrated GPU, 4 GB RAM.
- Recommended: any modern CPU + any discrete/integrated GPU for 4× upscale (1440p).

**Android**

- Minimum: Snapdragon 625 / MediaTek Helio P60, 3 GB RAM. Very forgiving.
- ✅ **S24 Ultra / Z Fold 5 / Tab S9 Ultra** — 5× upscale + Vulkan + texture filtering, pure smoothness. One of the best emulation experiences on mobile.

**iOS / iPadOS**

- Minimum: A10 Fusion.
- ✅ **iPad Pro 12.9" M1** — 5× upscale effortless.

**Handhelds (SteamOS / Windows handhelds)**

- ✅ **Steam Deck** — PPSSPP at 4× upscale + Vulkan is flawless.
- ✅ **Legion Go** — same, plenty of headroom.

## Recommended emulator

**PPSSPP** — definitive PSP emulator. Available as libretro core and standalone. Standalone is preferred — it's actively developed with per-game settings, widescreen hacks, and texture packs.

- Official site: https://ppsspp.org

## Per-platform install

### Android

- Play Store: **PPSSPP** (free) or **PPSSPP Gold** (paid, same features).
- Runs well on almost any phone from the last 5 years.

### iOS

- PPSSPP for iOS: officially available since 2024 after Apple policy change on App Store emulators. Search the App Store.
- Alternative: sideload via AltStore.

### macOS

- `brew install --cask ppsspp`.
- Or download `.dmg` from https://ppsspp.org/downloads.
- Apple Silicon native.

### Windows

- Download installer or portable from https://ppsspp.org/downloads.
- `winget install PPSSPP.PPSSPP`.

### Linux (Ubuntu)

```bash
sudo apt install ppsspp
# or
flatpak install flathub org.ppsspp.PPSSPP
```

## Per-frontend setup

### RetroArch

1. Core: **PPSSPP (libretro)**.
2. Load `.iso`, `.cso`, or `.pbp` directly.
3. Upscaling: `Options → Internal Resolution → 4×–5×`.
4. BIOS: none required.

### EmuDeck

- Default: **PPSSPP standalone** (feature-rich) + libretro core as backup.
- ROM folder: `~/Emulation/roms/psp/`.
- Memstick: `~/Emulation/saves/ppsspp/` (simulates PSP memory stick).

### RetroDeck

- Bundles **PPSSPP standalone**.
- ROM folder: `~/retrodeck/roms/psp/`.

## Settings worth tweaking

- **Graphics → Backend**: Vulkan (all platforms) > OpenGL.
- **Rendering Resolution**: 2× (720p), 3× (1080p), 4× (1440p), 5×+ (4K).
- **Texture filtering → Anisotropic**: 16×.
- **Texture scaling**: xBRZ 3×/4× for 2D UI.
- **Per-game settings**: right-click a game → Game Settings — override globals per title (e.g., enable a specific hack).

## ROM format

- Convert `.iso` → `.cso` with `maxcso`: shrinks by ~30% losslessly for most games.
- `.chd` also supported (PPSSPP 1.13+).

## Tips

- **Widescreen hacks**: built into PPSSPP per-game.
- **Custom textures**: drop high-res texture packs in `PSP/TEXTURES/<game-id>/`.
- **Adhoc multiplayer**: PPSSPP supports Ad Hoc Party / ZeroTier for Monster Hunter FU online parties.
- Control schemes: custom per-game touch layouts on mobile.
- **Savestates** work, but PSP games usually save in-game to a virtual memstick; prefer in-game saves.
