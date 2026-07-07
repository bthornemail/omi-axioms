# Proof Canonization

## Proof Complex, Homology, Cohomology, and Adjudication Boundary

## 0. Purpose

This document defines how the OMI proof suite canonizes mathematical structure.

It does not create a new authority layer.

Proof is not authority by itself.

Proof establishes the boundary of what may be used, how it may be used, and where its failure conditions are located.

OMI authority remains:

```text
Validation determines.
Omi-Attestation witnesses.
Accepted Omi-State may be recorded.
Projection only displays accepted relation state.
```

Proof canonization answers a different question:

```text
What structure has been proven enough to be admitted into deterministic OMI construction?
```

## 1. Structural Blueprint

The proof suite is organized as a proof complex:

```text
[ Proof Complex ]
  │
  ├──► Manages modules and enforces d² = 0 globally.
  │
  ├──► [ Subspaces ]
  │      │
  │      └──► Identifies Ker(d) and Im(d) internal to the modules.
  │             │
  │             ▼
  │      [ Quotient ]
  │             │
  │             └──► Builds Hₙ = Ker(d) / Im(d)
  │                  using setoids, representatives, or canonical normal forms.
  │
  └──► [ Chain-to-Cochain Bridge ]
         │
         └──► Dualizes the structures to output:
              co-cycles,
              co-boundaries,
              and cohomology groups Hⁿ.
```

This gives the proof suite four structural layers:

```text
1. Proof Complex
2. Subspaces
3. Quotient
4. Chain-to-Cochain Bridge
```

Each layer has a different responsibility.

## 2. Proof Complex

The proof complex manages modules and boundary maps.

Its primary global law is:

```text
d² = 0
```

Meaning:

```text
boundary after boundary is zero
```

or operationally:

```text
a valid proof transition cannot leave an unresolved boundary behind it
```

In Coq, this means every proof module must expose:

```text
objects
boundary map
composition law
proof that d ∘ d = 0
```

The proof complex is responsible for coordinating these modules without allowing one module to silently redefine the boundary of another.

### Coq target

```coq
Record ChainComplex := {
  C : nat -> Type;
  d : forall n, C n -> C (pred n);
  d_squared_zero :
    forall n (x : C n),
      d (pred n) (d n x) = zero
}.
```

The exact implementation may vary depending on whether the suite uses modules, typeclasses, setoids, or canonical structures.

The invariant does not vary:

```text
d² = 0 must be explicit.
```

## 3. Subspaces

Subspaces identify what survives the boundary map and what is produced by a previous boundary.

The two essential subspaces are:

```text
Ker(d) = cycles
Im(d)  = boundaries
```

In homological language:

```text
cycles are closed
boundaries are exact
```

In OMI language:

```text
cycles are internally stable candidate structures
boundaries are structures already explained by a prior construction
```

A candidate declaration is not useful merely because it closes.

It must also be checked against what is already a boundary.

That distinction prevents duplication, false novelty, and accidental authority.

### Coq target

```coq
Definition Ker {A B} (d : A -> B) : Type :=
  { x : A | d x = zero }.

Definition Im {A B} (d : A -> B) : Type :=
  { y : B | exists x : A, d x = y }.
```

The proof suite should expose kernel and image for every proof module that claims homological structure.

## 4. Quotient

The quotient builds homology:

```text
Hₙ = Ker(dₙ) / Im(dₙ₊₁)
```

This is the structure that survives after removing what is merely boundary-produced.

In OMI terms:

```text
homology identifies what remains as a meaningful invariant after boundary artifacts are factored out
```

This is exactly the proof-suite equivalent of canonization.

A claim becomes more than an implementation artifact when it survives quotienting.

### Implementation choices

Coq may represent the quotient using:

```text
setoids
equivalence relations
canonical representatives
normal forms
finite quotient enumeration
```

The preferred implementation depends on the module.

For finite structures, canonical representatives are usually simpler.

For algebraic structures, setoids may be cleaner.

### Coq target

```coq
Definition homologous {n}
  (x y : Ker d_n) : Prop :=
  exists b, x = y + d_next b.

Definition Homology n :=
  quotient (Ker d_n) homologous.
```

If quotient types become heavy, the first implementation may use explicit equivalence relations and canonical representatives instead.

## 5. Chain-to-Cochain Bridge

The chain-to-cochain bridge dualizes the proof complex.

Chains track construction.

Cochains track observation, measurement, and evaluation over construction.

The bridge outputs:

```text
co-cycles
co-boundaries
cohomology groups Hⁿ
```

In OMI terms:

```text
homology tells what structure survives construction boundaries
cohomology tells what observations remain stable over those structures
```

This is important because OMI distinguishes construction from projection.

The chain side belongs to construction.

The cochain side belongs to evaluation/projection.

Projection must not become authority.

Therefore cohomology may witness stable observation, but it does not accept state by itself.

### Coq target

```coq
Definition Cochain n := C n -> R.

Definition coboundary
  (phi : Cochain n)
  : Cochain (S n) :=
  fun x => phi (d (S n) x).
```

Core theorem:

```coq
Theorem coboundary_squared_zero :
  forall n (phi : Cochain n),
    delta (delta phi) = zero.
```

This is the dual form of:

```text
d² = 0
```

## 6. Proof Adjudication

Proof adjudication classifies what a proof permits OMI to use.

It does not say:

```text
this is true in every possible sense
```

It says:

```text
this structure is admitted for this use, under these boundaries, with these failure conditions
```

Each proof result must produce an adjudication record.

### Proof status levels

```text
P0 — Coq proven
P1 — finite exhaustive check / computable proof target
P2 — mathematical model, not fully formalized
P3 — implementation precedent
P4 — metaphor / visualization only
```

Only P0 and selected P1 claims may be used in deterministic OMI core.

P2 may guide architecture.

P3 may guide implementation.

P4 may guide explanation.

## 7. Proof Canonization Record

Every admitted proof must be recorded with:

```text
Claim ID
Name
Source
Status
Formal statement
Coq module
Dependencies
Allowed OMI use
Forbidden OMI use
Failure boundary
Promotion path
```

Example:

```text
Claim ID: FANO-INCIDENCE-001
Name: Any two Fano points determine exactly one line
Status: P0 target
Formal statement:
  forall p q, p <> q -> exists! l, Line l /\ Inc p l /\ Inc q l
Coq module:
  FanoIncidence.v
Allowed OMI use:
  finite incidence adjudication
Forbidden OMI use:
  cryptographic identity
Failure boundary:
  does not prove E8, Leech, Mathieu, or Omi-Ring arithmetic
Promotion path:
  P1 finite enumeration -> P0 Coq proof
```

## 8. Proof Complex Intake Rule

A concept may enter the proof suite only if it can be rewritten as one of:

```text
finite structure
algebraic structure
order structure
closure structure
boundary structure
quotient structure
duality structure
decidable predicate
deterministic transition
norm-preserving action
```

If a concept cannot be rewritten this way, it remains outside the proof suite.

It may remain useful.

It may remain a visual model.

It may remain a research note.

But it is not proof-canonized.

## 9. OMI-Specific Canonization Path

The first OMI proof path should be:

```text
FiniteBasics
  ↓
FanoIncidence
  ↓
BitmaskClosure
  ↓
KarnaughReduction
  ↓
GaugeTable
  ↓
GoldenField
  ↓
GoldenQuaternion
  ↓
IcosianUnits
  ↓
OmiRingStep
  ↓
RelationalQuotation
```

The second path may add:

```text
E8Roots
  ↓
WeylReflection
  ↓
E8Compatibility
```

The third path may add:

```text
HopfProjection
  ↓
PinchBranchLocalForms
  ↓
ProjectionSingularityModels
```

Only the first path is required for the first OMI-ring proof target.

## 10. Authority Boundary

This document must not be read as saying:

```text
Proof accepts state.
Proof is authority.
Coq replaces validation.
```

The correct reading is:

```text
Proof canonizes admissible structure.
Validation determines accepted state.
Attestation witnesses accepted transition.
Projection displays accepted state.
```

Proof tells OMI what structures it is allowed to trust as deterministic.

Validation decides whether a specific candidate relation is accepted.

## 11. Supporting Documents

The proof canonization framework is supported by two companion documents:

| Document | Role |
|----------|------|
| `docs/BOUNDARY-INTERIOR-FRAMEWORK.md` | Explains the boundary/interior role separation (BICF) that underlies chain complexes, homology, and the proof/admissibility boundary. |
| `docs/OPERATIONAL-REALITY-BOUNDARY.md` | Explains why consensus/projection is not authority — the physical/operational/epistemic reality separation that protects the project from overclaiming. |

The conversation records that informed these documents are archived in `research-history/06-omi-reduction/`.

## 12. Canonical Lock

```text
The proof suite is a canonization filter.

The Proof Complex manages modules and enforces d² = 0.

Subspaces identify Ker(d) and Im(d).

The Quotient constructs Hₙ = Ker(d) / Im(d).

The Chain-to-Cochain Bridge dualizes construction into co-cycles, co-boundaries, and cohomology Hⁿ.

Proof adjudication records what a proof permits OMI to use.

Proof does not replace validation.

Identity remains the addressed place-value relation.

Relational quotation frames candidate relations.

Validation determines.

Omi-Attestation witnesses.

Accepted Omi-State may be recorded.

Projection only displays accepted relation state.
```
