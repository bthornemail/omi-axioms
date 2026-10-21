#!/bin/sh
# tag: CATID
# title: cat is a byte identity
# category: carrier
# applets: cat cmp wc tr
# claim: cat reproduces its input byte-for-byte (cat < F equals F), and cat F F is exactly twice the bytes of F — cat is the identity carrier the switches ride on.
set -eu
BB=${BB:-busybox}
fail(){ echo "FAIL($0): $*" >&2; exit 1; }
d=$(mktemp -d); trap 'rm -rf "$d"' EXIT
bytes(){ "$BB" wc -c < "$1" | "$BB" tr -d ' '; }

printf 'alpha\nbeta\n\0377z' > "$d/f"   # includes a 0xFF byte, no trailing newline

# assert: cat < F equals F, byte for byte
"$BB" cat < "$d/f" | "$BB" cmp -s - "$d/f" || fail "cat changed the bytes"
# assert: cat F F is exactly twice the size
n=$(bytes "$d/f")
nn=$("$BB" cat "$d/f" "$d/f" | "$BB" wc -c | "$BB" tr -d ' ')
[ "$nn" -eq $((2 * n)) ] || fail "cat F F != 2*|F| ($nn vs $((2 * n)))"

echo "CATID: cat is a byte identity — passed"
