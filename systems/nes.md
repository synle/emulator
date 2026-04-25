# Nintendo Entertainment System (NES / Famicom)

- Released: 1983 (JP) / 1985 (NA)
- Common ROM extensions: `.nes`, `.fds` (Famicom Disk System), `.unf`/`.unif`
- BIOS required: **no** for cartridges; **yes** (`disksys.rom`) for Famicom Disk System

## Prerequisites

### Firmware / BIOS

- **BIOS** — a copy of the console's boot ROM. NES cartridges don't use one, so you can ignore this unless you want Famicom Disk System support.
- **FDS** (Famicom Disk System) — a Japanese-only floppy-disk peripheral. Requires `disksys.rom` to boot. Dump it from your own Famicom or find the hash-matching file from the MAME BIOS set.

| File          | For                              | Required?   |
| ------------- | -------------------------------- | ----------- |
| `disksys.rom` | Famicom Disk System `.fds` games | Yes for FDS |

### System requirements

**Desktop (Windows / macOS / Linux)**

- Effectively zero. Any CPU from the last 15 years, integrated graphics, 2 GB RAM.

**Android**

- Minimum: any Snapdragon 600-class or later, 2 GB RAM.
- ✅ **Galaxy S24 Ultra** (SD 8 Gen 3, 12 GB) — overkill; perfect.
- ✅ **Galaxy Z Fold 5** (SD 8 Gen 2, 12 GB) — overkill; perfect.
- ✅ **Galaxy Tab S9 Ultra** (SD 8 Gen 2, 12/16 GB) — overkill; perfect.

**iOS / iPadOS**

- Minimum: iPhone 6s / iPad Air 2.
- ✅ **iPad Pro 12.9" M1** — trivially handles NES at any upscale + shaders.

**Handhelds (SteamOS / Windows handhelds)**

- ✅ **Steam Deck** (OLED/LCD, Van Gogh APU, 16 GB) — effortless.
- ✅ **Legion Go** (Ryzen Z1 Extreme, 16 GB) — effortless.

**Raspberry Pi**

- ✅ **Pi 3B+ / Pi 4 / Pi 5** — trivial at native res with shaders and 3–4 frames of run-ahead. FDS supported with `disksys.rom` in `/userdata/bios/`.
- See [arcade-retro.md](../arcade-retro.md) for the full Pi build guide.

## Recommended emulators

| Emulator    | Type                       | Notes                                         |
| ----------- | -------------------------- | --------------------------------------------- |
| **Mesen**   | libretro core + standalone | Most accurate; handles FDS, VS. System, Dendy |
| Nestopia UE | libretro core              | Very accurate, lighter than Mesen             |
| FCEUmm      | libretro core              | Default in most packs; great compatibility    |
| QuickNES    | libretro core              | Speed-focused, low-end devices                |

For a single-core setup, pick **Mesen** (desktop) or **FCEUmm** (mobile / Switch-class hardware).

## Per-platform install

### Android

1. Install RetroArch Plus from Play Store.
2. `Online Updater → Core Downloader` → pick **Mesen** or **FCEUmm**.
3. Put ROMs in `Internal Storage/RetroArch/downloads/NES/`.
4. `Import Content → Scan Directory`.

Standalone alternative: **Nostalgia.NES** on Play Store.

### iOS

1. Sideload RetroArch via AltStore/SideStore ([see RetroArch doc](../apps/retroarch.md#ios--ipados)).
2. Core Downloader → FCEUmm (Mesen may not be compiled for iOS).
3. Copy ROMs via Files.app into RetroArch's documents folder.

Alternative: **Provenance** (open-source, multi-system, sideload-only): https://provenance-emu.com/.

### macOS

**RetroArch**: `brew install --cask retroarch`, download Mesen core.

**Standalone Mesen**: https://www.mesen.ca — native macOS build available. Drop ROMs anywhere, `File → Open`.

### Windows

- **RetroArch**: download Mesen core via Online Updater.
- **Standalone Mesen** (recommended): https://www.mesen.ca/ — feature-rich debugger, HD pack support.

### Linux (Ubuntu)

```bash
# RetroArch + cores
sudo add-apt-repository ppa:libretro/stable
sudo apt update
sudo apt install retroarch libretro-mesen libretro-fceumm libretro-nestopia

# Standalone Mesen (Flatpak)
flatpak install flathub ca.mesen.Mesen
```

## Per-frontend setup

### RetroArch

1. `Load Core → Download a Core → Mesen`.
2. `Load Content → Scan Directory → <your NES folder>`.
3. For FDS: drop `disksys.rom` in `system/`, load `.fds` files with Mesen or FCEUmm.
4. Overlays/shaders: `Quick Menu → Shaders → crt-guest-advanced` for authentic CRT look.

### EmuDeck

- Default emulator: **RetroArch + FCEUmm** (and **Mesen** as alternate if selected in custom mode).
- ROM folder: `~/Emulation/roms/nes/`
- FDS BIOS: `~/Emulation/bios/disksys.rom`
- Run **Steam ROM Manager** → parse **NES** → adds tiles to Steam.

### RetroDeck

- Bundled core: **Mesen** (via RetroArch).
- ROM folder: `~/retrodeck/roms/nes/`
- FDS BIOS: `~/retrodeck/bios/disksys.rom`
- ES-DE picks it up automatically.

## Tips

- **Mesen HD Packs** replace sprites/music with high-res art; drop them in `system/HdPacks/<rom-name>/`.
- Zapper (light gun) games work on RetroArch mouse input — bind mouse or touchscreen.
- Famicom-only games with Japanese voice clips need the FDS BIOS even if the `.nes` file doesn't say FDS.
