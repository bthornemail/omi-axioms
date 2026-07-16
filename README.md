# omi-axioms

`omi-axioms` is the proof authority rail for OMI.

It does not render, execute, or accept runtime state. It proves bounded
invariants that canon may name, OMI-Lisp may declare, OMI-ISA may witness, and
receipt may record. Runtime code, ISA behavior, C tests, WASM, and firmware
remain in `omi-isa`.

## Layout

- `coq/00-foundations` through `coq/04-execution`: active, categorized proofs.
- `coq/_archive/`: preserved drafts excluded from proof-completion claims.
- `coq-docs/OMI-DETERMINISTIC-COMPUTATION-PROOF-BOOK.md`: sole authoritative
  readable explanation and complete theorem atlas.
- `coq-docs/PROOF-INDEX.md` and `coq-docs/ARCHIVE.md`: compact navigation and
  status manifests.
- `artifacts/coq/`: ignored Coq compiler output.
- `docs/PROOF-SPINE.md`: short redirect from the superseded volume layout to
  the current strict registry and proof book.
- `docs/PROOF-HISTORY.md`: migration and provenance notes.
- `docs/LAYERING.md`: claim-boundary discipline.
- `docs/PROOF-COMPLEX.md`: proof complex, homology, cohomology, d²=0.
- `docs/PROOF-ADJUDICATION.md`: proof status levels (P0–P4), claim registry.
- `docs/PROOF-SUITE-BLUEPRINT.md`: module map and dependency graph for 00–18.
- `docs/CANONIZATION-ADJUDICATION.md`: external-facing pattern — how to classify claims.
- `docs/BOUNDARY-INTERIOR-FRAMEWORK.md`: boundary/interior role separation (BICF).
- `docs/OPERATIONAL-REALITY-BOUNDARY.md`: physical vs operational vs epistemic reality.
- `docs/MOBIUS-KANTOR-KERNEL.md`: MK (8₃) closure kernel — data model, axioms, circuits.
- `docs/MIQUEL-KERNEL.md`: Miquel (8₃;6₄) cube face-circle incidence kernel.
- `docs/SYSTOLE-INVARIANTS.md`: discrete systolic geometry for closed incidence structures.
- `docs/PAPPUS-HESSE-PIPELINE.md`: Pappus→Hesse→Seidel→E8 projection pipeline.

Generated Coq artifacts and extraction outputs are intentionally ignored. Build
them locally from source.

## Build

```sh
make proof
make proof-strict
make proof-status
```

`make proof` builds every active module. `make proof-strict` first rejects
local assumptions and manifest drift, then compiles the registry and runs
`coqchk`. Archived drafts are never counted as proved.

Clean generated artifacts with:

```sh
make clean
```

## Module Policy

Every active theorem family has one canonical module. Imports use categorized
module names directly; the repository does not maintain duplicate compatibility
proof files.
