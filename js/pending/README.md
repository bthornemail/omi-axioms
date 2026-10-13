# pending: checks that do not hold as written

Checks wait here when, run as written, they fail, and what they were meant to
assert is the author's to say. The catalogue (`../catalog/`) holds only checks
that hold.

| Record | Source | Fails on | Why |
|--------|--------|----------|-----|
| I-177 | the author's message of 2026-10-12 (the automaton: I-167, I-170, I-171 as its transition function; 59, 63, 127 as its input) | `60 ⊕ 68 = 128 (the pole)` | 60 ⊕ 68 is 120 (0011 1100 ⊕ 0100 0100 = 0111 1000). The vault's pole relation is 60 ⊕ 128 = 188, that is 60 ⊕ 188 = 128 (SPEC-07 I-18). Every other assertion in I-177 holds. |

## Resolved

I-167, I-170 and I-171 failed as extracted from the session transcript (a
difference quotient with step 1; a reversed chain whose links kept their
direction). The author stated the threshold on 2026-10-12, the limit (r -> 0) and
the swap of each link's ends, and they now hold in the catalogue; each file
keeps the step-1 case as the one that does not approximate.

Run one: `node proofs/js/pending/I-177.ts`
