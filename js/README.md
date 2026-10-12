# js: the subject-predicate-object index of numeric constants

Candidates **for consideration**, outside the locked `coq/` registry (AGENTS.md:
no new Coq proof files). In `PROOF_CANONIZATION.md`'s levels each triple here is
**P1**, a finite, computable check, and a target for a P0 Coq proof later. Nothing
here enters the deterministic core on its own.

## The shape

Every claim is a triple about a numeric constant:

| Part | What it is | Example |
|------|-----------|---------|
| subject | the constant, written as its literal (the radix belongs to the literal) | `0xFEFF` |
| predicate | a named relation, by XOR, shifts and masks where possible (`predicates.mjs`) | `swap16` |
| object | the constant it lands on | `0xFFFE` |

Each triple cites where it comes from in boxedPINE (a SPEC-07 invariant, a source
note, or an I-series module).

## Golden and must-reject

`triples.mjs` holds the triples that must hold, and `REJECTS`, the claims that
were checked and found false, which must fail. A false relation therefore cannot
come back unnoticed.

## Run

```
node proofs/js/check.mjs        # or: make js
```

It checks every triple and must-reject, writes `index.json` (the same entries
indexed by subject, by predicate and by object, so a constant can be looked up
from any side), and exits 1 if anything is wrong.
