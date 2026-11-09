#!/bin/bash
cd "$(dirname "$0")"
seq 1 16 | xargs -P 4 -I{} ./one.sh {}
echo ALLDONE
