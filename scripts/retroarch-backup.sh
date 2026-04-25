#!/usr/bin/env bash
# retroarch-backup.sh — back up or restore a RetroArch configuration tree.
#
# Usage:
#   scripts/retroarch-backup.sh backup  [OUT_DIR]   # default OUT_DIR = cwd
#   scripts/retroarch-backup.sh restore ARCHIVE.tar.gz
#
# Tweak SRC_DIR / PATHS below to taste. The script will skip missing entries
# so it's safe to leave extras in PATHS.

set -euo pipefail

# =====================================================================
# Configuration — edit these freely.
# =====================================================================

# Root of your RetroArch config. Leave blank to auto-detect (Flatpak /
# Linux / macOS). Override by exporting SRC_DIR before running, or by
# hard-coding a path here.
SRC_DIR="${SRC_DIR:-}"

# Paths (relative to SRC_DIR) to include in the backup.
# Comment out anything you don't want; uncomment the optional ones
# (downloads, thumbnails) if you do.
PATHS=(
  retroarch.cfg   # main config file
  config          # per-core overrides + remap files
  system          # BIOS / firmware
  saves           # SRAM + memory-card saves
  states          # save states
  playlists       # scanned game lists (.lpl)
  cheats          # cheat databases
  screenshots     # in-game captures
  overlays        # custom overlays / bezels you added
  shaders         # custom shader presets
  # downloads     # ROMs / cores downloaded via RetroArch (large)
  # thumbnails    # scraped box art (large — easy to re-download)
  # assets        # RetroArch UI assets (easy to re-download)
)

# =====================================================================

# Auto-detect SRC_DIR if not set.
auto_detect_src() {
  local candidates=(
    "$HOME/.var/app/org.libretro.RetroArch/config/retroarch"   # Linux Flatpak
    "$HOME/.config/retroarch"                                  # Linux apt / AppImage
    "$HOME/Library/Application Support/RetroArch"              # macOS
  )
  for c in "${candidates[@]}"; do
    if [ -d "$c" ]; then echo "$c"; return 0; fi
  done
  return 1
}

if [ -z "$SRC_DIR" ]; then
  SRC_DIR="$(auto_detect_src || true)"
fi

require_src_dir() {
  if [ -z "$SRC_DIR" ]; then
    echo "ERROR: could not find a RetroArch config directory." >&2
    echo "Set SRC_DIR in the script or export SRC_DIR=/path/to/retroarch" >&2
    exit 1
  fi
}

CMD="${1:-}"
STAMP="$(date +%Y%m%d-%H%M%S)"

backup() {
  require_src_dir
  local out_dir="${1:-$PWD}"
  mkdir -p "$out_dir"
  local archive="$out_dir/retroarch-backup-$STAMP.tar.gz"

  echo "Source : $SRC_DIR"
  echo "Archive: $archive"
  echo ""

  local include=()
  for p in "${PATHS[@]}"; do
    if [ -e "$SRC_DIR/$p" ]; then
      echo "  + $p"
      include+=("$p")
    else
      echo "  - $p (missing, skipped)"
    fi
  done

  if [ ${#include[@]} -eq 0 ]; then
    echo "Nothing to back up." >&2
    exit 1
  fi

  tar -czf "$archive" -C "$SRC_DIR" "${include[@]}"
  echo ""
  echo "Done: $archive ($(du -h "$archive" | cut -f1))"
}

restore() {
  require_src_dir
  local archive="${1:-}"
  if [ -z "$archive" ] || [ ! -f "$archive" ]; then
    echo "ERROR: pass a valid .tar.gz as the second argument." >&2
    exit 1
  fi

  echo "Target : $SRC_DIR"
  echo "Archive: $archive"
  echo ""

  if [ -d "$SRC_DIR" ]; then
    local bak="${SRC_DIR}.bak-$STAMP"
    echo "Moving existing config → $bak"
    mv "$SRC_DIR" "$bak"
  fi

  mkdir -p "$SRC_DIR"
  tar -xzf "$archive" -C "$SRC_DIR"
  echo "Done. Restored $SRC_DIR"
}

case "$CMD" in
  backup)  shift; backup "$@" ;;
  restore) shift; restore "$@" ;;
  *)
    echo "Usage:"
    echo "  $0 backup  [OUT_DIR]"
    echo "  $0 restore ARCHIVE.tar.gz"
    echo ""
    echo "Detected SRC_DIR: ${SRC_DIR:-<not found>}"
    exit 2
    ;;
esac
