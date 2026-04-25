# Sony PlayStation 2

- Released: 2000
- Disc formats: `.iso`, `.chd` (now supported by PCSX2), `.bin`+`.cue`, `.mdf`/`.mds`, `.zso`, `.cso`
- BIOS required: **yes** — `ps2-0230a-20080220.bin` or similar (dump from your own console)

## Recommended emulator

**PCSX2** — the only serious PS2 emulator. Available as libretro core (LRPS2) and standalone. **Always prefer standalone** — libretro lags upstream significantly.

- Official site: https://pcsx2.net
- Modern PCSX2 (since Qt UI / "Nightly" → now stable) is dramatically better than older 1.6.0 builds.

## Per-platform install

### Android

- **AetherSX2** — discontinued by the developer but still the best option, now forked as **NetherSX2**.
- Requires Snapdragon 855+ / Dimensity 1200+ for playable speed in most games.
- Source: GitHub community mirrors (be cautious of unofficial forks).

### iOS

- **Not supported** officially. Experimental builds exist but are unusable.

### macOS

- PCSX2 now supports Apple Silicon: download `.dmg` from https://pcsx2.net/downloads/.
- Minimum Apple M1; M2/M3 ideal.
- Metal renderer.

### Windows

- PCSX2 installer from https://pcsx2.net/downloads/.
- `winget install PCSX2.PCSX2`.
- Direct3D 12, Vulkan, or OpenGL backends.

### Linux (Ubuntu)

```bash
# Flatpak (current)
flatpak install flathub net.pcsx2.PCSX2

# AppImage also available on the official site.
```

## Per-frontend setup

### RetroArch

- Core: **LRPS2 / PCSX2** (libretro). Older and less compatible than standalone — use only if you insist.
- BIOS in `system/`.

### EmuDeck

- Installs **PCSX2 standalone**.
- BIOS: `~/Emulation/bios/` (PCSX2 BIOS files with the long filenames).
- ROM folder: `~/Emulation/roms/ps2/`.
- Memory cards: `~/Emulation/saves/pcsx2/memcards/`.
- Steam ROM Manager parser: PCSX2.

### RetroDeck

- Bundles PCSX2 standalone.
- BIOS: `~/retrodeck/bios/`.
- ROM folder: `~/retrodeck/roms/ps2/`.

## Settings worth tweaking (PCSX2 Qt)

- **Graphics → Renderer**: Vulkan (Linux), DX12 (Windows), Metal (macOS). Avoid software unless debugging.
- **Upscaling**: 2× (1440p), 3× (4K), 4× (overkill). Start at 2×.
- **Anisotropic Filtering**: 16×.
- **Texture Filtering**: Bilinear (PS2).
- **Blending Accuracy**: Basic (fast) → High (better water/shadows) → Full (slow, mostly unneeded).
- **Mipmapping**: Automatic.
- **Game Fixes → Enable automatic game fixes**: On.

## ROM format

- `.chd` is now first-class since PCSX2 1.7.x — convert `.iso` with `chdman createdvd -i game.iso -o game.chd`.
- `.zso` is a lossy-compressed PS2 format; supported but prefer `.chd`.

## Tips

- PCSX2 ships a large database of per-game patches — enable "Automatic Game Fixes" and let it handle quirks.
- Widescreen patches: bundled with modern PCSX2; enable under Game Properties.
- 60fps patches for games that ran at 30fps: available via the patches repo; apply per-game.
- Performance: Apple M1 Pro / Ryzen 5800H / i5-12400 and above handle almost all titles at 2× upscale.
