# RetroAchievements

Community achievement service for retro games. Think Xbox / PlayStation Trophies, but for every emulated system — NES through PS2, with thousands of titles curated by the community.

- Official site: https://retroachievements.org/

## What you get

- Earn achievements while playing games you already own, via supported emulators.
- Leaderboards per game.
- Progression tracking across your library.
- Points / badges / profile — same vibe as Steam achievements.

## Supported emulators

RetroAchievements works by running a thin client inside the emulator that monitors memory. Not every emulator supports it; the ones that do:

- **RetroArch** (most cores) — hands down the best RA experience.
- **DuckStation** (PS1) — first-class.
- **PCSX2** (PS2) — since 1.7.x.
- **Dolphin** (GameCube / Wii) — since 2024.
- **PPSSPP** (PSP) — first-class.
- **Bizhawk, Mesen, melonDS, RALibretro, Mednafen** — first-class.
- **Azahar / Lime3DS** (3DS) — most forks support it.

Not supported: Cemu, RPCS3, Vita3K, most Switch forks (yet).

## Setup

1. Create a free account at https://retroachievements.org/.
2. In your emulator, enable RetroAchievements in settings:
   - **RetroArch**: `Settings → Achievements → Enable Achievements → On` + enter your username / token.
   - **DuckStation / PCSX2 / Dolphin / PPSSPP**: each has an **Achievements** tab in their settings panel.
3. Enable **Hardcore mode** if you want — disables save states and fast-forward for that purist challenge. Achievements earned in Hardcore mode are worth more points.

## Using it with this repo

- **EmuDeck / RetroDeck**: both include supported emulators preconfigured. Enable RA in each emulator's own settings.
- **Mobile**: RetroArch Android / iOS support RA. Sign in once, earn across devices.
- Multi-device: RA tracks by account, not device, so progress syncs across your S24 Ultra, iPad Pro, Steam Deck, etc. **This is worth noting**: RetroAchievements does a form of progress sync that's complementary to save-file sync via [Syncthing](syncthing.md) — you get credit for beating a game even if the save itself doesn't replicate.

## Tips

- **Hashed ROM matching**: RA identifies games by hash. If your ROM is patched, trimmed, or intro-stripped, it won't match. Use unmodified No-Intro / Redump dumps.
- **Softcore vs Hardcore**:
  - Softcore (default): save states and fast-forward allowed. Easy mode.
  - Hardcore: real hardware rules. Worth 2× points.
- Many games have **Rich Presence** — your profile shows which level/area you're in, not just "Playing Super Mario Bros."
- Custom **Leaderboards** per game are maintained by community devs.

## Pros / cons

| Pros                                                | Cons                                       |
| --------------------------------------------------- | ------------------------------------------ |
| Adds structure + goals to retro gaming              | Not every emulator supports it             |
| Cross-device progress (RA server does the tracking) | Hashed ROM requirement (no patched ROMs)   |
| Huge catalog — 7,000+ games covered                 | Adds a tiny perf overhead to the emulator  |
| Completely free                                     | Not supported on Switch / PS3 / Vita (yet) |

## See also

- [RetroArch](../retroarch.md) — best RA integration
- [Syncthing](syncthing.md) — for save-file sync; complementary to RA progress tracking
