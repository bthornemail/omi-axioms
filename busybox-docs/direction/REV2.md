# REV2 — rev is its own inverse

- **status:** P1
- **category:** direction
- **applets:** rev
- **owner:** `busybox/catalog/B-REV2.sh`
- **result:** holds

## Claim

busybox rev reverses the bytes of a line, and rev applied twice is the identity (the direction switch).

## Statements

- rev reverses a line (abc -> cba)
- rev applied twice is the identity, for several byte strings
