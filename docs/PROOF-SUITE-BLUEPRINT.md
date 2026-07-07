# Proof Suite Blueprint

## Module Map, Dependencies, and Milestones

### 1. Overview

The OMI Proof Suite is a numbered sequence of Coq modules that classify every candidate concept by proof status (P0–P4), formalize the finite incidence/bitmask/gauge/golden/icosian/E8/Hopf structures, and conclude with a proof registry that indexes all claims.

### 2. Core Suite (00–15)

| # | Module | Status | Proves |
|---|--------|--------|--------|
| 00 | `ProofStatus00` | P0 | Inductive definition of P0–P4 levels |
| 01 | `FiniteBasics01` | P0 | Finite types, decidable equality, finite enumeration |
| 02 | `FanoIncidence02` | P0 | Fano plane relations (7 points, 7 lines, incidence) |
| 03 | `BitmaskClosure03` | P2 | Closure operator on bitmask representations |
| 04 | `KarnaughReduction04` | P2 | Truth-table equivalence via Karnaugh maps |
| 05 | `GaugeTable05` | P0 | Gauge projection, gauge equivalence |
| 06 | `GoldenField06` | P0 | Q(√5) commutative ring, golden field arithmetic |
| 07 | `GoldenQuaternion07` | P0 | Associative quaternion algebra over golden field |
| 08 | `IcosianUnits08` | P1 | 48 icosian units, enumerated |
| 09 | `OmiRingStep09` | P0 | Deterministic norm-preserving step |
| 10 | `RelationalQuotation10` | P0 | Quoted adjudication, relation framing |
| 11 | `E8Roots11` | P1 | 240 E8 roots, enumerated |
| 12 | `WeylReflection12` | P2 | Norm-preserving Weyl reflection |
| 13 | `HopfProjection13` | P1 | S³ → S² Hopf map |
| 14 | `PinchBranchLocalForms14` | P0 | Pinch form decidability |
| 15 | `ProofRegistry15` | P0 | Registry with claim lookup |

### 3. Dependency Graph

```
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

### 4. Extension Branch (16–18)

| # | Module | Status | Proves |
|---|--------|--------|--------|
| 16 | `AtomicKernel` | P0/P1 | Deterministic delta/replay kernel (`delta`, `replay`, `delta_deterministic`, `replay_deterministic`) |
| 17 | `AlgorithmicClockKernel` | P1 | Classify/readings/band extraction from the algorithmic clock kernel |
| 18 | `CyclicStepRecovery` | P1/P2 | Cyclic number step recovery, q=7 concrete witness, number-theory branch |

These are extensions to the core suite, not renumberings. They live in `coq/` alongside the 00–15 modules.

### 5. Milestone Order

**First path** (required for OMI-ring proof target):
```
00 → 01 → 02 → 05 → 06 → 07 → 08 → 09 → 10
```

**Second path** (E8 compatibility):
```
11 → 12
```

**Third path** (Hopf/projection):
```
13 → 14
```

**Register** (always last):
```
15
```

**Extension path** (kernel branch):
```
16 → 17 → 18
```

### 6. File Layout

```
coq/
  ProofStatus00.v
  FiniteBasics01.v
  FanoIncidence02.v
  BitmaskClosure03.v
  KarnaughReduction04.v
  GaugeTable05.v
  GoldenField06.v
  GoldenQuaternion07.v
  IcosianUnits08.v
  OmiRingStep09.v
  RelationalQuotation10.v
  E8Roots11.v
  WeylReflection12.v
  HopfProjection13.v
  PinchBranchLocalForms14.v
  ProofRegistry15.v
  AtomicKernel16.v
  AlgorithmicClockKernel17.v
  CyclicStepRecovery18.v
```

All modules are registered in `_CoqProject` and `Makefile`.
