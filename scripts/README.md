# Backup & restore scripts

One shell script per frontend. Each uses a simple pattern you can edit directly: an `SRC_DIR` (or `SOURCES` array) at the top, plus a list of paths to include.

| Script                                       | Covers                                                   | Default SRC_DIR                                                     |
| -------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------- |
| [`retroarch-backup.sh`](retroarch-backup.sh) | RetroArch config, saves, states, BIOS, shaders, overlays | auto-detected (Flatpak / `~/.config/retroarch` / macOS App Support) |
| [`emudeck-backup.sh`](emudeck-backup.sh)     | EmuDeck tree (BIOS, saves, storage, tools)               | `~/Emulation`                                                       |
| [`retrodeck-backup.sh`](retrodeck-backup.sh) | RetroDeck data + Flatpak sandbox config                  | `~/retrodeck` and `~/.var/app/net.retrodeck.retrodeck`              |

## Usage

All three scripts share the same CLI:

```bash
# Back up to the current directory
scripts/retroarch-backup.sh backup

# Back up to a specific directory
scripts/retroarch-backup.sh backup /mnt/external

# Restore from an archive (existing config is moved aside as <dir>.bak-<timestamp>)
scripts/retroarch-backup.sh restore /mnt/external/retroarch-backup-20260424-120000.tar.gz
```

Archives are timestamped, gzip-compressed tarballs: `retroarch-backup-YYYYMMDD-HHMMSS.tar.gz`.

## Customizing what gets included

Each script has a `PATHS` array (or `SOURCES` for RetroDeck) near the top. Add or comment out entries to taste. For example, to include ROMs in EmuDeck backups:

```bash
# In scripts/emudeck-backup.sh
PATHS=(
  bios
  saves
  storage
  tools
  roms   # ← uncomment this line
)
```

To back up **only** saves and states (drop BIOS, screenshots, etc.), just remove the entries you don't want.

## Overriding the source directory

All three scripts accept an `SRC_DIR` environment variable:

```bash
SRC_DIR=/mnt/sd/retroarch scripts/retroarch-backup.sh backup ~/backups
```

For RetroDeck, edit the `SOURCES` array inline since it tracks two directories at once.

## What's excluded by default

These scripts skip by default because they're trivial to re-fetch and would make archives huge:

- RetroArch: `downloads/`, `thumbnails/`, `assets/`
- EmuDeck: `roms/`
- RetroDeck: `roms/`

Uncomment the relevant entry in the script if you want them in your archive.

## Platform notes

- **Linux / macOS**: run directly. Bash 4+ recommended (macOS ships Bash 3.2 — scripts avoid associative arrays for compatibility).
- **Windows**: run via WSL, Git Bash, or MSYS2. Native Windows paths (`C:\RetroArch-Win64\`) need to be quoted and converted to WSL/Unix form.
- **Android / iOS**: these scripts do not run on-device. For mobile, copy the config directory manually via Files.app (iOS) or your file manager (Android). See each app's doc for paths.

## What to do with the archive

- Keep a copy on external storage or an NAS.
- Sync to cloud: point Syncthing / rclone / Dropbox at the backup destination directory.
- Before a major emulator upgrade, run a backup; if the upgrade breaks something, restore to roll back.
