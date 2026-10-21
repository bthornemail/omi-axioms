# FANO — every 7-bit margin state resolves to one of the 16 Fano constants in at most two steps

- **status:** P1
- **category:** fano
- **applets:** sh-arithmetic
- **owner:** `busybox/catalog/B-FANO.sh`
- **result:** holds

## Claim

the step "mark a XOR b for every marked pair" (one OR of three ANDs per point) reaches a fixed point in at most two steps for all 128 inputs; the fixed points are exactly the 16 XOR-closed masks (empty, 7 points, 7 lines, full); and, ordered as in core/src/verified/fano.ts (0 empty, 1..7 points, 8..14 lines, 15 full), the dual of index i is i XOR 15, i.e. perp(CONSTANTS[i]) == CONSTANTS[i XOR 15]. (Gemini's engine, checked against the author's verified fano.ts.)

## Statements

- every state converges in <= 2 steps to a fixed mask that is a constant
- exactly 16 fixed points
- all sixteen table entries are constants (fixed points)
- the dual law perp(CONSTANTS[i]) == CONSTANTS[i XOR 15] for all i
