# Building a dedicated retro arcade

End-to-end guide for putting together a single-purpose retro arcade — either by **modding a commercial cabinet you already own**, **building from a DIY shell/kit**, or **rolling your own on a Raspberry Pi**. Covers the hardware, software, and decision-making for each path.

- [Modding a commercial cabinet](#modding-a-commercial-cabinet)
- [Starting from scratch: shells, kits, plans](#starting-from-scratch-shells-kits-plans)
- [The Raspberry Pi path](#the-raspberry-pi-path)
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

## Modding a commercial cabinet

If you already own (or want to buy) a consumer-grade "home arcade" cabinet, you can usually rip out the stock logic board and drop in a real emulator host (Pi, mini PC, or laptop). The stock panel, joysticks, buttons, screen, speakers, and artwork stay — you just replace the brain.

### Arcade1Up (the biggest modding community by far)

Arcade1Up has shipped dozens of cabinet models across four+ "generations". Not all are equally mod-friendly; the two numbers that matter are **screen size** and **panel connectors**.

| Gen            | Years     | Screen         | Typical models                                                             | Mod difficulty                                        |
| -------------- | --------- | -------------- | -------------------------------------------------------------------------- | ----------------------------------------------------- |
| 1              | 2018–2019 | 17"            | Street Fighter II CE, Mortal Kombat, Galaga, Centipede, Rampage, Asteroids | Easy — LVDS display + simple wiring; plenty of guides |
| 2              | 2019–2020 | 17"            | Marvel Super Heroes, Big Buck Hunter, NBA Jam, X-Men vs Street Fighter     | Easy — same LVDS bus                                  |
| 3              | 2020–2021 | 17"–19"        | Ninja Turtles, Simpsons, Killer Instinct, Star Wars                        | Medium — some use proprietary cable routing           |
| 4              | 2022+     | 19"–24"        | MK Gold, Big Blue Live, Pro Series cabinets (riser included)               | Medium — newer models use 4K LCDs with HDMI inputs    |
| 5 / "Infinity" | 2024+     | 24" + rotating | Infinity Game Table derivatives, Pro Plus Jamma Edition                    | Easiest — some ship with HDMI and generic USB         |

**Recommended targets for modding:**

- **Street Fighter II Champion Edition** (Gen 1) — cheapest used, massive mod scene, most YouTube guides target this cabinet.
- **Big Buck Hunter Pro** (Gen 2) — has a real light-gun rail you can rewire.
- **Pro Series Mortal Kombat / X-Men** (Gen 3/4) — bigger screen + sturdier panel.
- **Jamma Edition** (if you can find one) — already has a JAMMA connector; trivial to drop in a Pi or MisterFPGA.

**What the mod actually involves:**

1. Unscrew the back panel. Unplug the stock logic board (one ribbon cable to the screen, one harness to the joysticks/buttons, one to the speakers, power in).
2. Replace with either:
   - **Raspberry Pi 4 or 5** (cheapest; see [the Pi path](#the-raspberry-pi-path) below).
   - A **mini PC** like an Intel NUC, Beelink, Minisforum UM780, or used ThinkCentre M75q — unlocks PS2 / GameCube / Wii / Switch / Wii U.
   - A **Steam Deck dock + Deck** for the full EmuDeck experience in a cabinet.
3. Connect the screen via HDMI. For **Gen 1–3 cabinets** you need an **LVDS-to-HDMI converter board** (~$25 on Amazon) because the stock screen is LVDS. Gen 4+ usually already has HDMI.
4. Wire joystick + buttons into a **Zero Delay USB encoder** (~$15) or **Brook UFB** ($60, better) → plugs into the Pi / mini PC as a USB HID gamepad. Solder-free via dupont connectors.
5. Reconnect speakers (most cabinets have a simple 2-wire amp; leave it alone or upgrade to a cheap PAM8610 class-D amp).
6. Stuff the new hardware inside. Power from the stock AC-to-DC brick works for Pi; mini PCs usually want their own brick.

Active community resources:

- `/r/Arcade1Up` on Reddit — mod logs, model identification help.
- **RGT85 on YouTube** — Gen 1 SF2 cabinet teardown and mod end-to-end.
- **ETA Prime on YouTube** — multiple cabinets × multiple hosts (Pi, mini PC, Switch).
- **Arcade1Up-modding forums** on badcaps.net.

### AtGames Legends (Ultimate / Pinball / Gamer Pro)

AtGames ships cabinets in the same price range as Arcade1Up. Legends Ultimate in particular runs Linux under the hood, so modding paths include both **full replacement** (gut the brain) and **sideload** (enable the AddOn folder to run extra ROMs alongside the stock library).

| Model                    | Size         | Mod path                                                                     |
| ------------------------ | ------------ | ---------------------------------------------------------------------------- |
| Legends Ultimate (2020+) | Full upright | Sideload + AddOn: expose USB, drop RetroArch binaries; no disassembly needed |
| Legends Pinball          | Full pinball | Linux underneath; active mod community for adding VPinball tables            |
| Legends Gamer Pro / Mini | Bartop       | Full internals replacement with Pi / mini PC                                 |

Legends Ultimate's built-in ArcadeNet streaming service is proprietary and not interesting to emulation; but the cabinet itself is solid hardware that responds well to being repurposed.

### iiRcade

iiRcade ships full-size cabinets running Android under the hood. You can root it and sideload RetroArch / Dolphin / PPSSPP directly. The stock 19" 1080p IPS screen is the best-in-class among consumer arcade cabinets, making iiRcade worth modding even though its stock game library is already decent.

- Rooted iiRcade + sideloaded Lemuroid (RetroArch Android) = one of the best turnkey cabinet experiences with minimal disassembly.

### Neo Legend / Neo Arcadia (European)

Premium pre-built cabinets (~€1,500–€3,500) that ship with real arcade parts (Sanwa sticks, Suzo-Happ buttons) and genuinely play-grade monitors. They already run a customized RetroArch/EmulationStation underneath, so "modding" mostly means installing your own ROM library. Worth considering if your budget allows buying furniture quality without DIY.

### Polycade / Recroom / Arcade Legacy

Higher-end American offerings (~$1,500–$4,000) with wall-mount aluminum cabinets, great controls, premium monitors. Typically ship with a Windows PC inside running a curated launcher — you can wipe and install your own setup without voiding anything important.

### Claw machines / retro TV stands

If you find an old dead arcade cabinet at a flea market (Neo Geo MVS cabinet, Capcom Big Blue, Taito Vewlix) — **those are the real jackpot**. Original arcade chassis have proper monitors (sometimes CRTs), industrial controls, and cabinet construction that puts consumer gear to shame. Restoring one is a serious project but the result is indistinguishable from an actual arcade cabinet.

Watch **eBay**, **Craigslist/OfferUp**, and the **KLOV** forum for leads.

---

## Starting from scratch: shells, kits, plans

If you want to build rather than mod, three tiers exist — from "finish it over a weekend" to "full woodworking project".

### Pre-cut flatpack kits (easiest DIY)

Buy pre-cut MDF that you assemble yourself. All the complex woodwork is done; you screw it together, paint or vinyl-wrap, install electronics.

| Seller / kit                               | Form factor        | ~Price    | Notes                                            |
| ------------------------------------------ | ------------------ | --------- | ------------------------------------------------ |
| **Paradise Arcade Shop** — "Flatpack" kits | Bartop, upright    | $180–$500 | US-based; lots of joystick/button add-on options |
| **LVL Up Arcade Games** — MDF kits         | Bartop, pedestal   | $200–$400 | Based on open-source Koenigs plans               |
| **Retro Active Arcade** (Etsy)             | Bartop             | $150–$300 | Hobbyist-grade; varies by seller                 |
| **Project Arcade** pedestal kits           | Pedestal / standup | $300–$600 | Large "diner-style" cabinets                     |
| **Xtension Arcade** control panels         | Just the panel     | $100–$300 | Drop-in replacements for stock Arcade1Up panels  |

### Free open-source plans (pure DIY)

For the woodworker. Download plans, buy MDF sheets, cut your own with a table saw or CNC.

- **Koenigs-style bartop plans** — the community-standard 19"-monitor bartop; plans on https://www.kengoodhope.com/ and mirrored many places.
- **Vewlix-style flatted upright** — Taito's late-2000s arcade cabinet design; free plans floating on arcade-modding forums.
- **LVL Up / MDF bartop plans** — free download from their site in exchange for an email.
- **MAMEroom.com** — large archive of free arcade cabinet plans (bartop, full size, cocktail).
- **BYOAC (Build Your Own Arcade Controls)** — the original forum/wiki for DIY arcade, still active: https://www.arcadecontrols.com/ — thousands of build logs with plans and photos.

Tool investment: table saw, pocket-hole jig, orbital sander. Budget ~$100 of MDF + $100 of T-molding / laminate per cabinet.

### Tabletop / portable shells

If you don't want furniture-grade, several projects give you a small play-anywhere arcade enclosure:

| Project                     | Host        | Form factor             | Notes                                                   |
| --------------------------- | ----------- | ----------------------- | ------------------------------------------------------- |
| **Picade (Pimoroni)**       | Pi 4/5      | Bartop-like 10" LCD     | Kit with LCD, speakers, Sanwa-compatible buttons; ~$300 |
| **GPi Case 2W** (Retroflag) | Pi Zero 2 W | Game Boy-style handheld | ~$70; cute, uses a tiny LCD                             |
| **RetroPie Arcade-X**       | Pi 4        | Bartop (DIY MDF)        | Community-maintained build files                        |
| **Argon POD** + stick       | Pi 4 / Pi 5 | Desk-sized              | Pi case + external arcade stick                         |

### Well-known open-source cabinet projects

These are software/hardware bundles where the cabinet design, controls, and software image are all published together — ready to clone.

- **RetroFlag NESPi / SuperPi / MegaPi** — retro-console-shaped Pi cases that map the look of the machine they emulate. Not an arcade per se, but a popular "dedicated hardware" option.
- **MiSTer FPGA** — open-source FPGA-based hardware that reimplements retro systems at the cycle level. Fits in a Pi-like form factor but uses a DE10-Nano FPGA board. Dramatically more accurate than a Pi for shmups/fighters. Pricey (~$250+) but the endgame for emulation purists. See https://mister-devel.github.io/.
- **RetroPie's** community prebuilt images + the matching MDF cabinet plans (see BYOAC for matching hardware).
- **Batocera** community has shared images paired with specific cabinets (Picade, Arcade1Up mods).
- **OpenEmulator** + specific 3D-printable cabinets on Thingiverse / Printables.

### What to buy for controls (regardless of cabinet)

- **Joystick**: Sanwa JLF (~$20) is the fighting-game standard. Seimitsu LS-32 is an alternative with a shorter throw. Avoid sub-$10 generic sticks for anything serious.
- **Buttons**: Sanwa OBSF-30 (~$3 each) × 6–8 per player.
- **Encoder**: **Brook Universal Fighting Board (UFB)** ($60) is the gold standard — lag-free, supports all major consoles and PC simultaneously. **Zero Delay USB encoder** ($15) is the budget option; works fine but detected as a generic HID device.
- **Trackball** (if you want Centipede / Marble Madness): Ultimarc U-Trak (~$80) + their I-PAC 2 encoder.
- **Light gun** (if you want House of the Dead / Time Crisis): Sinden Lightgun ($130) — works on any LCD, ships with its own software.

---

## The Raspberry Pi path

The rest of this doc covers the specific case of **building on a Raspberry Pi** — the cheapest way to get from zero to playing. If you're modding a commercial cabinet, most of the below still applies (swap "Pi" for "mini PC" mentally where appropriate).

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
