# Nintendo Wii

- Released: 2006
- Common disc image formats: `.iso`, `.wbfs`, `.rvz` (preferred), `.wad` (WiiWare / Virtual Console)
- BIOS required: **no**; Wii Menu (`.wad` of system menu) optional

## Prerequisites

### Firmware / BIOS

- **BIOS** — not required. Dolphin HLE-boots Wii games.
- **Wii System Menu WAD** — optional; installs the real Wii Menu from a dumped `.wad`.
- **Common key** — needed only to install WAD files (for WiiWare / Virtual Console); baked into Dolphin.

| File                       | For                          | Required?             |
| -------------------------- | ---------------------------- | --------------------- |
| `RVL-WiiSystemmenu-v*.wad` | Authentic Wii Menu           | Optional              |
| WiiWare `.wad` files       | Individual VC/WiiWare titles | Yes if you want these |

### System requirements

**Desktop (Windows / macOS / Linux)**

- Minimum: Intel i5 4th gen / Ryzen 3, GTX 750 Ti or Vega 8 iGPU, 8 GB RAM.
- Recommended: i5 / Ryzen 5 + GTX 1060 / RX 580 for 3× upscale at stable 60 fps.

**Android**

- Minimum: Snapdragon 855, 6 GB RAM.
- ✅ **S24 Ultra / Z Fold 5 / Tab S9 Ultra** — full-speed 2× upscale; motion-sensitive games use the phone/tablet gyroscope as a Wiimote.

**iOS / iPadOS**

- ✅ **iPad Pro 12.9" M1** — official Dolphin iOS handles Wii at 2–3× upscale.

**Handhelds (SteamOS / Windows handhelds)**

- ✅ **Steam Deck** — 1.5–2× upscale, 60fps for most of the library. Use gyro for pointer aiming.
- ✅ **Legion Go** — 3× upscale comfortable; detachable controller with gyro mimics a Wiimote.

## Recommended emulator

**Dolphin** — same binary as GameCube. See also [gamecube.md](gamecube.md).

## Per-platform install

Install Dolphin as in [gamecube.md](gamecube.md#per-platform-install).

### Android

- **Dolphin MMJR2** recommended.
- Motion controls: via phone gyroscope (Settings → Motion Input) or paired Wiimote via Bluetooth.
- IR pointer: touch screen, or Wiimote.

### iOS

- Dolphin for iOS now supports Wii on iPadOS (M1+ recommended).
- Motion via device gyroscope.

### macOS / Windows / Linux

- Standalone Dolphin.
- **Real Wiimotes**: pair via Bluetooth (`Controllers → Configure → Real Wiimote`) — works on Windows and Linux; macOS Bluetooth stack is flaky.
- **Emulated Wiimote**: keyboard + mouse (mouse = IR cursor).
- USB adapter: **Mayflash DolphinBar** gives you a real sensor bar and IR pointer.

## Per-frontend setup

### RetroArch

- Core: **Dolphin** (libretro). Same caveat as GameCube — standalone is better.
- Wiimote emulation in libretro is crude; use standalone.

### EmuDeck

- Uses standalone Dolphin.
- ROM folder: `~/Emulation/roms/wii/`
- Install WADs: **Dolphin → Tools → Install WAD**. EmuDeck creates the Wii NAND at `~/Emulation/saves/dolphin/Wii/`.

### RetroDeck

- Uses bundled Dolphin.
- ROM folder: `~/retrodeck/roms/wii/`
- Same WAD install flow as EmuDeck.

## Controller setup tips

- **Wiimote via Bluetooth**: `Controllers → Wiimote 1 → Real Wiimote` → hit **Refresh**, press 1+2 on the Wiimote.
- **Steam Deck**: use the gyro for pointer emulation; EmuDeck includes a Deck profile.
- **Nunchuk**: plug into real Wiimote or emulate with second stick + L2.

## Graphics

- Internal Resolution 3× = 1080p; 4× = 1440p native.
- Force **16:9** for widescreen-aware games; leave **Auto** otherwise.
- Some games (e.g. Super Mario Galaxy) have Dolphin-specific AR codes for widescreen — toggle in Properties → Game Settings.

## Tips

- Convert WBFS → RVZ in Dolphin's converter; smaller and officially supported.
- WiiWare titles (VVVVVV, World of Goo, etc.) run as `.wad` — install into the emulated Wii Menu to see them there, or launch directly.
- Wii U → Wii virtual environment: not emulated; use Cemu for Wii U (see [wiiu.md](wiiu.md)).
