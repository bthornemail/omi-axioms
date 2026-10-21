#!/bin/sh
# tag: REV2
# title: rev is its own inverse
# category: direction
# applets: rev
# claim: busybox rev reverses the bytes of a line, and rev applied twice is the identity (the direction switch).
set -eu
BB=${BB:-busybox}
fail(){ echo "FAIL($0): $*" >&2; exit 1; }

# assert: rev reverses a line (abc -> cba)
[ "$(printf 'abc' | "$BB" rev)" = "cba" ] || fail "rev abc != cba"

# assert: rev applied twice is the identity, for several byte strings
for s in '' 'a' 'Hello' 'The Light Garden' '0123456789' '<text>payload</text>'; do
  got=$(printf '%s' "$s" | "$BB" rev | "$BB" rev)
  [ "$got" = "$s" ] || fail "rev|rev changed [$s] -> [$got]"
done

echo "REV2: rev is its own inverse — passed"
