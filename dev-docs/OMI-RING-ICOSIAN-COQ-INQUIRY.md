# OMI-Ring Icosian Bridge: Coq Proof Inquiry

## 0. Purpose

This inquiry proposes a formal Coq proof program for the Omi-Ring using an
icosian-inspired arithmetic kernel.

The goal is not to import the old geometric-consensus project unchanged.
The goal is to extract the deterministic geometry from it and rebuild it
under OMI doctrine.

The old project explored:

```
E8 root systems
Weyl reflections
Fano-plane consensus
BQF / QQF forms
Hopf fibrations
pinch and branch points
quaternion algebra APIs
E8 theta-series links
```

The OMI proof target should keep:

```
finite incidence
quadratic forms
root systems
reflection/canonicalization
quaternionic arithmetic
norm preservation
deterministic relation stepping
```

But it must quarantine or remove:

```
hash identity
Merkle identity
signature-as-identity
BIP32-as-identity
content-address-as-protocol-authority
```

OMI identity remains the addressed place-value relation.

---

## 1. Why Icosians

The icosian ring is the arithmetic closure of the 120 unit quaternions that
realize the binary icosahedral group. These 120 units are the vertices of the
600-cell, a regular 4-polytope made of 600 tetrahedral cells.

Structure ladder:

```
icosahedral symmetry
  → binary icosahedral group (120 unit quaternions / 600-cell)
  → icosian ring (additive/multiplicative closure)
  → E8 lattice (8 rational coordinates from 4 quaternion × 2 golden-field)
  → Leech / Golay / Mathieu 24-coordinate structure (later target)
```

The icosian ring is attractive for OMI because it sits between:

- tetrahedral / 600-cell local cells
- quaternionic multiplication (noncommutative, but associative)
- golden ratio scaling
- E8 lattice (balanced 8-dim gauge/control lattice)
- Leech/Golay/Mathieu 24-coordinate discipline (later)

And it is more proof-friendly than jumping into octonions or Monster symmetry.

---

## 2. Relation to OMI Doctrine

OMI needs a local arithmetic basis that supports:

- relation movement
- gauge-controlled rotation
- deterministic carry-forward
- bounded closure
- non-hash identity
- projection without authority leakage

The icosian ring may provide a formal arithmetic witness for the local
relation basis of the Omi-Ring.

The useful property is not mystical symmetry. The useful property is proof
discipline:

- closure
- norm preservation
- finite unit enumeration
- deterministic multiplication
- bounded relation stepping

---

## 3. What the Old Project Contributes (Reusable Geometry)

The uploaded E8, Fano, and quadratic-form docs provide several reusable
ingredients, provided they are purified of hash/signature identity.

### 3.1 E8 Root System

240 E8 roots, 8 simple roots, Weyl generators, Weyl orbit operations.
This gives OMI a formal vocabulary for balanced high-dimensional relation
movement.

### 3.2 Weyl Reflections

Reflection formula `s_α(v) = v - 2(v·α)/(α·α)α`. Directly formalizable.
Useful for deterministic canonicalization without hashing.

### 3.3 Fano Incidence

7-point Fano structure: 7 points, 7 lines, 3 points per line.
Supports OMI gauge-family and Karnaugh-map interpretation through finite
incidence structure.

### 3.4 Quaternion / Quadratic-Form API

Quaternion algebra, norm forms, Hilbert symbols, BQF/TQF/QQF operations.

### 3.5 What Must Be Removed

Every component with hash, content address, BIP32, Merkle root, or signature
binding as structural identity must be excluded from OMI core:

```
Allowed in OMI core:
  relation, incidence, norm, closure, reflection,
  deterministic traversal, finite enumeration,
  proof of equality by structure

Carrier-only / outside identity:
  hash, signature, Merkle root, BIP32 path,
  SHA-derived tetrahedron, content address
```

---

## 4. Staged Coq Program

### Stage 1 — Finite Vectors and Exact Arithmetic

Define exact rational vectors (`Vec Q n`) with dot product, norm, scaling,
reflection.

**Files:** `coq/VecQ.v`

**Theorems:** `dot_comm`, `dot_add_l`, `norm_scale`

### Stage 2 — Golden Field Q(√5)

Define `Record Golden := { gr : Q; gs : Q }` interpreted as `gr + gs√5`.

**File:** `coq/GoldenField.v`

**Operations:** `g_add`, `g_mul`, `g_conj`, `g_norm`

**Theorems:** `g_add_assoc`, `g_mul_assoc`, `g_mul_comm`, `g_distrib`,
`g_conj_involutive`, `g_norm_mul`

### Stage 3 — Golden Quaternions

Define `Record GQuat := { qr qi qj qk : Golden }` with Hamilton
multiplication.

**File:** `coq/GoldenQuaternion.v`

**Theorems:** `q_mul_assoc`, `q_distrib_l`, `q_distrib_r`,
`q_conj_involutive`, `q_norm_mul`

**Do not prove:** `q_mul_comm` (quaternions are noncommutative).

### Stage 4 — Unit Icosians

Define the 120 unit icosians as a finite list (three families: 8 signed
basis vectors, 16 all-half quaternions, 96 golden-ratio units).

**File:** `coq/IcosianUnits.v`

**Theorems:**
```coq
unit_icosians_length : length unit_icosians = 120
unit_icosians_norm_one : forall x, In x unit_icosians -> q_norm x = 1
unit_icosians_closed_mul : forall x y, In x unit_icosians -> In y unit_icosians
                             -> In (q_mul x y) unit_icosians
unit_icosians_inverse : forall x, In x unit_icosians -> In (q_conj x) unit_icosians
```

### Stage 5 — Icosian Span / Ring Candidate

Define finite integer spans of unit icosians.

**File:** `coq/IcosianSpan.v`

**Theorems:** `span_closed_add`, `span_closed_neg`, `span_closed_mul`

### Stage 6 — E8 Compatibility

Use the icosian coordinate split (4 quaternion × 2 golden-field = 8 rational
coordinates).

**File:** `coq/E8Roots.v`, `coq/WeylReflection.v`

**Theorems:**
```coq
e8_roots_count : length e8_roots = 240
e8_roots_norm_two : forall r, In r e8_roots -> dot r r = 2
reflect_preserves_norm : forall alpha v, root alpha -> norm (reflect alpha v) = norm v
```

### Stage 7 — Fano / Gauge Compatibility

Define 16 OMI gauge controls as selected unit actions.

**File:** `coq/FanoIncidence.v`, `coq/OmiRingIcosian.v`

**Theorems:**
```coq
omi_ring_step_deterministic : forall s g x y, x = omi_ring_step s g -> y = omi_ring_step s g -> x = y
omi_ring_step_preserves_norm : forall s g, q_norm (omi_ring_step s g) = q_norm s
```

### Stage 8 — Relational Quotation

Define quoted relation adjudication.

**File:** `coq/OmiRingQuotation.v`

**Theorems:**
```coq
adjudication_decidable : forall qr, { adjudicates qr } + { ~ adjudicates qr }
```

---

## 5. Dependency Order

```
VecQ
  ↓
GoldenField
  ↓
GoldenQuaternion
  ↓
IcosianUnits
  ↓
IcosianSpan
  ↓
E8Roots / WeylReflection / FanoIncidence
  ↓
OmiRingIcosian
  ↓
OmiRingQuotation
```

---

## 6. Milestones

### First Milestone

`GoldenField.v` + `GoldenQuaternion.v` compile, proving `g_mul_assoc`,
`q_mul_assoc`, `q_norm_mul`.

### Second Milestone

`IcosianUnits.v` defines the 120 units, proves length = 120 and
norm = 1. Closure proven by finite table.

### Third Milestone

`OmiRingIcosian.v` defines 16 gauge actions as selected unit actions.
Proves `omi_ring_step_deterministic`, `omi_ring_step_preserves_norm`,
`adjudication_decidable`.

---

## 7. Relationship to omi-canon

This Coq proof program investigates the icosian ring as a candidate
arithmetic model for the Omi-Ring local relation basis.

It does not add protocol authority. It provides a possible arithmetic
witness for local relation movement.

The master architecture (13-MASTER-ARCHITECTURE.md) already describes the
24-file canon spine as a bounded n-sphere packing configuration. This
inquiry provides a candidate arithmetic kernel for the local tetrahedral
basis that the packing resolves against.

---

## 8. Canonical Inquiry Statement

```
The icosian bridge is investigated as a candidate arithmetic proof kernel
for the Omi-Ring.

The uploaded E8, Fano, quadratic-form, and geometric-consensus materials
are treated as prototype geometry and implementation precedent.

OMI adopts only the deterministic structural parts:
  finite incidence,
  exact arithmetic,
  norm preservation,
  Weyl reflection,
  quadratic reduction,
  and decidable adjudication.

OMI does not adopt hash, signature, BIP32, Merkle, or content-address
fields as protocol identity.

Identity remains the addressed place-value relation.

The Coq target is to prove that selected icosian/golden-quaternion gauge
actions are closed, deterministic, norm-preserving, and adjudicable as
quoted OMI relations.
```
