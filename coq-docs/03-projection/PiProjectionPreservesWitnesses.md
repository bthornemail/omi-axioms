# Pi Projection Preserves Witnesses

## Proof Address
`coq/03-projection/PiProjectionPreservesWitnesses.v`

## Purpose
Connects diagonal, incidence, BQF, and metric schedules to the checked Pi-series projection.

## Canon Role
Records equality between modeled projection paths.

## Epistemic Quadrant
- Known knowns: the exported schedule equalities and convergence statements are checked.
- Known unknowns: runtime observer correspondence beyond the shared index.
- Unknown knowns: Coq's real-analysis results carry the convergence proof.
- Unknown unknowns: consumers may overread projection equality as ontological identity.

## Theorem Anchors
The exported `omi_pi_*` matching, convergence, and real-Pi theorems.

## Dependencies
Diagonal closure, BQF bridge, metric projection, and Coq reals.

## Downstream Consumers
OMI exports and OMI Pi execution bridge.

## Boundary
This is a projection theorem, not receipt acceptance. Assumptions audit: clean.
