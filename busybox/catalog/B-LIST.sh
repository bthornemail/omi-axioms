#!/bin/sh
# tag: LIST
# title: an applet's name is the leaf of its install path
# category: frame
# applets: tr wc sed cmp
# claim: `busybox --list` equals `busybox --list-full` with each directory stripped, line for line and same count — the install path is the frame, the applet name is its leaf (payload). (The author's --list / --list-full pair.)
set -eu
BB=${BB:-busybox}
fail(){ echo "FAIL($0): $*" >&2; exit 1; }
d=$(mktemp -d); trap 'rm -rf "$d"' EXIT

"$BB" --list      > "$d/names"
"$BB" --list-full > "$d/paths"

# assert: the two listings have the same number of lines
n=$("$BB" wc -l < "$d/names" | "$BB" tr -d ' ')
p=$("$BB" wc -l < "$d/paths" | "$BB" tr -d ' ')
[ "$n" = "$p" ] || fail "line counts differ: names=$n paths=$p"
# assert: stripping the directory from each path yields the names, line for line
"$BB" sed 's#.*/##' "$d/paths" | "$BB" cmp -s - "$d/names" || fail "basename(--list-full) != --list"

echo "LIST: an applet's name is the leaf of its install path — passed"
