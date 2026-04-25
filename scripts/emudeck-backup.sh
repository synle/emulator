#!/usr/bin/env bash
# emudeck-backup.sh — back up or restore an EmuDeck data tree.
#
# Usage:
#   scripts/emudeck-backup.sh backup  [OUT_DIR]
#   scripts/emudeck-backup.sh restore ARCHIVE.tar.gz
#
# EmuDeck stores everything under ~/Emulation/ by default. ROMs are
# excluded from backups by default (they're usually huge and trivially
# replaceable). Uncomment `roms` in PATHS if you want them included.

set -euo pipefail

# =====================================================================
# Configuration — edit these freely.
# =====================================================================

# Root of your EmuDeck data tree. Override by exporting SRC_DIR.
SRC_DIR="${SRC_DIR:-$HOME/Emulation}"

# Paths (relative to SRC_DIR) to include.
PATHS=(
  bios           # all BIOS / firmware dumps
  saves          # per-emulator save files, memory cards
  storage        # save states + screenshots shared across emulators
  tools          # Steam ROM Manager config, ES-DE settings, etc.
  # roms         # UNCOMMENT to include ROMs (very large)
)

# =====================================================================

CMD="${1:-}"
STAMP="$(date +%Y%m%d-%H%M%S)"

backup() {
  local out_dir="${1:-$PWD}"
  mkdir -p "$out_dir"
  local archive="$out_dir/emudeck-backup-$STAMP.tar.gz"

  if [ ! -d "$SRC_DIR" ]; then
    echo "ERROR: $SRC_DIR does not exist." >&2
    exit 1
  fi

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
  local archive="${1:-}"
  if [ -z "$archive" ] || [ ! -f "$archive" ]; then
    echo "ERROR: pass a valid .tar.gz as the second argument." >&2
    exit 1
  fi

  echo "Target : $SRC_DIR"
  echo "Archive: $archive"
  echo ""

  # Move any existing items we are about to overwrite into a timestamped
  # backup folder so nothing is silently clobbered.
  local bak=""
  for p in "${PATHS[@]}"; do
    if [ -e "$SRC_DIR/$p" ]; then
      [ -z "$bak" ] && bak="${SRC_DIR}.bak-$STAMP" && mkdir -p "$bak"
      mv "$SRC_DIR/$p" "$bak/"
    fi
  done
  [ -n "$bak" ] && echo "Moved existing entries aside → $bak"

  mkdir -p "$SRC_DIR"
  tar -xzf "$archive" -C "$SRC_DIR"
  echo "Done. Restored into $SRC_DIR"
}

case "$CMD" in
  backup)  shift; backup "$@" ;;
  restore) shift; restore "$@" ;;
  *)
    echo "Usage:"
    echo "  $0 backup  [OUT_DIR]"
    echo "  $0 restore ARCHIVE.tar.gz"
    echo ""
    echo "SRC_DIR: $SRC_DIR"
    exit 2
    ;;
esac
