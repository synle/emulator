# Nintendo Wii

- Released: 2006
- Common disc image formats: `.iso`, `.wbfs`, `.rvz` (preferred), `.wad` (WiiWare / Virtual Console)
- BIOS required: **no**; Wii Menu (`.wad` of system menu) optional

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
