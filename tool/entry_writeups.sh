#!/bin/bash

YEAR=2023

shopt -s nocaseglob
categories=('osint' 'tsukushi' 'crypto' 'misc' 'rev' 'web' 'hardware')

for category in "${categories[@]}"; do
    if [ -d ../TsukuCTF$YEAR/$category ]; then
        for filename in ../TsukuCTF2023/$category/*; do
            base=$(basename $filename)
            mkdir -p pages/ctf/TsukuCTF2023/writeups/$base
            cp -f $filename/README.md pages/ctf/TsukuCTF2023/writeups/$base/README.md
        done
    fi
done
