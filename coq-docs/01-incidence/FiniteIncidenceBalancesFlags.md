# Finite Incidence Balances Flags

## Proof Address

`coq/01-incidence/FiniteIncidenceBalancesFlags.v`

- Subject: `FiniteIncidence`
- Predicate: `Balances`
- Object: `Flags`
- Category: incidence
- Status: migrated and compiled

## Purpose

Establish bounded incidence counts for the tetrahedral frame, the explicit
seven-point Fano encoding, and the rectified 35-element common core.

## Canon Role

This proof supplies finite counting and uniqueness witnesses. It supports
incidence claims used by canon without treating every projection as a Fano
plane or turning incidence balance into receipt acceptance.

## Epistemic Quadrant

### Known Knowns

- The tetrahedral incidence equalities close.
- The encoded Fano surface has seven points and seven lines.
- Encoded lines have width three and encoded points have degree three.
- Every encoded point pair has a unique encoded line.
- The rectified common core has the stated bounded size.

### Known Unknowns

- The proof does not establish that every OMI projection is a Fano plane.
- It does not supply a geometric realization.
- It does not establish protocol acceptance or runtime truth.

### Unknown Knowns

- Explicit finite lists and decidable equality carry the enumeration proof.
- `DiagonalGaugeCloses` supplies the upstream closure vocabulary.

### Unknown Unknowns

- Future changes to encodings may preserve counts while changing meaning.
- Downstream consumers may incorrectly promote incidence into authority.

## Theorem Anchors

- `tetra_incidence_equalities`
- `fano_line_count`
- `fano_point_count`
- `fano_line_widths`
- `fano_point_degrees`
- `fano_pair_unique_lines`
- `fano_plane_valid`
- `rectified_35_common_core_valid`

## Dependencies

- `DiagonalGaugeCloses`
- Coq `NArith`
- Coq `List`

## Downstream Consumers

- `BQFBridgePreservesForms`
- `MetricProjectionPreservesBounds`
- `PiProjectionPreservesWitnesses`
- Canon and OMI-ISA finite-incidence witnesses

## Boundary

This module proves bounded incidence propositions. It does not render,
execute, validate a frame, accept a receipt, or own runtime state.
