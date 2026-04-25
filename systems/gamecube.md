# Nintendo GameCube

- Released: 2001
- Common disc image formats: `.iso`, `.gcm`, `.rvz` (preferred — lossless compression), `.ciso`, `.gcz`
- BIOS required: **no** (IPL optional, adds the startup animation)

## Recommended emulator

**Dolphin** — the only serious GameCube/Wii emulator. Available as libretro core and standalone. Always prefer **standalone Dolphin** on desktop; the libretro core lags upstream.

- Official site: https://dolphin-emu.org

## Per-platform install

### Android

- **Dolphin MMJR2 / Dolphin MMJR** (community fork, best performance): https://github.com/Bankaimaster9999/dolphin-mmjr2
- Official Dolphin from Play Store — works but slower than MMJR.
- Requires Snapdragon 845+ / Dimensity 1200+ for full-speed GameCube.

### iOS

Official Dolphin for iOS (iPadOS/iOS 14+, A12 Bionic+) is finally shipping:

- https://dolphin-emu.org/blog/
- Sideload via AltStore or TestFlight (when invites open). Performance is decent on M1/M2 iPads; iPhone 14 Pro+ for 30/60 fps.
- Alternative: **DolphiniOS** (jailbreak/TrollStore fork).

### macOS

- Download Apple Silicon `.dmg` from https://dolphin-emu.org/download/.
- Or: `brew install --cask dolphin-emu`.
- Apple Silicon handles GameCube at full speed easily; Wii likewise.

### Windows

- Download the latest **Dolphin stable / beta** from dolphin-emu.org.
- Winget: `winget install DolphinEmulator.Dolphin`.
- Needs Windows 10+, 64-bit, Vulkan or DX12 drivers.

### Linux (Ubuntu)

```bash
# Flatpak (recommended — always up-to-date)
flatpak install flathub org.DolphinEmu.dolphin-emu

# PPA (older but native)
sudo add-apt-repository ppa:dolphin-emu/ppa
sudo apt update
sudo apt install dolphin-emu
```

## Per-frontend setup

### RetroArch

- Core: **Dolphin (libretro)**. Significantly older than standalone — only use if you insist on a single frontend.
- `Options → Backend → Vulkan`. Set `Internal Resolution` to 2x/3x for HD.
- Controller: GameCube controller via the WiiU/Switch adapter is plug-and-play on Linux/Windows; on macOS you need MayFlash drivers or USB-C Pro Controller adapter.

### EmuDeck

- Installs **standalone Dolphin** (Flatpak on Linux, native on Windows/macOS).
- ROM folder: `~/Emulation/roms/gamecube/`
- Saves: `~/Emulation/saves/dolphin/`
- EmuDeck ships its own Dolphin config: **Manage Emulators → Dolphin → Reset Configuration** to restore.

### RetroDeck

- Bundled **standalone Dolphin**.
- ROM folder: `~/retrodeck/roms/gc/`
- Dolphin config is inside the Flatpak sandbox at `~/.var/app/net.retrodeck.retrodeck/config/dolphin-emu/`.

## Dolphin settings worth tweaking

- **Graphics → Backend**: Vulkan (Linux/Android), Metal (macOS), DX12 (Windows).
- **Enhancements → Internal Resolution**: 2× native for 1080p, 3× for 1440p, 4× for 4K.
- **Anisotropic Filtering**: 16× free on modern GPUs.
- **Hacks → Skip EFB Access from CPU**: on for speed (off breaks a few games like Metroid Prime; Dolphin auto-fixes via Game INIs).

## Tips

- Convert `.iso` → `.rvz` in Dolphin to save 30–50% disk space losslessly (`Tools → Convert`).
- Memory cards: `~/.config/dolphin-emu/GC/` (Linux), `~/Library/Application Support/Dolphin/GC/` (macOS).
- Netplay is excellent — rollback for fighters, deterministic netcode for Smash.
- Wii games also run in Dolphin — see [wii.md](wii.md).
