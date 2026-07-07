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

## Boundary

The proof spine justifies formal claims. It does not contain the runtime
implementation, C tests, firmware, browser surfaces, or generated Coq outputs.
