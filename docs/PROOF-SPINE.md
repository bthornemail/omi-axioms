# Proof Spine

`omi-axioms` is the formal layer of OMI. It contains Coq definitions, axioms,
laws, bridge theorems, semantic refinements, and compatibility exports.

## Volumes

| Volume | Layer | Modules |
| --- | --- | --- |
| I | Atomic kernel | `AtomicKernel`, `AtomicKernelVNext` |
| II | Finite structural geometry | `DiagonalClosure`, `FiniteIncidence`, `BQFBridge` |
| III | Projection | `MetricProjection`, `PiProjection` |
| IV | Dynamics | `delta_orbit_theory`, `functorial_semantics`, `coalgebraic_bisimulation`, `OMI_bialgebra`, `verified_execution` |
| V | Bridges and exports | `omi_pi_bridge`, `OMI_Exports`, `omi_pi_proof` |
| VI | Icosian arithmetic / OMI-ring bridge | `VecQ`, `GoldenField`, `GoldenQuaternion`, `IcosianUnits`, `IcosianSpan`, `E8Roots`, `WeylReflection`, `FanoIncidence`, `OmiRingIcosian`, `OmiRingQuotation` |
| VII | Proof suite (classification & registry) | `ProofStatus00` through `ProofRegistry15` |
| VIII | Extension kernel branch | `AtomicKernel16`, `AlgorithmicClockKernel17`, `CyclicStepRecovery18` |

## Default Build Order

```text
AtomicKernel
  -> AtomicKernelVNext
  -> DiagonalClosure
  -> FiniteIncidence
  -> BQFBridge
  -> MetricProjection
  -> PiProjection
  -> OMI_Exports
  -> omi_pi_proof
  -> omi_pi_bridge
  -> delta_orbit_theory
  -> functorial_semantics
  -> coalgebraic_bisimulation
  -> OMI_bialgebra
  -> verified_execution
```

`verified_execution` compiles as part of `make proof`. Its hard finite-field
closure obligations are intentionally explicit `Admitted` statements.

## Volume VI — Icosian Arithmetic / OMI-Ring Bridge

Volume VI investigates the icosian ring as a candidate arithmetic model for the
Omi-Ring local relation basis.  It is not protocol authority.  It provides a
possible arithmetic witness for local relation movement.

### Dependency order

```text
VecQ
  ↓
GoldenField
  ↓
GoldenQuaternion
  ↓
IcosianUnits
  ↓
IcosianSpan
  ↓
E8Roots  WeylReflection  FanoIncidence
  ↓
OmiRingIcosian
  ↓
OmiRingQuotation
```

### Status

This volume is under active development.  See `dev-docs/OMI-RING-ICOSIAN-COQ-INQUIRY.md`
for the full inquiry proposal, including proof ladder, milestones, and the
canonical inquiry statement.

## Volume VII — Proof Suite (Classification & Registry)

Volume VII implements the OMI Proof Suite proposal: a numbered sequence of
modules (00–15) that classify every candidate concept by proof status (P0–P4),
formalize the finite incidence/bitmask/gauge/golden/icosian/E8/Hopf structures,
and conclude with a proof registry that indexes all claims.

### Modules

| # | Module | Status |
| --- | --- | --- |
| 00 | `ProofStatus` | P0 — inductive definition |
| 01 | `FiniteBasics` | P0 — finite types |
| 02 | `FanoIncidence` | P0 — Fano plane relations |
| 03 | `BitmaskClosure` | P2 — closure operator |
| 04 | `KarnaughReduction` | P2 — truth-table equivalence |
| 05 | `GaugeTable` | P0 — gauge projection |
| 06 | `GoldenField` | P0 — Q(√5) commutative ring |
| 07 | `GoldenQuaternion` | P0 — associative quaternions |
| 08 | `IcosianUnits` | P1 — 48 enumerated units |
| 09 | `OmiRingStep` | P0 — deterministic norm-preserving step |
| 10 | `RelationalQuotation` | P0 — quoted adjudication |
| 11 | `E8Roots` | P1 — 240 roots enumerated |
| 12 | `WeylReflection` | P2 — norm-preserving reflection |
| 13 | `HopfProjection` | P1 — S³ → S² map |
| 14 | `PinchBranchLocalForms` | P0 — pinch form decidability |
| 15 | `ProofRegistry` | P0 — registry with lookup |

### Dependency order

```text
00  ProofStatus   01  FiniteBasics
      |               |
      +-------+-------+
              |
        02  FanoIncidence
        03  BitmaskClosure
        04  KarnaughReduction
        05  GaugeTable
        06  GoldenField
              |
        07  GoldenQuaternion
              |
        08  IcosianUnits
        09  OmiRingStep  (depends on 05,06,07,08)
              |
        10  RelationalQuotation
        11  E8Roots
              |
        12  WeylReflection
        13  HopfProjection (depends on 06)
        14  PinchBranchLocalForms
              |
        15  ProofRegistry (depends on 00-14)
```

### Status

Volume VII is complete in source.  All modules have been written and registered
in `_CoqProject` and `Makefile`.

## Volume VIII — Extension Kernel Branch

Volume VIII extends the proof suite with the atomic delta kernel, algorithmic
clock classification, and cyclic-number step recovery.  These modules are not
part of the core 00–15 suite but are promoted from `dev-docs/` proof artifacts.

### Modules

| # | Module | Status | Proves |
|---|--------|--------|--------|
| 16 | `AtomicKernel` | P0/P1 | Deterministic delta/replay kernel: `delta`, `replay`, `delta_deterministic`, `replay_deterministic` |
| 17 | `AlgorithmicClockKernel` | P1 | Classify, readings, band extraction from the algorithmic clock |
| 18 | `CyclicStepRecovery` | P1/P2 | Cyclic number step recovery, q=7 concrete witness (number-theory branch) |

### Origin of artifacts

| dev-docs file | Action | Target |
|---------------|--------|--------|
| `AtomicKernelCoq.v` | Merge/promote | `coq/AtomicKernel16.v` or `coq/AtomicKernelVNext.v` |
| `KERNEL.v` | Extract classify/readings | `coq/AlgorithmicClockKernel17.v` |
| `CyclicClock.v` | Rename/move, register axioms | `coq/CyclicStepRecovery18.v` |

### Dependency order

```text
16  AtomicKernel
    |
17  AlgorithmicClockKernel
18  CyclicStepRecovery  (independent, number-theory branch)
```

### Status

Volume VIII is planned.  The source artifacts exist in `dev-docs/` but have not
yet been promoted to `coq/`.  This volume becomes active when:

1. `AtomicKernelCoq.v` is merged into a target file under `coq/`.
2. `KERNEL.v` is split and the classify/readings layer is extracted.
3. `CyclicClock.v` is renamed to `CyclicStepRecovery.v` and its axioms are
   registered in `ProofRegistry15.v`.

Until then, the dev-docs artifacts remain dev proof sketches — usable for
reference, not yet canonized.

### Closure-kernel pipeline (future)

Beyond the numbered suite, the following closure kernels are specified as
mathematical models (P2) and targeted for Coq formalization:

| Kernel | Document | Configuration | Status |
|--------|----------|---------------|--------|
| MK (Möbius–Kantor) | `docs/MOBIUS-KANTOR-KERNEL.md` | 8₃ | P2 — model complete |
| Miquel | `docs/MIQUEL-KERNEL.md` | 8₃;6₄ | P2 — model complete |
| Pappus–Hesse | `docs/PAPPUS-HESSE-PIPELINE.md` | 9₃ → E8 | P2 — pipeline specified |
| Systole | `docs/SYSTOLE-INVARIANTS.md` | Levi graph invariants | P2 — metric specified |

These are Phase 2 proof targets. They depend on `FanoIncidence02` and the
core suite but are not yet in `_CoqProject` or `Makefile`.

## Boundary

The proof spine justifies formal claims. It does not contain the runtime
implementation, C tests, firmware, browser surfaces, or generated Coq outputs.
