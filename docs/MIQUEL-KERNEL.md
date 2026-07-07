# Miquel Closure Kernel

## Cube Face-Circle Incidence Configuration

### 1. Purpose

The Miquel kernel formalizes the (8₃;6₄) incidence configuration: 8 points, 6 circles of 4 points each, forming the cube face-circle configuration. Each point lies on 3 circles. This is the Miquel configuration in its cleanest combinatorial realization.

### 2. Canonical Model

#### Incidence signature: (8₃;6₄)

```
8 points  — each on 3 circles
6 circles — each containing 4 points
```

#### Point labels

Represent each point as a 3-bit vector (x,y,z) ∈ {0,1}³:

```
idx(x,y,z) = 4x + 2y + z  ∈ {0,…,7}
```

| Label | (x,y,z) | idx |
|-------|---------|-----|
| p0    | (0,0,0) | 0   |
| p1    | (0,0,1) | 1   |
| p2    | (0,1,0) | 2   |
| p3    | (0,1,1) | 3   |
| p4    | (1,0,0) | 4   |
| p5    | (1,0,1) | 5   |
| p6    | (1,1,0) | 6   |
| p7    | (1,1,1) | 7   |

#### Canonical circles (the 6 cube faces)

Faces are the affine planes "coordinate = constant":

| Circle | Plane | Points (indices) |
|--------|-------|-----------------|
| X0     | x=0   | {0,1,2,3} |
| X1     | x=1   | {4,5,6,7} |
| Y0     | y=0   | {0,1,4,5} |
| Y1     | y=1   | {2,3,6,7} |
| Z0     | z=0   | {0,2,4,6} |
| Z1     | z=1   | {1,3,5,7} |

### 3. Closure Rules

Given a set of points charted into ℤ₂³, closure is:

1. Accept points with canonical coordinates
2. For each coordinate axis, detect both constants (0 and 1)
3. When a face-plane has ≥2 points present, complete to all 4
4. When a face-plane has 4 points, register the circle

### 4. Deterministic Chart Proof

The chartProof function maps a point to its canonical (x,y,z) label:

```
chartProof(p) = (x, y, z)  ∈ {0,1}³
```

This is deterministic: same point always maps to same coordinates.

### 5. Relationship to MK Kernel

| Property | MK (8₃) | Miquel (8₃;6₄) |
|----------|---------|-----------------|
| Points | 8 | 8 |
| Blocks | 8 lines of 3 | 6 circles of 4 |
| Generation | cyclic mod 8 with generator {0,1,3} | cube faces by coordinate planes |
| Overlap | distinct incidence geometry | distinct incidence geometry |

Both are finite closure kernels that produce deterministic incidence structures. They can coexist in the same proof suite as independent configuration classes.

### 6. Target Status

| Property | Status |
|----------|--------|
| Mathematical model | P2 — fully defined in this document |
| Coq formalization | Planned — target: `coq/MiquelClosure.v` |
| Promotion path | P2 → P1 (finite enumeration) → P0 (Coq proof) |
