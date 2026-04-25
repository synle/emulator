# RomVault / clrmamepro

ROM set verification and rebuilding tools. If you maintain an arcade set (MAME, FB Neo) or a No-Intro / Redump cartridge set, these are how you check that every file matches the official hashes and reorganize between merged / non-merged / split forms.

- **RomVault**: https://www.romvault.com/ (Windows, Linux via Mono, Mac via Mono)
- **clrmamepro**: https://mamedev.emulab.it/clrmamepro/ (Windows)

Both do the same job — RomVault has a nicer UI and better cross-platform story; clrmamepro is the older canonical choice and still works well.

## Why you'd use these

- You downloaded a ROM set and want to verify nothing is missing or corrupt.
- You have a MAME 0.262 set and want to rebuild it against a MAME 0.265 DAT so your emulator stops complaining about hash mismatches.
- You have a merged Neo Geo set and want to split it, or vice versa.
- You want a sparse "1G1R" (one game per region) set generated from a full No-Intro archive.

Unrelated to single-console cartridge emulators (NES/SNES/etc. work fine with lazy file management) — this is arcade / multi-ROM-set territory.

## Install

### RomVault

1. Download ZIP from https://www.romvault.com/download/.
2. Extract. `RomVault3.exe` runs on Windows directly. On Linux / macOS, install Mono (`brew install mono` / `sudo apt install mono-runtime`) and `mono RomVault3.exe`.

### clrmamepro

1. Download installer from https://mamedev.emulab.it/clrmamepro/.
2. Windows-only natively. Use under Wine / Crossover on Mac / Linux if needed.

## Basic workflow

Both tools follow the same pattern:

1. **Get the DAT file** — the hash manifest for your set:
   - MAME: https://www.mamedev.org → "ROM sets" → download `mame.dat` for your MAME version.
   - No-Intro (cartridges): https://datomatic.no-intro.org/ → register → download the DAT for your console.
   - Redump (discs): https://redump.org → per-system DATs.
2. **Load the DAT** into RomVault / clrmamepro.
3. **Point at your ROM folder** — "Scan ROMs".
4. Tool reports: ✅ valid, ❌ missing, 🔄 renamed-but-correct, 🗑️ unknown.
5. **Rebuild** → the tool moves / renames files to match the DAT exactly.

## RomVault specifics

RomVault introduced the concept of a **ToSort** folder: dump new or mystery ROMs there, point RomVault at it with a DAT loaded, and it auto-routes each file into the right set. Very handy when you have a mountain of loose `.zip` files.

## Pairing with this repo

- **Arcade ([arcade.md](../../systems/arcade.md)) and Neo Geo ([neogeo.md](../../systems/neogeo.md))**: run RomVault once to make sure your ROM set matches your libretro core's version. "Match" means SHA-1 of each file == DAT entry.
- **MAME / FBNeo version compatibility**: keep a DAT per MAME release. If you upgrade to a newer core, grab the newer DAT and re-verify.
- **Redump CHDs**: RomVault understands CHD (and `chdman` integration) so you can verify your PS1 / Saturn / Dreamcast CHD dumps against Redump hashes.

## Pros / cons

| Pros                                              | Cons                                    |
| ------------------------------------------------- | --------------------------------------- |
| The only robust way to verify large ROM sets      | Overkill for single-cartridge libraries |
| Rebuild between merged / non-merged / split forms | clrmamepro is Windows-only              |
| Handles CHD, `.zip`, nested archives              | Learning curve                          |
| RomVault runs cross-platform via Mono             | DATs change every MAME release          |

## See also

- [Arcade](../../systems/arcade.md) and [Neo Geo](../../systems/neogeo.md) — where ROM-set version matching matters
- [Disc tools](disc-tools.md) — chdman, maxcso, and other conversion utilities
