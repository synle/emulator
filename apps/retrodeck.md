# RetroDeck

RetroDeck is a **single Flatpak** that bundles RetroArch, standalone emulators, ES-DE frontend, BIOS checker, and save sync. Unlike EmuDeck (which installs many separate apps), RetroDeck is one sandboxed package — easier to update, fully contained, but less flexible.

- Official site: https://retrodeck.net
- Wiki: https://github.com/RetroDECK/RetroDECK/wiki

## Supported platforms

| Platform | Supported | Notes |
|---|---|---|
| Steam Deck (SteamOS) | ✅ primary target | Flatpak via Discover |
| Linux (any Flatpak-capable distro) | ✅ | Ubuntu, Fedora, Arch, etc. |
| Windows | ❌ | Flatpak-only — use [EmuDeck](emudeck.md) instead |
| macOS | ❌ | Not supported |
| Android | ❌ | Not supported |
| iOS | ❌ | Not supported |

If you are on Windows or macOS, skip this doc and use [EmuDeck](emudeck.md) or individual emulators.

## Install

### Steam Deck (SteamOS)

1. Desktop Mode → open **Discover** (KDE app store).
2. Search **RetroDECK** → Install.
3. Alternatively from terminal (Konsole):
   ```bash
   flatpak install flathub net.retrodeck.retrodeck
   ```
4. Launch from the app grid. Pick storage target on first run:
   - Internal: `~/retrodeck/`
   - SD card: `/run/media/deck/<SD>/retrodeck/`
5. Add to Steam (Gaming Mode): right-click RetroDECK in the app menu → **Add to Steam** (or use Steam → Add Non-Steam Game).

### Linux (Ubuntu)

```bash
# Ensure Flatpak + Flathub
sudo apt install flatpak
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

# Install RetroDECK
flatpak install flathub net.retrodeck.retrodeck

# Launch
flatpak run net.retrodeck.retrodeck
```

First launch walks you through storage, controller layout, aspect ratio, and BIOS placement.

## First run

1. Pick storage location (internal vs SD card). RetroDeck creates `~/retrodeck/` with full directory tree.
2. Drop ROMs into `~/retrodeck/roms/<system>/`.
3. Drop BIOS into `~/retrodeck/bios/`. Use **Configurator → Tools → BIOS Checker** to verify.
4. Launch **ES-DE** from inside RetroDeck — it scans `roms/` and builds your library.
5. Configure controllers in ES-DE: `Menu → Input Device Settings`.

## Folder layout

```
~/retrodeck/              # or /run/media/deck/<SD>/retrodeck/
├── bios/
├── roms/
│   ├── nes/
│   ├── snes/
│   └── …
├── saves/
├── states/
├── screenshots/
└── .config/              # per-emulator config lives here, inside the sandbox
```

Because RetroDeck is a Flatpak, host paths are mapped through Flatpak's filesystem sandbox. If you want to access RetroDeck's config from outside the Flatpak:

```bash
ls ~/.var/app/net.retrodeck.retrodeck/
```

## Configurator

RetroDeck ships with its own GUI called the **Configurator**. From inside RetroDeck, press the **Start button** → Configurator. Useful options:

- **Preset toggles**: bezels, shaders, widescreen, rewind, autosave per system.
- **BIOS Checker**: lists missing/incorrect BIOS hashes.
- **Reset**: reset a specific emulator or whole app to defaults.
- **Tools**: move save data to cloud, open shell inside the sandbox.

## Updating

```bash
flatpak update net.retrodeck.retrodeck
```

Or via Discover → Updates.

## Cloud save sync

RetroDeck supports Syncthing and rclone via Configurator → **Tools → Cloud Sync**. Point it at Google Drive, Dropbox, or a self-hosted target.

## RetroDeck vs EmuDeck — which to use?

| | RetroDeck | EmuDeck |
|---|---|---|
| Install | One Flatpak | Many separate installs |
| Update | One command | Per-emulator |
| Flexibility | Low (sandboxed) | High (edit each emu's config directly) |
| Windows/macOS | No | Yes |
| Desktop frontend | ES-DE built in | ES-DE or Pegasus optional |
| Good for | "Set and forget" on Steam Deck / Linux | Power users, multi-platform households |

## See also

- [EmuDeck](emudeck.md) — alternative approach, multi-platform
- [RetroArch](retroarch.md) — one of the bundled components
