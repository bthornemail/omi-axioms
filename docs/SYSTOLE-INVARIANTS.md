# Systole Invariants

## Discrete Systolic Geometry for Closed Incidence Structures

### 1. Purpose

Systole invariants measure the shortest nontrivial loop in a closed incidence structure. In the OMI setting, they provide a numerical stability criterion: configurations with larger systole are more robust against false positives from small accidental closures.

### 2. Discrete Systole

Given a closed incidence structure S* = close(S), construct the **Levi graph**:

```
Levi graph G(S*):
  vertices = points ∪ lines
  edges    = incidences (point belongs to line)
```

The **discrete 1-systole** is:

```
sys₁(G) = min { length(γ) : γ is a simple cycle in G }
```

But we want **non-contractible** cycles, not merely any cycle. For that we need a 2-complex.

### 3. Symbolic Systole

Build a 2-complex K(S*):

```
1-skeleton = Levi graph G(S*)
2-cells   = attach a face for each axiomatically trivial cycle
            (e.g., every block supplies a 4-gon or 6-gon face)
```

Then the **symbolic systole** is:

```
sys_π₁(K) = min { length(γ) : [γ] ≠ 1 in π₁(K) }
```

This is the direct analog of the Katz/Gromov systole, but in a discrete symbolic setting.

### 4. Why Systole Matters

| Systole value | Meaning |
|---------------|---------|
| Large | structure is robust — small accidental configurations do not form nontrivial cycles |
| Small | structure is fragile — short cycles may appear by accident |

The systole provides a **closure quality metric**: configurations with higher systole are less likely to produce false positive closures.

### 5. Relationship to Scoring/Projection

The systole is computed during scoring (after closure, before projection):

```
close(S) → S*
compute Levi graph G(S*)
build 2-complex K
compute sys_π₁(K)
```

The result is a numerical invariant that can be included in the projection output alongside the closed structure.

### 6. Connection to the Proof Suite

| Module | Relationship |
|--------|-------------|
| `BitmaskClosure03` | provides the closed structure |
| `FanoIncidence02` | Fano plane as a test case for systole computation |
| `WeylReflection12` | larger structures with measurable systole |

### 7. Target Status

| Property | Status |
|----------|--------|
| Mathematical model | P2 — defined in this document |
| Implementation | planned as scoring module |
| Coq formalization | future target |
