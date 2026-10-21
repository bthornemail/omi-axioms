# NOFIX — the self-append loop has no fixed point

- **status:** P1
- **category:** awareness
- **applets:** cat, wc, tr
- **owner:** `busybox/catalog/B-NOFIX.sh`
- **result:** holds

## Claim

iterating F <- A+F+B (A,B nonempty) increases |F| by the same positive constant each step, so it never reaches a fixed point — the loop halts only by an external limit, never by itself. (The 121 MB file, deterministically, via a snapshot so no byte is read while it is written.)

## Statements

- each step grows by the same positive constant inc = |A|+|B| (no fixed point)
- strictly increasing — the sequence never settles
