#!/usr/bin/env bash
# retrodeck-backup.sh — back up or restore a RetroDeck install.
#
# Usage:
#   scripts/retrodeck-backup.sh backup  [OUT_DIR]
#   scripts/retrodeck-backup.sh restore ARCHIVE.tar.gz
#
# RetroDeck has two parallel trees to preserve:
#   1. ~/retrodeck/                              (user data — roms, bios, saves)
#   2. ~/.var/app/net.retrodeck.retrodeck/       (Flatpak sandbox — per-emulator configs)

set -euo pipefail

# =====================================================================
# Configuration — edit these freely.
# =====================================================================

# Each SOURCE entry is "LABEL|ROOT_DIR|rel_path1,rel_path2,..."
# The LABEL becomes a folder inside the archive so restore can route
# the files back to the right root. Add/remove entries to fit your setup.
SOURCES=(
  "data|$HOME/retrodeck|bios,saves,states,screenshots"
  # "data|$HOME/retrodeck|bios,saves,states,screenshots,roms"  # ← with ROMs
  "flatpak|$HOME/.var/app/net.retrodeck.retrodeck|config,data"
)

# =====================================================================

CMD="${1:-}"
STAMP="$(date +%Y%m%d-%H%M%S)"

backup() {
  local out_dir="${1:-$PWD}"
  mkdir -p "$out_dir"
  local archive="$out_dir/retrodeck-backup-$STAMP.tar.gz"
  local staging
  staging="$(mktemp -d)"
  # shellcheck disable=SC2064  # intentional: expand $staging at trap time
  trap "rm -rf '$staging'" EXIT

  echo "Archive: $archive"
  echo ""

  local any=0
  for entry in "${SOURCES[@]}"; do
    local label="${entry%%|*}"
    local rest="${entry#*|}"
    local root="${rest%%|*}"
    local paths_csv="${rest#*|}"

    echo "[$label] $root"
    if [ ! -d "$root" ]; then
      echo "  (missing, skipped)"
      continue
    fi

    mkdir -p "$staging/$label"
    IFS=',' read -r -a paths <<< "$paths_csv"
    for p in "${paths[@]}"; do
      p="${p// /}"  # strip whitespace
      if [ -e "$root/$p" ]; then
        echo "  + $p"
        cp -a "$root/$p" "$staging/$label/"
        any=1
      else
        echo "  - $p (missing, skipped)"
      fi
    done
  done

  if [ "$any" -eq 0 ]; then
    echo "Nothing to back up." >&2
    exit 1
  fi

  tar -czf "$archive" -C "$staging" .
  echo ""
  echo "Done: $archive ($(du -h "$archive" | cut -f1))"
}

restore() {
  local archive="${1:-}"
  if [ -z "$archive" ] || [ ! -f "$archive" ]; then
    echo "ERROR: pass a valid .tar.gz as the second argument." >&2
    exit 1
  fi

  echo "Archive: $archive"
  echo ""

  local staging
  staging="$(mktemp -d)"
  # shellcheck disable=SC2064  # intentional: expand $staging at trap time
  trap "rm -rf '$staging'" EXIT
  tar -xzf "$archive" -C "$staging"

  for entry in "${SOURCES[@]}"; do
    local label="${entry%%|*}"
    local rest="${entry#*|}"
    local root="${rest%%|*}"
    local paths_csv="${rest#*|}"

    [ -d "$staging/$label" ] || { echo "[$label] not in archive, skipped"; continue; }
    echo "[$label] → $root"

    local bak=""
    IFS=',' read -r -a paths <<< "$paths_csv"
    for p in "${paths[@]}"; do
      p="${p// /}"
      if [ -e "$root/$p" ]; then
        [ -z "$bak" ] && bak="${root}.bak-$STAMP" && mkdir -p "$bak"
        mv "$root/$p" "$bak/"
      fi
    done
    [ -n "$bak" ] && echo "  (moved existing entries → $bak)"

    mkdir -p "$root"
    cp -a "$staging/$label/." "$root/"
    echo "  restored."
  done

  echo ""
  echo "Done."
}

case "$CMD" in
  backup)  shift; backup "$@" ;;
  restore) shift; restore "$@" ;;
  *)
    echo "Usage:"
    echo "  $0 backup  [OUT_DIR]"
    echo "  $0 restore ARCHIVE.tar.gz"
    echo ""
    echo "Sources configured:"
    for entry in "${SOURCES[@]}"; do
      echo "  - $entry"
    done
    exit 2
    ;;
esac
