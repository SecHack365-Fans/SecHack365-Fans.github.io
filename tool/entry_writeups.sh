#!/usr/bin/env bash

set -euo pipefail

year="${1:-${YEAR:-2023}}"
include_tsukushi="${EXIST_TSUKUSHI:-false}"

if [[ ! "$year" =~ ^[0-9]{4}$ ]]; then
    echo "年は4桁の数字で指定してください: $year" >&2
    exit 1
fi

script_directory="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
repository_root="$(cd -- "$script_directory/.." && pwd)"
source_root="${SOURCE_ROOT:-$repository_root/../TsukuCTF$year}"
target_parent="${TARGET_ROOT:-$repository_root/pages/ctf/TsukuCTF$year}"
target_directory="$target_parent/writeups"

if [[ ! -d "$source_root" ]]; then
    echo "コピー元が見つかりません: $source_root" >&2
    exit 1
fi

mkdir -p "$target_parent"
staging_directory="$(mktemp -d "$target_parent/.writeups-${year}.XXXXXX")"
backup_directory=""

cleanup() {
    if [[ -n "$backup_directory" && -d "$backup_directory" && ! -d "$target_directory" ]]; then
        mv -- "$backup_directory" "$target_directory"
    fi
    if [[ -n "$staging_directory" && -d "$staging_directory" ]]; then
        rm -rf -- "$staging_directory"
    fi
}
trap cleanup EXIT

shopt -s nocaseglob nullglob
categories=(osint crypto misc rev web hardware network)

if [[ "$include_tsukushi" == "true" ]]; then
    categories+=(tsukushi)
fi

copied_count=0
for category in "${categories[@]}"; do
    category_directory="$source_root/$category"
    [[ -d "$category_directory" ]] || continue

    for challenge_directory in "$category_directory"/*; do
        [[ -d "$challenge_directory" ]] || continue

        writeup_directory="$challenge_directory/writeup"
        [[ -f "$writeup_directory/README.md" ]] || continue

        challenge_name="$(basename -- "$challenge_directory")"
        destination="$staging_directory/$challenge_name"
        mkdir -p "$destination"
        cp -R -- "$writeup_directory/." "$destination/"
        ((copied_count += 1))
    done
done

if ((copied_count == 0)); then
    echo "取り込めるwriteupが見つかりませんでした。既存データは変更していません。" >&2
    exit 1
fi

if [[ -d "$target_directory" ]]; then
    backup_directory="$(mktemp -d "$target_parent/.writeups-backup-${year}.XXXXXX")"
    rmdir -- "$backup_directory"
    mv -- "$target_directory" "$backup_directory"
fi

if ! mv -- "$staging_directory" "$target_directory"; then
    echo "writeupの入れ替えに失敗しました。既存データを復元します。" >&2
    exit 1
fi

staging_directory=""
if [[ -n "$backup_directory" ]]; then
    rm -rf -- "$backup_directory"
    backup_directory=""
fi

echo "$copied_count 件のwriteupを TsukuCTF$year に取り込みました。"
