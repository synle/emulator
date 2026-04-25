# Parsec

Commercial-grade remote desktop / game streaming. **This is the engine Plex Arcade actually used under the hood** — if you're recreating the exact original experience, this is it.

- Official site: https://parsec.app/

## What it is

A closed-source streaming client-server that prioritizes low latency. Free tier is generous enough for personal emulator streaming. Paid Parsec Teams tier adds multi-user features, unused by single-player retro-emulation.

## Platforms

| Role                | Supported                                        |
| ------------------- | ------------------------------------------------ |
| Host                | Windows 10/11 (best), macOS, Linux               |
| Client              | Windows, macOS, Linux, Android, iOS, web browser |
| Apple TV / smart TV | ❌ (key gap vs. Moonlight)                       |

## Install

### Host

1. Create a free account at https://parsec.app/.
2. Download and install on the host PC.
3. Sign in. The host appears in your account's machine list automatically.
4. Configure **Host settings** → resolution, frame rate, encoder (H.264 / HEVC).

Windows hosts support **Immersive Mode** (exclusive fullscreen capture with minimal overhead). macOS and Linux hosts use standard desktop capture — slightly higher latency but fine for emulation.

### Client

Install from https://parsec.app/downloads or the App Store / Play Store. Sign in with the same account.

## Launching emulators through Parsec

Parsec streams the **whole desktop**. You launch your emulator normally on the host; the client sees your desktop; you drive it with a gamepad / keyboard / mouse.

Two ways to streamline this:

1. **Manual**: connect from Parsec client, double-click RetroArch / EmuDeck / Steam Big Picture on the remote desktop.
2. **App launchers (paid)**: Parsec can auto-launch an app on connect, but this is a Teams feature.

For a cleaner "browse games from a tile grid and launch one" workflow, pair Parsec with **Steam Big Picture + Steam ROM Manager** (added via [EmuDeck](../emudeck.md)).

## Tips

- **Host input timeout**: Parsec assumes you're physically at the host. If the host has a screen saver, disable it (Settings → Display → Screen saver → None).
- **Gamepad passthrough**: Parsec emulates an Xbox controller on the host; retro emulators see an Xbox pad regardless of what you're actually holding on the client. Remap inside the emulator, not inside Parsec.
- **Two clients at once** on the free tier: can be used for local co-op if both players are on a LAN.
- **Colorimetry**: Parsec defaults to Limited range 4:2:0. For pixel-art games switch to Full range 4:4:4 in Host settings to avoid washed-out colors.

## Parsec vs. Sunshine + Moonlight

| Aspect                      | Parsec                                | Sunshine + Moonlight                   |
| --------------------------- | ------------------------------------- | -------------------------------------- |
| License                     | Closed-source, free tier + paid       | Fully open-source, free                |
| Account required            | Yes                                   | No (pair via local PIN)                |
| Apple TV / smart TV clients | ❌                                    | ✅                                     |
| Latency (LAN)               | ~8–20 ms                              | ~5–15 ms                               |
| HDR / 4K60 / 4:4:4          | Supported on paid tier                | Supported free                         |
| Audio                       | Stereo                                | 5.1 / 7.1                              |
| Ease of setup               | Slightly simpler (no firewall fiddle) | Slightly more setup; no account hassle |

For most users, **Sunshine + Moonlight wins** on features and cost. Parsec is worth it if you value the simpler setup or want to use the same account across many machines without the local PIN dance.

## Pairing with this repo

Parsec streams your host's desktop; your emulator frontend does the game-picking. Here's a concrete walkthrough for each of the three frontends.

### Parsec + EmuDeck (Windows / macOS / Linux)

1. **Install EmuDeck** per [apps/emudeck.md](../emudeck.md). Populate `~/Emulation/roms/` and `~/Emulation/bios/`. Run **Steam ROM Manager** so every game becomes a Steam tile.
2. **Install Parsec** on the same host (https://parsec.app/downloads). Sign in.
3. In Parsec **Host settings**:
   - Resolution: match your client's display (1080p iPad, 1440p phone, 4K TV).
   - FPS: 60. Bump to 120 if host and client both support it.
   - Encoder: **HEVC** if both ends support it; fall back to H.264.
   - Capture: Windows → **Immersive Mode** for best perf; macOS/Linux → Desktop.
4. On host startup, auto-launch Steam in Big Picture mode:
   - **Windows**: add `"C:\Program Files (x86)\Steam\steam.exe" -bigpicture` to Startup (Win + R → `shell:startup`).
   - **macOS**: `osascript -e 'tell app "Steam" to launch' && open "steam://open/bigpicture"` in a Login Item.
   - **Linux**: `steam -bigpicture &` in your session autostart.
5. **Connect from Parsec client** (iPad, phone, TV stick). You'll see Steam Big Picture; controller navigates tiles; A to launch a game.
6. Saves land in `~/Emulation/saves/` on the host as usual. Run [`scripts/emudeck-backup.sh`](../../scripts/emudeck-backup.sh) from the host to snapshot them.

### Parsec + RetroDeck (Linux / Steam Deck)

RetroDeck is Flatpak-only, so the host must be Linux (regular desktop, Steam Deck in Desktop Mode, or another Linux box).

1. **Install RetroDeck** per [apps/retrodeck.md](../retrodeck.md). Add ROMs to `~/retrodeck/roms/` and BIOS to `~/retrodeck/bios/`.
2. **Install Parsec on Linux**:

   ```bash
   # Ubuntu / Debian
   wget https://builds.parsec.app/package/parsec-linux.deb
   sudo apt install ./parsec-linux.deb

   # Or from Flathub
   flatpak install flathub com.parsecgaming.parsec
   ```

3. Sign in. In **Settings → Host**:
   - Enable **Hosting** (Parsec will capture your X11 / Wayland session).
   - Resolution + FPS to match your client.
4. Add RetroDeck's launcher to the host's desktop autostart so a fresh Parsec session boots straight into ES-DE:

   ```bash
   mkdir -p ~/.config/autostart
   cp /var/lib/flatpak/exports/share/applications/net.retrodeck.retrodeck.desktop ~/.config/autostart/
   ```

5. On Steam Deck hosts specifically: switch to **Desktop Mode** before streaming — Gaming Mode intercepts the compositor in ways that break Parsec capture. Alternatively, install Parsec in Desktop Mode and stream to it from there.
6. Connect from your Parsec client → RetroDeck's ES-DE appears → controller-navigate → launch.

### Parsec + RetroArch (any OS)

Simplest option if you don't want a library frontend in front.

1. **Install RetroArch** per [apps/retroarch.md](../retroarch.md) on the host. Populate content + BIOS.
2. **Install Parsec** on the same host.
3. Add RetroArch to host autostart so it opens at login (or just launch manually before connecting).
4. In Parsec client, connect → you see RetroArch's Ozone / XMB menu. Controller drives it natively (no mouse needed).
5. Use RetroArch's **Save State → Auto Save State** option so a disconnect doesn't lose progress.

### Important: controller mapping under Parsec

Parsec **emulates an Xbox 360 controller** on the host regardless of what you're actually holding on the client (DualSense, Joy-Cons, Xbox, MFi). Consequences:

- Retro emulators see "Xbox 360 pad" — bind inputs inside each emulator using the Parsec-synthesized pad, not your physical one.
- Gyro / touchpad / HD rumble features of DualSense / Joy-Cons are **not** passed through. Use Sunshine + Moonlight if you need gyro for Splatoon-style Wii / Switch / 3DS gameplay.
- Multiple controllers on the client → Parsec assigns controller IDs 1–4 in connect order.

### Launching a specific game directly

Some people prefer "connect and immediately be in a specific game" rather than "connect to a browser". Parsec's free tier doesn't support per-app launch commands, but you can fake it:

- **EmuDeck**: create a Steam ROM Manager entry that auto-launches a specific title, set it as the host's startup app.
- **RetroArch**: use the `--content` CLI flag in an autostart script: `retroarch -L cores/snes9x_libretro.dylib /path/to/rom.sfc`.

## See also

- [Sunshine + Moonlight](sunshine-moonlight.md) — open-source alternative, usually better
- [Steam Remote Play](steam-remote-play.md) — free, uses Steam
