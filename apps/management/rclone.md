# rclone

CLI-driven sync to / from ~70 cloud providers (Google Drive, Dropbox, OneDrive, S3, Backblaze, etc.). Good alternative to [Syncthing](syncthing.md) when you want a **cloud** target — especially useful for devices like iOS where Syncthing is awkward.

- Official site: https://rclone.org/
- Providers: https://rclone.org/overview/

## When to use rclone vs Syncthing

| Scenario                                                 | Pick                                                                |
| -------------------------------------------------------- | ------------------------------------------------------------------- |
| All devices can see each other (home LAN)                | Syncthing                                                           |
| Mix of devices some always remote (laptop, phone on LTE) | rclone                                                              |
| Want data in Google Drive / Dropbox for backup           | rclone                                                              |
| iOS is in the mix                                        | rclone (via Shortcuts / Files.app integrations) or paid Möbius Sync |

Use both: rclone as the periodic cloud backup; Syncthing for instant device-to-device sync.

## Install

### Linux / macOS

```bash
# macOS
brew install rclone

# Linux (Ubuntu, Debian, etc.)
curl https://rclone.org/install.sh | sudo bash
```

### Windows

```powershell
winget install Rclone.Rclone
```

Or download from https://rclone.org/downloads/.

### Steam Deck

Bundled inside RetroDeck's Configurator. For EmuDeck, install via `flatpak-spawn` or manually from the official installer.

## Configure a cloud remote

```bash
rclone config
```

Follow the wizard:

1. Pick a name for the remote (e.g., `gdrive`).
2. Pick a provider (Google Drive, Dropbox, OneDrive, S3, Backblaze B2, etc.).
3. OAuth (for consumer clouds) — rclone opens a browser, you sign in, it saves a token.
4. Test: `rclone lsd gdrive:`.

Config file lives at `~/.config/rclone/rclone.conf`.

## Sync emulator saves to / from the cloud

### Backup (local → cloud)

```bash
# Push EmuDeck saves to Google Drive
rclone sync ~/Emulation/saves gdrive:emulation/saves --progress

# Push RetroDeck saves
rclone sync ~/retrodeck/saves gdrive:emulation/retrodeck-saves --progress

# Push RetroArch config (macOS)
rclone sync ~/Library/Application\ Support/RetroArch gdrive:emulation/retroarch --progress
```

### Restore (cloud → local)

```bash
rclone sync gdrive:emulation/saves ~/Emulation/saves --progress
```

**Warning**: `rclone sync` deletes files at the destination that don't exist at the source. Use `rclone copy` if you want additive only.

### Scheduled sync (cron / launchd)

macOS / Linux cron, every hour:

```cron
0 * * * * /usr/local/bin/rclone sync ~/Emulation/saves gdrive:emulation/saves --quiet
```

Windows Task Scheduler: create a task pointing at `rclone.exe` with the same args.

## Mount a cloud bucket as a local folder (advanced)

```bash
rclone mount gdrive:emulation /mnt/gdrive-emu --daemon
```

Your emulator writes directly to `/mnt/gdrive-emu/...` and rclone streams changes to Google Drive in the background. **Not recommended** for save files that change often — local-first with periodic sync is safer.

## iOS workflow

`rclone` itself isn't on iOS, but you can:

- Use the **Shortcuts** app + the iOS **Files** app to pull saves from a self-hosted rclone-backed WebDAV server.
- Run rclone on a Mac / RPi / NAS, expose as WebDAV (`rclone serve webdav gdrive:emulation --addr :8080`), then mount that in Files.app on your iPad Pro.

## Pairing with this repo

- Pair rclone with the [backup scripts](../../scripts/): archive first, then upload the tarball.

  ```bash
  ./scripts/emudeck-backup.sh backup /tmp
  rclone copy /tmp/emudeck-backup-*.tar.gz gdrive:emulation/backups/
  ```

- For continuous save sync: schedule rclone to sync only the `saves/` subfolder every 10–30 minutes. Much smaller than full backups.

## Pros / cons

| Pros                                         | Cons                                           |
| -------------------------------------------- | ---------------------------------------------- |
| Supports ~70 cloud providers                 | CLI only; no first-class GUI                   |
| Reliable, battle-tested                      | Bidirectional sync needs care (use `bisync`)   |
| Works everywhere except iOS natively         | Cron / launchd scheduling is manual            |
| Pairs naturally with existing backup scripts | Cloud quota / egress costs for large libraries |

## See also

- [Syncthing](syncthing.md) — P2P sync without a cloud
- [scripts/](../../scripts/README.md) — the archive-creation side of the workflow
