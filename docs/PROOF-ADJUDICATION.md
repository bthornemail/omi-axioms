# Proof Adjudication

## Proof Status Levels, Allowed Use, and Claim Registry

### 1. What is Proof Adjudication?

Proof adjudication classifies what a proof permits OMI to use.

It does **not** say:

```
this is true in every possible sense
```

It says:

```
this structure is admitted for this use, under these boundaries, with these failure conditions
```

Every proof result must produce an adjudication record.

### 2. Proof Status Levels (P0–P4)

| Level | Name | Meaning |
|-------|------|---------|
| **P0** | Coq proven | Fully formalized and verified in Coq. No axioms, no admitted theorems, no hand-waving. |
| **P1** | Finite exhaustive | Verified by finite case enumeration, bounded search, or computational reflection. May use `compute`, `decide equality`, `lia`, or `nia`. |
| **P2** | Mathematical model | Stated formally, with an informal or model-level proof that has not been fully formalized in Coq. |
| **P3** | Implementation precedent | Known to work in practice (tested in C, Rust, WASM, or firmware) but not yet connected to the formal spine. |
| **P4** | Metaphor / visualization | Useful for explanation, intuition, or communication. Not proof. |

#### Allowed / Forbidden Use

| Level | Deterministic OMI core | Architecture | Implementation | Explanation |
|-------|------------------------|--------------|----------------|-------------|
| P0    | ✅ Allowed | ✅ Allowed | ✅ Allowed | ✅ Allowed |
| P1    | ✅ Selected only | ✅ Allowed | ✅ Allowed | ✅ Allowed |
| P2    | ❌ Forbidden | ✅ May guide | ⚠️ With caution | ✅ Allowed |
| P3    | ❌ Forbidden | ❌ Forbidden | ✅ May guide | ✅ Allowed |
| P4    | ❌ Forbidden | ❌ Forbidden | ❌ Forbidden | ✅ Allowed |

#### Promotion Path

```
P4 → (formalize) → P2 → (formalize in Coq) → P1 → (discharge all axioms) → P0
```

Some claims may skip levels (e.g., a finite enumeration may go directly to P1 without passing through P2).

### 3. Claim Registry Schema

Every admitted proof is recorded with:

| Field | Description |
|-------|-------------|
| Claim ID | Unique identifier (e.g. `FANO-INCIDENCE-001`) |
| Name | Human-readable name |
| Source | Where the claim originates |
| Status | P0–P4 |
| Formal statement | Coq statement or precise mathematical prose |
| Coq module | File path in `coq/` |
| Dependencies | Prerequisite claims or modules |
| Allowed OMI use | What OMI may do with this claim |
| Forbidden OMI use | What OMI must NOT do with this claim |
| Failure boundary | What this claim does NOT prove |
| Promotion path | How to raise its status |

### 4. Example

```
Claim ID: FANO-INCIDENCE-001
Name: Any two Fano points determine exactly one line
Status: P0 target
Formal statement:
  forall p q, p <> q -> exists! l, Line l /\ Inc p l /\ Inc q l
Coq module:
  FanoIncidence02.v
Allowed OMI use:
  finite incidence adjudication
Forbidden OMI use:
  cryptographic identity
Failure boundary:
  does not prove E8, Leech, Mathieu, or Omi-Ring arithmetic
Promotion path:
  P1 finite enumeration -> P0 Coq proof
```

### 5. Intake Rule

A concept may enter the proof suite only if it can be rewritten as one of:

```
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

If a concept cannot be rewritten this way, it remains outside the proof suite. It may still be useful as a visual model or research note, but it is not proof-adjudicated.
