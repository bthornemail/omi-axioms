#!/bin/sh
# tag: FRAME
# title: svg-switch toggles the payload, never the frame; twice is identity
# category: literal
# applets: grep cmp
# claim: scripts/svg-switch --rev reverses only the content of <text>/<tspan>, leaves tags and attributes byte-identical, and applied twice returns the exact original. Frame vs payload = literal vs reading.
set -eu
BB=${BB:-busybox}
fail(){ echo "FAIL($0): $*" >&2; exit 1; }
d=$(mktemp -d); trap 'rm -rf "$d"' EXIT
here=$(CDPATH= cd "$(dirname "$0")" && pwd)
SW=${SVG_SWITCH:-"$here/../../../scripts/svg-switch"}
[ -x "$SW" ] || fail "svg-switch not found or not executable at $SW"

printf '%s\n' '<svg xmlns="http://www.w3.org/2000/svg"><text x="10" y="20" fill="red">Hello World</text><rect width="5"/></svg>' > "$d/in.svg"
"$SW" --rev "$d/in.svg" > "$d/r.svg"

# assert: the frame is untouched — the text tag with its attributes survives byte-for-byte
"$BB" grep -q '<text x="10" y="20" fill="red">' "$d/r.svg" || fail "frame tag was altered"
# assert: a non-text element is untouched
"$BB" grep -q '<rect width="5"/>' "$d/r.svg" || fail "rect was altered"
# assert: the payload did change — direction toggled
"$BB" grep -q '>dlroW olleH<' "$d/r.svg" || fail "payload was not reversed"
# assert: twice is the identity — byte-identical to the original
"$SW" --rev "$d/r.svg" | "$BB" cmp -s - "$d/in.svg" || fail "rev twice != identity"

echo "FRAME: svg-switch toggles payload, not frame; twice = identity — passed"
