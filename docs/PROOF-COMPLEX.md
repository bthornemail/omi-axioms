# Proof Complex

## Chain Complex, Homology, Cohomology

### 1. What is a Proof Complex?

A proof complex is a formal structure that organizes modules (chain groups) connected by boundary maps d, with the global invariant:

```
d² = 0
```

This means: applying the boundary map twice always yields zero. Operationally, a valid proof transition cannot leave an unresolved boundary behind it.

### 2. Chain Complex

```coq
Record ChainComplex := {
  C : nat -> Type;
  d : forall n, C n -> C (pred n);
  d_squared_zero :
    forall n (x : C n), d (pred n) (d n x) = zero
}.
```

- `C n` — the chain group at dimension n (objects, states, or claims)
- `d n` — the boundary map from dimension n to dimension n-1
- `d_squared_zero` — the coherence law that ensures boundaries of boundaries vanish

### 3. Subspaces: Ker(d) and Im(d)

Two essential subspaces for each dimension:

```coq
Definition Ker {A B} (d : A -> B) : Type :=
  { x : A | d x = zero }.

Definition Im {A B} (d : A -> B) : Type :=
  { y : B | exists x : A, d x = y }.
```

| Subspace | Name | Meaning |
|----------|------|---------|
| Ker(d)   | cycles | internally stable candidate structures |
| Im(d)    | boundaries | structures already explained by prior construction |

In OMI language:

- **cycles** are what survives the boundary — closed, self-consistent claims
- **boundaries** are what was already produced by a previous proof step

A candidate claim is not useful merely because it closes. It must also be checked against what is already a boundary. This prevents duplication, false novelty, and accidental authority.

### 4. Quotient: Homology

The quotient builds homology:

```
Hₙ = Ker(dₙ) / Im(dₙ₊₁)
```

This is the structure that survives after removing what is merely boundary-produced:

```coq
Definition homologous {n}
  (x y : Ker d_n) : Prop :=
  exists b, x = y + d_next b.

Definition Homology n :=
  quotient (Ker d_n) homologous.
```

A claim becomes more than an implementation artifact when it survives quotienting.

Implementation options:

| Approach | When to use |
|----------|-------------|
| setoids / equivalence relations | algebraic structures |
| canonical representatives | finite structures |
| normal forms | term rewriting contexts |
| finite quotient enumeration | decidable finite types |

### 5. Chain-to-Cochain Bridge

The chain-to-cochain bridge dualizes the proof complex:

- **Chains** track construction.
- **Cochains** track observation, measurement, and evaluation over construction.

```coq
Definition Cochain n := C n -> R.

Definition coboundary
  (phi : Cochain n)
  : Cochain (S n) :=
  fun x => phi (d (S n) x).
```

Core theorem (dual of d² = 0):

```coq
Theorem coboundary_squared_zero :
  forall n (phi : Cochain n),
    delta (delta phi) = zero.
```

In OMI terms:

| Side | Maps to | Role |
|------|---------|------|
| homology (chains) | construction | what structure survives boundaries |
| cohomology (cochains) | projection | what observations remain stable |

Projection must not become authority. Therefore cohomology may witness stable observation, but it does not accept state by itself.

### 6. How the OMI Proof Suite Uses This Structure

```
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
  │
  └──► [ Chain-to-Cochain Bridge ]
         │
         └──► Dualizes to co-cycles, co-boundaries, cohomology Hⁿ.
```

Each proof module (see `PROOF-SUITE-BLUEPRINT.md`) exposes:
1. objects
2. boundary map
3. composition law
4. proof that d ∘ d = 0

The proof complex is responsible for coordinating these modules without allowing one module to silently redefine the boundary of another.
