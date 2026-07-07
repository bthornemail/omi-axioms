# OMI Proof Suite Proposal

## Prove What Can Be Used Before It Enters Canon

## 0. Purpose

The OMI proof suite exists to decide what the project may safely use.

It does not exist to prove every metaphor.

It does not exist to force all uploaded geometry into canon.

It exists to separate:

```text id="fbyxat"
provable structure
from
useful model
from
visual metaphor
from
unusable claim
```

The rule is:

```text id="9usxap"
No structure becomes OMI authority until it has a proof boundary.
```

A concept may still be useful as visualization, pedagogy, implementation precedent, or mental model.

But it cannot become canon law unless the proof suite says what is proved.

## 1. Classification Levels

Each candidate concept receives one of five statuses.

### P0 — Proven Core

A claim is P0 when it is fully formalized and proven in Coq.

Examples:

```text id="k0ktqt"
finite incidence theorem
closure theorem
determinism theorem
norm-preservation theorem
decidable adjudication theorem
```

### P1 — Computable / Exhaustively Checkable

A claim is P1 when it is finite and can be checked by exhaustive computation, then later promoted to Coq.

Examples:

```text id="ib41m1"
E8 root enumeration = 240
Fano line incidence
Karnaugh truth-table reduction
finite gauge-table transition
finite icosian multiplication table
```

### P2 — Mathematical Model / Partially Formal

A claim is P2 when the math is real, but full formalization is larger than the immediate proof target.

Examples:

```text id="3g97x4"
Hopf fibrations
Leech lattice relation
Mathieu/Golay stabilizer structure
Bravais lattice mental model
pinch/branch singularity vocabulary
```

### P3 — Implementation Precedent

A claim is P3 when prior code exists, but the code is not proof authority.

Examples:

```text id="zryzpt"
old E8 module demos
geometric consensus implementation
BIP32-to-E8 mapping
hash-to-tetrahedron prototypes
ML quorum stability experiments
```

### P4 — Metaphor / Visualization Only

A claim is P4 when it helps intuition but is not allowed to drive validation.

Examples:

```text id="64x48k"
consciousness interpretation
Merkaba spiritual naming
Metatron's Cube as substrate metaphor
sacred geometry language
qualia claims
```

A P4 concept may become P1/P2 only when rewritten as an exact predicate.

## 2. Immediate Proof Suite Modules

The proof suite should start with small, composable Coq files.

Suggested module order:

```text id="fqihfc"
00_ProofStatus.v
01_FiniteBasics.v
02_FanoIncidence.v
03_BitmaskClosure.v
04_KarnaughReduction.v
05_GaugeTable.v
06_GoldenField.v
07_GoldenQuaternion.v
08_IcosianUnits.v
09_OmiRingStep.v
10_RelationalQuotation.v
11_E8Roots.v
12_WeylReflection.v
13_HopfProjection.v
14_PinchBranchLocalForms.v
15_ProofRegistry.v
```

The first goal is not to prove everything.

The first goal is to make every claim land somewhere.

## 3. Proof Suite A: Finite Incidence

### Target

Formalize the 7-point Fano plane.

The geometric-consensus foundation defines the core 7-point structure and says the Fano plane has 7 points, 7 lines, 3 points per line, and 3 lines per point. The implementation summary says the earlier system implemented 7-point structures, Fano plane construction, incidence matrices, block-design signatures, and comparison.

### Coq target

```coq id="zkn7iy"
Definition Point7 := Fin.t 7.

Definition fano_lines : list (list Point7) := ... .
```

### Theorems

```coq id="gto08h"
Theorem fano_has_7_points :
  cardinal Point7 = 7.

Theorem fano_has_7_lines :
  length fano_lines = 7.

Theorem every_line_has_3_points :
  forall l, In l fano_lines -> length l = 3.

Theorem every_two_points_determine_one_line :
  forall p q,
    p <> q ->
    exists! l,
      In l fano_lines /\ In p l /\ In q l.
```

### OMI use

If proven, Fano incidence may be used for:

```text id="elclgu"
finite relation incidence
gauge-family incidence
truth-table adjacency
small deterministic adjudication surfaces
```

## 4. Proof Suite B: Bitmask Closure

### Target

Formalize finite closure over bounded bitmasks.

This comes from the earlier proof-kernel direction: bounded expansion, closure, phase projection, and deterministic canonicalization.

### Coq target

```coq id="sdx061"
Definition mask7 := N.
Definition upper_bound (x : mask7) : Prop := x <? 128 = true.
Definition expand7 (x : mask7) : mask7 := ...
Definition closure7 (seed lower upper : mask7) : mask7 := ...
```

### Theorems

```coq id="gcrbvz"
Theorem closure7_extensive :
  forall seed lower upper,
    subset seed (closure7 seed lower upper).

Theorem closure7_monotone :
  forall a b lower upper,
    subset a b ->
    subset (closure7 a lower upper) (closure7 b lower upper).

Theorem closure7_idempotent :
  forall seed lower upper,
    closure7 (closure7 seed lower upper) lower upper =
    closure7 seed lower upper.

Theorem closure7_terminates :
  forall seed lower upper,
    exists n, n <= popcount upper /\ reaches_fixed_point n.
```

### OMI use

If proven, bitmask closure may be used for:

```text id="94vnpi"
bounded relation expansion
finite kernel closure
carry-forward proof
phase projection
non-hash canonical state
```

## 5. Proof Suite C: Karnaugh / Truth Reduction

### Target

Formalize deterministic truth reduction.

Karnaugh maps should be treated as reduction surfaces, not authority.

### Coq target

```coq id="r8n3qp"
Definition BoolVec (n : nat) := Vector.t bool n.
Definition TruthTable n := BoolVec n -> bool.
Definition equivalent n (f g : TruthTable n) : Prop :=
  forall x, f x = g x.
```

### Theorems

```coq id="fj9wr9"
Theorem truth_table_equivalence_decidable :
  forall n (f g : TruthTable n),
    { equivalent n f g } + { ~ equivalent n f g }.

Theorem karnaugh_reduction_preserves_truth :
  forall n f,
    equivalent n f (karnaugh_reduce f).
```

### OMI use

If proven, Karnaugh reduction may be used for:

```text id="dl1swk"
Tetragrammatron adjudication support
truth-gate minimization
finite candidate relation simplification
```

## 6. Proof Suite D: Gauge Table

### Target

Formalize the 16-control gauge family and earned OMI-Lisp bands.

The current OMI correction is:

```text id="rv04e1"
0x0..0xF gauge family
reflected across earned bands:
0x00..0x20
0x00..0x40
0x00..0x60
0x00..0x80 / 0x7F
```

### Coq target

```coq id="v52165"
Definition Gauge := Fin.t 16.

Inductive EarnedBand :=
| Band20
| Band40
| Band60
| Band7F.
```

### Theorems

```coq id="zw0ok8"
Theorem gauge_decidable :
  forall g h : Gauge, {g = h} + {g <> h}.

Theorem earned_band_ordered :
  Band20 <= Band40 <= Band60 <= Band7F.

Theorem gauge_projection_deterministic :
  forall band g,
    exists! codepoint,
      project_gauge band g = codepoint.
```

### OMI use

If proven, the gauge table may be used for:

```text id="2jsxfg"
notation multiplexing
earned codepoint surfaces
OMI-Lisp declaration bands
gauge-controlled relation movement
```

## 7. Proof Suite E: Golden Field and Quaternions

### Target

Build the icosian bridge from exact arithmetic.

This is the best first formal target for the Omi-Ring.

### Coq target

```coq id="b10bhz"
Record Golden := {
  g_re : Q;
  g_rt : Q
}.
```

Interpreted as:

```text id="fnkfd6"
g_re + g_rt√5
```

Then:

```coq id="w86emx"
Record GQuat := {
  q_r : Golden;
  q_i : Golden;
  q_j : Golden;
  q_k : Golden
}.
```

### Theorems

```coq id="hzk7d8"
Theorem golden_mul_assoc :
  forall a b c, g_mul a (g_mul b c) = g_mul (g_mul a b) c.

Theorem golden_norm_mul :
  forall a b, g_norm (g_mul a b) = g_norm a * g_norm b.

Theorem quat_mul_assoc :
  forall a b c, q_mul a (q_mul b c) = q_mul (q_mul a b) c.

Theorem quat_norm_mul :
  forall a b, q_norm (q_mul a b) = g_mul (q_norm a) (q_norm b).
```

### OMI use

If proven, golden quaternions may be used for:

```text id="x2kq3q"
Omi-Ring candidate arithmetic
associative relation composition
norm-preserving gauge steps
icosian bridge
```

## 8. Proof Suite F: Icosian Units

### Target

Define the 120 unit icosians and test/prove their finite closure.

This is the likely bridge between:

```text id="8vjnlf"
Omi-Ring
quaternion arithmetic
600-cell
E8
Leech/Golay/Mathieu later
```

### Coq target

```coq id="cn6p8q"
Definition unit_icosians : list GQuat := ... .

Definition IsUnitIcosian (x : GQuat) : Prop :=
  In x unit_icosians.
```

### Theorems

```coq id="16u76a"
Theorem unit_icosians_count :
  length unit_icosians = 120.

Theorem unit_icosians_norm_one :
  forall x,
    IsUnitIcosian x ->
    q_norm x = g_one.

Theorem unit_icosians_closed_mul :
  forall x y,
    IsUnitIcosian x ->
    IsUnitIcosian y ->
    IsUnitIcosian (q_mul x y).

Theorem unit_icosians_inverse :
  forall x,
    IsUnitIcosian x ->
    IsUnitIcosian (q_conj x).
```

### OMI use

If proven, selected icosian units may be used as:

```text id="s2wj7m"
finite Omi-Ring gauge actions
norm-preserving local rotations
tetrahedral / 600-cell arithmetic witnesses
```

## 9. Proof Suite G: Omi-Ring Step

### Target

Define the OMI gauge action as a deterministic ring step.

### Coq target

```coq id="b7o6dz"
Definition OmiGauge := Fin.t 16.

Definition gauge_to_unit : OmiGauge -> GQuat := ... .

Definition omi_ring_step (s : GQuat) (g : OmiGauge) : GQuat :=
  q_mul s (gauge_to_unit g).
```

### Theorems

```coq id="lufr2f"
Theorem omi_ring_step_deterministic :
  forall s g x y,
    x = omi_ring_step s g ->
    y = omi_ring_step s g ->
    x = y.

Theorem omi_ring_step_preserves_norm :
  forall s g,
    q_norm (omi_ring_step s g) = q_norm s.

Theorem omi_ring_step_closed :
  forall s g,
    IsOmiRingState s ->
    IsOmiRingState (omi_ring_step s g).
```

### OMI use

If proven, this becomes one of the first real formal OMI-ring results:

```text id="plsfws"
gauge step is deterministic
gauge step is closed
gauge step preserves local balance
```

## 10. Proof Suite H: Relational Quotation

### Target

Define candidate relation quotation and adjudication.

### Coq target

```coq id="bupgrg"
Record QuotedRelation := {
  qr_source : GQuat;
  qr_gauge  : OmiGauge;
  qr_target : GQuat
}.

Definition adjudicates (qr : QuotedRelation) : Prop :=
  qr_target qr = omi_ring_step (qr_source qr) (qr_gauge qr).
```

### Theorems

```coq id="zdc4nn"
Theorem adjudication_decidable :
  forall qr,
    { adjudicates qr } + { ~ adjudicates qr }.

Theorem accepted_relation_unique :
  forall source gauge target1 target2,
    adjudicates {| qr_source := source; qr_gauge := gauge; qr_target := target1 |} ->
    adjudicates {| qr_source := source; qr_gauge := gauge; qr_target := target2 |} ->
    target1 = target2.
```

### OMI use

If proven, this supports the canon line:

```text id="u3vdh4"
Relational quotation frames candidate relations.
Validation determines.
```

## 11. Proof Suite I: E8 Roots

### Target

Formalize only the finite E8 root facts we need.

The uploaded E8 docs define the E8 module as constructing 240 roots, split into 112 type-1 and 128 type-2 roots. The demo log says the module demo initializes 240 roots, 8 simple roots, and 8 Weyl generators.

### Coq target

```coq id="xsmg4a"
Definition Vec8 := Vector.t Q 8.
Definition e8_roots : list Vec8 := ... .
```

### Theorems

```coq id="kyxmpw"
Theorem e8_roots_count :
  length e8_roots = 240.

Theorem e8_roots_norm_two :
  forall r,
    In r e8_roots ->
    dot r r = 2.

Theorem e8_roots_type_split :
  length e8_type1_roots = 112 /\
  length e8_type2_roots = 128.
```

### OMI use

If proven, E8 may be used as:

```text id="v258mr"
finite exceptional root reference
Weyl reflection test space
higher-dimensional balance model
```

But not as protocol authority.

## 12. Proof Suite J: Weyl Reflection

### Target

Formalize norm-preserving reflection.

The E8 manifold document gives the standard reflection formula:

```text id="jtp8e2"
s_α(v) = v - 2(v·α)/(α·α) α
```

and describes the Weyl group as generated by reflections over hyperplanes perpendicular to simple roots.

### Coq target

```coq id="27wtut"
Definition reflect (alpha v : Vec8) : Vec8 :=
  v - scale ((2 * dot v alpha) / dot alpha alpha) alpha.
```

### Theorems

```coq id="26znzf"
Theorem reflection_involutive :
  forall alpha v,
    dot alpha alpha <> 0 ->
    reflect alpha (reflect alpha v) = v.

Theorem reflection_preserves_norm :
  forall alpha v,
    dot alpha alpha <> 0 ->
    dot (reflect alpha v) (reflect alpha v) = dot v v.
```

### OMI use

If proven, Weyl reflection may be used for:

```text id="s542a6"
canonicalization model
reflection/adjudication mental model
norm-preserving transform carrier
```

## 13. Proof Suite K: Hopf Projection

### Target

Keep Hopf fibrations as projection math, not consciousness authority.

The Hopf docs state the complex Hopf map in real coordinates and classify the complex, quaternionic, and octonionic Hopf fibrations as the only spherical-fiber sphere projections associated with the normed division algebras.

### Coq target

Start only with complex Hopf.

```coq id="rx2b1z"
Record R4 := { a : Q; b : Q; c : Q; d : Q }.
Record R3 := { x : Q; y : Q; z : Q }.

Definition hopf_complex (p : R4) : R3 :=
  {|
    x := a^2 + b^2 - c^2 - d^2;
    y := 2*(a*d + b*c);
    z := 2*(b*d - a*c)
  |}.
```

### Theorem

```coq id="6076hb"
Theorem hopf_maps_s3_to_s2 :
  forall p,
    norm4 p = 1 ->
    norm3 (hopf_complex p) = 1.
```

### OMI use

If proven, Hopf projection may be used for:

```text id="yhnwp0"
projection face model
dimension-reduction model
carrier projection analogy
```

It should not be used to prove consciousness.

## 14. Proof Suite L: Pinch / Branch Local Forms

### Target

Formalize local algebraic singularity patterns.

The uploaded pinch/branch doc defines the pinch point canonical form `u² - vw² = 0`, branch points as ramification where locally `π(z)=w^n`, and gives Riemann-Hurwitz as a correction formula for branched coverings.

### Coq target

Start with decidable algebraic predicates over rationals.

```coq id="o1fpbh"
Definition pinch_form (u v w : Q) : Prop :=
  u*u - v*w*w = 0.
```

### Theorems

```coq id="cqmzay"
Theorem pinch_form_decidable :
  forall u v w,
    { pinch_form u v w } + { ~ pinch_form u v w }.
```

Branch points over complex/Riemann surfaces are larger, so classify as P2 until later.

### OMI use

Pinch/branch vocabulary may be used for:

```text id="txinxf"
projection singularity language
carrier collapse model
unresolved declaration gap language
```

But not yet as core proof law.

## 15. What Cannot Be Used Yet

The following must remain outside canon authority until rewritten as exact predicates.

### Consciousness claims

The consciousness docs claim consciousness emerges as Hopf projections and make empirical predictions about reaction time, working memory, and qualia intensity. These are not Coq-proof targets in the current OMI suite.

Status:

```text id="286vi0"
P4 metaphor / P3 empirical hypothesis
not OMI authority
```

### Merkaba / Metatron claims

The Merkaba and Metatron docs contain potentially useful geometric ideas, such as star tetrahedron, dual tetrahedra, virtual centroid, and E8 analogy, but they also contain broad interpretive claims. Some docs present Metatron’s Cube as a 13-sphere configuration and claim Platonic solids emerge from it.

Status:

```text id="6g8w7y"
star tetrahedron geometry = P2/P1 if formalized
spiritual naming = P4
E8 generation from Metatron = unproven until exact map is supplied
```

### Lightcone tetrahedron

The lightcone document proposes tests for tetrahedra in Minkowski space and null-edge conditions. This may become a geometric test suite, but not a current OMI proof dependency.

Status:

```text id="nv932z"
P1 computational geometry test
not OMI core
```

### Hash / signature / BIP32 identity

Old geometric-consensus docs used signatures, BQF hashes, content addresses, and tetrahedra derived from hashes. The implementation summary explicitly includes BQF hashes, signatures, and hash-to-tetrahedron conversion.

OMI rule:

```text id="7eo411"
These may be carrier metadata.
They are not OMI identity.
They are not validation authority.
```

## 16. Proof Registry Format

Every claim should be tracked in a registry.

```text id="sn3v3n"
Claim ID:
Name:
Source document:
Status: P0/P1/P2/P3/P4
Formal statement:
Coq file:
Dependencies:
Allowed OMI use:
Forbidden OMI use:
Notes:
```

Example:

```text id="ljxw2z"
Claim ID: E8-ROOT-COUNT-001
Name: E8 root enumeration has 240 roots
Source: E8_LATTICE.md
Status: P1 → P0 target
Formal statement: length e8_roots = 240
Coq file: 11_E8Roots.v
Allowed OMI use: finite exceptional root reference
Forbidden OMI use: protocol authority or identity
```

## 17. Canon Lock

```text id="r0f1uz"
The OMI proof suite is a boundary filter.

It proves what may enter deterministic canon.

It classifies what may remain as model, visualization, implementation precedent, or metaphor.

No hash, signature, carrier, projection, visualization, or metaphor becomes OMI identity.

Identity remains the addressed place-value relation.

Relational quotation frames candidate relations.

Validation determines.

Omi-Attestation witnesses.

Accepted Omi-State may be recorded.

Projection only displays accepted relation state.
```
