# Arcade (MAME / FBNeo)

Arcade emulation is split across several frameworks that target different hardware and eras.

| Framework | Scope | Best for |
|---|---|---|
| **MAME** | ~40,000+ arcade + consumer machines | Comprehensive; sometimes slower |
| **FinalBurn Neo (FBNeo)** | CPS1/2/3, Neo Geo, Cave, Konami, Sega, Taito… | Tight focus on popular 80s–90s 2D arcade |
| **Flycast (Naomi/Atomiswave)** | Sega arcade 2000s | See [dreamcast.md](dreamcast.md) |
| **Model 2 Emulator** | Sega Model 2 (Virtua Fighter 2, Daytona USA) | Windows standalone |
| **Supermodel** | Sega Model 3 (Scud Race, Virtua Fighter 3) | Windows/Linux |

## ROM sets

Arcade ROMs are **versioned sets** tied to a specific MAME/FBNeo release. Your ROM set version **must match** the emulator's version or games will refuse to boot with "ROM hashes invalid."

- MAME — check "MAME 0.XXX" matches your ROM set version (e.g., MAME 0.265 → needs 0.265 ROMs).
- FBNeo — more flexible, less version-locked.

## BIOS

Arcade games frequently need per-board BIOS (Neo Geo `neogeo.zip`, Naomi `naomi.zip`, CPS2 `cps2_bios.zip` etc.). Place these in the ROM folder alongside game zips.

## Per-platform install

### Android

- RetroArch → Core Downloader → **FB Neo** (recommended), **MAME 2003-Plus** (lighter), **MAME Current**.
- Standalone: **MAME4droid Reloaded** (Play Store).

### iOS

- RetroArch sideload + FB Neo / MAME core.
- Standalone: **MAME4iOS** (sideload).
- **Provenance** includes an arcade core.

### macOS

- RetroArch + FB Neo.
- `brew install mame` for CLI MAME.

### Windows

- RetroArch + cores.
- **MAME official**: https://www.mamedev.org — zip archive + QMC2 frontend.
- **Model 2 Emulator**: https://github.com/y36ytz/Model2-Emulator-x64.
- **Supermodel**: https://www.supermodel3.com.

### Linux (Ubuntu)

```bash
sudo apt install retroarch libretro-fbneo libretro-mame libretro-mame2003-plus mame
```

## Per-frontend setup

### RetroArch

1. Core: **FB Neo** for CPS/Neo Geo/Cave; **MAME Current** for everything else.
2. ROM set: keep **matching** version — scan your set against the DAT file.
3. `Load Content` → `.zip` (keep zipped; do not extract).
4. FBNeo samples / sample packs: drop in `system/fbneo/samples/`.
5. Neo Geo BIOS `neogeo.zip` in your ROM folder.

### EmuDeck

- ROM folders:
  - `~/Emulation/roms/arcade/` — general MAME
  - `~/Emulation/roms/fbneo/` — FBNeo only
  - `~/Emulation/roms/neogeo/` — see [neogeo.md](neogeo.md)
- Steam ROM Manager parses `arcade/` with a DAT file for nice names.

### RetroDeck

- ROM folders: `~/retrodeck/roms/arcade/`, `~/retrodeck/roms/mame/`, `~/retrodeck/roms/neogeo/`.

## Version matching & "merged" vs "non-merged" sets

- **Non-merged set**: each game's zip contains everything it needs. Simpler, bigger.
- **Split set**: clones reference parent ROMs; smaller but fragile.
- **Merged set**: parent + all clones in one zip. Compact but hard to share.

For emulation, **non-merged** is easiest. Use `clrmamepro` or `RomVault` to rebuild your set against the DAT file.

## Tips

- Use the **right core per title**:
  - Capcom CPS1/2/3 → FBNeo
  - Neo Geo → FBNeo or MAME
  - Cave shmups → FBNeo
  - Pinball / pre-80s → MAME
  - Model 2/3 → Dedicated emulators, not MAME
- **Vertical shmups**: RetroArch can rotate video 90° via Quick Menu → Video → Rotation; pair with TATE mode if you have a rotating monitor.
- Controls: arcade games often want 6 face buttons (fighting games). Configure per-core mapping to match the cabinet.
