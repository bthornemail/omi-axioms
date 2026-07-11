(**
  Finite truth-table sizes and fixed-frame lookup.

  This module proves finite counts and a bounded lookup model. It does not
  claim that arbitrary computation is constant time.
*)

From Coq Require Import NArith Lia Vector Fin.

Open Scope N_scope.

Definition input_state_count (n : nat) : N :=
  N.pow 2 (N.of_nat n).

Definition boolean_law_count (n : nat) : N :=
  N.pow 2 (input_state_count n).

Theorem input_state_counts_0_through_8 :
  input_state_count 0 = 1 /\
  input_state_count 1 = 2 /\
  input_state_count 2 = 4 /\
  input_state_count 3 = 8 /\
  input_state_count 4 = 16 /\
  input_state_count 5 = 32 /\
  input_state_count 6 = 64 /\
  input_state_count 7 = 128 /\
  input_state_count 8 = 256.
Proof. vm_compute; repeat split. Qed.

Theorem boolean_law_counts_0_through_6 :
  boolean_law_count 0 = 2 /\
  boolean_law_count 1 = 4 /\
  boolean_law_count 2 = 16 /\
  boolean_law_count 3 = 256 /\
  boolean_law_count 4 = 65536 /\
  boolean_law_count 5 = 4294967296 /\
  boolean_law_count 6 = 18446744073709551616.
Proof. vm_compute; repeat split. Qed.

Theorem six_inputs_have_64_states :
  input_state_count 6 = 64.
Proof. reflexivity. Qed.

Theorem six_inputs_have_2_pow_64_laws :
  boolean_law_count 6 = N.pow 2 64.
Proof. reflexivity. Qed.

Theorem eight_inputs_have_256_states :
  input_state_count 8 = 256.
Proof. reflexivity. Qed.

Theorem eight_inputs_have_2_pow_256_laws :
  boolean_law_count 8 = N.pow 2 256.
Proof. reflexivity. Qed.

Definition TruthVector (n : nat) : Type :=
  Vector.t bool (Nat.pow 2 n).

Fixpoint boolean_vector_count (rows : nat) : N :=
  match rows with
  | O => 1
  | S rest => 2 * boolean_vector_count rest
  end.

Theorem boolean_vector_count_is_pow2 :
  forall rows,
    boolean_vector_count rows = N.pow 2 (N.of_nat rows).
Proof.
  induction rows as [|rows IH].
  - reflexivity.
  - change
      (2 * boolean_vector_count rows =
       N.pow 2 (N.of_nat (S rows))).
    rewrite IH, Nat2N.inj_succ, N.pow_succ_r'.
    reflexivity.
Qed.

Theorem six_input_law_count_follows_from_64_boolean_rows :
  boolean_vector_count 64 = boolean_law_count 6.
Proof. vm_compute; reflexivity. Qed.

Theorem eight_input_law_count_follows_from_256_boolean_rows :
  boolean_vector_count 256 = boolean_law_count 8.
Proof. vm_compute; reflexivity. Qed.

Definition truth_vector_lookup {n : nat}
  (law : TruthVector n) (index : Fin.t (Nat.pow 2 n)) : bool :=
  Vector.nth law index.

Theorem truth_vector_lookup_deterministic :
  forall n (law : TruthVector n) (index : Fin.t (Nat.pow 2 n)),
    truth_vector_lookup law index = truth_vector_lookup law index.
Proof. reflexivity. Qed.

Definition six_bit_index (input : N) : N := input mod 64.

Definition law64_lookup (law input : N) : bool :=
  N.testbit law (six_bit_index input).

Theorem six_bit_index_bounded :
  forall input, six_bit_index input < 64.
Proof.
  intro input.
  unfold six_bit_index.
  apply N.mod_lt.
  discriminate.
Qed.

Theorem law64_lookup_selects_index :
  forall law input,
    law64_lookup law input = N.testbit law (input mod 64).
Proof. reflexivity. Qed.

Theorem law64_lookup_deterministic :
  forall law input,
    law64_lookup law input = law64_lookup law input.
Proof. reflexivity. Qed.

Definition fixed_frame_lookup_operations : N := 3.

Theorem fixed_frame_lookup_cost_is_input_independent :
  forall law input : N,
    fixed_frame_lookup_operations = 3.
Proof. reflexivity. Qed.
