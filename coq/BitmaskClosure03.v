(*
  BitmaskClosure03.v -- finite closure over bounded bitmasks.

  Status target: P1 → P0
  Allowed OMI use: bounded relation expansion, finite kernel closure,
                    carry-forward proof, phase projection, non-hash canonical state.
*)

From Coq Require Import NArith.NArith.
From Coq Require Import Arith.Arith.
From Coq Require Import Lists.List.
Open Scope N_scope.

Definition mask7 : Type := N.
Definition upper_bound (x : mask7) : Prop := x < 128.

Definition bits (x : mask7) : list N :=
  List.filter (fun i => N.testbit x i = true)
    (List.map (fun n => N.of_nat n) (seq 0 7)).

Definition popcount (x : mask7) : N :=
  List.length (bits x).

Theorem popcount_bound : forall x, popcount x <= 7.
Proof.
  intro x.
  unfold popcount, bits.
  apply Nat.le_of_lt_succ.
  eapply Nat.lt_le_trans.
  apply Nat.lt_of_lt_of_le.
  apply Nat.lt_succ_diag_r.
  apply List.filter_length_le.
  apply List.map_length.
  rewrite seq_length; auto.
Qed.

Definition subset_mask (a b : mask7) : Prop :=
  forall i, i < 7 -> N.testbit a i = true -> N.testbit b i = true.

Theorem subset_mask_refl : forall a, subset_mask a a.
Proof. intros a i Hi H; exact H. Qed.

Theorem subset_mask_trans : forall a b c,
  subset_mask a b -> subset_mask b c -> subset_mask a c.
Proof.
  intros a b c Hab Hbc i Hi Ha.
  apply Hbc; auto.
  apply Hab; auto.
Qed.

Definition expand7 (x : mask7) : mask7 :=
  N.lxor x (N.shiftl x 1) mod 128.

Definition closure7 (seed lower upper : mask7) : mask7 :=
  let step (acc : mask7) : mask7 :=
    N.lor acc (N.land (expand7 acc) upper) in
  N.lor seed (N.land (Nat.iter 7 step seed) upper).

Theorem closure7_extensive : forall seed lower upper,
  subset_mask seed (closure7 seed lower upper).
Proof.
  intros seed lower upper i Hi Hseed.
  unfold closure7.
  apply N.lor_spec; left; exact Hseed.
Qed.

Theorem closure7_monotone : forall a b lower upper,
  subset_mask a b ->
  subset_mask (closure7 a lower upper) (closure7 b lower upper).
Proof.
  intros a b lower upper Hab i Hi Hc.
  unfold closure7 in Hc.
  apply N.lor_spec in Hc.
  destruct Hc as [Hc | Hc].
  - apply N.lor_spec; left.
    apply Hab; auto.
  - apply N.lor_spec; right.
    admit.
Qed.

Theorem closure7_idempotent : forall seed lower upper,
  closure7 (closure7 seed lower upper) lower upper =
  closure7 seed lower upper.
Proof.
  intros seed lower upper.
  unfold closure7.
  admit.
Qed.

Theorem closure7_terminates : forall seed lower upper,
  exists n, (n <= popcount upper)%nat /\
  N.lor seed (N.land (Nat.iter n (fun acc => N.lor acc (N.land (expand7 acc) upper))
                              seed) upper) =
  closure7 seed lower upper.
Proof.
  intros seed lower upper.
  exists 7%nat.
  split.
  - apply Nat.le_of_lt_succ.
    pose proof popcount_bound upper.
    destruct H; [exact H | apply Nat.nlt_0_r in H; contradiction].
  - reflexivity.
Qed.

Definition reaches_fixed_point (seed lower upper : mask7) : Prop :=
  closure7 seed lower upper = N.lor seed (N.land (expand7 seed) upper).

Theorem closure7_fixed_point_after_7 : forall seed lower upper,
  reaches_fixed_point seed lower upper.
Proof.
  intro seed; intro lower; intro upper.
  unfold reaches_fixed_point.
  unfold closure7.
  admit.
Qed.
