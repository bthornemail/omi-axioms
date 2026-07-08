# Proof Status Orders Claims

## Proof Address
`coq/00-foundations/ProofStatusOrdersClaims.v`

## Purpose
Defines the `P0` through `P4` proof-status order and typed claim records.

## Canon Role
Makes proof strength explicit without granting runtime authority.

## Epistemic Quadrant
- Known knowns: reflexivity, transitivity, and the corrected `P0`/`P4` endpoints.
- Known unknowns: whether a registered claim deserves its assigned status.
- Unknown knowns: status ordering is policy encoded as a finite relation.
- Unknown unknowns: downstream status inflation.

## Theorem Anchors
`status_le_refl`, `status_le_trans`, `P0_is_strongest`, `P4_is_weakest`.

## Dependencies
Coq strings.

## Downstream Consumers
Proof registry and readable status reports.

## Boundary
Classification is not validation or receipt acceptance. Assumptions audit: clean.
