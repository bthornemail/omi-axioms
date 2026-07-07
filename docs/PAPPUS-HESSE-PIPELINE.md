# Pappus–Hesse Pipeline

## From Incidence Closure to E8 Projection

### 1. Overview

The Pappus–Hesse pipeline extends finite incidence closure into spectral geometry and E8 root system projection. It is a **Phase 2 pipeline** — it builds on MK/Miquel closure kernels but is not yet a first-wave proof target.

```
Pappus closure
    ↓
Hesse completion
    ↓
Levi graph
    ↓
Seidel matrix / two-graph
    ↓
Spectral signature
    ↓
E8 candidate projection
    ↓
Weyl canonicalization
```

### 2. Pappus Closure

Pappus configuration is a 9₃ incidence structure:

```
9 points
9 lines of 3 points each
27 incidences
```

The Pappus Levi graph has:

```
9 point vertices + 9 line vertices = 18 vertices
27 incidence edges = 27 edges
```

Pappus closure rules detect Pappus patterns (a 9-point incidence completion) and extend partial configurations to the full Pappus structure.

### 3. Hesse Completion

The Hesse configuration extends Pappus with cubic completion:

```
Pappus
   ↓
Hesse template detection
   ↓
cubic completion
   ↓
Levi graph with 2-cells
```

This prepares the structure for Seidel spectral analysis.

### 4. Seidel Matrix and Two-Graph

The bridge to spectral geometry:

```
Incidence configuration
   ↓
choose golden triples (𝒯₊)
   ↓
solve parity system over 𝔽₂
   ↓
build Seidel matrix S ∈ {-1, 0, +1}ⁿˣⁿ
   ↓
compute spectrum → stable signature
```

The Seidel switching class is a spectral object that is invariant under:
- choice of golden triples
- coordinate permutations
- incidence-preserving transformations

### 5. E8 Candidate Projection

From Seidel spectrum to E8:

```
Seidel matrix
   ↓
eigenvalues / spectral signature
   ↓
match against E8 root spectrum
   ↓
Weyl group canonicalization
   ↓
E8 candidate projection
```

### 6. Relationship to Existing Modules

| Suite module | Pipeline role |
|-------------|---------------|
| `FanoIncidence02` | base incidence (Phase 1) |
| `MK kernel` (planned) | closure kernel (Phase 1) |
| `Miquel kernel` (planned) | closure kernel (Phase 1) |
| Pappus closure | Phase 2 start |
| Hesse completion | Phase 2 middle |
| `E8Roots11` | Phase 2 target |
| `WeylReflection12` | Phase 2 canonicalization |

### 7. Pipeline Order (Relative to MK/Miquel)

```
Fano                (Phase 1 — existing)
  ↓
MK / Miquel         (Phase 1 — planned)
  ↓
Pappus              (Phase 2)
  ↓
Hesse               (Phase 2)
  ↓
Levi graph          (Phase 2)
  ↓
Seidel spectrum     (Phase 2)
  ↓
E8 candidate        (Phase 2)
```

### 8. Target Status

| Stage | Status |
|-------|--------|
| Pappus mathematical model | P2 |
| Hesse mathematical model | P2 |
| Seidel/two-graph bridge | P2 |
| E8 projection | research |
| Coq formalization | not yet started |

### 9. Lock

```
Pappus→Hesse→Seidel→E8 is a pipeline, not a theorem.
Each stage must be independently provable.
Spectral stability replaces geometric intuition.
Projection does not accept state.
```
