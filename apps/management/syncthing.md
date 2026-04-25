# Syncthing

Open-source peer-to-peer file sync. **The best option for keeping emulator save files in sync across your devices** (PC ↔ Steam Deck ↔ phone ↔ tablet) without a cloud provider in the middle.

- Official site: https://syncthing.net/
- Built into RetroDeck's Configurator.

## Why this matters

The hardest problem in multi-device retro gaming is saves. You play 30 minutes of Chrono Trigger on your iPad, then want to continue on your Steam Deck — your SRAM needs to follow you. Syncthing solves this by replicating selected folders between devices over LAN / Wi-Fi / Tailscale.

## Platforms

| Platform     | Source                                                                                                                       |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| Windows      | https://syncthing.net/downloads/ or `winget install Syncthing.Syncthing`                                                     |
| macOS        | `brew install --cask syncthing` or DMG                                                                                       |
| Linux        | `sudo apt install syncthing` or `flatpak install flathub me.kozec.syncthingtk`                                               |
| Steam Deck   | Built into RetroDeck Configurator, or Flatpak separately                                                                     |
| Android      | Play Store: **Syncthing-Fork** (active fork)                                                                                 |
| iOS / iPadOS | ❌ **No official app.** Use Möbius Sync (paid) as a workaround, or skip iOS sync and use iCloud / a Files.app share instead. |

iOS is the weak link. For iPad Pro specifically, the least-bad options are:

1. **Möbius Sync** from the App Store (paid; implements the Syncthing protocol).
2. Skip Syncthing on iOS; expose your syncs via **Files.app SMB share** from a Mac / Linux host.

## Install + pair

### Per device

Install on each device you want to sync. Each runs a small background daemon; configuration is via a local web UI at http://localhost:8384.

### Add devices

1. On device A, open Syncthing's web UI → **Actions → Show ID**. Copy the long device ID.
2. On device B, **Add Remote Device** → paste device A's ID.
3. Device A gets a notification prompting approval. Approve it.
4. Symmetric: repeat from B → A so both ends know about each other.

Devices must be able to see each other over the network. LAN works out of the box. For devices on separate networks use **Tailscale** or accept the relay servers (slower, encrypted end-to-end but not local).

### Share a folder

1. On the "source" device, **Add Folder**. Point it at `~/Emulation/saves/` or `~/retrodeck/saves/` or `~/Library/Application Support/RetroArch/saves/`.
2. Give the folder a label (e.g., `retroarch-saves`) and a Folder ID.
3. Under **Sharing**, tick the other devices you want this folder on.
4. On those devices, Syncthing asks you to accept the incoming folder and pick a local path.

Done — changes propagate within seconds.

## Recommended setup for this repo

**Share three folders** across all your devices:

| Folder                                                                 | What's in it                     |
| ---------------------------------------------------------------------- | -------------------------------- |
| `~/Emulation/saves/` (EmuDeck)                                         | Saves for every bundled emulator |
| `~/Emulation/storage/`                                                 | Save states, screenshots         |
| `~/Library/Application Support/RetroArch/saves/` (macOS) or equivalent | RetroArch SRAM                   |

**Don't sync** BIOS or ROMs — those should live on each device but don't need replication (they're static and large). Saves are small and change often; they're the right thing to sync.

### Conflict handling

Syncthing uses vector clocks. If you save in two places simultaneously, Syncthing creates a `<filename>.sync-conflict-<date>-<device>` file. Decide which wins, rename, delete the other.

To minimize conflicts:

- Exit the emulator cleanly before switching devices.
- Use in-game saves (not save states) when possible — states include volatile state that Syncthing may race with a running emulator.

## Pairing with this repo

- **RetroDeck**: use the bundled Syncthing via Configurator → Tools → Cloud Sync → Syncthing.
- **EmuDeck**: install Syncthing separately, point it at `~/Emulation/saves/` and `~/Emulation/storage/`.
- **RetroArch**: share the per-OS `saves/` and `states/` directories from [the backup reference](../retroarch.md#backup--restore).

## Pros / cons

| Pros                                       | Cons                                              |
| ------------------------------------------ | ------------------------------------------------- |
| Free, open-source, no account              | iOS support is third-party paid                   |
| End-to-end encrypted                       | Requires one device online per pair for sync      |
| Peer-to-peer; your data never hits a cloud | Initial device pairing is manual                  |
| Fast over LAN                              | Save-state conflicts happen if you're not careful |

## See also

- [rclone](rclone.md) — cloud-backed sync (Google Drive, Dropbox, etc.)
- [RetroDeck](../retrodeck.md) — bundles Syncthing in the Configurator
