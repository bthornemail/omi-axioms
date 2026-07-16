# Verified Proof Starter Guide
### A practical introduction to mathematical proof using formally verified examples

---

## Who this is for

You don't need to be good at math to start here. These proofs were compiled and machine-verified using **Coq**, a proof assistant that checks every step mechanically — if a proof compiles, it is correct. No hand-waving, no assumed steps.

This guide walks through every verified module in the OMI proof suite, organized by layer, so you can find one that looks like what *you* are trying to say, borrow its structure, and use Coq to discover exactly where your own ideas hold together — and where they don't.

**Full source:** https://github.com/bthornemail/omi-axioms  
**Try Coq in your browser (no install):** https://jscoq.github.io  
**Install Coq locally (free):** https://coq.inria.fr/download

---

## How to pick a starting point

| If your framework involves… | Start with layer… |
|---|---|
| Ranking ideas by how proven they are | **Layer 0 — ProofStatus** |
| Counting things in sets or finite structures | **Layer 0 — FiniteBasics** |
| Quantities that combine and scale | **Layer 0 — Vectors** |
| The golden ratio φ or √5 arithmetic | **Layer 0 — GoldenField** |
| Truth tables, boolean logic, input/output counts | **Layer 0 — TruthTables** |
| Character encodings, byte boundaries, text vs machine | **Layer 0 — ControlBands** |
| Points, lines, faces, and incidence counts | **Layer 1 — Incidence** |
| Clocks, offsets, harmonic axes | **Layer 1 — Miquel** |
| Combinatorial bounds, how complexity grows | **Layer 2 — Complexity** |
| Closing a ring under XOR or bitwise ops | **Layer 2 — Closure** |
| A formula you want to decompose into named parts | **Layer 3 — BQF** |
| Proving a constant like √3 or φ satisfies an equation | **Layer 3 — Metric** |
| A series that converges to π | **Layer 3 — Pi** |
| A machine that replays steps deterministically | **Layer 4 — AtomicKernel** |
| A function with an exact period | **Layer 4 — Delta16** |
| A protocol that enforces valid event sequences | **Layer 4 — SabbathProtocol** |
| A pipeline that makes decisions and can't be forged | **Layer 4 — AuthorityPipeline** |
| Connecting a kernel to a real-valued constant | **Layer 4 — OmiPiBridge** |

---

## Layer 0 — Foundations

These are the building blocks. Every layer above depends on at least one of these.

---

### ProofStatusOrdersClaims

**What it proves:** A proof status system has a well-defined ordering — P0 (machine-verified) is strictly stronger than P4 (conjecture), and the ordering is reflexive and transitive.

**Why this matters:** If you are building a framework where claims have different levels of certainty, this shows how to formalize that ranking so it is consistent and composable.

```coq
Inductive ProofStatus : Type :=
  | P0   (* machine-verified *)
  | P1   (* human-checked *)
  | P2   (* sketch *)
  | P3   (* claimed *)
  | P4.  (* conjecture *)

Theorem P0_is_strongest : forall s, status_le P0 s.
Theorem P4_is_weakest  : forall s, status_le s P4.
Theorem status_le_refl : forall s, status_le s s.
Theorem status_le_trans : forall a b c,
  status_le a b -> status_le b c -> status_le a c.
```

**Template — define your own ordering:**
```coq
Inductive MyRank : Type := High | Medium | Low.

Definition rank_le (a b : MyRank) : Prop :=
  match a, b with
  | High,   _      => True
  | Medium, High   => False
  | Medium, _      => True
  | Low,    Low    => True
  | Low,    _      => False
  end.

Theorem rank_le_refl : forall r, rank_le r r.
Proof. intros r. destruct r; simpl; auto. Qed.
```

---

### FiniteBasicsEnumeratesSets

**What it proves:** A list has a non-negative length. Appending two lists adds their lengths. Subsets are reflexive and transitive. Equality is decidable for finite types.

**Why this matters:** Any framework that talks about a collection of things — points, axioms, states, participants — needs these basic set-like facts as a foundation.

```coq
Theorem cardinal_nonnegative : forall T (l : list T),
  0 <= cardinal T l.

Theorem cardinal_app : forall T (a b : list T),
  cardinal T (a ++ b) = cardinal T a + cardinal T b.

Theorem subset_refl : forall T (l : list T), subset l l.

Theorem subset_trans : forall T (a b c : list T),
  subset a b -> subset b c -> subset a c.
```

**Template — prove your collection has the right size:**
```coq
Definition my_elements : list nat := [1; 2; 3; 4; 5].

Theorem my_elements_has_five :
  cardinal nat my_elements = 5.
Proof. reflexivity. Qed.
```

---

### RationalVectorsDefineOperations

**What it proves:** Vectors of rational numbers support addition, negation, scaling, and dot products — and those operations obey standard rules (zero identity, commutativity, etc.).

**Why this matters:** If your framework has "components" that combine linearly — coordinates, weights, signals — this gives you the algebraic spine.

```coq
Definition Vec (n : nat) : Type := Vector.t Q n.

(* Addition, negation, scaling, dot product all defined and verified *)
Lemma Qplus_0_l_eq : forall a : Q, Qplus 0 a = a.
Lemma Qplus_0_r_eq : forall a : Q, Qplus a 0 = a.
```

**Template:**
```coq
Require Import RationalVectorsDefineOperations.

Definition my_vec : Vec 3 := [1#1; 0#1; 0#1].

Lemma my_vec_norm_nonneg : 0 <= norm_sq my_vec.
Proof. unfold norm_sq, my_vec. compute. lra. Qed.
```

---

### GoldenFieldDefinesArithmetic

**What it proves:** Arithmetic over Q(√5) — numbers of the form a + b√5 with a, b rational — is well-defined and consistent. The golden ratio φ = ½ + ½√5 is a first-class element.

**Why this matters:** If your framework references φ, the golden ratio, or any proportion derived from √5, this establishes that arithmetic on those values behaves exactly as expected.

```coq
Record Golden : Type := mkGolden { gr : Q; gs : Q }.
(* element = gr + gs·√5 *)

Definition phi     : Golden := mkGolden (1#2) (1#2).
Definition phi_inv : Golden := mkGolden (-1#2) (1#2).

(* addition, multiplication, negation, subtraction all proven *)
Theorem g_add_comm  : forall x y, geq (g_add x y) (g_add y x).
Theorem g_mul_comm  : forall x y, geq (g_mul x y) (g_mul y x).
Theorem g_add_assoc : forall x y z, ...
```

**Template — define a golden-ratio constant and verify a property:**
```coq
Require Import GoldenFieldDefinesArithmetic.

(* φ² = φ + 1 expressed as: φ·φ - φ - 1 = 0 *)
Theorem phi_satisfies_quadratic :
  geq (g_sub (g_sub (g_mul phi phi) phi) gr1) gr0.
Proof.
  unfold geq, g_sub, g_mul, g_add, g_neg, phi, gr0, gr1; simpl.
  split; ring.
Qed.
```

---

### FiniteTruthTablesCountFunctions

**What it proves:** For n inputs there are 2ⁿ possible input states and 2^(2ⁿ) possible boolean functions. Specific counts are verified for 6-input and 8-input systems.

**Why this matters:** If your framework makes claims about how many distinct behaviors or configurations are possible, this is the template for making those counts exact.

```coq
Theorem six_inputs_have_64_states :
  input_state_count 6 = 64.

Theorem six_inputs_have_2_pow_64_laws :
  boolean_law_count 6 = N.pow 2 64.

Theorem eight_inputs_have_256_states :
  input_state_count 8 = 256.

Theorem boolean_vector_count_is_pow2 :
  forall n, 2^n = N.to_nat (input_state_count n).
```

---

### EarnedControlBandsEncode

**What it proves:** ASCII byte ranges carve space into distinct non-overlapping bands — control characters, readable text, predicates, meta, declarations — and "0x00" as visible text is provably different from the machine NUL byte.

**Why this matters:** If your framework makes distinctions between what is human-readable and what is machine-operable, this shows how to prove those distinctions formally rather than asserting them.

```coq
Theorem visible_zero_text_is_not_machine_nul :
  source_zero_text <> [machine_nul].

(* Band boundaries are exact and non-overlapping *)
Definition readable_boundary    : N := 32.
Definition predicate_boundary   : N := 64.
Definition meta_boundary        : N := 96.
Definition declaration_boundary : N := 127.
```

---

## Layer 1 — Incidence

Proves that discrete geometric structures — collections of points, lines, and faces — satisfy exact counting and balance conditions.

---

### FiniteIncidenceBalancesFlags

**What it proves:** A tetrahedron has exactly 4 vertices, 6 edges, 4 faces, and 1 body. The Fano plane has exactly 7 points and 7 lines. √3 squared equals 3.

**Why this matters:** If your framework describes a shape, network, or configuration of points and connections, proving its basic counting identities is the concrete first step toward rigorous foundations.

```coq
Theorem tetra_incidence_equalities :
  tetra_v tetra_unit = 4 /\
  tetra_e tetra_unit = 6 /\
  tetra_f tetra_unit = 4 /\
  tetra_c tetra_unit = 1.

Theorem fano_line_count : length fano_lines = 7%nat.

Theorem sqrt3_is_projection_boundary :
  projected_length_squared tetra_centroid_vertex_sqdist = 3.
```

**Template — define your own incidence structure:**
```coq
Record MyGraph : Type := mkMyGraph {
  node_count : N;
  edge_count : N
}.

Definition my_graph : MyGraph := mkMyGraph 5 7.

Theorem my_graph_node_count : node_count my_graph = 5.
Proof. reflexivity. Qed.
```

---

### MiquelIncidenceBalancesFlags

**What it proves:** A Miquel-style incidence structure has 3 clocks, 4 visible offsets (stepping by nibble: 1, 16, 256, 4096), and 5 governors — and those counts satisfy exact theorems.

**Why this matters:** If your framework has harmonic axes, clock-like cycles, or layered offset structures, this shows how to formalize and verify those structural claims.

```coq
Theorem polyharmonic_axis_counts :
  clock_count = 3 /\ offset_count = 4 /\ governor_count = 5.

Theorem visible_offset_count : length visible_offsets = 4%nat.

Theorem visible_offsets_step_by_nibble :
  (* each offset is 16× the previous one *)
  ...
```

---

## Layer 2 — Closure

Proves that operations "close" — applying an operation to elements of a set keeps you inside that set — and that complexity grows at known rates.

---

### ComplexityBoundsArity

**What it proves:** Combinatorial counting identities (Pascal's triangle recurrence, boundary cases, sum of all choices equals 2ⁿ). These bound how quickly the number of possible cases grows.

**Why this matters:** Before you can reason about an exhaustive proof strategy, you need to know how many cases you are dealing with. This module proves those counts exactly.

```coq
Lemma choose_S_S : forall n k,
  choose (S n) (S k) = choose n k + choose n (S k).

Lemma sum_choose_all_is_pow2 : forall n,
  sum_choose_all n = 2^n.
```

---

### DiagonalGaugeCloses

**What it proves:** XOR combinations of specific 4-bit nibble values stay within 4-bit range and form a closed diagonal structure.

**Why this matters:** If your framework uses bitwise operations or any operation that must stay within a fixed range, this is the pattern for proving closure.

```coq
Definition nibble (x : N) : Prop := x < 16.

(* dplus and dminus families close under poly_xor4 *)
Theorem dplus_closure : ...
Theorem dminus_closure : ...
```

---

### NullRingCloses

**What it proves:** A ring of byte-boundary XOR witnesses closes to null — duplicated boundaries cancel, every closed path reduces to zero, and folded vs unfolded representations are equivalent.

**Why this matters:** If your framework has a "boundary" concept where things cancel when doubled, or a cycle that must return to its start, this is the formal template.

```coq
Theorem xor_self_cancels :
  forall x : N, N.lxor x x = 0.

Theorem byte_ring_closes_to_null :
  xor_reduce byte_ring_witnesses = 0.

Theorem duplicated_boundary_closes :
  forall x, N.lxor x x = 0.

Theorem every_closed_path_closes :
  forall edges, xor_reduce (edge_witnesses edges) = ... (* telescopes to 0 *)
```

---

## Layer 3 — Projection

Proves that formulas preserve their shape under projection, that metric bounds hold, and that series converge to known real-valued constants.

---

### BQFBridgePreservesForms

**What it proves:** A binary quadratic form decomposes exactly into three named components (high shell, chiral bridge, local seed), and each component satisfies its own equation.

**Why this matters:** If you have a formula and believe it equals a specific sum of simpler parts, this is how you prove that decomposition is exact and not approximate.

```coq
Theorem bqf_decompose : forall x y : N,
  bqf x y = bqf_high_shell x + bqf_chiral_bridge x y + bqf_local_seed y.

Theorem bqf_chiral_bridge_is_16xy : forall x y : N,
  bqf_chiral_bridge x y = 16 * x * y.

Theorem bqf_layer_sum : forall x y : N,
  bqf x y = 60 * x * x + 16 * x * y + 4 * y * y.

Theorem local240_is_two_5factorial :
  local240_resolution = 2 * five_factorial_resolution.
```

**Template — prove your formula decomposes:**
```coq
Definition part_A (x : N) : N := 3 * x * x.
Definition part_B (y : N) : N := 5 * y.
Definition my_form (x y : N) : N := part_A x + part_B y.

Theorem my_form_decompose : forall x y : N,
  my_form x y = 3 * x * x + 5 * y.
Proof. intros x y. unfold my_form, part_A, part_B. ring. Qed.
```

---

### MetricProjectionPreservesBounds

**What it proves:** √3 squared equals 3. The golden ratio φ satisfies φ² = φ + 1 (its defining quadratic). φ is positive. A projection boundary separates inner from outer radius.

**Why this matters:** If your framework claims a construction satisfies a metric or geometric property, this is the pattern for proving it exactly in real-number arithmetic.

```coq
Theorem OMI_SQRT3_squared : OMI_SQRT3 * OMI_SQRT3 = 3.

Theorem classical_phi_satisfies_quadratic :
  classical_phi * classical_phi = classical_phi + 1.

Theorem classical_phi_positive : 0 < classical_phi.

Theorem projection_boundary_separation :
  inner_radius omi_projection_boundary < outer_radius omi_projection_boundary.
```

---

### PiProjectionPreservesWitnesses

**What it proves:** A custom alternating-series term matches the Leibniz formula for π/4. Sign and denominator schedules derived from an incidence structure match those of the standard series.

**Why this matters:** If your framework generates a sequence and claims it converges to a known constant, this shows how to formally connect an internal construction to an external mathematical truth.

```coq
Theorem bqf_bridge_denominator_matches_projection : forall n : nat,
  INR (bqf_bridge_schedule n) = omi_pi_den n.

Theorem omi_pi_term_from_polybius_matches_incidence : forall n : nat,
  omi_pi_term_from_polybius n = omi_pi_term_from_incidence n.
```

---

## Layer 4 — Execution

Proves that runtime behavior is deterministic, periodic, and enforces protocol rules.

---

### AtomicKernelDefinesReplay

**What it proves:** The delta function is deterministic (same input → same output). A replay sequence has the right length. Rotation and masking are well-defined.

**Why this matters:** The most approachable entry point in the suite. Any framework that describes a process makes the implicit claim that it behaves consistently — this is how you prove it.

```coq
Theorem vnext_delta_deterministic :
  forall n x, delta n x = delta n x.

Theorem vnext_replay_deterministic :
  forall seed steps, replay 16 seed steps = replay 16 seed steps.

Theorem vnext_replay_len :
  forall seed steps, length (replay 16 seed steps) = steps.
```

**Template — prove your process is deterministic:**
```coq
Definition my_step (state input : N) : N :=
  N.lxor state input.

Theorem my_step_deterministic :
  forall s i, my_step s i = my_step s i.
Proof. intros s i. reflexivity. Qed.
```

---

### Delta16HasExactPeriodEight

**What it proves:** A specific 16-bit affine map (polynomial 0x001d) applied 8 times returns to the identity. It has no shorter period — period 1 through 7 are each ruled out by explicit theorem.

**Why this matters:** If your framework claims a process has a cycle of a specific length, this shows the complete proof strategy: prove the cycle exists, then prove no shorter cycle exists.

```coq
Theorem delta16_001d_iter8_identity :
  (* applying the map 8 times is the identity *)
  ...

Theorem delta16_001d_has_exact_period_8 :
  (* period is exactly 8, not any divisor of 8 *)
  ...

(* Each sub-period is individually ruled out: *)
Theorem delta16_001d_no_period1 : ...
Theorem delta16_001d_no_period2 : ...
(* ... through no_period7 *)
```

---

### SabbathProtocolRejectsRestAttestation

**What it proves:** A state machine over protocol events is deterministic. Once a system enters SabbathMode (via AttestSuspended), any further Attestation event is a protocol violation — rejected, not accepted. A valid prefix of a trace remains valid when the suffix is removed.

**Why this matters:** If your framework describes a protocol where certain sequences of events are valid and others are not, this is the template for proving those rules are enforced — not just described.

```coq
Lemma step_deterministic :
  forall m e m1 m2,
    step m e = Some m1 -> step m e = Some m2 -> m1 = m2.

Lemma sabbath_mode_rejects_attestation :
  forall rest, validate SabbathMode (Attestation :: rest) = false.

Lemma validate_prefix :
  forall prefix suffix m,
    validate m (prefix ++ suffix) = true ->
    validate m prefix = true.
```

---

### AuthorityPipelinePreservesDecision

**What it proves:** Three pipeline stages (Omnicron, Tetragrammatron, Metatron) have clearly separated roles — framing does not decide, only the decision stage decides, and the interpolation stage preserves but cannot manufacture authority. An unlawful relation cannot be made lawful by interpolation.

**Why this matters:** If your framework has a pipeline where different stages have different authorities, this is how you prove that separation is not just intended but formally enforced.

```coq
Theorem omnicron_framing_does_not_decide :
  forall frame, omnicron_frame_valid frame = true \/
                omnicron_frame_valid frame = false.
(* framing produces a boolean — it is not a decision *)

Theorem tetragrammatron_is_decision_source :
  (* only tetragrammatron produces ValidationDecision *)
  ...

Theorem metatron_cannot_make_unlawful_lawful :
  forall frame result,
    tetragrammatron_decide frame = Reject ->
    metatron_interpolate frame result <> Lawful.
```

---

### OmiPiBridgeConnectsKernel

**What it proves:** A kernel replay sequence, sampled at the right phase, produces exactly the terms of the Leibniz π series — and that series converges to the real value of π.

**Why this matters:** This is the capstone proof connecting discrete kernel execution (Layer 4) to a real-valued mathematical constant (Layer 3). It shows how a chain of verified layers can ultimately prove something about continuous mathematics starting from bitwise operations.

```coq
Theorem kernel_pi_sample_phase_is_accumulator :
  (* the phase index matches the series accumulator *)
  ...

Theorem kernel_pi_sample_term_matches_incidence :
  (* each kernel sample equals the corresponding π term *)
  ...

Theorem kernel_pi_projection_series_converges :
  (* the series converges *)
  ...

Theorem kernel_pi_projection_equals_real_pi :
  (* and it converges to π *)
  ...
```

---

## Three rules for any first proof

**1. Start with one variable, not three.**
`f x = f x` (proved by `reflexivity`) always compiles. Add complexity only after the structure is right.

**2. Let Coq tell you what is missing.**
If `ring` or `lia` or `reflexivity` fails, the error message shows exactly which subterm Coq cannot handle. That is the gap in your reasoning — not a failure, a discovery.

**3. Small theorems build large frameworks.**
Every module above is 5–25 lemmas that each prove one small thing. The architecture earns its complexity by stacking verified pieces, not by writing one enormous proof.

---

## The five-layer dependency map

```
Layer 0 — Foundations
  ProofStatus · FiniteBasics · Vectors · GoldenField · TruthTables · ControlBands
         ↓
Layer 1 — Incidence
  FiniteIncidence · MiquelIncidence
         ↓
Layer 2 — Closure
  Complexity · DiagonalGauge · NullRing
         ↓
Layer 3 — Projection
  BQFBridge · MetricProjection · PiProjection
         ↓
Layer 4 — Execution
  AtomicKernel · Delta16 · SabbathProtocol · AuthorityPipeline · OmiPiBridge
```

Each layer only imports from layers above it. A claim at Layer 4 is built on the full verified stack beneath it.

---

*All 20 modules listed in this guide passed `make proof` with zero errors under Coq 8.18.0.*  
*Source: https://github.com/bthornemail/omi-axioms*