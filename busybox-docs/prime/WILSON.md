# WILSON — (n-1)! mod n = n-1 exactly when n is prime; CAS on the factorial ladder selects prime vs composite

- **status:** P1
- **category:** prime
- **applets:** sh-arithmetic
- **owner:** `busybox/catalog/B-WILSON.sh`
- **result:** holds

## Claim

reducing the factorial mod n at each step (so it never exceeds n, no big numbers), (n-1)! mod n is n-1 (= -1 mod n) exactly for primes, 0 for composites n>4, and 2 for n=4 (the lone Catch). Thus compareExchange(ladder, n, expected = n-1) selects prime (the one/crown) vs composite (excluded) over the whole ladder. This is Wilson's theorem, and it is the comparator behind "UDP AUTH is meaningless": an unkeyed compare verifies a public property, never identity.

## Statements

- Wilson's law across the ladder n = 2..60, and the CAS selection matches primality
