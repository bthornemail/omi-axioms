# OMI Deterministic Computation Proof Book

## Purpose

This is the authoritative readable companion to the active Coq registry in
`omi-axioms`. It is written for readers who understand OMI through boundaries,
addresses, geometry, or implementation before they understand formal
mathematics.

The proof sources remain authoritative. This book explains what those sources
actually establish, how the results fit together, and where the proof boundary
ends.

The central computational claim is deliberately narrow:

> OMI represents bounded relations with fixed-width place-value frames,
> validates their finite closure through the Tetragrammatron decision function,
> and permits framing, interpolation, execution, and projection only as
> separately typed operations.

This is not a proof that arbitrary computation is constant time. It is a proof
collection for finite encodings, finite incidence structures, exact closure
laws, deterministic transitions, and selected mathematical projections.

## How to Read Claim Status

Every important statement belongs to one of four classes.

| Status | Meaning |
| --- | --- |
| **Proved** | An active Coq theorem compiles without local assumptions and passes `coqchk`. |
| **Implemented** | Runtime code or tests demonstrate behavior, but this repository does not yet prove the implementation equivalent to the Coq model. |
| **Defined model** | The terms and decision procedure are precise, but a larger interpretation or external correspondence is not proved. |
| **Interpretation** | A name, image, geometric reading, or philosophical explanation used to understand the model; it is not promoted to a theorem. |

These classes prevent four common mistakes:

1. readable notation is not automatically a machine byte;
2. a deterministic projection is not automatically validation;
3. a successful test is not automatically a mathematical proof;
4. a useful interpretation is not automatically a fact about an external
   mathematical or physical object.

## 1. The Authority Boundary

OMI divides one relation pipeline into distinct responsibilities:

```text
Omilog or OMI-Lisp declares.
Omnicron frames and resolves.
Tetragrammatron validates.
Metatron interpolates the accepted decision.
OMI-ISA executes a bounded witness.
Projection displays.
Receipt records.
```

Everything may be encoded as an Omi-Ring relation. That shared representation
does not grant every interpretation the same authority.

The active execution model uses the following types:

```text
FramedRelation
  envelope
  witness sequence
  gauge

ValidationDecision
  Lawful
  Unlawful

ValidatedRelation
  original frame
  Tetragrammatron decision

InterpolatedRelation
  source address
  destination address
  unchanged decision
```

**Proved:** Metatron interpolation preserves the supplied validation decision.
If Tetragrammatron returns `Unlawful`, interpolation cannot turn it into
`Lawful`.

**Defined model:** `Lawful` means that the Omnicron envelope is valid, both
Polybius diagonal closures are ready, and the complete witness sequence
XOR-reduces to zero.

**Boundary:** this model proves role separation. It does not claim that every
historical OMI runtime already implements the same decision function.

## 2. Invisible Bytes Before Readable Language

The text:

```text
0x00
```

is normally four visible source characters:

```text
0x30 0x78 0x30 0x30
```

It is not the machine byte `0x00`.

Likewise:

```lisp
(NULL . NULL)
```

is readable source. A parser or compiler must lower it into a binary-safe
representation before the actual NUL byte can participate in execution.

The Coq model records this distinction:

```text
source_zero_text = [48; 120; 48; 48]
machine_nul      = 0
```

**Proved:** `visible_zero_text_is_not_machine_nul`.

This distinction matters because ordinary C strings use NUL as a terminator.
An authoritative OMI object containing actual NUL values therefore requires
length-aware, binary-safe storage and transport.

## 3. The Pre-Language and Earned Bands

The first OMI surface is not printable language:

```text
0x00..0x1F  pre-language machine and control positions
0x20        SP, the earned readable boundary
```

The principal control quartet is:

```text
0x1C FS  file/frame boundary
0x1D GS  group/graph boundary
0x1E RS  record/relation boundary
0x1F US  unit/symbol boundary
```

At `0x20`, the machine stream reaches ASCII SP and earns readable separation.
The dot operator appears later at `0x2E`. SP and dot are therefore related but
not identical:

```text
0x20 earns readable separation.
0x2E expresses a visible cons or relation operation.
```

The declaration variants are cumulative inclusive surfaces:

| Variant | Inclusive surface | Number of positions |
| --- | ---: | ---: |
| Pre-language through SP | `0x00..0x20` | 33 |
| Structure through `@` | `0x00..0x40` | 65 |
| Declaration/meta through backtick | `0x00..0x60` | 97 |
| Full seven-bit declaration surface | `0x00..0x7F` | 128 |

The first three endpoints are multiples of 16, so their reflected low nibble is
zero. The reflection function is:

```text
reflected_gauge(codepoint) = codepoint mod 16
```

**Proved:** the surface sizes are 33, 65, 97, and 128; `0x1F + 1 = 0x20`;
every reflected gauge is below 16; and `0x20`, `0x40`, and `0x60` reflect to
zero.

**Interpretation:** readability is “earned” because the control surface comes
first. Coq proves the ordering and boundaries, not the philosophical meaning of
earning.

## 4. The Omnicron Resolver Envelope

The parameterized envelope is:

```text
G 00 1C 1D 1E 1F 20 G
```

with:

```text
G in 0xF0..0xFF
```

The canonical envelope is:

```text
FF 00 1C 1D 1E 1F 20 FF
```

Its positions are:

| Position | Value | Role |
| ---: | ---: | --- |
| 0 | `FF` | resolver horizon and selected tautological gauge |
| 1 | `00` | NUL origin |
| 2 | `1C` | frame boundary |
| 3 | `1D` | group boundary |
| 4 | `1E` | relation boundary |
| 5 | `1F` | unit boundary |
| 6 | `20` | readable boundary |
| 7 | `FF` | matching resolver closure |

The validator requires exactly eight bytes, a gauge in the F-band, matching
first and last gauges, and the exact six interior values.

**Proved:** the canonical bytes are exact; the canonical envelope validates;
every parameterized F-band envelope validates; and an envelope with the wrong
SP position is rejected.

**Authority boundary:** recognizing a valid envelope does not decide whether
the relation carried by that envelope is lawful.

## 5. The Root Discovery

The folded readable form is:

```lisp
(NULL . NULL)
```

The unfolded byte ring is:

```lisp
((0x00 . 0x20)
 (0x20 . 0x7F)
 (0x7F . 0xFF)
 (0xFF . 0x00))
```

The full addressed notation is:

```lisp
(omi---imo . '(o---o /---/ ?---? @---@))
```

These strings are not textually equal. The formal statement is instead that
their modeled closure values agree.

The byte-ring edges are:

```text
(00,20) (20,7F) (7F,FF) (FF,00)
```

Their XOR witnesses are:

```text
20 5F 80 FF
```

Their reduction is:

```text
20 XOR 5F XOR 80 XOR FF = 00
```

Expanded, each boundary occurs twice:

```text
00 XOR 20 XOR 20 XOR 7F XOR 7F XOR FF XOR FF XOR 00 = 00
```

The general closed-path law is:

```text
(A0 XOR A1)
XOR (A1 XOR A2)
XOR ...
XOR (An XOR A0)
= 0
```

**Proved:**

- every value XOR itself is zero;
- the byte-ring witnesses are exactly `20 5F 80 FF`;
- the byte ring closes to zero;
- duplicate boundary lists cancel;
- adjacent edge witnesses telescope;
- every finite closed path closes;
- a 256-bit-bounded address XOR itself is zero;
- folded, unfolded, and full-notation presentations share the modeled zero
  closure value.

**Important limitation:** `FullNotationNull` currently uses a fixed 256-bit
address witness to model canonical full notation. The proof establishes the
closure law once an encoding is selected. It does not yet prove that a
particular external Omilog compiler emits that encoding.

## 6. The Polybius Gauge

The nibble field is arranged as:

```text
0 1 2 3
4 5 6 7
8 9 A B
C D E F
```

For nibble value `x`:

```text
row(x) = x / 4
col(x) = x mod 4
```

The two control diagonals are:

```text
D+ = {0,5,A,F}  where row = col
D- = {3,6,9,C}  where row + col = 3
```

Their exact finite properties are:

```text
XOR(D+) = 0
XOR(D-) = 0
SUM(D+) = 0x1E = 30
SUM(D-) = 0x1E = 30
SUM(D+) + SUM(D-) = 0x3C = 60
SUM(0..F) = 0x78 = 120
```

The labels “plus,” “minus,” “chiral,” or “phase” are OMI interpretations. They
are not ordinary even/odd parity classes: each diagonal contains both even and
odd values.

The active byte bridge removes one reserved zero rail from one nibble
dimension:

```text
15 active values * 16 carrier values = 240 states
```

**Proved:** Polybius coordinate membership for all eight diagonal values,
diagonal XOR closure, diagonal sums, the `0x3C` combined sum, the `0x78` field
sum, and the 240-state arithmetic.

## 7. Tetragrammatron Authority

Tetragrammatron is modeled as the only function in the active pipeline that
constructs a `ValidationDecision` from a frame:

```text
tetragrammatron_validate(frame)
```

The current finite decision is lawful exactly when:

```text
valid Omnicron envelope
AND D+ closure ready
AND D- closure ready
AND XOR reduction of relation witnesses = 0
```

This makes the authority algorithmic. It does not depend on typography,
projection, a human-readable name, or an ISA instruction naming itself
`COMMIT`.

**Proved:** the canonical Null Ring frame is lawful; a malformed envelope is
unlawful; and a non-closing witness sequence is unlawful.

**Defined model:** this is the first strict authority kernel. Additional
domain-specific predicates can only be added by extending the explicit
Tetragrammatron decision and proving the revised behavior.

## 8. Omnicron Framing

Omnicron is the portable headless framing and resolution point of view. In the
active proof model it can:

```text
recognize an envelope
carry witnesses
carry a gauge
present the frame to validation
```

It cannot produce `Lawful` merely because the envelope is well formed.

**Proved:** `omnicron_frame_valid` is exactly envelope validation.

**Interpretation:** Omnicron holds the null/full horizon and provides the
runtime frame in which an Omi-Ring is interpreted.

## 9. Metatron Interpolation

Metatron receives:

```text
source address
destination address
already validated relation
```

and emits an interpolation carrying the unchanged decision.

The alternating witnesses:

```text
0xAA55 = 10101010 01010101
0x55AA = 01010101 10101010
```

remain the canonical OMI interpretation of visible contrast. This proof module
does not use that interpretation to decide validity.

**Proved:** interpolation preserves the decision, and an unlawful decision
remains unlawful for every source and destination.

**Defined model:** the proof intentionally leaves the address interpolation
formula outside validation. A future concrete CIDR or address interpolation
algorithm may replace the carried source/destination pair without changing the
preservation theorem.

## 10. Truth-Table Scale

For `n` Boolean inputs:

```text
input configurations = 2^n
Boolean functions     = 2^(2^n)
```

| `n` | Configurations `2^n` | Boolean laws `2^(2^n)` |
| ---: | ---: | ---: |
| 0 | 1 | 2 |
| 1 | 2 | 4 |
| 2 | 4 | 16 |
| 3 | 8 | 256 |
| 4 | 16 | 65,536 |
| 5 | 32 | 4,294,967,296 |
| 6 | 64 | 18,446,744,073,709,551,616 |
| 7 | 128 | `2^128` |
| 8 | 256 | `2^256` |

The distinction between rows and laws is essential:

```text
n = 6
  64 possible input configurations
  2^64 complete Boolean laws

n = 8
  256 possible input configurations
  2^256 complete Boolean laws
```

A runtime does not enumerate all `2^64` six-input laws. One 64-bit word selects
one complete law. A six-bit state selects one bit from that word:

```text
index   = input mod 64
visible = testbit(law, index)
```

**Proved:** the state counts from zero through eight, law counts through six,
the structural result that `m` Boolean rows have `2^m` assignments, the
six-row-space and eight-row-space law counts, the symbolic eight-input law
count, six-bit index boundedness, selected-bit correctness, and deterministic
lookup.

## 11. The Fixed-Frame Complexity Boundary

The proof model assigns three abstract operations to six-input lookup:

```text
mask or reduce to six-bit index
shift/test selected law position
return selected bit
```

**Proved:** the modeled operation count is the constant three and is
independent of the values of the law and input.

This supports the following carefully bounded statement:

> Evaluation of one selected law over one fixed-width six-input frame has a
> fixed operation count in the stated lookup model.

It does not prove:

```text
all OMI computation is O(1)
arbitrary content generation is O(1)
network access is O(1)
an unbounded address has fixed cost
real hardware always executes the operations in three cycles
```

Place-value addressing avoids searching the represented local law space. Work
over multiple frames, variable-length content, networks, or external storage
must be analyzed separately.

## 12. Finite Search Versus Fixed Arity

The active complexity module proves:

```text
sum C(n,k), k=0..n = 2^n
```

It separately bounds:

```text
C(n,2) <= n^2
C(n,3) <= n^3
```

This is the formal distinction between searching every subset and evaluating a
fixed-arity relation family. It complements, but does not replace, the
fixed-width truth-table lookup model.

## 13. Incidence Geometry

The active incidence rail proves finite structures directly:

- tetrahedral counts;
- seven Fano points and seven Fano lines;
- three points per line and three lines per point;
- one Fano line through each distinct point pair;
- Schläfli `{3,5}` and `{5,3}` dual ordering;
- a bounded rectified common-core witness;
- the 3-clock, 4-offset, 5-governor frame;
- Miquel `8 * 3 = 6 * 4 = 24` flag balance;
- OMI oversight arithmetic `5 + 6 = 11`.

The OMI `5 + 6 = 11` frame is not identified with the standard abstract
regular 11-cell. An incidence-preserving map would be required before such an
identification could become a theorem.

## 14. Projection Is Downstream

The projection modules prove exact statements about:

- rational vectors;
- arithmetic in the pair model of `Q(sqrt(5))`;
- a binary quadratic form decomposition;
- selected metric and golden-ratio identities;
- explicitly defined Pi projection series and their equality to Coq's real
  `PI`;
- a bridge indexed by the same diagonal schedule as atomic replay.

These theorems do not say that a runtime byte state physically contains Pi,
the golden ratio, E8, or a geometric solid. They prove equalities inside the
formal models named by the modules.

## 15. From Proof to Runtime

The intended propagation path is:

```text
Coq theorem
  proves a bounded invariant

OMI canon
  gives the invariant a stable name and interpretation

OMI-Lisp
  declares the executable law surface

OMI-ISA
  runs a bounded witness implementation

runtime test
  compares actual behavior with expected examples

receipt
  records the observed decision and replay information
```

No downstream layer retroactively proves the Coq theorem. Conversely, Coq does
not prove C, JavaScript, firmware, or network behavior until a representation
and refinement proof connects that implementation to the model.

## 16. Complete Active Theorem Atlas

This section makes every active theorem discoverable. The source module owns
the exact statement; the descriptions below summarize families rather than
silently strengthening them.

### Claim Status Foundations

Source: `coq/00-foundations/ProofStatusOrdersClaims.v`

- `status_le_refl`: every proof status is ordered with itself.
- `status_le_trans`: status ordering composes transitively.
- `P0_is_strongest`: P0 is the strongest registered status.
- `P4_is_weakest`: P4 is the weakest registered status.

### Finite Set Foundations

Source: `coq/00-foundations/FiniteBasicsEnumeratesSets.v`

- `cardinal_nonnegative`, `cardinal_app`: basic list-cardinality laws.
- `subset_refl`, `subset_trans`: finite subset reflexivity and transitivity.
- `decidable_eq_fin`, `decidable_eq_nat`: equality decisions for finite
  indices and naturals.
- `finite_set_card_pos`: a registered finite set has positive cardinality.

### Rational Vector Foundations

Source: `coq/00-foundations/RationalVectorsDefineOperations.v`

- `Vec0_eq`: zero vectors agree at every coordinate.
- `Qnum_Qden_inj`: normalized rational numerator/denominator data determines
  equality in the modeled use.
- `Qplus_0_l_eq`, `Qplus_0_r_eq`, `Qplus_assoc_eq`, `Qplus_comm_eq`: rational
  addition laws.
- `Qmult_comm_eq`, `Qmult_1_l_eq`: rational multiplication laws.
- `Qsquare_nonneg`, `Qplus_nonneg`: non-negativity foundations.
- `dot_comm`, `dot_add_l`, `dot_scale_l`: dot-product laws.
- `norm_sq_nonneg`: squared vector norm is nonnegative.
- `vadd_comm`, `vadd_assoc`, `vadd_neg_r`: vector addition laws.
- `vscale_zero`, `vscale_one`: zero and identity scaling.

### Golden Pair Arithmetic

Source: `coq/00-foundations/GoldenFieldDefinesArithmetic.v`

- `Qnum_Qden_inj`, `Z_five_mul_num`: supporting exact-rational identities.
- `g_add_assoc`, `g_add_comm`, `g_add_0_l`, `g_add_0_r`, `g_add_neg_r`:
  additive laws for the golden pair model.
- `g_mul_assoc`, `g_mul_comm`, `g_mul_1_l`, `g_mul_1_r`, `g_mul_0_l`,
  `g_mul_0_r`: multiplicative laws.
- `g_distrib_l`, `g_distrib_r`: distributivity.
- `g_conj_involutive`, `g_conj_add`, `g_conj_mul`: conjugation laws.
- `g_norm_sq_mul`: multiplicativity of the modeled norm square.
- `phi_sq_eq_phi_plus_one`, `phi_inv_eq_phi_minus_one`,
  `phi_times_phi_inv`: exact golden-ratio identities in the pair model.

### Finite Truth Tables

Source: `coq/00-foundations/FiniteTruthTablesCountFunctions.v`

- `input_state_counts_0_through_8`: verifies the configuration-count column.
- `boolean_law_counts_0_through_6`: verifies finite law counts through six.
- `six_inputs_have_64_states`, `six_inputs_have_2_pow_64_laws`: isolates the
  six-position result.
- `eight_inputs_have_256_states`, `eight_inputs_have_2_pow_256_laws`: isolates
  the byte-width result.
- `boolean_vector_count_is_pow2`: recursively choosing false or true at each
  row produces `2^rows` Boolean vectors.
- `six_input_law_count_follows_from_64_boolean_rows`,
  `eight_input_law_count_follows_from_256_boolean_rows`: connect the 64-row and
  256-row truth-vector constructions to the stated law counts.
- `truth_vector_lookup_deterministic`: typed vector lookup is deterministic.
- `six_bit_index_bounded`: every reduced index is below 64.
- `law64_lookup_selects_index`, `law64_lookup_deterministic`: word lookup
  selects the stated bit deterministically.
- `fixed_frame_lookup_cost_is_input_independent`: the explicit cost model is
  independent of law and input values.

### Earned Control Bands

Source: `coq/00-foundations/EarnedControlBandsEncode.v`

- `visible_zero_text_is_not_machine_nul`: source spelling and NUL differ.
- `earned_surface_sizes`, `pre_language_precedes_readability`: exact band
  arithmetic.
- `canonical_omnicron_envelope_bytes`,
  `canonical_omnicron_envelope_valid`: canonical envelope facts.
- `parameterized_omnicron_envelope_valid`: every permitted F-band envelope
  validates.
- `malformed_omnicron_envelope_rejected`: wrong interior structure fails.
- `reflected_gauge_is_nibble`, `earned_boundaries_reflect_zero`: low-nibble
  reflection remains bounded and aligns at earned boundaries.

### Complexity and Arity

Source: `coq/02-closure/ComplexityBoundsArity.v`

- `choose_n_0`, `choose_0_S`, `choose_S_S`, `choose_gt`, `choose_n_1`:
  binomial foundations.
- `sum_choose_upto_ge_one`, `sum_choose_upto_succ`,
  `sum_choose_succ_upto_expand`, `sum_choose_succ_upto_all`,
  `sum_choose_all_succ`: finite-sum induction.
- `sum_choose_all_eq_pow2`: the complete binomial row sums to `2^n`.
- `choose2_succ`, `choose3_succ`: binary and ternary recurrences.
- `choose2_le_sq`, `choose3_le_cube`: fixed-arity polynomial bounds.
- `arity_principle_summary`: packages exhaustive and fixed-arity results.

### Polybius Diagonal Closure

Source: `coq/02-closure/DiagonalGaugeCloses.v`

- `dplus_xor_zero`, `dminus_xor_zero`: both diagonals XOR-close.
- `dplus_sum_1e`, `dminus_sum_1e`: both diagonals sum to `0x1E`.
- `dplus_closure_valid`, `dminus_closure_valid`: packaged closure records.
- `diag_sum_3c`: both diagonal sums total `0x3C`.
- `dplus_is_polybius_main_diagonal`,
  `dminus_is_polybius_mirror_diagonal`: coordinate membership.
- `complement_sum_3c`: the non-diagonal complement also has the stated sum in
  the active finite model.
- `full_wheel_sum_78`: all nibble values sum to `0x78`.
- `active_byte_surface_is_240`: `15 * 16 = 240`.
- `mask16_bound`, `delta16_width_preserving`, `delta16_deterministic`:
  bounded deterministic delta foundations.
- `diagonal_phase_schedule_even`,
  `polybius_diagonal_race_forces_phase_schedule`: scheduled phase behavior.
- `nat_induction_by_two`: induction support for alternating phases.
- `diagonal_accumulator_forces_phase_schedule`,
  `diagonal_accumulator_phase_matches_race`: accumulator and schedule agree.
- `dplus_phase_sign`, `dminus_phase_sign`: modeled real signs are `1` and
  `-1`.

### Null Ring Closure

Source: `coq/02-closure/NullRingCloses.v`

- `xor_self_cancels`: every natural bit vector XOR itself is zero.
- `byte_ring_witness_values`, `byte_ring_closes_to_null`: concrete ring facts.
- `xor_reduce_app`, `duplicated_boundary_closes`: reduction composition and
  duplicate cancellation.
- `adjacent_edge_witnesses_telescope`, `every_closed_path_closes`: generic
  finite closed-path theorem.
- `concrete_closed_path_matches_byte_ring`, `concrete_closed_path_closes`:
  concrete path correspondence.
- `address256_self_cancels`: bounded 256-bit addresses self-cancel.
- `all_null_presentations_share_closure`,
  `folded_unfolded_full_closure_equivalent`: all modeled presentations have
  the same closure invariant.

### Finite Incidence

Source: `coq/01-incidence/FiniteIncidenceBalancesFlags.v`

- `tetra_incidence_equalities`: finite tetrahedral count equalities.
- `sqrt3_is_projection_boundary`: separates an exact square-distance witness
  from its metric reading.
- `fano_line_count`, `fano_point_count`, `fano_line_widths`,
  `fano_point_degrees`, `fano_pair_unique_lines`: Fano incidence counts.
- `fano_plane_valid`, `T0_induces_fano_plane`: packages the finite Fano
  validity result.
- `dual_35_53`: the two Schläfli pairs reverse under the modeled dual.
- `rectified_35_common_core_valid`: validates the bounded common-core record.

### Polyharmonic and Miquel Incidence

Source: `coq/01-incidence/MiquelIncidenceBalancesFlags.v`

- `polyharmonic_axis_counts`: proves 3 clocks, 4 offsets, and 5 governors.
- `visible_offset_count`, `visible_offsets_step_by_nibble`: four offsets and
  nibble stepping.
- `governor_axis_has_five_positions`, `governor_exponents_are_consecutive`,
  `rules_is_genesis_pivot`, `facts_and_cons_are_declared_endpoints`: exact
  governor-axis data.
- `miquel_point_count`, `miquel_block_count`,
  `miquel_each_block_has_four_points`, `miquel_each_point_has_degree_three`,
  `miquel_flag_count`, `miquel_incidence_balance`: finite Miquel flag counts.
- `four_gauges_have_six_pairs`, `omi_oversight_is_five_plus_six`: finite
  oversight arithmetic.
- `validation_is_not_acceptance`: separates validation and later replay
  acceptance roles.

### Binary Quadratic Form Bridge

Source: `coq/03-projection/BQFBridgePreservesForms.v`

- `bqf_decompose`, `bqf_chiral_bridge_is_16xy`, `bqf_layer_sum`: exact
  decomposition of the defined quadratic form.
- `local240_is_two_5factorial`: `240 = 2 * 120`.
- `fano_selector_bound`, `local240_selector_bound`: finite selector bounds.
- `bqf_bridge_phase_matches_accumulator`,
  `bqf_bridge_phase_computed_from_orbit`,
  `bqf_bridge_denominator_computed_from_orbit`: bridge fields are computed
  from their declared index.
- `bqf_bridge_cross_is_16xy`: the bridge cross term has its defined form.

### Metric and Golden Projection

Source: `coq/03-projection/MetricProjectionPreservesBounds.v`

- `projection_boundary_separation`, `OMI_SQRT3_squared`: exact metric boundary
  statements.
- `classical_phi_satisfies_quadratic`, `classical_phi_positive`,
  `classical_phi_fixed_by_step`: classical real golden-ratio facts.
- `OMI_PHI_from_incidence`, `OMI_PHI_satisfies_quadratic`,
  `OMI_PHI_positive`, `OMI_PHI_fixed_by_step`,
  `OMI_PHI_equals_classical_phi`: equality of the defined OMI witness and
  classical phi.
- `phi_iter_0`, `phi_iter_step`, `phi_iter_positive`,
  `OMI_PHI_recurrence_fixed_point`,
  `OMI_PHI_from_recurrence_equals_OMI_PHI`,
  `OMI_PHI_from_recurrence_equals_classical_phi`: recurrence facts.
- `fib_succ_positive`, `phi_iter_fib_ratio`, `OMI_PHI_gt_1`,
  `phi_iter_ge_1`, `phi_error_step`, `phi_iter_error_bound`,
  `phi_iter_converges`, `fib_ratio_converges_phi`: positivity, error, and
  convergence results.

### Pi Projection

Source: `coq/03-projection/PiProjectionPreservesWitnesses.v`

- `bqf_bridge_denominator_matches_projection`,
  `bqf_bridge_carries_projection_schedule`: bridge schedule correspondence.
- `polybius_phase_sign_matches_omi_pi_sign`: phase and series sign agree.
- `omi_pi_term_from_polybius_matches_incidence`,
  `omi_pi_term_from_diagonal_race_matches_polybius`,
  `omi_pi_term_from_diagonal_accumulator_matches_race`: term paths agree.
- `omi_pi_sign_matches_alternation`, `omi_pi_term_matches_tg_alt`: connection
  to the selected alternating series.
- `omi_pi_partial_from_incidence_matches`,
  `omi_pi_partial_from_polybius_matches_incidence`,
  `omi_pi_partial_from_diagonal_race_matches_polybius`,
  `omi_pi_partial_from_diagonal_accumulator_matches_race`: finite partial sums
  agree.
- `omi_pi_projection_series_converges`, `omi_pi_projection_interval_route`,
  `omi_pi_partial_error_bound`, `omi_pi_partial_error_bound_explicit`: series
  convergence and bounds.
- `OMI_PI_Equals_Real_PI`: the defined projection equals Coq's real `PI`.
- `omi_pi_incidence_projection_series_converges`,
  `OMI_PI_from_incidence_equals_OMI_PI`,
  `OMI_PI_from_incidence_equals_PI`: incidence route.
- `omi_pi_polybius_projection_series_converges`,
  `OMI_PI_from_polybius_equals_incidence`,
  `OMI_PI_from_polybius_equals_PI`: Polybius route.
- `omi_pi_diagonal_race_projection_series_converges`,
  `OMI_PI_from_diagonal_race_equals_polybius`,
  `OMI_PI_from_diagonal_race_equals_PI`: race route.
- `omi_pi_diagonal_accumulator_projection_series_converges`,
  `OMI_PI_from_diagonal_accumulator_equals_race`,
  `OMI_PI_from_diagonal_accumulator_equals_PI`: accumulator route.
- `omi_pi_bounds`: final real interval bounds.

### Atomic Replay

Source: `coq/04-execution/AtomicKernelDefinesReplay.v`

- `vnext_delta_deterministic`: fixed inputs produce one delta result.
- `vnext_replay_deterministic`: replay is deterministic.
- `vnext_replay_loop_len`, `vnext_replay_len`: replay length is preserved by
  construction.

### Exact Eight-Step Delta Orbits

Source: `coq/04-execution/Delta16HasExactPeriodEight.v`

The concrete bit law is:

```text
rotl16(x,1) XOR rotl16(x,3) XOR rotr16(x,2) XOR C
```

The proof represents every output bit as an affine Boolean form over the
sixteen input bits. Coq composes those forms instead of trusting a sampled
orbit or enumerating an external test table.

- `word16_ext`: all sixteen equal bits determine an equal word.
- `eval_coeff_n_lxor`, `eval_coeff_lxor`, `eval_form_xor`,
  `eval_form_xor4`: affine XOR evaluation agrees with bitwise XOR.
- `eval_affine_delta`, `eval_affine_iter`, `eval_input_forms`: symbolic affine
  composition agrees with concrete word iteration.
- `word_xor_self`, `word_bit_zero`, `eval_coeff_zero`,
  `selected_difference_self`: supporting cancellation laws.
- `certificate_implies_no_fixed_point`: a checked parity contradiction
  certificate excludes a fixed point.
- `affine_iter8_001d_identity`, `delta16_001d_iter8_identity`: the eighth
  `0x001D` iterate is identity.
- `period1_001d_certificate`, `period2_001d_certificate`,
  `period3_001d_certificate`, `period4_001d_certificate`,
  `period5_001d_certificate`, `period6_001d_certificate`,
  `period7_001d_certificate`: checked contradiction certificates for all
  shorter `0x001D` periods.
- `delta16_001d_no_period1`, `delta16_001d_no_period2`,
  `delta16_001d_no_period3`, `delta16_001d_no_period4`,
  `delta16_001d_no_period5`, `delta16_001d_no_period6`,
  `delta16_001d_no_period7`: no 16-bit word returns early under `0x001D`.
- `delta16_001d_has_exact_period_8`: every `0x001D` orbit has exact period
  eight.
- `affine_iter8_1337_identity`, `delta16_1337_iter8_identity`: the eighth
  `0x1337` iterate is identity.
- `period1_1337_certificate`, `period2_1337_certificate`,
  `period3_1337_certificate`, `period4_1337_certificate`,
  `period5_1337_certificate`, `period6_1337_certificate`,
  `period7_1337_certificate`: checked contradiction certificates for all
  shorter `0x1337` periods.
- `delta16_1337_no_period1`, `delta16_1337_no_period2`,
  `delta16_1337_no_period3`, `delta16_1337_no_period4`,
  `delta16_1337_no_period5`, `delta16_1337_no_period6`,
  `delta16_1337_no_period7`: no 16-bit word returns early under `0x1337`.
- `delta16_1337_has_exact_period_8`: every `0x1337` orbit has exact period
  eight.

Consequently, each concrete map partitions the 65,536-word state space into
8,192 disjoint cycles of length eight. This final cycle-count sentence follows
from exact period eight plus the finite cardinality `65,536 / 8 = 8,192`.

The historical generic atomic kernel derives its constant by repeating byte
`0x1D`, producing `0x1D1D` at width sixteen. That constant is not covered by
the exact-period theorem and has shorter cycles. The exact theorem is
deliberately scoped to `0x001D` and `0x1337`.

### Sabbath Trace Validation

Source: `coq/04-execution/SabbathProtocolRejectsRestAttestation.v`

- `event_eqb_iff`, `step_deterministic`: event equality and transition
  determinism.
- `validate_prefix`, `validate_iff_final_mode`,
  `validate_suffix_from_mode`: compositional validation.
- `step_suspend_enters_sabbath`,
  `step_sabbath_attestation_is_violation`,
  `sabbath_mode_rejects_attestation`,
  `suspend_transitions_to_sabbath_valid`: direct mode rules.
- `no_attestation_in_sabbath_mode`,
  `no_attestation_in_sabbath_window`: rest-window exclusion.
- `cycle_validates_from_normal`, `normal_to_sabbath_requires_suspend`,
  `stop_prior_to_start`: strict cycle ordering.
- `sabbath_positions_sound`: reported positions correspond to the trace.
- `boundary1_cons`, `suspend_resume_same_class`,
  `sabbath_edge_is_reduced_cycle`: bounded chain/boundary results.
- `day_is_active_or_rest`, `attestation_at_head_rejected`,
  `validator_sound_for_clean_window`, `validator_is_sound`: final validator
  partition and soundness statements.

### Kernel/Pi Synchronization

Source: `coq/04-execution/OmiPiBridgeConnectsKernel.v`

- `kernel_pi_sample_phase_is_accumulator`: sample phase is the diagonal
  accumulator phase.
- `kernel_pi_sample_term_matches_incidence`: the selected projection term
  agrees with incidence.
- `kernel_pi_projection_series_converges`,
  `kernel_pi_projection_equals_real_pi`: the indexed projection series
  converges to real Pi.

The replay state is carried beside the projection index. These theorems do not
claim that the replay state itself emits Pi.

### Authority Pipeline

Source: `coq/04-execution/AuthorityPipelinePreservesDecision.v`

- `omnicron_framing_does_not_decide`: framing is envelope recognition.
- `tetragrammatron_is_decision_source`: the validated record carries exactly
  the Tetragrammatron result.
- `metatron_interpolation_preserves_decision`: interpolation preserves it.
- `metatron_cannot_make_unlawful_lawful`: interpolation cannot promote failure.
- `canonical_null_frame_is_lawful`: the canonical envelope and closed byte
  witnesses pass.
- `malformed_frame_is_unlawful`: malformed framing fails.
- `nonclosing_witnesses_are_unlawful`: an open witness sequence fails.

## 17. Archive and Research Boundary

Archived Coq files are preserved evidence, not accepted proof.

The principal blocking classes are:

```text
admitted theorem
local axiom or parameter
false or overstated statement
dependency on another unresolved module
Coq API or type drift
duplicate theorem-family ownership
model not yet defined precisely enough
```

Major archived research families include:

```text
E8 root enumeration and Weyl reflection
golden quaternions and icosian units
Hopf projection
Karnaugh reduction
abstract orbit coalgebra and bialgebra
AAL progress and preservation
cyclic-clock generalization
identity-chain claims involving deep external mathematics
```

No archived theorem is counted as proved. A repaired theorem returns only when
it has one canonical owner, no forbidden assumptions, a compiling proof, a
`coqchk` result, and documentation here.

## 18. Worked Examples

### Example A: Visible Text Versus NUL

```text
source:  "0x00"
bytes:   30 78 30 30

machine NUL:
byte:    00
```

The first is readable citation. The second is a machine value.

### Example B: Canonical Envelope

```text
input:
FF 00 1C 1D 1E 1F 20 FF

checks:
length = 8
first and last = FF
FF in F0..FF
interior = 00 1C 1D 1E 1F 20

result:
framing valid
```

No relation decision has yet been made.

### Example C: Closed Byte Ring

```text
00 XOR 20 = 20
20 XOR 7F = 5F
7F XOR FF = 80
FF XOR 00 = FF

20 XOR 5F XOR 80 XOR FF = 00
```

### Example D: Six-Input Visibility Law

```text
input frame = 0b101101 = 45
index       = 45 mod 64 = 45
law         = one selected 64-bit truth-table word
result      = bit 45 of law
```

The lookup does not enumerate the other `2^64 - 1` possible laws.

### Example E: Authority Preservation

```text
malformed frame
  -> Tetragrammatron: Unlawful
  -> Metatron(source, destination, Unlawful)
  -> Unlawful
```

Changing addresses cannot repair failed closure.

## 18.5 Active OMINO Extensions

The following modules are active proof owners.  They are not archive citations
and they must compile under the strict registry.

### OMINO SECDED Cell

Source: `coq/00-foundations/OminoSECDEDCell.v`

The canonical streaming byte is:

```text
[LOGOS NOMOS FS PATHOS GS RS US OMINO]
```

Named anchors:

```text
`bitN_bound`
`syndrome_bound`
`result_code_bound`
`pristine_result_code`
`interior_single_result_code`
`omino_single_result_code`
`double_error_result_code`
```

The module defines `computed_omino`, `overall_mismatch`, correction masks, and
bounded algebraic result codes for the [8,4,4] cell.

### Power Closure Gate

Source: `coq/02-closure/PowerClosureGate.v`

Named anchors:

```text
`power_closure_numerator_factors`
`power_closure_sedenion_breakpoint_zero`
`omino_centroid_denominator_excluded`
`nonzero_coordinate_is_admissible`
```

The total theorem proves the numerator identity:

```text
(64x - 64)(32x - 32)(16x - 16)(8x - 8)(4x - 4)(2x - 2)(x - 1)
=
2^21 * (x - 1)^7
```

The quotient form is only used with a nonzero denominator coordinate.

### E8 Root Enumeration

Source: `coq/03-projection/E8RootsEnumerate240.v`

Named anchors:

```text
`e8_type1_count`
`e8_type2_count`
`e8_roots_count`
`e8_roots_type_split`
`e8_roots_norm_two`
```

The active theorem family proves the finite E8 enumeration split currently
owned by Coq:

```text
112 + 128 = 240
```

and proves squared norm `2` for the enumerated roots.

### OMINO Parallel Spatial Scaling

Source: `coq/04-execution/OminoParallelSpatialScaling.v`

Named anchors:

```text
`omino_cell_step_deterministic`
`omino_parallel_step_deterministic`
`supplied_substrate_step_count_independent_of_n`
`supplied_substrate_step_count_independent_of_values`
```

The theorem family states the active usable claim: once a parallel OMINO
substrate of width `n` is supplied, the core step descriptor remains constant
with respect to `n` and with respect to cell values.  It does not hide substrate
construction cost.

## 19. Reproducing the Proof

Requirements:

```text
Coq 8.18.x
standard Coq library
GNU Make
```

Run:

```bash
make clean
make foundations-proof
make closure-proof
make incidence-proof
make projection-proof
make execution-proof
make proof-strict
make proof-status
```

`proof-strict` performs three gates:

1. rejects forbidden assumptions and registry drift;
2. compiles every active source;
3. runs `coqchk` over every active module.

Generated `.vo`, `.glob`, and related files belong only in `artifacts/coq`.

## 20. Glossary

| Term | Meaning in this proof book |
| --- | --- |
| Address | A bounded place-value value used to select or identify a relation. |
| Boundary | A constraint required before an interior state is admissible. |
| Closure | Reduction of the complete declared boundary to its required invariant. |
| Declaration | Readable or encoded candidate structure without automatic authority. |
| Earned band | A cumulative codepoint surface available after its boundary is crossed. |
| Frame | Envelope plus witnesses and gauge presented to validation. |
| Gauge | A finite nibble-class selector or operator position. |
| Interpolation | Address-based transformation that preserves validation status. |
| Null Ring | A closed relation whose complete XOR witness reduces to zero. |
| Omnicron | Framing and headless resolution role. |
| Omi-Ring | Shared addressed relation representation. |
| Projection | Downstream view or measurement of an already modeled relation. |
| Receipt | Record of a decision or replay; not an independent proof. |
| Tetragrammatron | Sole validation function in the active authority pipeline. |
| Metatron | Address interpolation and contrast witness that preserves validation. |
| Witness | Finite value used to demonstrate a claimed relation. |

## Final Canon

```text
The invisible control plane establishes place.
The earned bands make that place readable.
Omnicron frames the addressed relation.
The Null Ring exposes closure through XOR.
The Polybius diagonals supply the finite governor.
Tetragrammatron alone decides lawful closure.
Metatron interpolates without changing that decision.
OMI-ISA may execute a bounded witness.
Projection may display it.
Receipt may record it.
Coq proves only the exact statements named by its checked theorems.
```
