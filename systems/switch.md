# Nintendo Switch

- Released: 2017
- Game formats: `.nsp`, `.xci`, `.nca` (keys required for all)
- BIOS/keys required: **yes** — `prod.keys` and `title.keys` dumped from your own Switch

> **Context (as of 2024):** Nintendo sued the Yuzu team in March 2024 and Yuzu shut down. Ryujinx was archived in October 2024 after Nintendo contacted the lead developer. Active successors now include **Suyu**, **Sudachi**, **Citron**, and **Ryubing** (Ryujinx community fork). Expect this landscape to keep shifting — check current community resources before you download.

## Recommended emulators

| Emulator | Status | Notes |
|---|---|---|
| **Ryubing** | active fork of Ryujinx | Cross-platform; most mature post-Ryujinx |
| **Suyu** | active fork of Yuzu | Cross-platform; early Yuzu codebase |
| **Sudachi** | active fork of Yuzu | Android-focused |
| Citron | active | Yuzu fork |

There is **no libretro core** for Switch. All options are standalone.

## Prerequisites — keys

You must provide `prod.keys` and `title.keys` dumped from your own Switch using **Lockpick_RCM** on a modded console. Place them in:

| OS | Path |
|---|---|
| Windows | `%AppData%\Ryujinx\system\` / `%AppData%\Suyu\keys\` |
| macOS | `~/Library/Application Support/Ryujinx/system/` |
| Linux | `~/.config/Ryujinx/system/` (Flatpak: `~/.var/app/org.ryujinx.Ryujinx/config/...`) |
| Android | `Internal Storage/Suyu/keys/` or equivalent |

Some emulators also want a firmware dump (XCI/NSP). Load via `Tools → Install Firmware`.

## Per-platform install

### Android

- **Sudachi Android** / **Citron Android**: GitHub releases.
- Requires Snapdragon 8 Gen 1+ / recent Tensor for decent performance.
- Vulkan 1.1+ drivers required.

### iOS

- **Not supported.** iOS Metal driver lacks features Switch emulation requires; no iOS fork exists as of early 2026.

### macOS

- **Ryubing**: build from source or use GitHub release `.app` (Apple Silicon).
- **Suyu**: community macOS builds; check GitHub.

### Windows

- Download latest **Ryubing** or **Suyu** release `.zip` — extract and run.
- Vulkan-capable GPU (GTX 1060+ / RX 580+).

### Linux (Ubuntu)

```bash
# Ryubing (fork) — check the current GitHub for the latest flatpak/AppImage
# Example — substitute the current active fork's Flathub ID:
flatpak search switch

# AppImages are common:
wget https://github.com/<org>/<repo>/releases/latest/download/<name>.AppImage
chmod +x <name>.AppImage
```

Because the ecosystem is churning, search Flathub and the fork's README for current install instructions before following any pinned command.

## Per-frontend setup

### RetroArch

Not applicable.

### EmuDeck

EmuDeck historically integrated Yuzu and Ryujinx. After the 2024 takedowns, current EmuDeck versions have migrated to forks (Ryubing/Suyu). In **Custom Install**:

- Check current EmuDeck's **Manage Emulators → Switch** section for what's bundled.
- ROM folder: `~/Emulation/roms/switch/`
- Keys: `~/Emulation/bios/keys/prod.keys` and `title.keys`
- Firmware: installed via the emulator GUI.

### RetroDeck

RetroDeck also adapted after the takedowns. Check the current RetroDeck release notes for which Switch emulator is bundled.

- ROM folder: `~/retrodeck/roms/switch/`
- Keys: `~/retrodeck/bios/switch/keys/`
- Firmware: via the bundled emulator's GUI.

## Graphics settings

- **Backend**: Vulkan everywhere; OpenGL only as fallback.
- **Resolution**: 1× (docked 1080p), 2× (4K). Above 2× is diminishing returns.
- **Shader caches**: community shader caches hugely cut stutter on first boot. Drop into the emulator's shader cache folder per-game.

## Tips

- `.xci` = cartridge dump, `.nsp` = eShop. Either works; `.xci` tends to include updates/DLC bundled.
- Updates/DLC are installed via the emulator's `Tools → Install Update/DLC` menu (NSPs).
- Expect rough edges — Switch emulation is the newest and most demanding in this guide. Don't expect Steam Deck to run everything at full speed.
- **Legal:** You must own the game, dump your own keys, and dump your own firmware. The emulators themselves are legal; ROMs are not.
