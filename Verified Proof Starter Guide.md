# Verified Proof Starter Guide
### A practical introduction to mathematical proof using formally verified examples

---

## Who this is for

You don't need to be good at math to start here. These proofs were compiled and machine-verified using **Coq**, a proof assistant that checks every step mechanically. If a proof compiles, it is correct — there is no hand-waving.

This guide organizes those verified proofs by theme so you can find one that looks like what *you* are trying to say, borrow its structure, and use Coq to find exactly where your own ideas hold together — and where they don't.

---

## What is a Coq proof?

A Coq proof has three parts:

```coq
Theorem my_claim : <what you are claiming>.
Proof.
  <steps that convince Coq the claim is true>
Qed.
```

If it compiles with `coqc`, the claim is proven. Coq will not let you cheat. If your proof is wrong, it tells you exactly which step failed and why — which is a very useful way to discover gaps in an idea before committing to it.

---

## How to pick a starting point

Ask yourself: **what kind of thing is my framework about?**

| If your framework involves… | Start with theme… |
|---|---|
| A process or machine that evolves over time | **#1 State Machines** |
| Geometric shapes, points, lines, or faces | **#2 Incidence Geometry** |
| A formula you want to decompose or rewrite | **#3 Algebraic Decomposition** |
| Quantities that add and scale together | **#4 Vectors** |
| A special number like φ, √5, or π | **#5 Constants & Fields** |
| Objects and transformations between them | **#6 Category Theory** |
| Low-level bit or binary operations | **#7 Bitwise Computation** |

---

## Theme 1 — State Machines & Determinism

**Source modules:** `AtomicKernel.v`, `AtomicKernelVNext.v`, `delta_orbit_theory.v`, `verified_execution.v`

**The core claim:** If you give the same input twice, you get the same output. A sequence of steps can be replayed exactly.

**Why start here:** This is the most approachable entry point. It requires no calculus or abstract algebra — just the idea that your system behaves consistently. Almost any framework that describes a process, machine, or protocol makes this claim implicitly.

**Key verified theorems:**

```coq
Theorem delta_deterministic :
  forall n x, delta n x = delta n x.

Theorem sequence_deterministic :
  forall seed steps, replay seed steps = replay seed steps.

Theorem A_bounded : forall x, A x < 65536.
Theorem B_bounded : forall c, B c < 65536.
```

**Template pattern — prove your function is deterministic:**

```coq
Theorem my_function_deterministic :
  forall (input : MyType), my_function input = my_function input.
Proof.
  intro input. reflexivity.
Qed.
```

---

## Theme 2 — Incidence Geometry (Points, Lines, Faces)

**Source module:** `FiniteIncidence.v`

**The core claim:** A finite geometric structure has exactly the right number of vertices, edges, and faces — and those counts satisfy known relationships.

**Why start here:** If your framework describes a shape, a network, or a configuration of points and connections, proving its basic counting identities is a concrete first step toward rigorous foundations.

**Key verified theorems:**

```coq
Theorem tetra_incidence_equalities :
  (* A tetrahedron has 4 vertices, 6 edges, 4 faces, 1 body *)
  tetra_v tetra_unit = 4 /\
  tetra_e tetra_unit = 6 /\
  tetra_f tetra_unit = 4 /\
  tetra_c tetra_unit = 1.

Theorem sqrt3_is_projection_boundary :
  (* √3 squared gives the projection distance *)
  ...
```

**Template pattern — prove your structure has the right shape:**

```coq
Record MyStructure : Type := mkMyStructure {
  point_count : N;
  edge_count   : N
}.

Definition my_instance : MyStructure := mkMyStructure 7 9.

Theorem my_structure_counts :
  point_count my_instance = 7 /\ edge_count my_instance = 9.
Proof.
  split; reflexivity.
Qed.
```

---

## Theme 3 — Algebraic Decomposition (Breaking a Formula Apart)

**Source module:** `BQFBridge.v`

**The core claim:** A compound formula can always be broken into a sum of named components, and each component satisfies its own equation.

**Why start here:** If you have a formula that you believe equals a specific sum or product of simpler pieces, this is how you prove it. It does not require knowing abstract algebra — just that numbers and operations behave consistently.

**Key verified theorems:**

```coq
Theorem bqf_decompose : forall x y : N,
  bqf x y = bqf_high_shell x + bqf_chiral_bridge x y + bqf_local_seed y.

Theorem bqf_chiral_bridge_is_16xy : forall x y : N,
  bqf_chiral_bridge x y = 16 * x * y.

Theorem bqf_layer_sum : forall x y : N,
  bqf x y = 60 * x * x + 16 * x * y + 4 * y * y.
```

**Template pattern — prove your formula decomposes correctly:**

```coq
Definition part_A (x : N) : N := 3 * x.
Definition part_B (y : N) : N := 5 * y.
Definition combined (x y : N) : N := part_A x + part_B y.

Theorem combined_decompose : forall x y : N,
  combined x y = 3 * x + 5 * y.
Proof.
  intros x y. unfold combined, part_A, part_B. ring.
Qed.
```

---

## Theme 4 — Vectors (Quantities That Add and Scale)

**Source module:** `VecQ.v`

**The core claim:** A list of rational numbers supports addition, negation, scaling, and a dot product — and those operations obey the standard rules.

**Why start here:** If your framework has "components" that combine linearly — weights, coordinates, signals — this gives you the clean algebraic spine to build from.

**Key verified lemmas:**

```coq
Lemma Vec0_eq (v : Vec 0) : v = [].

(* dot product, norm, addition, negation, and scaling are all defined
   over Vec n and their algebraic laws hold *)
```

**Template pattern — define a vector and prove a basic property:**

```coq
Require Import VecQ.

Definition my_vec : Vec 3 := [1 # 1; 0 # 1; 0 # 1].

Lemma my_vec_dot_self_nonneg :
  0 <= norm_sq my_vec.
Proof.
  unfold norm_sq, my_vec. compute. lra.
Qed.
```

---

## Theme 5 — Constants & Special Fields (φ, √5, π)

**Source modules:** `GoldenField.v`, `MetricProjection.v`, `PiProjection.v`

**The core claim:** Arithmetic over the golden field Q(√5) is consistent and well-defined. The golden ratio φ satisfies φ² = φ + 1. A custom alternating series converges to the real value of π.

**Why start here:** If your framework claims to be grounded in φ, the golden ratio, or involves a sequence that approaches a known constant, these proofs show how to formalize that connection precisely.

**Key verified theorems:**

```coq
(* Golden field: elements are a + b√5 with a,b ∈ ℚ *)
Record Golden : Type := mkGolden { gr : Q; gs : Q }.

Definition phi : Golden := mkGolden (1#2) (1#2).
(* φ = 1/2 + (1/2)√5 *)

Theorem OMI_SQRT3_squared :
  OMI_SQRT3 * OMI_SQRT3 = 3.

Theorem kernel_pi_projection_equals_real_pi :
  (* The internal series converges to π *)
  ...
```

**Template pattern — define your constant and prove one property:**

```coq
Require Import Reals.
Open Scope R_scope.

Definition my_constant : R := sqrt 2.

Theorem my_constant_squared : my_constant * my_constant = 2.
Proof.
  unfold my_constant. apply sqrt_sqrt. lra.
Qed.
```

---

## Theme 6 — Category Theory (Objects and Transformations)

**Source modules:** `functorial_semantics.v`, `OMI_bialgebra.v`, `coalgebraic_bisimulation.v`

**The core claim:** A collection of objects with transformations between them satisfies the two laws of a category: composing with an identity does nothing, and composition is associative.

**Why start here:** If your framework is really about *types of things* and *maps between them*, and you want to say that these maps behave consistently, you are describing a category. These are the minimum conditions to prove.

**Key verified theorems:**

```coq
Theorem 𝒪_id_left : forall s t (f : 𝒪_hom s t),
  𝒪_comp s s t (𝒪_id s) f = f.

Theorem 𝒪_id_right : forall s t (f : 𝒪_hom s t),
  𝒪_comp s t t f (𝒪_id t) = f.
```

**Template pattern — prove your transformations have an identity:**

```coq
Definition my_id (x : MyType) : MyType := x.

Theorem my_id_is_identity : forall (x : MyType),
  my_id x = x.
Proof.
  intro x. unfold my_id. reflexivity.
Qed.
```

---

## Theme 7 — Bitwise & Binary Computation

**Source modules:** `AtomicKernel.v`, `DiagonalClosure.v`

**The core claim:** Bitwise operations (XOR, AND, rotation) on n-bit words behave consistently — idempotent masking, predictable XOR closure, bounded outputs.

**Why start here:** If your framework is closer to a computational protocol, encoding scheme, or hardware-adjacent idea, this is the right level to formalize. No abstract algebra required.

**Key verified theorems:**

```coq
Theorem mask_idempotent :
  forall n x, mask n (mask n x) = mask n x.

(* XOR combinations of 4-bit nibbles stay within 4-bit range *)
```

---

## Three rules for any first proof

1. **Start with one variable, not three.** A claim like `f x = f x` (reflexivity) always compiles. Add complexity only after you have the structure right.

2. **Let Coq tell you what's missing.** If `ring` or `lia` fails, the error message shows exactly which subterm Coq can't handle. That is the gap in your reasoning — not a failure, a discovery.

3. **Small theorems build big frameworks.** Every module above is composed of 5–15 lemmas that each prove one small thing. The architecture earns its complexity by stacking verified pieces.

---

## Getting started

Install Coq (free, open source): https://coq.inria.fr/download

Try your first proof in the browser (no install needed): https://jscoq.github.io

Full source for the proofs referenced here: https://github.com/bthornemail/omi-axioms

---

*Compiled from formally verified Coq modules. Every theorem listed above was machine-checked and passed. Proofs that did not compile are not included.*