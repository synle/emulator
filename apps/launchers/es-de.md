# ES-DE (EmulationStation Desktop Edition)

Cross-platform library frontend — fork of the original EmulationStation, reworked for desktop-class use. **Bundled inside [EmuDeck](../emudeck.md) and [RetroDeck](../retrodeck.md) — so if you use either of those, you already have ES-DE.**

- Official site: https://es-de.org/
- User guide: https://es-de.org/docs/

## Platforms

- Windows, macOS (Apple Silicon + Intel), Linux, Android.
- No iOS.

## Install

### Windows / macOS

Download the installer from https://es-de.org/download. ES-DE is paid on Windows / macOS (one-time ~$5 on official channels; Steam version ~$10). Free on Linux and as part of RetroDeck / EmuDeck.

```powershell
winget install ES-DE.EmulationStationDE
```

### Linux

```bash
# Flatpak
flatpak install flathub org.es_de.frontend

# AppImage from https://es-de.org/download is also available.
```

### Android

Free on F-Droid or from https://es-de.org/download. The Android build has fewer features than desktop (no shader preview, simpler theme engine) but the core library browser works.

### Steam Deck

Use the ES-DE bundled inside [EmuDeck](../emudeck.md) or [RetroDeck](../retrodeck.md) — both include it. No need to install separately.

## Setup

ES-DE's first-run wizard walks you through:

1. **Choose ROM directory** — default `~/ROMs` on Windows / Linux, `~/ROMs` on macOS. Use `~/Emulation/roms` if you want it alongside EmuDeck; `~/retrodeck/roms` for RetroDeck.
2. **Scan system folders** — ES-DE expects one subfolder per system (`nes/`, `snes/`, `n64/`, etc. — the naming follows its own conventions).
3. **Configure emulators** — ES-DE ships a giant JSON of known emulators + launch commands. Usually autodetects correctly if you've installed via EmuDeck or Flatpak.
4. **Download metadata + art** — via built-in scraper: **Main Menu → Scraper → Start**. Sources: ScreenScraper (best), TheGamesDB.

## Launching

- Desktop keyboard: arrows + Enter / Esc.
- Gamepad: D-pad + A / B.
- ES-DE dispatches to the correct emulator based on the game's system.

## Theming

ES-DE has a rich theme engine — hundreds of community themes, from 2D-flat to arcade-marquee to retro-CRT. **Main Menu → UI Settings → Theme**. Top choices:

- **Modern-DE** (default) — clean, neutral.
- **Art Book Next** — pixel-art encyclopedia vibe.
- **Canvas-DE** — customizable grid.
- **ComicBook-DE** — comic-panel presentation.

## Pairing with this repo

- **Already using EmuDeck**: ES-DE is installed. Launch via EmuDeck → ES-DE.
- **Already using RetroDeck**: launch the Flatpak; ES-DE is the built-in front door.
- **Standalone**: install per above, point ES-DE at your ROM directory. ES-DE will happily coexist with Steam ROM Manager — they don't conflict.

## Pros / cons

| Pros                                                        | Cons                                          |
| ----------------------------------------------------------- | --------------------------------------------- |
| Cross-platform (Windows, macOS, Linux, Android, Steam Deck) | Paid on Windows / macOS (free elsewhere)      |
| Bundled in EmuDeck + RetroDeck                              | Strict per-system folder naming               |
| Huge theme selection                                        | Desktop-only UX (no dedicated mobile UI flow) |
| Deep per-game launch customization                          | No cloud save / achievement integration       |

## See also

- [Pegasus Frontend](pegasus.md) — lighter cross-platform alternative
- [Playnite](playnite.md) — better pick on Windows if you want modern + retro mixed
- [EmuDeck](../emudeck.md) / [RetroDeck](../retrodeck.md) — both bundle ES-DE
