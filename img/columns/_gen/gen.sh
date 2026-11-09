#!/bin/bash
# 用法: gen.sh <输出名> <底色描述> <角色描述>
name="$1"; bg="$2"; subj="$3"
base="$(cd "$(dirname "$0")" && pwd)"
out="$base/../$name.png"; [ -f "$out" ] && { echo "SKIP $name"; exit 0; }
ref="/Users/shenliang/Desktop/one person/配图/新号_头像/老岳_头像.png"
dir=$(mktemp -d)
cp "$ref" "$dir/ref.png"
{
printf '%s\n\n' "Use \$imagegen to generate exactly one SQUARE 1:1 image (1024x1024) with the built-in image_gen tool, using the attached reference image ONLY as a STYLE reference, then copy the final PNG to ./out.png in the current working directory. Reply with only the file path."
printf '%s\n' "Make a profile avatar for an editorial column mascot. Match the reference's art style exactly: warm hand-drawn cartoon illustration, clean confident dark ink outlines of even medium thickness, flat soft colors with gentle cel shading, small pink blush marks on the cheeks, simple dot-and-highlight eyes, friendly open smile, subtle paper grain texture. Same illustration family as the reference, but the character is NOT a human: $subj"
printf '%s\n' "Background: one solid flat color $bg filling the whole square, no gradient, no pattern, no shadow on background, no transparency. Single centered character, large, face clearly visible, generous margin so a circular crop keeps everything; readable when shrunk to a 40px circle. Palette for the character: ink black #161616, warm white #FFF8E7, navy #1F2A55, brand yellow #FFD84D, plus at most one small accent color. Absolutely no text, no letters, no numbers, no logo, no watermark, no human, no human face, no hands of a person, not photorealistic, not 3D render."
} > "$dir/p.txt"
( cd "$dir" && NODE_OPTIONS= codex exec --skip-git-repo-check --sandbox workspace-write -C "$dir" -i "$dir/ref.png" - < "$dir/p.txt" > "$base/$name.log" 2>&1 )
cp "$dir/p.txt" "$base/$name.prompt.txt"
if [ -f "$dir/out.png" ]; then cp "$dir/out.png" "$out"; echo "OK $name"; else echo "FAIL $name"; fi
rm -rf "$dir"
