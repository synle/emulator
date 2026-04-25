# Sony PlayStation 3

- Released: 2006
- Game formats: decrypted folder dumps (`PS3_GAME/` tree), `.pkg` files (PSN), `.iso` (not supported; convert to folder first)
- BIOS required: **yes** — `PS3UPDAT.PUP` firmware installed via RPCS3

## Prerequisites

### Firmware / BIOS

- **Firmware** — `PS3UPDAT.PUP`. **Required**. Download legally from Sony's support site. Installed into RPCS3 via `File → Install Firmware`; extracts into `dev_flash/`.

| File           | For            | Required? |
| -------------- | -------------- | --------- |
| `PS3UPDAT.PUP` | RPCS3 firmware | Yes       |

Decryption keys for your own disc games are derived automatically by RPCS3 during install, using a license file (`.rap`) dumped from a real PSN account.

### System requirements

**Desktop (Windows / macOS / Linux)**

- Minimum: Intel i5 10th gen / Ryzen 5 3600, GTX 1060, 16 GB RAM, Vulkan 1.2+.
- Recommended: Ryzen 7 5800X / i7 12700 + RTX 3060 / RX 6700 XT for AAA titles (GoW III, The Last of Us, GTA V).
- **macOS Apple Silicon**: M1 OK for 2D/indie; M2 Pro / M3 Max for 3D.

**Android**

- ❌ **Not supported.** PS3 is far too demanding for mobile SoCs.

**iOS / iPadOS**

- ❌ **Not supported.**

**Handhelds (SteamOS / Windows handhelds)**

- ⚠️ **Steam Deck** — playable for lighter PS3 titles (Demon's Souls runs, Ni no Kuni works); big AAA 3D struggles.
- ⚠️ **Legion Go** — meaningfully better than Deck; AAA titles playable at 720p / 30 fps with tweaks, but still not guaranteed.

**Raspberry Pi**

- ❌ **Pi 3B+ / Pi 4 / Pi 5** — not supported. RPCS3 is x86-64-only and the Pi's GPU class is far below what PS3 emulation requires.
- See [arcade-retro.md](../arcade-retro.md) for Pi-realistic targets.

## Recommended emulator

**RPCS3** — the only PS3 emulator worth using.

- Official site: https://rpcs3.net

## Per-platform install

### Android

- **Not supported.** PS3 is too computationally demanding for mobile chips; no Android build exists.

### iOS

- **Not supported.**

### macOS

- Download Apple Silicon `.dmg` from https://rpcs3.net/download.
- `brew install --cask rpcs3`.
- Requires macOS 13+ (Ventura) and Apple Silicon M1 or better.
- Metal renderer; Rosetta translation for Intel — slow, not recommended.

### Windows

- Installer from rpcs3.net.
- `winget install RPCS3.RPCS3`.
- Requires Vulkan 1.2+. Recommended: Ryzen 5 5600X / i5-12400 or better, 16 GB RAM.

### Linux (Ubuntu)

```bash
# Flatpak
flatpak install flathub net.rpcs3.RPCS3

# AppImage from official site
wget https://github.com/RPCS3/rpcs3-binaries-linux/releases/latest/download/rpcs3.AppImage
chmod +x rpcs3.AppImage
```

## Per-frontend setup

### RetroArch

Not applicable — no PS3 core exists.

### EmuDeck

- Installs RPCS3 Flatpak (Linux) or native binary (Windows).
- **Firmware**: download `PS3UPDAT.PUP` from Sony's official site (yes, it's legal), then `File → Install Firmware` in RPCS3.
- ROM folder: `~/Emulation/roms/ps3/` — each game is a folder.
- Steam Deck handles PS3 games of simpler scope (God of War HD, 2D titles); demanding 3D (GTA V, The Last of Us) will struggle.

### RetroDeck

- Bundles RPCS3.
- Firmware install via the Configurator or RPCS3 GUI.
- ROM folder: `~/retrodeck/roms/ps3/`.

## Firmware

1. Download PS3UPDAT.PUP from https://www.playstation.com/en-us/support/hardware/ps3/system-software/ — fully legal, official Sony download.
2. RPCS3 → `File → Install Firmware` → select the PUP.
3. RPCS3 will extract the ~300 MB firmware into `dev_flash/`. Takes a minute.

## Game install

- **Disc games**: use a decrypted dump (e.g., using a modded PS3 to extract `PS3_GAME/`). `File → Install disc game` → select the folder.
- **PSN games** (`.pkg`): `File → Install Packages` (`.pkg`). Licenses (`.rap`) via `File → Install License`.
- Games land in `dev_hdd0/game/` inside RPCS3's config directory.

## Settings worth tweaking

- **CPU → PPU Decoder**: LLVM (Recompiler).
- **CPU → SPU Decoder**: LLVM (Recompiler).
- **SPU Block Size**: Mega.
- **GPU → Renderer**: Vulkan.
- **Resolution Scale**: 100% = native 720p. Use 150–200% for 1080p–1440p.
- **Anisotropic Filter**: 16×.
- **Write Color Buffers**: game-dependent; required for a handful of titles.

Use **rpcs3.net's compatibility list** to pick recommended per-game settings.

## Tips

- Some games are **Playable** tier but still have specific quirks; always check the wiki entry before starting a run.
- **Save data**: `dev_hdd0/home/00000001/savedata/` in RPCS3's data dir.
- Controller: DualShock 3/4/5 supported via DualShock driver (Windows: use ScpToolkit for DS3; SDL works for DS4/5).
