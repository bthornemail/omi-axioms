#!/bin/sh
# tag: TETRA
# title: XOR byte-distance is a metric — the tetrahedron's six edges
# category: distance
# applets: od tr grep paste
# claim: over four equal-length vertices (WORD GOD OF of), each of the six unordered pairs has an XOR mask whose popcount is a Hamming distance, and that distance obeys the three metric laws: d(A,A)=0 (identity — distance 0 is only a copy, the mirror), d(A,B)=d(B,A) (symmetry), d(A,C)<=d(A,B)+d(B,C) (triangle). The count of six edges is a consequence of four vertices, not evidence of anything. (The author's tetra-mask, as a check that can say no.)
set -eu
BB=${BB:-busybox}
fail(){ echo "FAIL($0): $*" >&2; exit 1; }
d=$(mktemp -d); trap 'rm -rf "$d"' EXIT

# Hamming distance = popcount of the byte-wise XOR of two equal-length strings.
# Pure BusyBox: od for raw bytes, paste to align, shell arithmetic for XOR+popcount.
decs(){ printf '%s' "$1" | "$BB" od -An -tu1 | "$BB" tr -s ' \t\n' '\n' | "$BB" grep .; }
hamming(){
  decs "$1" > "$d/x"; decs "$2" > "$d/y"
  counts=$("$BB" paste "$d/x" "$d/y" | while read -r a b; do
    z=$(( a ^ b )); c=0; i=0
    while [ "$i" -lt 8 ]; do c=$(( c + ((z >> i) & 1) )); i=$(( i + 1 )); done
    echo "$c"
  done)
  t=0; for c in $counts; do t=$(( t + c )); done
  echo "$t"
}

# four equal-length (4-byte) vertices standing for WORD GOD OF of
V1='WORD'; V2='GODS'; V3='LEFT'; V4='rite'
VS='V1 V2 V3 V4'

# assert: identity — a vertex against itself is distance 0 (a copy, the mirror)
for v in $VS; do eval "s=\$$v"; [ "$(hamming "$s" "$s")" -eq 0 ] || fail "d($v,$v) != 0"; done

# assert: symmetry — d(A,B) = d(B,A) over all six unordered pairs
for a in $VS; do for b in $VS; do
  [ "$a" \< "$b" ] || continue
  eval "sa=\$$a"; eval "sb=\$$b"
  dab=$(hamming "$sa" "$sb"); dba=$(hamming "$sb" "$sa")
  [ "$dab" -eq "$dba" ] || fail "d($a,$b)=$dab != d($b,$a)=$dba"
done; done

# assert: triangle inequality — d(A,C) <= d(A,B) + d(B,C) for all triples
for a in $VS; do for b in $VS; do for c in $VS; do
  eval "sa=\$$a"; eval "sb=\$$b"; eval "sc=\$$c"
  dac=$(hamming "$sa" "$sc"); dab=$(hamming "$sa" "$sb"); dbc=$(hamming "$sb" "$sc")
  [ "$dac" -le $(( dab + dbc )) ] || fail "triangle fails: d($a,$c)=$dac > d($a,$b)+d($b,$c)=$((dab+dbc))"
done; done; done

echo "TETRA: XOR byte-distance is a metric (identity, symmetry, triangle) — passed"
