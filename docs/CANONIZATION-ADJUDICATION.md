# Canonization & Adjudication

## External Pattern — How to Classify Claims Before Using Them

### 1. Purpose

This document describes the canonization and adjudication method as an **external, reusable pattern**. It strips away OMI-specific machinery (Omi-Ring, Icosian units, E8 roots, Fano planes, etc.) to expose the pure classification structure that any project can adopt.

### 2. The Core Insight

Before using a claim in a deterministic system, you need answers to two questions:

1. **Canonization**: "What structure has been proven enough to admit into deterministic construction?"
2. **Adjudication**: "What is this claim permitted to do, and what are its failure boundaries?"

These questions are independent of the specific domain. Any project that mixes formal proof, informal reasoning, and implementation can benefit from making them explicit.

### 3. Canonization Pattern

A concept may be canonized only if it can be rewritten as one of:

```
finite structure        — decidable, enumerable
algebraic structure     — operations, laws, morphisms
order structure         — partial/total order, lattice
closure structure       — closure operator, fixed points
boundary structure      — d² = 0 invariant
quotient structure      — equivalence, canonical representatives
duality structure       — chain/cochain, construction/evaluation
decidable predicate     — algorithmically decidable
deterministic transition — function, not relation
norm-preserving action  — isometry, invariant
```

If a concept cannot be rewritten this way, it remains outside the canonization boundary. It may still be useful as a metaphor or research note, but it is not admissible for deterministic construction.

### 4. Adjudication Pattern

Every claim must be classified by proof status level:

| Level | Name | Meaning |
|-------|------|---------|
| **P0** | Formally proven | Fully verified in a proof assistant. No axioms, no gaps. |
| **P1** | Exhaustively checked | Verified by finite computation, bounded search, or decision procedure. |
| **P2** | Mathematically modeled | Stated formally with an informal proof. Not machine-checked. |
| **P3** | Implementation precedent | Works in practice (tested). Not yet connected to formal spine. |
| **P4** | Metaphor / visualization | Useful for explanation only. Not proof. |

#### Use Rules

| Level | Core use | Guide architecture | Guide implementation | Guide explanation |
|-------|----------|-------------------|---------------------|-------------------|
| P0 | ✅ | ✅ | ✅ | ✅ |
| P1 | ⚠️ Selected only | ✅ | ✅ | ✅ |
| P2 | ❌ | ✅ | ⚠️ | ✅ |
| P3 | ❌ | ❌ | ✅ | ✅ |
| P4 | ❌ | ❌ | ❌ | ✅ |

### 5. Claim Registry

Every admitted claim must be recorded with:

```
Claim ID         — unique identifier
Name             — human-readable
Source           — origin
Status           — P0–P4
Statement        — formal statement
Module/File      — where it lives
Dependencies     — prerequisite claims
Allowed use      — what it may be used for
Forbidden use    — what it must NOT be used for
Failure boundary — what it does NOT prove
Promotion path   — how to raise its status
```

### 6. Authority Boundary

This method does not create a new authority layer. The boundary is:

```
Proof canonizes admissible structure.
Validation determines accepted state.
Attestation witnesses accepted transition.
Projection displays accepted state.
```

Proof tells the system what structures it is allowed to trust as deterministic. Validation decides whether a specific candidate is accepted.

### 7. Adapting the Pattern

To adopt this pattern in another project:

1. Define your P0–P4 levels (or an equivalent status ladder).
2. Define your canonization criteria (what structures are admissible).
3. Create a claim registry for every concept you use.
4. Annotate each use of a claim with its permitted level.
5. Record failure boundaries explicitly.

That is the entire method. The rest is domain-specific filling.
