# Boundary–Interior Framework

## Roles, Models, and the BICF Separation

### 1. The Core Distinction

The boundary–interior framework separates two roles:

| Role | Symbol | Meaning |
|------|--------|---------|
| **Boundary** | Sⁿ | constraints, normalization, transformation |
| **Interior** | Bⁿ⁺¹ | admissible state, capacity, storage |

This is not a metaphysical claim. It is a **role separation** useful for any system that distinguishes what structures are allowed from what fills those structures.

### 2. The Mathematical Model

The clean topological model is:

```
∂Bⁿ⁺¹ = Sⁿ
```

| n | Boundary (Sⁿ) | Interior (Bⁿ⁺¹) |
|---|-----------------|------------------|
| 0 | two endpoints   | line segment     |
| 1 | circle          | disk             |
| 2 | sphere surface  | solid ball       |
| 3 | S³              | B⁴               |
| 7 | S⁷              | B⁸               |

This is standard topology. The model is **useful** but not **required canon**. Other representations exist.

### 3. How OMI Uses This Separation

```
Boundary = proof-canonized admissible structure
Interior = validated relation state
Realization = explicit chosen bridge between them
Projection = view of interior state through boundary lens
```

The chain complex from `PROOF-COMPLEX.md` already implements this:

```
Ker(d) = cycles (boundary-closed candidates)
Im(d)  = boundaries (already-derived structure)
Hₙ    = Ker(d) / Im(d)  (what survives both)
```

| Complex concept | BICF role |
|-----------------|-----------|
| chain groups Cₙ | interior (construction) |
| boundary map d  | boundary (normalization) |
| homology Hₙ    | stable admissible quotient |
| cochain         | projection (observation) |

### 4. Indexing Is Convention, Not Canon

The choice of 0-based vs 1-based indexing is a **convention**:

| View | Meaning |
|------|---------|
| 0-based | algebraic basis including identity (e₀=1) |
| 1-based | human/API/physics counting |

Both are valid. Neither generates topology.

### 5. Realization Is Explicit and Non-Canonical

A boundary–interior system requires an explicit **realization** — a chosen bridge between the boundary constraints and the interior state. Realization is:

- not unique
- not canonical
- not authoritative

Multiple realizations of the same boundary may exist. The system does not depend on any one of them being "the true one."

### 6. Projection Is a View, Not Authority

Projection displays interior state through boundary constraints. It does **not**:

- accept state
- validate relations
- determine truth

Projection shows. That is all.

### 7. Relationship to the Proof Suite

| Layer | BICF role | Coq module |
|-------|-----------|------------|
| Proof canonization | defines admissible boundary | `ProofStatus00` |
| Construct | provides interior candidate | `FanoIncidence02` |
| Boundary map | enforces closure | `BitmaskClosure03` |
| Homology | stable quotient | `ProofRegistry15` |
| Cohomology/projection | observation | `HopfProjection13` |

### 8. Lock Statement

```
Boundary and interior are roles, not metaphysical claims.
Sⁿ and Bⁿ⁺¹ are useful models of those roles.
Indexing is convention, not causation.
Realization is explicit and non-canonical.
Projection does not accept state.
```
