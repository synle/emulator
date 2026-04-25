# RetroArch

RetroArch is a cross-platform frontend that loads emulator backends called **libretro cores**. One UI, one controller config, many consoles.

- Official site: https://www.retroarch.com
- Core list: https://docs.libretro.com/library/

## Install

### Windows

1. Download the installer from https://www.retroarch.com/?page=platforms.
2. Run the installer — choose "Install for all users" if you want it in `C:\RetroArch-Win64\`.
3. Alternative: install from Steam (free). Steam build auto-updates but stores config in Steam's prefix.
4. First launch: `Main Menu → Online Updater → Update Core Info Files`, then `Update Assets`, `Update Controller Profiles`, `Update Databases`.

```powershell
# winget alternative
winget install Libretro.RetroArch
```

### macOS

1. Download the DMG (Metal or Intel) from retroarch.com.
2. Drag RetroArch.app into `/Applications`.
3. First launch: right-click → Open (unsigned build). If Gatekeeper blocks it:
   ```bash
   xattr -dr com.apple.quarantine /Applications/RetroArch.app
   ```
4. Homebrew alternative:
   ```bash
   brew install --cask retroarch
   ```

### Linux (Ubuntu / Debian)

```bash
# PPA — has the latest stable
sudo add-apt-repository ppa:libretro/stable
sudo apt update
sudo apt install retroarch retroarch-assets libretro-*
```

Or Flatpak (recommended on SteamOS / immutable distros):

```bash
flatpak install flathub org.libretro.RetroArch
flatpak run org.libretro.RetroArch
```

Snap is also available but has sandbox issues with controllers; prefer apt or Flatpak.

### Android

1. Install from Google Play: "RetroArch" (32-bit) or "RetroArch Plus" (64-bit, more cores).
2. Or sideload the latest APK from https://www.retroarch.com/?page=platforms (Play Store lags several versions).
3. Grant storage permission on first launch. ROMs go in `Internal Storage/RetroArch/downloads` or any folder you point it at.

### iOS / iPadOS

Apple does not allow RetroArch in the App Store. Options:

1. **AltStore / SideStore** (easiest, free):
   - Install AltServer on your Mac/PC.
   - Download `RetroArch.ipa` from https://www.retroarch.com/?page=platforms.
   - Drag the IPA into AltStore on your device. Re-sign every 7 days (free Apple ID) or yearly (paid developer account).
2. **TrollStore** (iOS 14–17.0 on some devices): permanent install, no re-sign.
3. **Jailbreak**: install from the RetroArch team's Cydia/Sileo repo.

ROMs are copied via Files.app → "On My iPhone" → RetroArch, or via iTunes/Finder file sharing.

## First-Time Configuration

1. **Update everything**: `Main Menu → Online Updater` → Update Core Info Files, Assets, Controller Profiles, Databases, GLSL/Slang Shaders.
2. **Install cores**: `Load Core → Download a Core`. See each system doc for recommended cores.
3. **Directories**: `Settings → Directory` — set System/BIOS, Saves, States, Screenshots, Thumbnails to folders you back up.
4. **Controller**: plug in, `Settings → Input → Port 1 Controls` → auto-config should work. If not, bind manually.
5. **Scan content**: `Import Content → Scan Directory` — RetroArch builds playlists by hashing against its DB.

## BIOS

Place BIOS files in `system/` under your RetroArch config directory:

| OS | Path |
|---|---|
| Windows | `C:\RetroArch-Win64\system\` |
| macOS | `~/Library/Application Support/RetroArch/system/` |
| Linux (apt) | `~/.config/retroarch/system/` |
| Linux (Flatpak) | `~/.var/app/org.libretro.RetroArch/config/retroarch/system/` |
| Android | `Internal Storage/RetroArch/system/` |
| iOS | `On My iPhone/RetroArch/system/` |

Check required BIOS for each core at `Information → Core Information` after loading a core.

## Recommended global settings

- `Settings → Video → Threaded Video`: **On** (Android/low-end); **Off** on desktop for lowest input lag.
- `Settings → Latency → Run-Ahead to Reduce Latency`: 1–2 frames for 2D systems.
- `Settings → Saving → Auto Save State`: **On** if you want seamless resume.
- `Settings → User Interface → Menu → Menu Driver`: **Ozone** (desktop) or **XMB** (couch).

## Playlists & Scraping

`Import Content → Scan Directory` uses libretro DAT hashes. For box art, set `Settings → Online Updater → Update Thumbnails` after scanning. For richer metadata, pair with a frontend like **Playnite**, **LaunchBox**, or **ES-DE**.

## Netplay

`Main Menu → Netplay → Host` / `Refresh Room List`. Works cross-platform as long as the same core + same ROM hash are loaded.

## See also

- [EmuDeck](emudeck.md) — configures RetroArch automatically for you
- [RetroDeck](retrodeck.md) — bundles RetroArch inside a single Flatpak
