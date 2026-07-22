# OMI Coq Proof Index

The `.v` files are proof authority. The
[OMI Deterministic Computation Proof Book](OMI-DETERMINISTIC-COMPUTATION-PROOF-BOOK.md)
is the sole authoritative readable explanation of every active theorem.

## Strict Registry

| Category | Canonical owner | Purpose | Status |
| --- | --- | --- | --- |
| Foundations | `ProofStatusOrdersClaims.v` | Orders claim strength without promoting implementation to proof. | Repaired, proved |
| Foundations | `FiniteBasicsEnumeratesSets.v` | Supplies finite cardinality, subset, and equality foundations. | Repaired, proved |
| Foundations | `RationalVectorsDefineOperations.v` | Defines exact rational vector operations. | Proved |
| Foundations | `GoldenFieldDefinesArithmetic.v` | Defines exact pair arithmetic for `Q(sqrt(5))`. | Proved |
| Foundations | `FiniteTruthTablesCountFunctions.v` | Proves finite truth-table scale and bounded six-bit lookup. | Proved |
| Foundations | `OminoSECDEDCell.v` | Proves canonical OMINO [8,4,4] syndrome and result-code bounds. | Proved |
| Foundations | `EarnedControlBandsEncode.v` | Separates source text from bytes and verifies earned bands and envelopes. | Proved |
| Closure | `ComplexityBoundsArity.v` | Separates exhaustive subset counts from fixed-arity bounds. | Repaired, proved |
| Closure | `DiagonalGaugeCloses.v` | Owns Polybius coordinates, diagonal closure, phase, and 240-state arithmetic. | Extended, proved |
| Closure | `NullRingCloses.v` | Proves self-XOR, byte-ring, closed-path, and presentation closure. | Proved |
| Closure | `PowerClosureGate.v` | Proves the Power Closure numerator factorization and denominator boundary. | Proved |
| Incidence | `FiniteIncidenceBalancesFlags.v` | Verifies tetrahedral, Fano, dual, and rectified finite incidence. | Proved |
| Incidence | `MiquelIncidenceBalancesFlags.v` | Verifies 3-4-5, Miquel flag balance, and `5+6=11` arithmetic. | Proved |
| Projection | `BQFBridgePreservesForms.v` | Connects finite selectors to the defined quadratic form. | Proved |
| Projection | `MetricProjectionPreservesBounds.v` | Proves selected metric and golden-ratio projection identities. | Proved |
| Projection | `PiProjectionPreservesWitnesses.v` | Proves equality and convergence of the defined Pi projection routes. | Proved |
| Projection | `E8RootsEnumerate240.v` | Proves the active finite E8 root enumeration: `112 + 128 = 240`. | Proved |
| Execution | `AtomicKernelDefinesReplay.v` | Owns the bounded atomic delta and replay model. | Consolidated, proved |
| Execution | `Delta16HasExactPeriodEight.v` | Proves exact eight-step orbits for the concrete `0x001D` and `0x1337` 16-bit delta laws. | Proved |
| Execution | `SabbathProtocolRejectsRestAttestation.v` | Proves deterministic trace and rest-window validation. | Repaired, proved |
| Execution | `OmiPiBridgeConnectsKernel.v` | Synchronizes replay indexing and Pi projection without conflating them. | Repaired, proved |
| Execution | `AuthorityPipelinePreservesDecision.v` | Proves Omnicron framing, Tetragrammatron decision, and Metatron preservation. | Proved |
| Execution | `OminoParallelSpatialScaling.v` | Proves constant step descriptor over a supplied parallel OMINO substrate. | Proved |

## Axiomatic Promotion Registry

The strict registry now expands to 64 active Coq files:

```text
23 existing active modules
+ 38 independent archive promotions
+ 3 active bridge modules
= 64 active modules
```

The promoted archive basenames compile as independent active owners under the
same `coqc -Q . OmiCore` and `coqchk` chain.  Their full placement map is:

```text
coq-docs/ARCHIVE-PROMOTION-MAP.md
```

## Policy

Every active file is an independent proof owner.  Archived files are preserved
as provenance, while their promoted active counterparts are compiled and
counted only after they are assumption-free.

```text
Coq proves.
Canon names.
OMI-Lisp declares.
OMI-ISA witnesses.
Receipt records.
```

See [ARCHIVE.md](ARCHIVE.md) for unresolved and superseded drafts.
