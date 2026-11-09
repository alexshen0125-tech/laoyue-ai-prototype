#!/bin/bash
cd "$(dirname "$0")"
line=$(sed -n "${1}p" run.txt)
IFS='|' read n b s <<< "$line"
./gen.sh "$n" "$b" "$s"
