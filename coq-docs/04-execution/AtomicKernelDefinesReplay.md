# Atomic Kernel Defines Replay

## Proof Address
`coq/04-execution/AtomicKernelDefinesReplay.v`

## Purpose
Defines the single canonical bounded delta and replay surface used by the OMI
Pi bridge.

## Canon Role
Owns the active atomic mask, rotation, delta, and replay definitions.

## Epistemic Quadrant
- Known knowns: active replay and width laws are checked.
- Known unknowns: correspondence with archived abstract orbit operators and
  superseded historical kernel drafts.
- Unknown knowns: replay indices supply the bridge clock.
- Unknown unknowns: consumers may infer semantics not present in state words.

## Theorem Anchors
The exported atomic delta and replay theorems.

## Dependencies
Coq `N` arithmetic and lists.

## Downstream Consumers
OMI Pi bridge.

## Boundary
Replay witnesses execution only. Assumptions audit: clean.
