# Layering

OMI keeps proof, runtime, and interpretation separate.

## Formal Layer

The formal layer lives here in `omi-axioms/coq`.

It states and checks:

- deterministic replay kernels
- finite incidence and projection structure
- observer semantics
- coalgebraic and bialgebraic coherence
- execution refinement boundaries

## Runtime Layer

The runtime layer lives in `omi-isa`.

It owns:

- C runtime and ISA implementation
- bytecode and toolchain entrypoints
- tests
- WASM and browser bridge code
- firmware-facing artifacts

## Claim Discipline

Coq proofs establish formal statements under their assumptions. Runtime tests
exercise executable artifacts. Documentation explains the boundary between
motivation, theorem, protocol, and implementation.

Bridge modules may relate layers, but they should not blur those layers or
introduce new foundations.
