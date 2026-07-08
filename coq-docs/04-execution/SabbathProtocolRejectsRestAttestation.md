# Sabbath Protocol Rejects Rest Attestation

## Proof Address
`coq/04-execution/SabbathProtocolRejectsRestAttestation.v`

## Purpose
Proves the finite trace validator's rest-window and suspension invariants.

## Canon Role
Models a bounded protocol validator over explicit events and modes.

## Epistemic Quadrant
- Known knowns: active validator, transition, and rejection theorems are checked.
- Known unknowns: integration with an external event transport.
- Unknown knowns: the removed unconditional suspension theorem was false for invalid prefixes.
- Unknown unknowns: event taxonomies may change without updating this model.

## Theorem Anchors
`suspend_transitions_to_sabbath_valid`, `sabbath_mode_rejects_attestation`,
`no_attestation_in_sabbath_window`, `validator_is_sound`.

## Dependencies
Coq lists, arithmetic, booleans, classical propositions, and `lia`.

## Downstream Consumers
Future verified validator extraction.

## Boundary
The false unconditional transition claim was removed; only validated prefixes are covered. Assumptions audit: clean.
