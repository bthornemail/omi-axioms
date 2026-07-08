# Rational Vectors Define Operations

## Proof Address
`coq/00-foundations/RationalVectorsDefineOperations.v`

## Purpose
Defines exact rational-vector operations and their elementary laws.

## Canon Role
Supplies a bounded algebraic base for projection proofs.

## Epistemic Quadrant
- Known knowns: checked vector operation and dot/norm identities.
- Known unknowns: geometric interpretations added by consumers.
- Unknown knowns: equality follows Coq rational equivalence.
- Unknown unknowns: dimension-specific assumptions in later models.

## Theorem Anchors
The exported `VecQ` operation and identity lemmas.

## Dependencies
Coq rationals, vectors, setoids, and arithmetic tactics.

## Downstream Consumers
Future repaired E8 and Weyl modules.

## Boundary
Exact vector algebra does not establish a physical geometry. Assumptions audit: clean.
