#!/bin/sh
# tag: WILSON
# title: (n-1)! mod n = n-1 exactly when n is prime; CAS on the factorial ladder selects prime vs composite
# category: prime
# applets: sh-arithmetic
# claim: reducing the factorial mod n at each step (so it never exceeds n, no big numbers), (n-1)! mod n is n-1 (= -1 mod n) exactly for primes, 0 for composites n>4, and 2 for n=4 (the lone Catch). Thus compareExchange(ladder, n, expected = n-1) selects prime (the one/crown) vs composite (excluded) over the whole ladder. This is Wilson's theorem, and it is the comparator behind "UDP AUTH is meaningless": an unkeyed compare verifies a public property, never identity.
set -u
fail(){ echo "FAIL($0): $*" >&2; exit 1; }

isprime(){ _n=$1; [ "$_n" -lt 2 ] && return 1; _i=2
  while [ $(( _i * _i )) -le "$_n" ]; do [ $(( _n % _i )) -eq 0 ] && return 1; _i=$(( _i + 1 )); done; return 0; }

# (n-1)! mod n, reduced every step so the running value stays below n
wilson(){ _n=$1; _f=1; _k=1
  while [ "$_k" -lt "$_n" ]; do _f=$(( (_f * _k) % _n )); _k=$(( _k + 1 )); done; echo "$_f"; }

# assert: Wilson's law across the ladder n = 2..60, and the CAS selection matches primality
n=2
while [ "$n" -le 60 ]; do
  r=$(wilson "$n")
  cas=$([ "$r" -eq $(( n - 1 )) ] && echo prime || echo composite)   # compareExchange(expected = n-1)
  if isprime "$n"; then
    [ "$r" -eq $(( n - 1 )) ] || fail "prime $n: (n-1)! mod n = $r, expected $(( n - 1 ))"
    [ "$cas" = prime ] || fail "CAS misclassified prime $n"
  elif [ "$n" -eq 4 ]; then
    [ "$r" -eq 2 ] || fail "n=4 (the Catch): expected 2, got $r"
    [ "$cas" = composite ] || fail "n=4 should not read as prime"
  else
    [ "$r" -eq 0 ] || fail "composite $n: expected 0, got $r"
    [ "$cas" = composite ] || fail "CAS misclassified composite $n"
  fi
  n=$(( n + 1 ))
done

echo "WILSON: (n-1)! mod n = n-1 iff prime; CAS selects prime vs composite; n=4 the lone Catch — passed"
