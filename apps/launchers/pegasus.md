# Pegasus Frontend

Lightweight, fast, heavily themeable cross-platform library frontend. Smaller feature surface than ES-DE or Playnite, but **snappier** and more customizable via JavaScript/QML themes.

- Official site: https://pegasus-frontend.org/
- Theme gallery: https://pegasus-frontend.org/themes/

## Platforms

- Windows, macOS, Linux, Android.
- No iOS.

## Install

### Windows

Download the ZIP from https://pegasus-frontend.org/download/ → extract anywhere (portable).

```powershell
winget install Pegasus.Frontend
```

### macOS

```bash
brew install --cask pegasus-frontend
```

Or download the DMG.

### Linux

```bash
# Flatpak
flatpak install flathub org.pegasus_frontend.Pegasus

# AppImage also available from the official site
```

### Android

Free APK from https://pegasus-frontend.org/download/. Controller-friendly UI out of the box.

## Setup

Pegasus uses per-collection metadata files (`metadata.pegasus.txt` or `metadata.txt`) inside each ROM folder. Two approaches:

1. **Auto-scan** — point Pegasus at your ROM root; it infers systems by folder name. Quick but shallow.
2. **Metadata files** — write a text file per collection describing games, cover art, and launch commands. Pegasus reads them on startup. Far richer.

Skeleton of a `metadata.pegasus.txt`:

```ini
collection: Super Nintendo
shortname: snes
extensions: sfc, smc
launch: retroarch -L {file.path} --config /path/to/retroarch.cfg
```

Per-game entry:

```ini
game: Super Mario World
file: Super Mario World (USA).sfc
developer: Nintendo
release: 1990-11-21
genre: Platformer
```

Third-party tools like **Skraper** (https://www.skraper.net/) auto-generate these from ScreenScraper.

## Themes

Pegasus's killer feature. Themes are full QML apps — smooth, animated, TV-ready. Popular picks:

- **Gametel-DE** — sharp, modern grid.
- **ES2 theme** — looks like classic EmulationStation.
- **Pegasus-theme-gameOS** — console-specific marquee theme.
- **Grid 2.0** — Netflix-style carousel.

Drop theme zips into `~/.config/pegasus-frontend/themes/` (Linux/Mac) or `%APPDATA%\pegasus-frontend\themes\` (Windows).

## Pairing with this repo

- Works alongside [EmuDeck](../emudeck.md) — point Pegasus at `~/Emulation/roms/`, use EmuDeck's emulators as launch targets.
- Works on Android on your S24 Ultra / Tab S9 Ultra as a polished library UI for the mobile [RetroArch](../retroarch.md) install.
- Lighter than [ES-DE](es-de.md) if you're on constrained hardware.

## Pros / cons

| Pros                             | Cons                                      |
| -------------------------------- | ----------------------------------------- |
| Fast, low RAM / CPU footprint    | No built-in scraper (use external tool)   |
| Excellent theming (animated QML) | Metadata-file approach is fiddly at scale |
| Cross-platform including Android | Smaller community than ES-DE              |
| Free and open-source everywhere  | No iOS                                    |

## See also

- [ES-DE](es-de.md) — heavier, more features, bundled in EmuDeck/RetroDeck
- [Playnite](playnite.md) — Windows-only, more polished
- [LaunchBox / BigBox](launchbox.md) — commercial Windows equivalent
