#!/bin/sh
# tag: COMMUTE
# title: the encoding switch and the direction switch commute
# category: switches
# applets: tr rev
# claim: a per-character map (tr) and a reversal (rev) commute — tr then rev equals rev then tr — because a per-character map does not depend on position.
set -eu
BB=${BB:-busybox}
fail(){ echo "FAIL($0): $*" >&2; exit 1; }
R='A-Za-z'; T='N-ZA-Mn-za-m'

# assert: tr|rev == rev|tr for several strings
for s in 'Hello World' 'abcXYZ123' 'The Light Garden'; do
  a=$(printf '%s' "$s" | "$BB" tr "$R" "$T" | "$BB" rev)
  b=$(printf '%s' "$s" | "$BB" rev | "$BB" tr "$R" "$T")
  [ "$a" = "$b" ] || fail "tr|rev != rev|tr for [$s]: [$a] vs [$b]"
done

echo "COMMUTE: the two switches commute — passed"
