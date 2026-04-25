# Steam Remote Play / Steam Link

Free game streaming built into Steam. Works with any game you can launch from Steam — including emulators added as non-Steam shortcuts (which [EmuDeck](../emudeck.md) does for you automatically via Steam ROM Manager).

- Official page: https://store.steampowered.com/remoteplay

## What it is

Steam Remote Play streams any Steam-launched app from a host PC to a client. Steam Link is the client app, which runs on:

- Windows / macOS / Linux (via Steam client)
- Android, iOS, iPadOS
- Apple TV (tvOS)
- Smart TVs (Samsung Tizen, LG webOS)
- Raspberry Pi
- Steam Deck (client-to-other-host or host-to-other-client)

Any emulator that shows up in your Steam library can be streamed.

## Prerequisites

- **Steam client** on the host (any OS).
- Steam on both ends signed into the **same account**.
- Host and client on the same LAN (over-WAN is possible but needs port-forwarding or Tailscale).

## Install

### Host

Just install Steam: https://store.steampowered.com/about/. No extra software. Steam's built-in streaming server runs automatically when the host is online.

### Client

| Platform                 | Source                                           |
| ------------------------ | ------------------------------------------------ |
| Phone / tablet           | App Store / Play Store → "Steam Link"            |
| Apple TV                 | tvOS App Store                                   |
| Samsung Tizen            | Tizen Store                                      |
| LG webOS                 | LG Content Store                                 |
| Raspberry Pi             | `sudo apt install steamlink`                     |
| Another PC / Mac / Linux | Sign into Steam → Steam → Settings → Remote Play |

## Setup with emulators

EmuDeck's **Steam ROM Manager** step makes this trivial — every emulated game becomes a non-Steam shortcut. Those shortcuts are streamable just like any Steam game.

If you didn't run Steam ROM Manager, add each emulator manually:

1. Host Steam → **Games → Add a Non-Steam Game to My Library**.
2. Tick RetroArch / Dolphin / PCSX2 / etc.
3. Set **Launch Options** to pass a specific ROM (Right-click the entry → Properties → Shortcut):
   - RetroArch: `-L "C:\RetroArch-Win64\cores\snes9x_libretro.dll" "D:\roms\snes\game.sfc"`
   - Dolphin: `"D:\roms\gc\game.iso"`
4. Optional: give it a nice icon and artwork (drag PNGs into `steam://opencustomartwork`).

On the client, Steam Link shows your library. Pick the emulator tile → streams to the client at 1080p60 by default.

## Recommended settings

On the client Steam Link app → **Settings → Streaming**:

| Setting           | Value                            |
| ----------------- | -------------------------------- |
| Resolution        | Match client display             |
| Bitrate           | Auto, or 40–80 Mbps fixed on LAN |
| Hardware decoding | On                               |
| Advanced → HEVC   | On (if supported)                |
| Audio             | Stereo (5.1 on tvOS / Samsung)   |

On the host Steam → **Settings → Remote Play → Advanced Host Options**:

- **Enable hardware encoding**: On.
- **Prioritize network traffic**: On.

## Pros vs. Sunshine/Moonlight and Parsec

**Pros**

- Zero extra software — if you already use Steam you're done.
- Auto-discovery on LAN; no PIN, no account creation besides Steam.
- Handles controller configs you've set in Steam Input (wonderful for mapping DualSense / Joy-Cons).
- Works on smart TVs natively.

**Cons**

- Steam is **required** on the host. (Meh for most users, a dealbreaker for a headless Linux retro box.)
- **Latency is slightly higher** than Moonlight — Steam's encoder pipeline has more overhead.
- No HDR.
- Can't stream from macOS hosts as reliably as from Windows / Linux.
- Tied to your Steam account; shared households need Family Sharing or separate streaming tools.

## Using alongside EmuDeck / RetroArch

- **EmuDeck**: already integrates Steam ROM Manager → every game is a tile → every tile is streamable. Zero extra config.
- **RetroArch**: add RetroArch as a non-Steam game → use **Steam Input** to remap the controller per game via Steam's per-title settings.
- **RetroDeck**: add the RetroDeck Flatpak as a non-Steam game. Stream into Steam Deck in Gaming Mode on the client side.

## See also

- [Sunshine + Moonlight](sunshine-moonlight.md) — lower latency, no Steam requirement
- [Parsec](parsec.md) — the Plex Arcade engine
- [EmuDeck](../emudeck.md) — ships Steam ROM Manager
