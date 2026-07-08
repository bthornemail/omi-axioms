# Finite Basics Enumerates Sets

## Proof Address
`coq/00-foundations/FiniteBasicsEnumeratesSets.v`

## Purpose
Provides list cardinality, subset, decidable equality, and finite enumeration foundations.

## Canon Role
Supports bounded exhaustive proofs.

## Epistemic Quadrant
- Known knowns: cardinality respects append; subset is reflexive/transitive.
- Known unknowns: completeness of any supplied enumeration remains an obligation.
- Unknown knowns: lists may contain duplicates.
- Unknown unknowns: consumers may confuse enumeration length with set cardinality.

## Theorem Anchors
`cardinal_nonnegative`, `cardinal_app`, `subset_refl`, `subset_trans`,
`decidable_eq_fin`, `finite_set_card_pos`.

## Dependencies
Coq arithmetic, lists, and `Fin`.

## Downstream Consumers
Finite incidence and future repaired finite models.

## Boundary
Finite enumeration is not semantic completeness. Assumptions audit: clean.
