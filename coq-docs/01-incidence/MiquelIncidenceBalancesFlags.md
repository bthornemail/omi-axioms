# Miquel Incidence Balances Flags

## Proof Address

`coq/01-incidence/MiquelIncidenceBalancesFlags.v`

- Subject: `MiquelIncidence`
- Predicate: `Balances`
- Object: `Flags`
- Category: incidence
- Status: migrated and compiled

## Purpose

Prove the bounded arithmetic behind the Tetragrammatron polyharmonic governor:
three clocks, four visible offsets, five governor modes, the Miquel incidence
balance, and the OMI eleven-position oversight frame.

## Canon Role

The proof identifies a fitted incidence pattern. OMI ququarts are
interpretive, not quantum hardware. The OMI `5 + 6 = 11` frame is an
eleven-position overseer, not a claim that it is the standard abstract
11-cell.

## Epistemic Quadrant

### Known Knowns

- The governor frame has three clocks, four offsets, and five modes.
- The four offsets advance by one hexadecimal nibble.
- Governor exponents are consecutive from `-1` through `3`.
- `RULES` is the `p = 0` pivot.
- The Miquel encoding has eight points and six blocks.
- Every block has four points and every point has degree three.
- The flag count balances as `8 x 3 = 6 x 4 = 24`.
- Four gauges have six unordered pairs.
- The OMI oversight count is `5 + 6 = 11`.
- Validation and acceptance are distinct predicates.

### Known Unknowns

- The proof does not identify the OMI frame with the standard abstract
  11-cell.
- It does not claim a quantum implementation of ququarts.
- It does not prove receipt acceptance or runtime integration.

### Unknown Knowns

- The point/block encoding fixes the fitted Miquel incidence type.
- Arithmetic normalization carries the bounded count equalities.

### Unknown Unknowns

- A future projection may preserve the counts while changing incidence.
- Documentation may accidentally erase the distinction between fitted
  interpretation and mathematical identity.

## Theorem Anchors

- `polyharmonic_axis_counts`
- `visible_offsets_step_by_nibble`
- `governor_exponents_are_consecutive`
- `rules_is_genesis_pivot`
- `miquel_point_count`
- `miquel_block_count`
- `miquel_each_block_has_four_points`
- `miquel_each_point_has_degree_three`
- `miquel_flag_count`
- `miquel_incidence_balance`
- `four_gauges_have_six_pairs`
- `omi_oversight_is_five_plus_six`
- `validation_is_not_acceptance`

## Dependencies

- Coq arithmetic
- Coq finite lists
- Explicit Miquel point and block encodings

## Downstream Consumers

- Tetragrammatron canon documentation
- OMI-ISA Tetragrammatron witness fixtures

## Boundary

This is a bounded proof witness. It adds no compiler keywords, alters no
lowering, validates no runtime frame, and accepts no receipt.
