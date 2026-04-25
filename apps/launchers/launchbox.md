# LaunchBox / BigBox

Windows-native library frontend, commercial. **LaunchBox** is the desktop app; **BigBox** is its controller-optimized fullscreen companion. Both in one purchase.

- Official site: https://www.launchbox-app.com/
- Free tier: LaunchBox desktop is free with a starter feature set; BigBox + premium themes require a paid license.

## Platforms

- Windows 10 / 11 (native).
- **Android**: LaunchBox for Android is a separate paid app; fewer features than desktop.
- macOS / Linux: a Flatpak is available but Wine-based — functional, not ideal.

## Pricing (as of 2026)

- Free: LaunchBox core features.
- Premium: ~$40 one-time or ~$20/year. Unlocks BigBox, all themes, plugin access, and support.

If budget matters and you're on Windows, try free LaunchBox first and see if you need BigBox for the controller UI before paying.

## Install

```powershell
winget install UnbrokenSoftware.LaunchBox
```

Or download the installer from https://www.launchbox-app.com/. Sign into your premium account inside LaunchBox to unlock BigBox.

## Setup

LaunchBox has the most polished onboarding of any launcher here.

1. **First run**: choose a library location (anywhere you want).
2. **Tools → Import → ROM Files**: point at a ROM folder, pick the system, LaunchBox scans + scrapes automatically via ScreenScraper or GamesDB.
3. **Emulators**: Tools → Manage → Emulators. Pre-filled with defaults for RetroArch, Dolphin, PCSX2, DuckStation, Cemu, RPCS3, Ryujinx, and more.
4. **Media**: backgrounds, marquees, boxart, 3D box models, and video snaps download automatically.

## BigBox mode

Launch **BigBox.exe** (installed alongside LaunchBox) for the fullscreen, 10-foot UI. Controller-driven. Huge theme selection — some official, hundreds community.

Set BigBox as Windows startup app if you want an HTPC dedicated to emulation.

## Plugins

Premium tier unlocks a plugin architecture. Popular plugins:

- **Steam Importer** — adds your Steam library alongside emulated games.
- **Retroachievements** — track achievements in-UI.
- **PlayNext Shuffler** — random game picker for decision paralysis.
- **Auto Image Downloader** — pulls missing cover art on demand.

## Pairing with this repo

- **With EmuDeck on Windows**: EmuDeck still runs Steam ROM Manager if you want Steam tiles. LaunchBox is an alternative to that — pick one.
- **Stream BigBox via Sunshine/Moonlight**: perfect HTPC-style remote couch arcade. Set BigBox as Sunshine's default app.
- Doesn't compete with Playnite — both do the same job; preference matters:
  - **Playnite**: open-source, free, modder-friendly, modern UI.
  - **LaunchBox/BigBox**: more polished out of the box, huge community themes, commercial support.

## Pros / cons

| Pros                                                       | Cons                                           |
| ---------------------------------------------------------- | ---------------------------------------------- |
| Best out-of-the-box experience on Windows                  | Paid for the good stuff (BigBox + themes)      |
| Outstanding theme + media ecosystem                        | Windows-centric; Linux/macOS are afterthoughts |
| Combines Steam, Epic, GOG, and emulated games in one place | Data lock-in — harder to migrate away from     |
| BigBox is the best controller UI on Windows                | Heavier RAM footprint than Pegasus/ES-DE       |

## See also

- [Playnite](playnite.md) — free open-source alternative
- [Pegasus Frontend](pegasus.md) — lighter, themeable, cross-platform
- [ES-DE](es-de.md) — cross-platform including Steam Deck
