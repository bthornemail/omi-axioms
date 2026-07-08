# OMI Pi Bridge Connects Kernel

## Proof Address
`coq/04-execution/OmiPiBridgeConnectsKernel.v`

## Purpose
Connects bounded rotate/XOR replay samples to the incidence/Pi schedule through a shared index.

## Canon Role
Makes the current bridge precise while retaining its limitation.

## Epistemic Quadrant
- Known knowns: phase, term, convergence, and Pi equalities are checked.
- Known unknowns: a state-derived observer replacing the shared-index bridge.
- Unknown knowns: the replay state is carried but does not determine the phase.
- Unknown unknowns: downstream code may imply a stronger causal bridge.

## Theorem Anchors
`kernel_pi_sample_phase_is_accumulator`, `kernel_pi_sample_term_matches_incidence`,
`kernel_pi_projection_series_converges`, `kernel_pi_projection_equals_real_pi`.

## Dependencies
Atomic Kernel VNext, diagonal closure, Pi projection, and Coq reals.

## Downstream Consumers
Direct users of the kernel-to-Pi bridge.

## Boundary
The bridge synchronizes by index; it does not prove the orbit emits Pi. Assumptions audit: clean.
