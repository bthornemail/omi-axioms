#!/bin/sh
# tag: ROT2
# title: rot13 (tr) is its own inverse
# category: encoding
# applets: tr
# claim: busybox tr 'A-Za-z' 'N-ZA-Mn-za-m' maps letters by rot13, leaves non-letters alone, and twice is the identity (the encoding switch).
set -eu
BB=${BB:-busybox}
fail(){ echo "FAIL($0): $*" >&2; exit 1; }
R='A-Za-z'; T='N-ZA-Mn-za-m'

# assert: rot13 of Hello is Uryyb
[ "$(printf 'Hello' | "$BB" tr "$R" "$T")" = "Uryyb" ] || fail "rot13 Hello"

# assert: rot13 leaves digits and punctuation unchanged (a1!z -> n1!m)
[ "$(printf 'a1!z' | "$BB" tr "$R" "$T")" = "n1!m" ] || fail "rot13 a1!z"

# assert: rot13 applied twice is the identity
for s in 'Hello' 'The Light Garden 2026' 'XyZ-abc'; do
  got=$(printf '%s' "$s" | "$BB" tr "$R" "$T" | "$BB" tr "$R" "$T")
  [ "$got" = "$s" ] || fail "rot13|rot13 changed [$s] -> [$got]"
done

echo "ROT2: rot13 is its own inverse — passed"
