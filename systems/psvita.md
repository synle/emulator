# Sony PS Vita

- Released: 2011
- Game formats: decrypted game folder dumps (`.vpk` installer, then content under `ux0:app/<TITLE_ID>/`)
- BIOS required: **no** (Vita is key-based; dumped keys required in some cases)

## Recommended emulator

**Vita3K** — the only PS Vita emulator. Still labeled "experimental" but has grown quickly.

- Official site: https://vita3k.org
- Compatibility list: https://vita3k.org/compatibility.html

## Per-platform install

### Android

- **Vita3K Android** — official Android build available. Requires Snapdragon 8 Gen 1+, Vulkan 1.2+.
- GitHub releases.

### iOS

- **Not supported.**

### macOS

- Download `.dmg` from https://vita3k.org.
- Apple Silicon build. Performance OK on M1+ for 2D and lighter 3D titles.

### Windows

- Installer from https://vita3k.org.
- Vulkan 1.2+ GPU required.

### Linux (Ubuntu)

- AppImage from the official site:

```bash
wget https://github.com/Vita3K/Vita3K/releases/latest/download/Vita3K-linux.AppImage
chmod +x Vita3K-linux.AppImage
./Vita3K-linux.AppImage
```

## Per-frontend setup

### RetroArch

Not applicable.

### EmuDeck

- Installs Vita3K (if enabled in Custom Mode).
- ROM folder: `~/Emulation/roms/vita/` — drop `.vpk` files; Vita3K installs them into its internal `ux0:app/`.
- Expect bumpy compatibility — lean on the online compat list.

### RetroDeck

- Vita3K bundled depending on the release — check current RetroDeck notes.
- ROM folder: `~/retrodeck/roms/psvita/`.

## Install flow

1. First launch → configure `Emulated System Storage` (pref0/ur0/ux0 virtual paths).
2. Install **PS Vita firmware** via `File → Install Firmware` (download the PUP from Sony's official Vita update page).
3. Install games via `File → Install .vpk`.
4. Launch from the internal game list.

## Settings

- **Backend**: Vulkan (preferred). OpenGL as fallback.
- **Resolution multiplier**: 2× for 1080p.
- **Anisotropic**: 16×.
- **Shaders**: Async compilation reduces stutter.

## Tips

- Dumping your own Vita content requires a modded Vita and tools like VitaShell + NoNpDrm.
- Many PSN games rely on the Vita's PSP emulator (e.g., Persona 3 FES); those will **not** run in Vita3K — use PPSSPP instead.
- Save data lives inside Vita3K's simulated `ux0:user/00/savedata/`.
- The compatibility list is the single source of truth on what's playable — check before buying time on setup.
