# OMI Coq Proof Index

The `.v` files are proof authority. This directory is their readable mirror.

## Strict Registry

| Category | Proof address | Purpose | Summary | Status |
| --- | --- | --- | --- | --- |
| Foundations | `00-foundations/ProofStatusOrdersClaims.v` | Define the `P0`-`P4` claim-strength order. | Proves order reflexivity, transitivity, and corrected strongest/weakest endpoints; also defines typed claim records. | Repaired, proved |
| Foundations | `00-foundations/FiniteBasicsEnumeratesSets.v` | Supply reusable finite-list and decidable-equality foundations. | Proves cardinality, subset, and finite-enumeration facts used by bounded proof surfaces. | Repaired, proved |
| Foundations | `00-foundations/RationalVectorsDefineOperations.v` | Define exact rational vectors and their elementary operations. | Establishes checked dot-product, norm, scaling, and vector identities without floating-point assumptions. | Proved |
| Foundations | `00-foundations/GoldenFieldDefinesArithmetic.v` | Model exact arithmetic in the pair representation of `Q(sqrt(5))`. | Proves the active addition, multiplication, conjugation, norm, and equality laws needed by later algebraic work. | Proved |
| Incidence | `01-incidence/FiniteIncidenceBalancesFlags.v` | Verify bounded tetrahedral, Fano, and rectified incidence structures. | Proves finite point/line counts, degrees, unique pair incidence, and the rectified common-core witness. | Proved |
| Incidence | `01-incidence/MiquelIncidenceBalancesFlags.v` | Formalize the Tetragrammatron polyharmonic incidence frame. | Proves the 3-4-5 governor counts, Miquel `8 x 3 = 6 x 4` flag balance, and OMI `5 + 6 = 11` oversight count. | Proved |
| Closure | `02-closure/ComplexityBoundsArity.v` | Separate full subset search from bounded fixed-arity search. | Proves the binomial sum equals `2^n` and bounds binary and ternary arities by quadratic and cubic functions. | Repaired, proved |
| Closure | `02-closure/DiagonalGaugeCloses.v` | Ground Polybius diagonal and full-nibble closure. | Proves both tetrahedral diagonals close at `0x1E`, the nibble field closes at `0x78`, and the phase schedule is deterministic. | Proved |
| Projection | `03-projection/BQFBridgePreservesForms.v` | Connect finite incidence selectors to binary quadratic forms. | Proves exact decomposition and selector identities used to move bounded witnesses onto the BQF projection surface. | Proved |
| Projection | `03-projection/MetricProjectionPreservesBounds.v` | Bound real-valued interpretations of finite incidence witnesses. | Proves the active `sqrt(3)`, golden-ratio, and metric projection identities while preserving the finite/projection boundary. | Proved |
| Projection | `03-projection/PiProjectionPreservesWitnesses.v` | Connect diagonal, incidence, BQF, and metric schedules to Pi. | Proves equality among modeled projection paths and convergence of the resulting series to the real Pi witness. | Proved |
| Execution | `04-execution/AtomicKernelDefinesReplay.v` | Own the bounded atomic transition and replay model. | Defines the sole active mask, rotation, delta, and replay surface used by execution bridges. | Consolidated, proved |
| Execution | `04-execution/SabbathProtocolRejectsRestAttestation.v` | Verify the Sabbath event validator and rest-window invariant. | Proves suspension, rejection, and clean-window properties after removing the false unconditional-prefix claim. | Repaired, proved |
| Execution | `04-execution/OmiPiBridgeConnectsKernel.v` | Synchronize atomic replay and Pi projection by a shared index. | Proves phase, term, convergence, and Pi equalities while explicitly not claiming that replay state itself emits Pi. | Repaired, proved |

## Single-Owner Rule

Each theorem family has one active owner. Dependencies may consume another
family, but they must import that canonical module rather than redefine it.
There are no active compatibility or aggregate proof files.

## Archive

Thirty-six unresolved or superseded drafts are preserved under `coq/_archive/`. See
[`ARCHIVE.md`](ARCHIVE.md) for their blocking classes and re-entry rule.

## Authority

Coq proves. Canon names. OMI-Lisp declares. OMI-ISA witnesses. Receipt
records. None of these proofs accept runtime state.
