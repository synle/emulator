# Neo Geo (AES / MVS / CD)

- Released: 1990
- ROM extensions: `.zip` (arcade sets), `.bin`+`.cue` or `.chd` (Neo Geo CD)
- BIOS required:
  - AES/MVS: **yes** — `neogeo.zip` (universe BIOS or stock BIOS)
  - Neo Geo CD: **yes** — `neocd.bin`, `neocd_f.bin`, `neocd_z.bin`

## Prerequisites

### Firmware / BIOS

- **Neo Geo BIOS** (`neogeo.zip`) — **required**. Arcade Neo Geo boards always load from an on-board BIOS chip. Every game needs this file next to the ROM.
- **UniBIOS** — a community replacement BIOS that lets you switch region, difficulty, and AES/MVS mode from an in-game menu. Drop into `neogeo.zip` in place of the stock BIOS.
- **Neo Geo CD BIOS** — separate; required for CD discs.

| File                                      | For                       | Required?  |
| ----------------------------------------- | ------------------------- | ---------- |
| `neogeo.zip`                              | AES / MVS cartridge games | Yes        |
| `neocd.bin`, `neocd_f.bin`, `neocd_z.bin` | Neo Geo CD                | Yes for CD |

### System requirements

**Desktop (Windows / macOS / Linux)**

- Any hardware. 2 GB RAM.

**Android**

- ✅ **S24 Ultra / Z Fold 5 / Tab S9 Ultra** — trivial, including Neo Geo CD.

**iOS / iPadOS**

- ✅ **iPad Pro 12.9" M1** — trivial.

**Handhelds (SteamOS / Windows handhelds)**

- ✅ **Steam Deck** — trivial.
- ✅ **Legion Go** — trivial.

**Raspberry Pi**

- ✅ **Pi 3B+ / Pi 4 / Pi 5** — trivial for AES/MVS cartridges and Neo Geo CD. Drop `neogeo.zip` (UniBIOS is recommended) alongside ROMs; CD BIOS in `/userdata/bios/`.
- See [arcade-retro.md](../arcade-retro.md) for the full Pi build guide.

## Recommended emulators

| Emulator   | Type                       | Notes                                         |
| ---------- | -------------------------- | --------------------------------------------- |
| **FB Neo** | libretro core              | Best for Neo Geo AES/MVS                      |
| **MAME**   | libretro core + standalone | Also works; slightly heavier                  |
| **NeoCD**  | libretro core              | Dedicated Neo Geo CD core (fork of NeoCD/SDL) |

## Per-platform install

See [arcade.md](arcade.md#per-platform-install) — same tools.

## Per-frontend setup

### RetroArch

1. AES/MVS: Core **FB Neo** (preferred) or **MAME**. ROM zip lives alongside `neogeo.zip` in the same folder.
2. Neo Geo CD: Core **NeoCD**. CD images in `.chd` recommended. BIOS goes in `system/neocd/`.

### EmuDeck

- AES/MVS ROM folder: `~/Emulation/roms/neogeo/`
- Neo Geo CD ROM folder: `~/Emulation/roms/neogeocd/`
- BIOS: `~/Emulation/bios/neogeo.zip`, `~/Emulation/bios/neocd/`

### RetroDeck

- AES/MVS ROM folder: `~/retrodeck/roms/neogeo/`
- Neo Geo CD ROM folder: `~/retrodeck/roms/neogeocd/`
- BIOS: `~/retrodeck/bios/`

## Tips

- **UniBIOS**: a community BIOS that unlocks region select, difficulty, free play, and AES/MVS mode switching. Drop in `neogeo.zip` as the BIOS. Not required but very handy.
- Metal Slug games: 8MB-cart versions exist — make sure your ROM set is the full dump.
- Neo Geo CD is much more demanding than cart Neo Geo due to CD audio streaming; most modern hardware handles it easily.
- Neo Geo Pocket Color is a completely different console — use the **Beetle NeoPop** core in RetroArch; BIOS optional.
