#!/bin/sh
# tag: NOFIX
# title: the self-append loop has no fixed point
# category: awareness
# applets: cat wc tr
# claim: iterating F <- A+F+B (A,B nonempty) increases |F| by the same positive constant each step, so it never reaches a fixed point — the loop halts only by an external limit, never by itself. (The 121 MB file, deterministically, via a snapshot so no byte is read while it is written.)
set -eu
BB=${BB:-busybox}
fail(){ echo "FAIL($0): $*" >&2; exit 1; }
d=$(mktemp -d); trap 'rm -rf "$d"' EXIT
bytes(){ "$BB" wc -c < "$1" | "$BB" tr -d ' '; }

printf 'A' > "$d/a"; printf 'B' > "$d/b"; printf 'seed' > "$d/f"
inc=$(( $(bytes "$d/a") + $(bytes "$d/b") ))
step(){ "$BB" cat "$d/f" > "$d/snap"; "$BB" cat "$d/a" "$d/snap" "$d/b" > "$d/f"; }

s0=$(bytes "$d/f")
step; s1=$(bytes "$d/f")
step; s2=$(bytes "$d/f")
step; s3=$(bytes "$d/f")

# assert: each step grows by the same positive constant inc = |A|+|B| (no fixed point)
[ "$s1" -eq $((s0 + inc)) ] && [ "$s2" -eq $((s1 + inc)) ] && [ "$s3" -eq $((s2 + inc)) ] \
  || fail "increment not constant (sizes $s0 $s1 $s2 $s3, inc=$inc)"
# assert: strictly increasing — the sequence never settles
[ "$s1" -gt "$s0" ] && [ "$s2" -gt "$s1" ] && [ "$s3" -gt "$s2" ] || fail "sequence settled"

echo "NOFIX: the self-append loop has no fixed point — passed"
