# Playnite

Open-source, Windows-native library frontend. Unifies Steam, Epic, GOG, emulators, and more into a single big-picture-friendly UI. **Best library frontend on Windows.**

- Official site: https://playnite.link/
- Add-on catalog: https://playnite.link/addons.html

## Platforms

- Windows 10 / 11 only (native .NET app).
- No macOS, Linux, or mobile builds. For Linux/SteamOS use [ES-DE](es-de.md) or [Pegasus](pegasus.md).

## Install

```powershell
winget install Playnite.Playnite
```

Or download the installer from https://playnite.link/download.html.

Optional: the separate **Fullscreen Mode** is controller-optimized for TV / couch play. Playnite ships both desktop and fullscreen UIs; switch via the top-right icon.

## Setup — emulators

Playnite has first-class emulator support via the **Generic Emulator Wrapper** extension plus ready-made profiles for all the common emulators.

1. **Main Menu → Library → Configure Emulators**.
2. Click **Add** and pick from the built-in list (RetroArch, Dolphin, PCSX2, DuckStation, PPSSPP, Cemu, RPCS3, …). Playnite fills in the default paths and command-line arguments automatically.
3. Set the emulator executable path (e.g., `C:\RetroArch-Win64\retroarch.exe`).
4. Define **Platforms** — Playnite uses its own platform IDs (e.g., `sony_playstation`, `nintendo_snes`) that match the metadata service.

## Setup — scan your ROM library

1. **Main Menu → Library → Add Games → Scan automatically using emulator**.
2. Pick an emulator and the ROM folder.
3. Playnite scans by filename + hash, scrapes IGDB / ScreenScraper for metadata + cover art + background images.
4. Each ROM becomes a library entry with box art, release year, genre, and a launch button that fires the correct emulator.

Repeat per system.

## Useful extensions

Browse via **Add-ons → Browse** or https://playnite.link/addons.html:

- **ScreenScraper metadata provider** — better box art than IGDB for retro consoles.
- **Emulator Collection** — pre-packaged configs for dozens of emulators.
- **GameActivity** — tracks time played per game.
- **Steam library importer** — integrates Steam Cloud saves side-by-side with emulated games.
- **RetroAchievements plugin** — show achievement progress per game.

## Pairing with this repo

- **Point Playnite at your existing EmuDeck `roms/` tree**: Library → Add → Scan each subfolder → Playnite picks the matching EmuDeck-installed emulator automatically.
- Use Playnite as an **alternative to Steam ROM Manager** if you don't want everything in Steam's tile grid. Playnite's metadata and UI are richer.
- Fullscreen Mode on an HTPC → plug in a controller → couch-ready library browser.

## Pros / cons

| Pros                                                  | Cons                                        |
| ----------------------------------------------------- | ------------------------------------------- |
| Best UI for mixed retro + modern libraries on Windows | Windows only                                |
| Open source, active community, rich plugin ecosystem  | Metadata scraping is per-source             |
| Theming via XAML                                      | No built-in streaming (combine w/ Sunshine) |
| Fullscreen Mode is TV-ready                           | More setup than ES-DE                       |

## See also

- [ES-DE](es-de.md) — cross-platform equivalent
- [LaunchBox / BigBox](launchbox.md) — commercial Windows competitor
- [Sunshine + Moonlight](../streaming/sunshine-moonlight.md) — stream Playnite to other devices
