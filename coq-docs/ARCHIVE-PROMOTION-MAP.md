# Archive Promotion Map

The active registry contains 64 Coq sources:

```text
23 existing active modules
+ 38 independent archive promotions
+ 3 active bridge modules
= 64 active modules
```

The archive remains provenance under `coq/_archive/current/`.  Each promoted
active file is an independent, assumption-free owner.  No active module may
contain `Admitted`, `admit`, `Axiom`, `Parameter`, `Conjecture`, or `Abort`.

## Foundations

| Archive file | Active owner |
| --- | --- |
| `BitmaskClosure03.v` | `coq/00-foundations/BitmaskClosure03.v` |
| `GaugeTable05.v` | `coq/00-foundations/GaugeTable05.v` |
| `GoldenField06.v` | `coq/00-foundations/GoldenField06.v` |
| `GoldenQuaternion.v` | `coq/00-foundations/GoldenQuaternion.v` |
| `GoldenQuaternion07.v` | `coq/00-foundations/GoldenQuaternion07.v` |
| `IdentityChain.v` | `coq/00-foundations/IdentityChain.v` |
| `OMI_bialgebra.v` | `coq/00-foundations/OMI_bialgebra.v` |
| `PinchBranchLocalForms14.v` | `coq/00-foundations/PinchBranchLocalForms14.v` |
| `Polynomials.v` | `coq/00-foundations/Polynomials.v` |
| `phi_proof.v` | `coq/00-foundations/phi_proof.v` |

## Incidence

| Archive file | Active owner |
| --- | --- |
| `FanoIncidence.v` | `coq/01-incidence/FanoIncidence.v` |
| `FanoIncidence02.v` | `coq/01-incidence/FanoIncidence02.v` |
| `Fano_PCG.v` | `coq/01-incidence/Fano_PCG.v` |
| `IcosianSpan.v` | `coq/01-incidence/IcosianSpan.v` |
| `IcosianUnits.v` | `coq/01-incidence/IcosianUnits.v` |
| `IcosianUnits08.v` | `coq/01-incidence/IcosianUnits08.v` |
| `OmiRingIcosian.v` | `coq/01-incidence/OmiRingIcosian.v` |
| `OmiRingQuotation.v` | `coq/01-incidence/OmiRingQuotation.v` |

## Projection

| Archive file | Active owner |
| --- | --- |
| `CyclicClock.v` | `coq/03-projection/CyclicClock.v` |
| `E8Roots.v` | `coq/03-projection/E8Roots.v` |
| `E8Roots11.v` | `coq/03-projection/E8Roots11.v` |
| `HopfProjection13.v` | `coq/03-projection/HopfProjection13.v` |
| `WeylReflection.v` | `coq/03-projection/WeylReflection.v` |
| `WeylReflection12.v` | `coq/03-projection/WeylReflection12.v` |

## Execution

| Archive file | Active owner |
| --- | --- |
| `AAL.v` | `coq/04-execution/AAL.v` |
| `AtomicKernelComputesDelta.v` | `coq/04-execution/AtomicKernelComputesDelta.v` |
| `AtomicKernelReplayDeterministic.v` | `coq/04-execution/AtomicKernelReplayDeterministic.v` |
| `KERNEL.v` | `coq/04-execution/KERNEL.v` |
| `KarnaughReduction04.v` | `coq/04-execution/KarnaughReduction04.v` |
| `OmiRingStep09.v` | `coq/04-execution/OmiRingStep09.v` |
| `ProofRegistry15.v` | `coq/04-execution/ProofRegistry15.v` |
| `RelationalQuotation10.v` | `coq/04-execution/RelationalQuotation10.v` |
| `coalgebraic_bisimulation.v` | `coq/04-execution/coalgebraic_bisimulation.v` |
| `delta_orbit_theory.v` | `coq/04-execution/delta_orbit_theory.v` |
| `extract.v` | `coq/04-execution/extract.v` |
| `functorial_semantics.v` | `coq/04-execution/functorial_semantics.v` |
| `test_dd_show.v` | `coq/04-execution/test_dd_show.v` |
| `verified_execution.v` | `coq/04-execution/verified_execution.v` |

## Bridge Modules

| Active bridge | Purpose |
| --- | --- |
| `coq/00-foundations/OminoAxiomaticSovereignty.v` | Records the 64-module expansion counts. |
| `coq/04-execution/OminoArchivePromotionRegistry.v` | Records existing, promoted, and bridge counts. |
| `coq/04-execution/OminoFiveBinarySubstrate.v` | Names the five target binary substrate lanes. |
