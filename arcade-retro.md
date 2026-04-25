# Building a dedicated retro arcade on a Raspberry Pi

End-to-end guide for turning a Raspberry Pi into a single-purpose retro game console — the kind you plug into a TV or stuff inside a bartop arcade cabinet and never think about again. Covers the last three Pi generations, which emulators each can realistically run, and the hardware + software choices that matter.

- [Pick a Raspberry Pi](#pick-a-raspberry-pi)
- [System capability per Pi](#system-capability-per-pi)
- [Shopping list](#shopping-list)
- [Pick a distro](#pick-a-distro-batocera-vs-retropie-vs-lakka)
- [Install and first boot](#install-and-first-boot)
- [Add BIOS, ROMs, controllers](#add-bios-roms-controllers)
- [Arcade cabinet build](#arcade-cabinet-build)
- [Tips and gotchas](#tips-and-gotchas)
- [Troubleshooting](#troubleshooting)

---

## Pick a Raspberry Pi

| Model             | Released | CPU                     | GPU           | RAM options | Retail (as of 2026) | Best for                                                                                                           |
| ----------------- | -------- | ----------------------- | ------------- | ----------- | ------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Pi 3 Model B+** | 2018     | 4× Cortex-A53 @ 1.4 GHz | VideoCore IV  | 1 GB LPDDR2 | ~$35                | Pure nostalgia: NES → PS1, Dreamcast light titles, 80s/90s arcade. Cheapest entry.                                 |
| **Pi 4 Model B**  | 2019     | 4× Cortex-A72 @ 1.8 GHz | VideoCore VI  | 1/2/4/8 GB  | $35–$75             | **Sweet spot.** Handles everything through Dreamcast / Saturn / N64 smoothly; good arcade coverage.                |
| **Pi 5**          | 2023     | 4× Cortex-A76 @ 2.4 GHz | VideoCore VII | 4/8/16 GB   | $60–$120            | Most powerful. Saturn at full speed, lighter GameCube / Wii via special forks. Overkill if you only want 8/16-bit. |

There are two related keyboard-in-a-computer variants worth knowing:

- **Pi 400** — Pi 4 SoC built into a keyboard. Same emulation capability as Pi 4.
- **Pi 500** — Pi 5 SoC built into a keyboard. Same emulation capability as Pi 5. Great cabinet-free setup for a desk.

### Which one should you buy?

- **Budget / learning**: Pi 3B+ ($35). Skip if you want N64/PS1 at upscale.
- **Most people**: Pi 4 (4 GB or 8 GB). Best balance.
- **Future-proof / demanding systems**: Pi 5 (8 GB). Saturn and light GameCube become realistic here.
- **Cabinet builders**: Pi 4 is the community default — tons of cabinet-specific guides assume it, GPIO pinouts are stable, and the thermal envelope is well-understood.

Avoid Pi Zero 2W and Pi 3A+ for this use case — they share the SoC with older / smaller RAM and are a false economy once you factor SD card + PSU + case.

---

## System capability per Pi

How each Pi handles each category of system. "Full speed" means playable at native resolution without dropped frames. "Upscaled" means you can push internal resolution 2×+ without issues.

### 8-bit / 16-bit cartridge systems

These are trivial on any modern Pi. NES, SNES, Master System, Game Gear, GB, GBC, GBA, Genesis, PC Engine, Atari 2600 — all run full speed, upscaled, with shaders, on every Pi 3B+ / 4 / 5. Pi 3B+ can handle 3–4 frames of run-ahead for fighting games.

### Nintendo 64, Sony PlayStation, Sega Saturn, Sega CD, PSP, Dreamcast

| System        | Pi 3B+                        | Pi 4 (4 GB+)                      | Pi 5                                    |
| ------------- | ----------------------------- | --------------------------------- | --------------------------------------- |
| N64           | ⚠️ Playable, per-game tuning  | ✅ Mupen64Plus-Next, upscaled     | ✅ ParaLLEl-RDP accurate                |
| PlayStation 1 | ✅ PCSX-ReARMed, native       | ✅ DuckStation, 4× upscale + PGXP | ✅ 8× upscale + PGXP                    |
| Sega Saturn   | ❌                            | ⚠️ YabaSanshiro, Kronos at native | ✅ Beetle Saturn playable, most titles  |
| Sega CD       | ✅                            | ✅                                | ✅                                      |
| PSP           | ⚠️ PPSSPP, lower resolution   | ✅ PPSSPP, 2–3× upscale           | ✅ 4× upscale, smooth                   |
| Dreamcast     | ⚠️ Flycast, light titles only | ✅ Flycast, most titles at 2×     | ✅ 4× upscale, widescreen + 60fps hacks |
| Nintendo DS   | ⚠️ DeSmuME, struggles         | ✅ melonDS, smooth                | ✅ smooth with upscale                  |

### GameCube / Wii

Handled by Dolphin, which requires more CPU than the Pi traditionally offers.

| System   | Pi 3B+ | Pi 4 (8 GB)                                               | Pi 5                                             |
| -------- | ------ | --------------------------------------------------------- | ------------------------------------------------ |
| GameCube | ❌     | ⚠️ Light 2D/3D titles at native res                       | ⚠️ Many titles playable; AAA 3D struggles        |
| Wii      | ❌     | ⚠️ Lighter titles (New Super Mario Bros Wii, Mario Party) | ⚠️ Broader compatibility, still not full library |

GameCube / Wii on any Pi depends on custom Dolphin forks (`ishiiruka`, `DolphinQt-aarch64`). Expect to research per-title compatibility. Pi 5 is where this becomes genuinely fun; Pi 4 is the "possible but you'll pick titles" tier.

### PS2 / Xbox 360 / Wii U / Switch / PS3

**Not realistic on any Raspberry Pi** as of 2026. Even the Pi 5 lacks the single-thread performance and GPU class. Use an x86 handheld (Steam Deck, Legion Go) or desktop for these.

### Arcade

| Category                                                    | Pi 3B+       | Pi 4      | Pi 5    |
| ----------------------------------------------------------- | ------------ | --------- | ------- |
| Early arcade (pre-1995): CPS1, Neo Geo MVS/AES, most shmups | ✅ FB Neo    | ✅ FB Neo | ✅      |
| CPS2, MAME 2003-Plus era                                    | ✅           | ✅        | ✅      |
| Cave shmups (mid-90s)                                       | ⚠️           | ✅        | ✅      |
| CPS3 (Street Fighter III)                                   | ⚠️           | ✅        | ✅      |
| Neo Geo CD                                                  | ✅           | ✅        | ✅      |
| MAME Current (any game)                                     | ❌ many drop | ✅ most   | ✅      |
| Naomi / Atomiswave (Flycast)                                | ❌           | ⚠️ light  | ✅ most |
| Sega Model 2 / Model 3                                      | ❌           | ❌        | ❌      |

**Reality check for Pi-based arcade builds**: you're targeting the 70s–90s golden age. CPS1/2/3 + Neo Geo + Cave + Taito + Konami = thousands of classic titles on a Pi 4. That's usually the dream, not Naomi-era 3D.

### Summary table

| Use case                                         | Minimum Pi  |
| ------------------------------------------------ | ----------- |
| 8/16-bit console + classic arcade only           | Pi 3B+      |
| Add N64, PS1, PSP, Dreamcast                     | Pi 4 (4 GB) |
| Add Saturn + broader arcade + light GameCube/Wii | Pi 5 (8 GB) |

---

## Shopping list

Minimum viable bill of materials for a Pi 4 or Pi 5 build:

| Item               | Recommendation                                                                  | ~Cost    |
| ------------------ | ------------------------------------------------------------------------------- | -------- |
| Raspberry Pi       | Pi 4 (8 GB) or Pi 5 (8 GB)                                                      | $55–$95  |
| Power supply       | Official 5 V / 3 A USB-C (Pi 4) or 5 V / 5 A USB-C (Pi 5 — **do not skip**)     | $10      |
| microSD card       | SanDisk Extreme (A2, V30) 64 GB — enough for distro + 8/16-bit + PS1 essentials | $12      |
| OR USB 3.0 SSD     | 256 GB SATA SSD + USB 3 enclosure (Pi 4/5 boot from USB fine)                   | $35      |
| Case with cooling  | Argon ONE v3 (Pi 4) or Argon NEO 5 (Pi 5) — fan + heatsink essential on Pi 5    | $20–$35  |
| HDMI cable         | Pi 4/5 uses **micro-HDMI** on the Pi side                                       | $8       |
| Controller         | 8BitDo Pro 2 / Ultimate, or Xbox One (USB)                                      | $30–$50  |
| Arcade stick (opt) | Qanba / Hori, or DIY with Brook / Zero Delay encoder                            | $60–$200 |
| Audio              | Uses HDMI or 3.5 mm out. Add a small powered speaker for a cabinet.             | —        |

**Notes:**

- **Pi 5 PSU**: Pi 5 needs the **27 W** official USB-C. Older Pi 4 PSUs (15 W) will boot it but throttle under load.
- **SD card class**: A1 is bad, A2 noticeably better for ROM loading. V30 minimum.
- **USB SSD over SD card**: at 64+ GB Pi 4 and Pi 5 boot from USB directly. Massively faster for large libraries.
- **Active cooling is mandatory on Pi 5**. Passive is OK on Pi 4 / Pi 3 if you have airflow.

---

## Pick a distro (Batocera vs RetroPie vs Lakka)

Three mainstream options, all free and open-source.

| Distro       | Base     | Frontend         | Strengths                                                             | Weaknesses                                               |
| ------------ | -------- | ---------------- | --------------------------------------------------------------------- | -------------------------------------------------------- |
| **Batocera** | Linux    | EmulationStation | Easiest setup, best Pi 4/5 support, updates regularly, great defaults | Less customizable than RetroPie; fewer tutorials         |
| **RetroPie** | Raspbian | EmulationStation | Longest-lived, most tutorials and themes, familiar to most guides     | Trails upstream emulators; Pi 5 support lagged initially |
| **Lakka**    | Linux    | RetroArch XMB    | Minimal, RetroArch-focused, fastest boot                              | No frontend abstractions — RetroArch IS the UI           |
| Recalbox     | Linux    | EmulationStation | Polished French project; kid-friendly                                 | Smaller English-speaking community                       |
| EmuELEC      | Linux    | EmulationStation | Focused on Amlogic TV boxes; Pi support secondary                     | —                                                        |

**Recommendation**: **Batocera** for most people. It's the most "it just works" — Pi-optimized, per-system auto-configs, bundles Kodi for media playback, Wi-Fi GUI, controller config wizard, Steam ROM Manager-style Steam integration. RetroPie is the sentimental favorite; pick it if you want to follow one of the thousand well-written RetroPie tutorials on YouTube.

Lakka is for minimalists who want RetroArch and nothing else.

---

## Install and first boot

Instructions below target **Batocera on a Pi 4 or Pi 5**. RetroPie and Lakka follow the same Raspberry Pi Imager flow with a different image.

### 1. Flash the image

1. Download **Raspberry Pi Imager**: https://www.raspberrypi.com/software/
2. Plug the microSD (or USB SSD) into your computer.
3. Open the Imager → **Choose OS → Other specific-purpose OS → Emulation and game OS → Batocera** — pick Pi 4/5 variant.
4. Or manually: download the `.img.gz` from https://batocera.org/download, point the Imager at "Use Custom".
5. **Choose storage** → your SD card or USB drive.
6. Click **Write**. Takes 5–10 minutes.

### 2. First boot

1. Insert SD (or plug USB SSD) into the Pi. Connect HDMI, power, controller.
2. Boot. Batocera resizes its partition to fill the card, reboots, lands on ES-DE with no games.
3. Plug in your controller → press any button → Batocera runs a mapping wizard. Follow prompts to bind D-pad, face buttons, L/R, Start, Select, analog sticks.
4. **Settings → Network Settings → Wi-Fi** — connect.
5. **Settings → System Settings → Updates and Downloads → Updates** — let Batocera pull the latest updates (few minutes).

### 3. Verify SSH / file sharing

Batocera exposes itself on the LAN by default:

- SSH: `ssh root@batocera.local` (password `linux`). Change it immediately: `passwd`.
- SMB / Samba: Windows/Mac Finder sees `\\BATOCERA` — drop ROMs directly into the exposed shares.
- Web UI: http://batocera.local/ — upload ROMs, change settings from any browser.

---

## Add BIOS, ROMs, controllers

### BIOS

Batocera expects BIOS at `/userdata/bios/`. Easiest: SMB copy from your PC into the `bios` network share.

Per-system BIOS requirements follow the systems docs in this repo — see the [support matrix](README.md#support-matrix) for the full list, and the individual [systems/](systems/) docs for file names and hashes.

Verify with: `Main Menu → Game Settings → Check BIOS`.

### ROMs

Per-system folders live at `/userdata/roms/<system>/`. Batocera's folder names follow ES-DE conventions: `nes`, `snes`, `n64`, `psx`, `pcengine`, `saturn`, etc.

Copy ROMs via SMB (`\\BATOCERA\roms\<system>\`), USB stick (Batocera auto-prompts to copy on insert), or FTP.

**After copying**, quit EmulationStation (Start → Quit → Restart EmulationStation). The new games appear.

### Controllers

- **USB**: plug it in. Batocera auto-detects; the built-in profile database covers Xbox, PS4/5, 8BitDo, Switch Pro, most arcade sticks.
- **Bluetooth**: `Controller Settings → Pair Bluetooth Device`. Works with Switch Pro, DualSense, 8BitDo wireless.
- **Arcade stick**: treat like a USB gamepad. Map buttons once; Batocera saves the profile.
- **GPIO / custom buttons**: Batocera supports MK_Arcade (GPIO encoder drivers) out of the box. See [Arcade cabinet build](#arcade-cabinet-build) below.

---

## Arcade cabinet build

Going beyond "Pi on the TV". A few form factors and the hardware notes that come with each.

### Bartop cabinet (counter-top)

~18–24" tall, fits on a desk or bar. Holds a 17–24" LCD, a single control panel with joystick + 6 buttons for 1–2 players.

- **Display**: any 17–22" LCD. 4:3 is nostalgic but hard to find; 16:9 with pillarboxing works fine.
- **Control panel**: Sanwa or Seimitsu sticks + buttons. Wire to a **Zero Delay USB encoder** (~$15) or **Brook UFB** ($60, better) → USB into the Pi.
- **Case**: prebuilt kits on Amazon ($150–$300) or DIY from MDF.

### Full-size upright cabinet

~60" tall, full arcade vibes. Same Pi, bigger monitor (24–32"), 2 player panel.

- Wiring approach unchanged — Zero Delay or Brook per player panel.
- Add a **marquee light** (cheap LED strip).
- Sound: add a 30–50 W amp + cheap 6" speakers.

### Cocktail table

Sit-down two-player, game rotates per player.

- **Two separate encoders** (one per player side) — each appears as its own controller.
- **Screen rotation**: enable per-system in Batocera → `Advanced settings → Rotate screen`.

### Pi placement and power

- **Thermals** are not a joke in an enclosed cabinet. Use an Argon case with fan, or add a 40 mm case fan inside the cabinet.
- Pi 5 specifically: the new PSU spec is 5 V / 5 A. Older 3 A PSUs will under-volt and cause random reboots during intense emulation.

### Arcade stick and button quality

The difference between a $15 generic stick and a Sanwa JLF is night and day for fighters. If fighting games are a big part of your plan, budget for:

- **Sanwa JLF** joystick (~$20) + **Sanwa OBSF-30** buttons (~$3 each × 8).
- **Brook UFB** encoder (~$60). Supports lag-free USB + up to 16 buttons and standard gamepad mappings. Unlike Zero Delay, no driver hacks needed.

### Coin button

Put a **coin button** on the cabinet for authenticity. Maps to Select in most arcade games (insert coin).

---

## Tips and gotchas

### Safe shutdown

**Never pull power.** SD corruption is the #1 way a Pi build dies.

- Batocera shuts down cleanly via Start → Quit → Shutdown.
- Add a **physical power button** via GPIO using Batocera's built-in support (`Settings → System Settings → GPIO Power Button`).
- Argon ONE cases have a real power button wired into the GPIO.

### Overclocking (Pi 4)

Pi 4 comfortably runs at 2.0 GHz with adequate cooling. Edit `/boot/config.txt`:

```
over_voltage=6
arm_freq=2000
```

Pi 5 overclocks to ~2.8 GHz with the same voltage bump. **Do not overclock without active cooling.**

### Shader presets

Batocera bundles a curated shader pack. Top picks:

- **crt-guest-advanced** — best overall CRT shader.
- **crt-royale** — most accurate scanlines; heavier GPU load.
- **lcd-grid** — for Game Boy / Game Gear / handheld feel.
- **zfast_crt** — light-weight, works on Pi 3.

Set per-system or globally under `Game Settings → Shaders`.

### Save states and sync

Batocera auto-saves state on exit (configurable). States live in `/userdata/saves/<system>/`.

To sync saves with a desktop emulator setup on another machine, pair Batocera with [Syncthing](apps/management/syncthing.md):

```bash
# SSH into Batocera
ssh root@batocera.local
pacman -S syncthing                              # Batocera uses pacman
```

Or use [rclone](apps/management/rclone.md) to push saves to Google Drive / Dropbox on a cron.

### Netplay (online multiplayer)

Batocera's RetroArch supports netplay out of the box. Two Batocera Pis on the same network can join each other's sessions for Street Fighter II, Smash Bros, etc. Hosting across the internet works with port forwarding.

### Themes

ES-DE on Batocera supports dozens of themes. Browse → `UI Settings → Theme Set`. Favorites:

- **Modern-DE** — default, clean.
- **Art Book Next** — pixel-art encyclopedia.
- **ComicBook-DE** — comic-panel panels.
- **CRT-Launcher** — full CRT TV simulation.

### Kodi

Batocera bundles Kodi. From the main menu → Kodi. Turns your arcade into a home-theater PC when you're not playing.

---

## Troubleshooting

| Symptom                                     | Fix                                                                                       |
| ------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Pi boots to a rainbow screen and hangs      | SD card failing or under-written image. Re-flash with Raspberry Pi Imager.                |
| Under-voltage warning (lightning bolt icon) | PSU too weak. Pi 4 needs 3 A USB-C, Pi 5 needs 5 A USB-C.                                 |
| Games run slow / audio cracks               | Thermal throttling. Check `/sys/class/thermal/thermal_zone0/temp` — >80 °C = add cooling. |
| Controller works at menu but not in-game    | RetroArch lost the per-core mapping. Re-run controller config; quit and reboot.           |
| "BIOS missing" at game launch               | Filename or hash mismatch. Use Batocera's BIOS checker to see exactly what it wants.      |
| Arcade stick has ghost inputs               | Cheap encoder. Replace with a Brook UFB.                                                  |
| Saturn / CPS3 games drop frames on Pi 4     | Expected. Pi 5 for those titles.                                                          |
| SSH works but SMB doesn't                   | Firewall or Wi-Fi isolation on your router. SSH from the Pi (`ping`) to verify network.   |
| Pi 5 random reboots under load              | Using an old Pi 4 PSU. Buy the official 27 W.                                             |

---

## Related docs in this repo

- [README — support matrix](README.md#support-matrix) — what each system needs, across platforms.
- [systems/arcade.md](systems/arcade.md) — MAME / FB Neo ROM-set version matching.
- [systems/neogeo.md](systems/neogeo.md) — `neogeo.zip` / UniBIOS setup.
- [apps/management/syncthing.md](apps/management/syncthing.md) — save-file sync between your Pi arcade and other devices.
- [apps/management/rclone.md](apps/management/rclone.md) — cloud-based save sync.
- [apps/management/romvault.md](apps/management/romvault.md) — ROM set verification.
- [apps/management/disc-tools.md](apps/management/disc-tools.md) — `chdman` for PS1 / Saturn / Sega CD compression.
- [scripts/](scripts/README.md) — backup scripts (adapt `emudeck-backup.sh` by pointing `SRC_DIR` at `/userdata/` for Batocera).
