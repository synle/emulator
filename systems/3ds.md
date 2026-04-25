# Nintendo 3DS

- Released: 2011
- ROM extensions: `.3ds`, `.cia`, `.cxi`, `.cci`
- BIOS required: **no** (system archives dumped from your own 3DS improve compatibility)

## Prerequisites

### Firmware / BIOS

- **BIOS** — not required.
- **System archives** — optional; dumped from your own 3DS with GodMode9. They replace HLE versions of the Mii Maker, shared fonts, and Home Menu apps, improving compatibility for games that reach into those.
- **aes_keys.txt** — AES key file dumped from your 3DS, needed to decrypt encrypted CIA/3DS ROMs. Some forks ship built-in keys; most require your own.

| File | For | Required? |
|---|---|---|
| `aes_keys.txt` | Decrypting `.cia` / encrypted `.3ds` | Often required |
| System archives (from your 3DS NAND) | Improved compatibility | Optional |

### System requirements

**Desktop (Windows / macOS / Linux)**
- Minimum: Intel i5 4th gen / Ryzen 3, Vulkan 1.1 GPU, 8 GB RAM.
- Recommended: i5 / Ryzen 5 + GTX 1060 / RX 580.

**Android**
- Minimum: Snapdragon 855 with Vulkan 1.1+, 6 GB RAM.
- ✅ **S24 Ultra** (SD 8 Gen 3) — near-perfect, 2× upscale + 60fps hacks work well.
- ✅ **Z Fold 5** (SD 8 Gen 2) — plays almost everything well; the larger folded screen is great for DS-style dual-screen layout.
- ✅ **Tab S9 Ultra** — excellent; best of your three devices for 3DS.
- Use **Azahar** or **Lime3DS**.

**iOS / iPadOS**
- Minimum: A12 (iPhone XS / iPad mini 5) with Metal 2.
- ✅ **iPad Pro 12.9" M1** — via Folium, 2–3× upscale comfortable.

**Handhelds (SteamOS / Windows handhelds)**
- ✅ **Steam Deck** — most titles at 2–3× upscale and 60fps hacks; Monster Hunter 4 Ultimate + Pokémon X/Y are lighter. Kingdom Hearts 3D and Hyrule Warriors Legends are the most demanding.
- ✅ **Legion Go** — 3–4× upscale with headroom.

## Recommended emulators

| Emulator | Status | Notes |
|---|---|---|
| **Azahar** | active fork of Citra | Current community continuation after Citra was taken down in 2024 |
| Lime3DS | active fork | Another Citra successor |
| PabloMK7 / Mandarine | active forks | Varying levels of maintenance |

> **Context:** Citra was shut down in March 2024 alongside Yuzu. Forks emerged and consolidated around **Azahar** (merged Lime3DS + PabloMK7) as the community's main line. Always check current community resources before downloading.

## Per-platform install

### Android

- **Azahar Android** or **Lime3DS Android** — GitHub releases.
- Requires Vulkan 1.1+, Snapdragon 855+ ideally.

### iOS

- **Folium** (App Store via sideload / TestFlight in some regions) — multi-system emulator with a Citra fork inside.
- **Provenance** (limited 3DS support).

### macOS

- **Azahar** Apple Silicon `.dmg` from GitHub releases.
- Metal backend.

### Windows

- **Azahar** release `.zip` from GitHub.

### Linux (Ubuntu)

```bash
flatpak install flathub io.github.lime3ds.Lime3DS
# or once Azahar Flatpak is published:
flatpak search 3ds
```

AppImage releases are also available.

## Per-frontend setup

### RetroArch

- Core: **Citra (libretro)** — legacy and no longer updated. Prefer standalone.

### EmuDeck

EmuDeck bundled Citra before the takedown; current versions migrated to Azahar/Lime3DS. Check **Manage Emulators → 3DS** for what's currently installed.

- ROM folder: `~/Emulation/roms/3ds/`
- Controller: stylus mapped to right stick or trackpad (Steam Deck).

### RetroDeck

Same migration story. ROM folder: `~/retrodeck/roms/n3ds/`.

## Settings worth tweaking

- **Backend**: Vulkan everywhere; OpenGL as fallback on older GPUs.
- **Internal resolution**: 3× = 720p effective, 4× = 1080p, 6× = 4K.
- **Async GPU / shader compilation**: reduces first-run stutter.
- **Screen layout**: Default (both stacked), Single Screen, Large Screen, Side-by-Side.
- **Upright mode**: for games like Dead or Alive Dimensions that use portrait orientation.

## CIA / update / DLC install

Open `File → Install CIA` to apply game updates and DLC. Install system archives from a real 3DS dump for maximum compatibility (Mii Maker, Face Raiders, StreetPass apps).

## Tips

- Stereoscopic 3D: some forks support side-by-side rendering; 99% of users play flat.
- Amiibo: simulated via `Tools → Load Amiibo` (`.bin` files).
- Cheats: most forks include cheat engines compatible with GateShark codes.
- **Legal**: you must dump your own 3DS games and system files using GodMode9 on a modded console.
