# OMI Axioms Skills

## Formal Registry Lock

The `coq/` tree is the formal source registry. Treat it as a five-part proof
ladder, not as a scratch directory and not as an implementation runtime.

```text
00-foundations
  finite sets, proof statuses, rational vectors, golden arithmetic,
  truth-table counts, earned control bands

01-incidence
  finite incidence and Miquel incidence

02-closure
  bounded complexity, diagonal gauge closure, null-ring closure

03-projection
  BQF bridge, metric projection, Pi projection witnesses

04-execution
  atomic replay, Delta16 period, protocol boundaries, kernel bridges
```

The archive is provenance after active promotion:

```text
coq/_archive
  preserved drafts paired with independent active proof owners
```

Do not delete or rewrite archived proofs casually. Repair is allowed only when
the repaired basename enters the active registry as its own independent file and
compiles assumption-free under the current registry.

## Compilation Rule

All active Coq compilation must preserve the five-part registry and the
canonical logical root:

```text
coqc -Q . OmiCore
```

Generated Coq artifacts must go to:

```text
../artifacts/coq/
```

Generated `.vo`, `.glob`, `.aux`, `.vos`, `.vok`, `.vio`, extracted `.ml`, and
extracted `.mli` files do not belong under `coq/`.

## Archive Re-Entry Rule

An archived proof may return to an active directory only after it satisfies all
of these conditions:

```text
1. no Axiom, Parameter, Conjecture, Admitted, admit, or Abort
2. compiles under the current Coq version
3. passes coqchk
4. has a dedicated coq-docs page or proof-book entry
5. states corrected historical claims explicitly
6. uses current active names rather than numbered-suite drift
```

## Mask and Involution Rule

Archived bitwise proofs repaired for active use must be bounded by the current
16-bit mask and the `r0` involution law.

Canonical forms:

```coq
Definition mask16 (x : N) : N := N.land x 0xFFFF.
Definition r0 (x : N) : N := N.lxor x 0xAAAA.

mask16 (mask16 x) = mask16 x
r0 (r0 x) = x
```

When porting older files that used `x mod 65536`, update the proof surface to
the explicit bitmask form before active promotion.

## No Paradigm Drift

Do not add:

```text
runtime evaluators
heap object models
extraction targets as proof authority
merged archive promotion owners
active assumptions
```

The proof registry proves deterministic laws. Runtime behavior, C tests,
firmware, renderers, and transport adapters remain outside this repository.

## Active OMINO Proof Targets

Use the active registry for bounded proof authority:

```text
00-foundations/OminoSECDEDCell.v
  [LOGOS NOMOS FS PATHOS GS RS US OMINO]
  computed_omino
  overall_mismatch
  algebraic SECDED result codes

02-closure/PowerClosureGate.v
  (64x - 64)(32x - 32)(16x - 16)(8x - 8)(4x - 4)(2x - 2)(x - 1)
  =
  2^21 * (x - 1)^7

03-projection/E8RootsEnumerate240.v
  E8 finite root count: 112 + 128 = 240

04-execution/OminoParallelSpatialScaling.v
  constant step descriptor over a supplied parallel OMINO substrate
```

Do not state archived E8, Weyl, octonion, or Cayley-Dickson material as active
proof authority unless citing the promoted active counterpart.

## Axiomatic Promotion Suite

The active registry target is fixed at 70 files:

```text
23 existing active modules
+ 38 independently promoted archive basenames
+ 3 active bridge modules
+ 6 tangent polytope and field visibility modules
= 70 active modules
```

Every promoted archive basename must remain an independent active file. Do not
merge, collapse, or combine promoted archive basenames into aggregate modules.

The promotion audit is:

```text
coq-docs/ARCHIVE-PROMOTION-MAP.md
```

Strict checks:

```text
make proof-registry-lock
make proof-strict
make proof-status
```

`proof-status` must report:

```text
active_sources=70
forbidden_active=0
```

## 70-Module Unified Active Compilation Harness

### [SKILL_27: ENFORCE_70_MODULE_CORE]

#### OBJECTIVE

Route stream data strictly through the 70-module `coqchk`-passed registry.

#### INVARIANTS

```text
Active Sources      == Exactly 70 Independent Modules
Theorem Anchors     == Exactly 392 Fully Discharged Coordinates
Master Proof Target == make proof-strict (assumptions: none)
```

#### RUN

```text
INPUT: inbound_stream_byte, active_polytope_axis, current_word_context
FORBIDDEN: Lingering admits, temporary variable allocations, intermediate software loops, network socket calls
MANDATORY: Execute branchless bit-mask register transformations in O(1) constant time
COMPUTE:
  # 1. Assert the active proof complex is locked and verified with zero open admits via make proof-strict
  # 2. Extract our three local incidence geometries concurrently in a single clock cycle
  base_4320      = inbound_stream_byte % 4320
  surface_4320_2 = (inbound_stream_byte % 4320) * 4320
  horizon_4320_4 = (inbound_stream_byte % 4320) * 4320 * 4320 * 4320

  # 3. Step all 72 parallel circular slide rulers branchlessly via the Algorithmic Clock torque
  #    The standard error (stderr) serves as our zero-polynomial block design reference plane
  left_torque  = ROL64(inbound_stream_byte, 1)    # Core phase point shift (mod 60)
  right_torque = ROR64(active_polytope_axis, 2)   # Quadrant alignment shift (mod 16)
  blended      = left_torque ^ right_torque ^ horizon_4320_4

  # 4. Lock the Metatron pre-closure rail (0x1D) and emit the raw target register substrate
  OUTPUT_OMINO_REGISTER = blended ^ 0x1D1D1D1D1D1D1D1DULL
```
