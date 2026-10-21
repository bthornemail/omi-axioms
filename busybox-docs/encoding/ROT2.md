# ROT2 — rot13 (tr) is its own inverse

- **status:** P1
- **category:** encoding
- **applets:** tr
- **owner:** `busybox/catalog/B-ROT2.sh`
- **result:** holds

## Claim

busybox tr 'A-Za-z' 'N-ZA-Mn-za-m' maps letters by rot13, leaves non-letters alone, and twice is the identity (the encoding switch).

## Statements

- rot13 of Hello is Uryyb
- rot13 leaves digits and punctuation unchanged (a1!z -> n1!m)
- rot13 applied twice is the identity
