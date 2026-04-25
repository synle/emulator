# Arcade (MAME / FBNeo)

Arcade emulation is split across several frameworks that target different hardware and eras.

| Framework                      | Scope                                         | Best for                                 |
| ------------------------------ | --------------------------------------------- | ---------------------------------------- |
| **MAME**                       | ~40,000+ arcade + consumer machines           | Comprehensive; sometimes slower          |
| **FinalBurn Neo (FBNeo)**      | CPS1/2/3, Neo Geo, Cave, Konami, Sega, Taito… | Tight focus on popular 80s–90s 2D arcade |
| **Flycast (Naomi/Atomiswave)** | Sega arcade 2000s                             | See [dreamcast.md](dreamcast.md)         |
| **Model 2 Emulator**           | Sega Model 2 (Virtua Fighter 2, Daytona USA)  | Windows standalone                       |
| **Supermodel**                 | Sega Model 3 (Scud Race, Virtua Fighter 3)    | Windows/Linux                            |

## Prerequisites

### Firmware / BIOS

Arcade boards almost all have on-board BIOS firmware that must be loaded alongside the game ROMs.

- **Board BIOS** — ROM image of the chip on the arcade PCB. Lives in the same folder as game zips, usually named after the board.
- **ROM set version** — every ROM set is tied to a specific MAME release (e.g., MAME 0.265). A game zip from one version may fail hash checks in another.

| File                                        | For                              | Required?          |
| ------------------------------------------- | -------------------------------- | ------------------ |
| `neogeo.zip`                                | Neo Geo MVS/AES                  | Required           |
| `cps2_bios.zip` / `cps3_bios.zip`           | CPS2 / CPS3 (Street Fighter III) | Required           |
| `naomi.zip`, `awbios.zip`                   | Sega Naomi / Atomiswave          | Required for those |
| `decocass.zip`, `pgm.zip`, `skns.zip`, etc. | Board-specific                   | Required per board |

### System requirements

Arcade coverage spans 1975 to ~2010, so demands vary enormously. Pick the matching core.

**Desktop (Windows / macOS / Linux)**

- Old arcade (pre-1995, CPS1/2, Neo Geo, most shmups): any hardware.
- Modern 3D arcade (Naomi, Model 2, Model 3): modern i5 / Ryzen 5 + GTX 1060-class.

**Android**

- 2D arcade (CPS/Neo Geo/Cave/Taito): ✅ all of your devices handle full speed.
- Model 2 / Naomi: ⚠️ S24 Ultra / Z Fold 5 / Tab S9 Ultra can run most titles with Flycast for Naomi; Model 2/3 not supported on mobile.

**iOS / iPadOS**

- 2D arcade: ✅ **iPad Pro 12.9" M1** — trivial.
- Naomi on Flycast iOS: ✅ works at full speed.

**Handhelds (SteamOS / Windows handhelds)**

- ✅ **Steam Deck** — handles FBNeo, MAME, and Flycast/Naomi easily. Model 3 via Supermodel is tight at native res.
- ✅ **Legion Go** — Model 2/3 and heavy Naomi work well.

**Raspberry Pi**

- ✅ **Pi 3B+** — classic arcade golden age (CPS1, Neo Geo, Taito, Konami, most pre-1995) via FB Neo / MAME 2003-Plus. CPS3 + heavy Cave shmups marginal.
- ✅ **Pi 4** — above plus MAME Current, CPS3, Cave. Light Naomi / Atomiswave via Flycast; Model 2/3 not supported.
- ✅ **Pi 5** — above plus most Naomi. Model 2/3 still a no-go.
- See [arcade-retro.md](../arcade-retro.md) — the Pi was practically designed for arcade emulation.

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
