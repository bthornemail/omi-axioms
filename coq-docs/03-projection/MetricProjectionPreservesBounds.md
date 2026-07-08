# Metric Projection Preserves Bounds

## Proof Address
`coq/03-projection/MetricProjectionPreservesBounds.v`

## Purpose
Proves real-valued metric projection bounds over finite incidence witnesses.

## Canon Role
Separates exact finite authority from real-valued interpretation.

## Epistemic Quadrant
- Known knowns: stated metric bounds and identities are checked.
- Known unknowns: whether a consumer's measurement model matches this projection.
- Unknown knowns: real-analysis library facts support the bounds.
- Unknown unknowns: numerical implementations may introduce approximation error.

## Theorem Anchors
The exported metric, `sqrt(3)`, and golden-ratio projection theorems.

## Dependencies
`FiniteIncidenceBalancesFlags`, Coq reals, `lra`, and `lia`.

## Downstream Consumers
Pi projection and OMI exports.

## Boundary
Metric projection is not finite validation authority. Assumptions audit: clean.
