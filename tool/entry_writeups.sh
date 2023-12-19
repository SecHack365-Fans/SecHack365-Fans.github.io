#!/bin/bash

YEAR=2023
EXIST_TSUKUSHI=false

shopt -s nocaseglob
categories=('osint' 'crypto' 'misc' 'rev' 'web' 'hardware')

if $EXIST_TSUKUSHI; then
    categories+=('tsukushi')
fi

if [ -d pages/ctf/TsukuCTF$YEAR/writeups ]; then
    rm -rf pages/ctf/TsukuCTF$YEAR/writeups
fi

for category in "${categories[@]}"; do
    if [ -d ../TsukuCTF$YEAR/$category ]; then
        for filename in ../TsukuCTF2023/$category/*; do
            base=$(basename $filename)
            filepath=$filename/writeup/README.md
            if [ ! -f $filepath ]; then
                continue
            fi
            mkdir -p pages/ctf/TsukuCTF2023/writeups/$base
            cp -rf $filename/writeup/ pages/ctf/TsukuCTF2023/writeups/$base/
        done
    fi
done
