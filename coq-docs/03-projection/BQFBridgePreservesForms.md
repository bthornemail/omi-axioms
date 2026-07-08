# BQF Bridge Preserves Forms

## Proof Address
`coq/03-projection/BQFBridgePreservesForms.v`

## Purpose
Connects finite incidence selectors to binary quadratic-form decompositions.

## Canon Role
Provides an exact bridge into a projection surface.

## Epistemic Quadrant
- Known knowns: exported decomposition and selector identities are checked.
- Known unknowns: interpretation beyond the modeled finite selectors.
- Unknown knowns: diagonal and incidence modules provide upstream constraints.
- Unknown unknowns: a projected form may be mistaken for accepted state.

## Theorem Anchors
The exported BQF decomposition and bridge theorems.

## Dependencies
`DiagonalGaugeCloses`, `FiniteIncidenceBalancesFlags`, and Coq arithmetic.

## Downstream Consumers
Pi projection and OMI exports.

## Boundary
The bridge projects; it does not validate or accept. Assumptions audit: clean.
