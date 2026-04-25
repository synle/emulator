# Sunshine + Moonlight

Free, open-source, self-hosted game streaming. **This is the spiritual successor to Plex Arcade's streaming component** — and it's better.

- Sunshine: https://app.lizardbyte.dev/Sunshine/
- Moonlight: https://moonlight-stream.org/

## What each does

| Role   | App       | What it does                                                                                 |
| ------ | --------- | -------------------------------------------------------------------------------------------- |
| Host   | Sunshine  | Runs on the PC hosting your emulators. Encodes video + audio, receives input.                |
| Client | Moonlight | Runs on the device you're playing from. Decodes stream, sends controller / touch input back. |

The stack is protocol-compatible with NVIDIA's (deprecated) GameStream, but works on any hardware with a video encoder (NVENC, AMF, QuickSync, VideoToolbox, VA-API).

## Platforms

**Sunshine (host)**

- Windows 10/11 — installer.
- Linux (Ubuntu, Fedora, Arch) — `.deb`, `.rpm`, AppImage, Flatpak.
- macOS — Apple Silicon + Intel builds (released 2024).

**Moonlight (client)**

Everywhere: Windows, macOS, Linux, Android, iOS, iPadOS, Apple TV (tvOS), Chromecast with Google TV, LG webOS, Samsung Tizen, Raspberry Pi, Steam Deck (native + Flatpak), Xbox Series (dev mode), browser (PWA).

## Install — host (Sunshine)

### Windows

1. Download the installer from https://app.lizardbyte.dev/Sunshine/ → Windows.
2. Run the installer; it registers a Windows service that starts at boot.
3. Open https://localhost:47990 in a browser → set admin username/password.
4. Allow Sunshine through Windows Firewall when prompted (UDP ports 47998–48000, 47999 plus TCP 47984, 47989, 48010).

### macOS

```bash
brew install --cask sunshine
```

Or download the `.dmg` from the Sunshine releases page. First launch, grant **Screen Recording**, **Input Monitoring**, and (if using microphone) **Microphone** in System Settings → Privacy & Security.

On Apple Silicon, VideoToolbox encodes H.264/HEVC in hardware — near-zero CPU cost.

### Linux (Ubuntu)

```bash
# Flatpak (recommended — works everywhere)
flatpak install flathub dev.lizardbyte.app.Sunshine

# Or .deb from the Sunshine release page
wget https://github.com/LizardByte/Sunshine/releases/latest/download/sunshine-ubuntu-22.04-amd64.deb
sudo apt install ./sunshine-ubuntu-22.04-amd64.deb
```

Required for input injection: add your user to the `input` group and enable uinput:

```bash
sudo usermod -aG input $USER
sudo modprobe uinput
```

Reboot.

### Steam Deck (host)

Sunshine on the Deck works, but you usually want the Deck as a **client**, not a host. If you do want to host from it:

```bash
flatpak install flathub dev.lizardbyte.app.Sunshine
```

## Install — client (Moonlight)

| Platform                  | Source                                    |
| ------------------------- | ----------------------------------------- |
| Windows / macOS / Linux   | https://moonlight-stream.org/             |
| Android                   | Play Store → "Moonlight Game Streaming"   |
| iOS / iPadOS              | App Store → "Moonlight Game Streaming"    |
| Apple TV (tvOS)           | App Store on the TV                       |
| Chromecast with Google TV | Play Store → "Moonlight"                  |
| Steam Deck                | Flatpak: `com.moonlight_stream.Moonlight` |
| Raspberry Pi              | `sudo apt install moonlight-qt`           |

## Setup — launch your emulators

1. On the host, open the Sunshine web UI: https://localhost:47990 (self-signed cert — click through the browser warning).
2. Go to **Applications → Add New Application**.
3. Add an entry per target. Examples:

   **RetroArch (Windows)**
   - Name: `RetroArch`
   - Command: `C:\RetroArch-Win64\retroarch.exe`
   - Working directory: `C:\RetroArch-Win64\`

   **EmuDeck via Steam (any OS)**
   - Name: `Steam Big Picture`
   - Command (Windows): `steam://open/bigpicture`
   - Command (macOS / Linux): `steam steam://open/bigpicture`
   - This is the easiest path if you've already run Steam ROM Manager — every game is a Steam tile.

   **Specific game (standalone PCSX2)**
   - Name: `Shadow of the Colossus (PS2)`
   - Command: `"C:\Program Files\PCSX2\pcsx2-qt.exe" -batch -fullscreen "D:\roms\ps2\sotc.chd"`

4. On the client, open Moonlight → your host should appear automatically on the LAN. Tap it → a 4-digit PIN shows. Enter it in the Sunshine web UI under **PIN**.
5. Launch any configured app from Moonlight.

## Recommended settings

| Setting                | Value                                                              |
| ---------------------- | ------------------------------------------------------------------ |
| Resolution (Moonlight) | Match your **client** display (1080p iPad / 1440p phone / 4K TV)   |
| FPS                    | 60 for most titles; 120 for high-refresh displays if host supports |
| Video codec            | HEVC if both ends support it; H.264 as fallback                    |
| Bitrate                | 20 Mbit/s @ 1080p60 · 40 Mbit/s @ 1440p60 · 80+ Mbit/s @ 4K        |
| Audio                  | 5.1 if your client has surround                                    |
| HDR                    | Supported on Windows host + HDR-capable client                     |

## Network tips

- **Wired Ethernet** on the host is non-negotiable. Wi-Fi for the client is fine on 5 GHz / 6 GHz.
- Sub-millisecond LAN latency is achievable — fighting games and shmups are playable.
- Over WAN (outside your house), latency depends on your ISP. Tailscale or ZeroTier make remote Moonlight work; expect 20–50 ms more input latency than LAN.

## Why this beats Plex Arcade

- **No subscription**. Plex Arcade required Plex Pass.
- **No ROM restrictions.** Plex enforced a curated catalog; Sunshine/Moonlight stream anything the host runs.
- **Better codec choices.** HEVC + high bitrate + HDR vs. Parsec's older H.264 pipeline Plex Arcade inherited.
- **Any OS on either end.** Plex Arcade was host-limited.

## Pairing with this repo

- Run [EmuDeck](../emudeck.md) on your host PC → every game gets a Steam tile via Steam ROM Manager → point Sunshine at `steam://open/bigpicture` → browse & launch from Moonlight on your iPad / TV / phone.
- Or run [RetroArch](../retroarch.md) directly on the host for lower input latency (RetroArch's run-ahead + Sunshine's direct encoding beats Steam's wrapper overhead).

## See also

- [Parsec](parsec.md) — the engine Plex Arcade itself used; simpler but less flexible
- [Steam Remote Play](steam-remote-play.md) — uses Steam's built-in streaming
- [EmuDeck](../emudeck.md) / [RetroArch](../retroarch.md) — what to run on the host
