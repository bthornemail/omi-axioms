# Archived Coq Sources

`coq/_archive/` preserves proof drafts excluded from the strict registry.
They are not compiled, exported, or counted as proved. Purpose describes the
intended formal role; summary describes the current draft and why it remains
archived.

The canonical explanation of the active/archived boundary is the
[OMI Deterministic Computation Proof Book](OMI-DETERMINISTIC-COMPUTATION-PROOF-BOOK.md).
This file remains a compact status manifest, not a second proof narrative.

Only one archived file from a redundant family may be selected for repair.
Other variants remain superseded unless the selected file demonstrably lacks
required theorem content.

## Archived Proofs

| Archived proof | Purpose | Summary |
| --- | --- | --- |
| `current/AtomicKernelComputesDelta.v` | Preserve the earlier minimal atomic delta model. | Superseded by active `AtomicKernelDefinesReplay.v`; retained only as provenance and not eligible for parallel promotion. |
| `current/AtomicKernelReplayDeterministic.v` | Preserve the former replay companion formulation. | Superseded by active `AtomicKernelDefinesReplay.v`; its replay-length territory now has one active owner. |
| `current/BitmaskClosure03.v` | Prove closure and monotonicity for bounded seven-bit masks. | The model mixes boolean and propositional bit tests and retains admitted closure obligations. |
| `current/E8Roots.v` | Construct and count an exact rational representation of the E8 root system. | The current pair enumeration has rational/natural typing drift and does not compile. |
| `current/E8Roots11.v` | Provide the numbered-suite E8 root construction. | Depends on the older finite-basics API and still needs its root-count and distinctness proof surface repaired. |
| `current/FanoIncidence.v` | Verify seven-point, seven-line Fano incidence. | Uses a removed `Fin.case_dep` path and contains an admitted exhaustive coverage proof. |
| `current/FanoIncidence02.v` | Supply the numbered-suite Fano incidence layer. | Depends on the former `FiniteBasics01` model and contains admitted finite verification. |
| `current/GaugeTable05.v` | Verify the 16 gauges and their earned codepoint bands. | Several arithmetic proofs were repaired, but exhaustive `Fin.t 16` enumeration still requires a complete proof. |
| `current/GoldenField06.v` | Define the numbered-suite golden-field arithmetic. | Its rational-equivalence goals and ring tactics do not currently align. |
| `current/GoldenQuaternion.v` | Define quaternions over the exact golden field and prove norm laws. | A central multiplication/norm equation is not accepted by the current ring proof. |
| `current/GoldenQuaternion07.v` | Provide the numbered-suite golden-quaternion layer. | Depends on the unresolved numbered golden field and inherits unfinished algebraic obligations. |
| `current/HopfProjection13.v` | Formalize the Hopf projection layer over the proof suite. | Contains admitted projection, fiber, and preservation obligations. |
| `current/IcosianSpan.v` | Show that selected unit icosians generate a candidate span/ring. | The closure argument contains an admitted theorem and depends on unresolved quaternion and unit modules. |
| `current/IcosianUnits.v` | Define exact unit icosian families and prove norm-one properties. | Multiple family norm and enumeration obligations remain admitted. |
| `current/IcosianUnits08.v` | Provide the numbered-suite unit icosian construction. | Contains admitted family proofs and depends on unresolved numbered golden algebra. |
| `current/KarnaughReduction04.v` | Prove truth-table and Karnaugh reduction correctness. | Uses an incompatible vector API and contains several admitted reduction and existence proofs. |
| `current/OMI_bialgebra.v` | Establish algebra/coalgebra compatibility for orbit semantics. | Depends on the abstract orbit model and therefore cannot enter the assumption-free registry. |
| `current/OmiRingIcosian.v` | Connect Omi-Ring steps with Fano-selected unit icosians. | Depends on unresolved Fano, quaternion, and icosian modules. |
| `current/OmiRingQuotation.v` | Prove relational quotation over the Omi-Ring/icosian bridge. | Its proof surface is blocked by the unresolved Omi-Ring icosian dependency chain. |
| `current/OmiRingStep09.v` | Define the numbered-suite Omi-Ring transition. | Depends on unresolved gauge, quaternion, and icosian modules. |
| `current/PinchBranchLocalForms14.v` | Prove local pinch/branch algebraic normal forms. | Rational equality is modeled with `Qeq`, but current statements and proof terms use incompatible equation shapes. |
| `current/ProofRegistry15.v` | Aggregate numbered-suite claims and their proof statuses. | Imports incomplete modules and would incorrectly promote their claims if kept active. |
| `current/RelationalQuotation10.v` | Prove the numbered-suite relation-quotation laws. | Depends on unresolved golden, quaternion, icosian, and Omi-Ring modules. |
| `current/WeylReflection.v` | Prove E8 Weyl reflections preserve roots and norms. | Contains an admitted norm-expansion proof and depends on the broken E8 construction. |
| `current/WeylReflection12.v` | Provide the numbered-suite Weyl reflection layer. | Contains admitted involution and norm-preservation proofs and depends on unresolved E8 roots. |
| `current/coalgebraic_bisimulation.v` | Prove bisimulation properties for the orbit coalgebra. | Its definitions depend on abstract orbit operators that are still parameters rather than concrete functions. |
| `current/delta_orbit_theory.v` | Formalize orbit delta, linear operators, and orbit invariants. | Declares abstract operators and laws as parameters and contains admitted orbit theorems. |
| `current/functorial_semantics.v` | Give functorial semantics to the orbit transition system. | Depends on the parameterized orbit theory, so its checked results remain conditional on unproved assumptions. |
| `current/verified_execution.v` | Refine abstract orbit semantics into verified execution behavior. | Contains admitted refinement theorems and inherits the abstract operator assumptions. |
| `current/AAL.v` | Verify the typed Assembly-Algebra Language and its 11 operation dimensions. | Progress and preservation contain many admitted cases, and the file depends on archived polynomial and identity models. |
| `current/CyclicClock.v` | Formalize repeating-decimal periods and cyclic step recovery. | Concrete `q = 7` results exist, but general results are local axioms and large natural evaluation overflows. |
| `current/Fano_PCG.v` | Prove two Fano halves and round trips in a 14-point PCG construction. | Compilation stops at an incorrectly focused proof before the full incidence construction is checked. |
| `current/IdentityChain.v` | Formalize two-, four-, eight-, and sixteen-square identity relationships. | Early norm identities are drafted, but Pfister, Adams, Hurwitz, and chain results remain admitted or overstated. |
| `current/KERNEL.v` | Specify an algorithmic clock kernel with bit-width and edge operations. | A `nat`/`N` index mismatch prevents compilation, and equivalence to the active atomic kernel is not established. |
| `current/Polynomials.v` | Build polynomial algebra over `F2` for later AAL verification. | Uses the removed `Omega` import and retains admitted degree, division, GCD, ring, and Adams-related claims. |
| `current/extract.v` | Extract the verified Sabbath validator to Haskell. | Uses an obsolete logical import and remains disabled until the extraction target and generated-output contract are reviewed. |


## Re-entry Rule

An archived module may return to an active category only after it:

1. contains no forbidden assumptions;
2. compiles under the current Coq version;
3. passes `coqchk`;
4. has a dedicated `coq-docs` page;
5. states any corrected or rejected historical claim explicitly.
