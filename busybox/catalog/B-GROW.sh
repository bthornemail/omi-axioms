#!/bin/sh
# tag: GROW
# title: append extends the file; the complement of truncate
# category: redirection
# applets: cat wc tr
# claim: `>>` appends — after `printf A > F; printf B >> F`, F is A+B and grew by exactly |B|. `>` replaces, `>>` keeps and extends. (F is not an input to the command — see ../pending.)
set -eu
BB=${BB:-busybox}
fail(){ echo "FAIL($0): $*" >&2; exit 1; }
d=$(mktemp -d); trap 'rm -rf "$d"' EXIT
bytes(){ "$BB" wc -c < "$1" | "$BB" tr -d ' '; }

printf 'AAAA' > "$d/f"
b0=$(bytes "$d/f")
printf 'BBB' >> "$d/f"
b1=$(bytes "$d/f")

# assert: the content is A followed by B
[ "$("$BB" cat "$d/f")" = "AAAABBB" ] || fail "append did not yield A+B"
# assert: the file grew by exactly |B| = 3
[ "$b1" -eq $(( b0 + 3 )) ] || fail "append size wrong (b0=$b0 b1=$b1)"
# assert: strictly larger than before
[ "$b1" -gt "$b0" ] || fail "append did not grow the file"

echo "GROW: append extends the file by the bytes appended — passed"
