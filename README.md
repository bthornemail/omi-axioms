# omi-axioms

`omi-axioms` contains the formal proof spine of OMI: the atomic delta law,
observer semantics, bialgebraic coherence, projection bridges, and verified
execution refinement.

This repository is proof-only. Runtime code, ISA behavior, C tests, WASM, and
firmware remain in `omi-isa`.

## Layout

- `coq/`: Coq source modules.
- `docs/PROOF-SPINE.md`: dependency and layer map.
- `docs/PROOF-HISTORY.md`: migration and provenance notes.
- `docs/LAYERING.md`: claim-boundary discipline.

Generated Coq artifacts and extraction outputs are intentionally ignored. Build
them locally from source.

## Build

```sh
make proof
```

The default proof target builds every current Coq module, including
`verified_execution.v`.

Clean generated artifacts with:

```sh
make clean
```

## Module Policy

Current public module names are preserved. Imports such as:

```coq
Require Import AtomicKernel.
Require Import DiagonalClosure.
Require Export OMI_Exports.
```

remain valid under the current empty logical root. A future namespaced migration
can happen after the split is stable.
