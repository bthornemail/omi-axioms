# Complexity Bounds Arity

## Proof Address
`coq/02-closure/ComplexityBoundsArity.v`

## Purpose
Proves the Pascal-diagonal arity principle: full subset enumeration is `2^n`,
while fixed arities two and three have polynomial upper bounds.

## Canon Role
Separates exhaustive powerset search from bounded fixed-arity closure.

## Epistemic Quadrant
- Known knowns: binomial sum, quadratic, and cubic bounds are checked.
- Known unknowns: constants and costs of concrete implementations.
- Unknown knowns: the custom `choose` recursion fixes the counting convention.
- Unknown unknowns: consumers may generalize the proved arities without proof.

## Theorem Anchors
`sum_choose_all_eq_pow2`, `choose2_le_sq`, `choose3_le_cube`,
`arity_principle_summary`.

## Dependencies
Coq Peano arithmetic, `lia`, and `nia`.

## Downstream Consumers
Future bounded search and closure implementations.

## Boundary
Asymptotic counting does not prove runtime performance. Assumptions audit: clean.
