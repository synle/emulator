# Neo Geo (AES / MVS / CD)

- Released: 1990
- ROM extensions: `.zip` (arcade sets), `.bin`+`.cue` or `.chd` (Neo Geo CD)
- BIOS required:
  - AES/MVS: **yes** — `neogeo.zip` (universe BIOS or stock BIOS)
  - Neo Geo CD: **yes** — `neocd.bin`, `neocd_f.bin`, `neocd_z.bin`

## Recommended emulators

| Emulator | Type | Notes |
|---|---|---|
| **FB Neo** | libretro core | Best for Neo Geo AES/MVS |
| **MAME** | libretro core + standalone | Also works; slightly heavier |
| **NeoCD** | libretro core | Dedicated Neo Geo CD core (fork of NeoCD/SDL) |

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
