# Disc image tools — chdman, maxcso, CueTools

Utilities for converting between disc image formats (PS1 / PS2 / Saturn / Dreamcast / PSP / GameCube / Wii / Sega CD / Neo Geo CD / PC Engine CD). The key reason to care: **`.chd` and `.cso` save 30–60% disk space losslessly** and every modern emulator supports them.

## What each tool does

| Tool             | Input                         | Output                 | Use case                                                                      |
| ---------------- | ----------------------------- | ---------------------- | ----------------------------------------------------------------------------- |
| **chdman**       | `.cue`+`.bin`, `.gdi`, `.iso` | `.chd`                 | PS1, PS2, Saturn, Dreamcast, Sega CD, PC Engine CD… default compressed format |
| **maxcso**       | `.iso`                        | `.cso`                 | PSP + PS2 compressed images (lossy-ish, usually fine)                         |
| **CueTools**     | `.bin`+`.cue`                 | verified `.bin`+`.cue` | Fix cue sheet errors; verify against AccurateRip                              |
| **dolphin-tool** | `.iso`, `.gcm`                | `.rvz`                 | GameCube / Wii lossless compression                                           |
| **nsz / xcz**    | `.nsp`, `.xci`                | `.nsz`, `.xcz`         | Switch lossless compression                                                   |

## chdman (ships with MAME)

chdman is the most useful tool here. It's part of the MAME distribution — if you have MAME installed you already have `chdman`.

### Install

```bash
# macOS / Linux
brew install mame                # chdman lives under the mame-tools subpackage
sudo apt install mame-tools      # Ubuntu / Debian

# Windows
# Included in every MAME download from https://www.mamedev.org
```

### Convert

```bash
# PS1 / Sega CD / PC Engine CD (single-session CD)
chdman createcd -i game.cue -o game.chd

# PS2 (DVD) — faster flag variant
chdman createdvd -i game.iso -o game.chd

# GameCube / Wii / Saturn (use createcd or createraw as appropriate)
chdman createcd -i game.gdi -o game.chd

# Dump back out (verify or if an emulator doesn't support CHD)
chdman extractcd -i game.chd -o game.cue -ob game.bin
```

### Batch script (macOS / Linux)

```bash
# Convert every .cue in a folder to .chd
for f in *.cue; do
  chdman createcd -i "$f" -o "${f%.cue}.chd" && rm "$f" "${f%.cue}.bin"
done
```

## maxcso (PSP, PS2)

```bash
# Install
brew install maxcso                                           # macOS
sudo apt install maxcso                                       # Linux
# Windows: download from https://github.com/unknownbrackets/maxcso

# Convert
maxcso game.iso -o game.cso
```

`.cso` is PPSSPP's preferred PSP format and works in DuckStation / PCSX2 for PS1 / PS2 too, though `.chd` is better supported cross-emulator.

## dolphin-tool (GameCube / Wii)

Ships with Dolphin. Convert `.iso` → `.rvz` for ~30–50% lossless savings:

```bash
# via Dolphin GUI
Dolphin → Tools → Convert File → choose RVZ, level 5

# via CLI (Dolphin install directory)
dolphin-tool convert -f rvz -b 131072 -c zstd -l 5 -i game.iso -o game.rvz
```

## Recommended format per system

| System                              | Best format      | Why                                              |
| ----------------------------------- | ---------------- | ------------------------------------------------ |
| PS1 / PS2                           | `.chd`           | Native support across DuckStation, PCSX2, Beetle |
| Saturn / Dreamcast                  | `.chd`           | Same                                             |
| Sega CD / PC Engine CD / Neo Geo CD | `.chd`           | Same                                             |
| PSP                                 | `.cso` or `.chd` | Both supported; `.chd` newer but universal       |
| GameCube / Wii                      | `.rvz`           | Dolphin's lossless preferred format              |
| Switch                              | `.nsz` / `.xcz`  | For Switch emulator forks                        |
| N64 cartridges                      | `.z64`           | No compression; already tiny                     |
| Any cartridge                       | `.zip`           | Most emulators auto-unzip on load                |

## Pairing with this repo

- **After every new disc dump**: run it through chdman / dolphin-tool → put the compressed version in `~/Emulation/roms/<system>/` or `~/retrodeck/roms/<system>/`. Saves 30–60% disk immediately.
- **Before syncing ROMs via [rclone](rclone.md)**: compression is a huge bandwidth + storage win.
- **Steam Deck users**: SD card space is precious; `.chd` everywhere is a no-brainer.

## CueTools (verify ripped audio CDs)

Windows tool for checking CD-Audio tracks against the AccurateRip database. Useful if you ripped a game CD yourself and want to verify bit-exactness. https://github.com/gchudov/cuetools.net — Windows only, Mono elsewhere.

## See also

- [RomVault / clrmamepro](romvault.md) — verifies your set once you've compressed everything
- [EmuDeck](../emudeck.md) / [RetroDeck](../retrodeck.md) — both expect `.chd` happily
