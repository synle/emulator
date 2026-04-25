# OpenEmu

Mac-native multi-system library and emulator frontend. Beautiful, simple, polished. **macOS only** — no other platform is even a goal.

- Official site: https://openemu.org/

## Platforms

- macOS 10.14.4 (Mojave) or later.
- Universal binary — Apple Silicon + Intel.
- **Not available** on iOS, Linux, Windows, or Android.

## What it does

Bundles libretro / Mednafen / Higan cores into a single `.app` with a Mac-native library UI (Cover Flow-style, iTunes lineage). You drop ROMs in, OpenEmu sorts them by system, scrapes art, and plays them. Zero setup.

**Systems supported (shortlist)**: NES, SNES, N64, GB/GBC, GBA, NDS, Genesis / Mega Drive, Saturn (experimental), Master System, Game Gear, PC Engine / TG-16, Neo Geo Pocket, Atari 2600/5200/7800/Lynx, PSX, PSP (via fork), Arcade (MAME).

**Systems not in OpenEmu**: GameCube, Wii, PS2, PS3, Wii U, Switch, 3DS — for those, you'll still install the standalone emulators from each system doc.

## Install

```bash
brew install --cask openemu
```

Or download the DMG from https://openemu.org → drag **OpenEmu.app** to `/Applications`.

If Gatekeeper blocks first launch, right-click the app → Open.

## Setup

Dead simple:

1. Launch OpenEmu.
2. Drag ROMs into the **Library** pane. OpenEmu detects the system and assigns the right core. Cover art scrapes automatically.
3. Plug in a controller → **Preferences → Controls → Auto-detect**. Works with MFi, DualSense, Xbox, Joy-Cons, and Pro Controller out of the box.

## Cores on Apple Silicon

All bundled cores are Apple Silicon native. On an M1 (let alone M2/M3/M4), everything in the supported-systems list runs at max upscale with room to spare.

## Pairing with this repo

- On a Mac, **OpenEmu handles 80% of retro systems beautifully** with zero config.
- For GameCube / Wii / PS2 / Switch etc., install the **standalone emulators** from the matching system doc ([gamecube.md](../../systems/gamecube.md), [ps2.md](../../systems/ps2.md), etc.). They run alongside OpenEmu fine.
- If you want a unified Mac setup, use [EmuDeck for macOS](../emudeck.md#macos) instead — it covers the systems OpenEmu doesn't, at the cost of a more complex setup.
- OpenEmu saves are at `~/Library/Application Support/OpenEmu/`. Back them up alongside your RetroArch config using the same [`retroarch-backup.sh`](../../scripts/retroarch-backup.sh) pattern adapted to OpenEmu's paths.

## Pros / cons

| Pros                                       | Cons                                                    |
| ------------------------------------------ | ------------------------------------------------------- |
| Best macOS-native UI; iTunes-style library | macOS only                                              |
| Zero-setup: drag ROMs in, they work        | No GameCube / Wii / PS2 / PS3 / Switch support          |
| Controller auto-config handles modern pads | Less configurable than RetroArch (limited core options) |
| Universal binary, Apple Silicon native     | Slower release cadence than upstream libretro cores     |

## See also

- [EmuDeck for macOS](../emudeck.md#macos) — covers systems OpenEmu doesn't
- [RetroArch for macOS](../retroarch.md#macos) — more configuration depth
