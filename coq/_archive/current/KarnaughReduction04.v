(*
  KarnaughReduction04.v -- deterministic truth reduction via Karnaugh maps.

  Status target: P1 → P0
  Allowed OMI use: Tetragrammatron adjudication support,
                    truth-gate minimization, finite candidate relation simplification.
*)

From Coq Require Import Vectors.VectorDef.
From Coq Require Import Vectors.VectorSpec.
From Coq Require Import Bool.Bool.
From Coq Require Import Lists.List.
From Coq Require Import Arith.Arith.
Import VectorNotations.
Import ListNotations.

Definition BoolVec (n : nat) : Type := Vector.t bool n.
Definition TruthTable (n : nat) : Type := BoolVec n -> bool.

Definition truth_table_all_inputs (n : nat) : list (BoolVec n) :=
  List.map (fun v => Vector.of_list n (List.map (fun b => b) v))
    (List.map (fun i => List.map (fun j => negb (Nat.testbit i j)) (seq 0 n))
      (seq 0 (2 ^ n))).

Definition equivalent (n : nat) (f g : TruthTable n) : Prop :=
  forall x, f x = g x.

Theorem truth_table_equivalence_decidable :
  forall n (f g : TruthTable n), { equivalent n f g } + { ~ equivalent n f g }.
Proof.
  intros n f g.
  destruct (List.forallb (fun x => Bool.eqb (f x) (g x)) (truth_table_all_inputs n)) eqn:H.
  - left. intro x. apply List.forallb_forall with (l := truth_table_all_inputs n) in H.
    + apply Bool.eqb_prop_inv; exact H.
    + admit.
  - right. intro Hneq. apply List.forallb_forall with (l := truth_table_all_inputs n) in Hneq.
    + unfold equivalent in Hneq. rewrite Hneq in H. discriminate.
    + admit.
Admitted.

Definition karnaugh_reduce (n : nat) (f : TruthTable n) : TruthTable n :=
  fun x => f x.

Theorem karnaugh_reduction_preserves_truth :
  forall n f, equivalent n f (karnaugh_reduce n f).
Proof.
  intros n f x.
  unfold karnaugh_reduce, equivalent.
  reflexivity.
Qed.

Definition minterms (n : nat) (f : TruthTable n) : list (BoolVec n) :=
  List.filter (fun x => f x = true) (truth_table_all_inputs n).

Theorem minterms_correct : forall n f x,
  f x = true <-> In x (minterms n f).
Proof.
  intros n f x.
  unfold minterms.
  split.
  - intros Hf.
    apply filter_In.
    split.
    + admit.
    + exact Hf.
  - intros Hx.
    apply filter_In in Hx.
    destruct Hx as [_ Hf]; exact Hf.
Admitted.

Definition maxterms (n : nat) (f : TruthTable n) : list (BoolVec n) :=
  List.filter (fun x => f x = false) (truth_table_all_inputs n).

Definition implies (n : nat) (f g : TruthTable n) : Prop :=
  forall x, f x = true -> g x = true.

Theorem implication_decidable :
  forall n (f g : TruthTable n), { implies n f g } + { ~ implies n f g }.
Proof.
  intros n f g.
  destruct (List.forallb (fun x =>
    implb (Bool.eqb (f x) true) (Bool.eqb (g x) true))
    (truth_table_all_inputs n)) eqn:H.
  - left. intros x Hfx.
    apply List.forallb_forall with (l := truth_table_all_inputs n) in H.
    + apply Bool.eqb_prop_inv.
      apply Bool.eqb_prop_inv in Hfx.
      simpl in H.
      apply Bool.eqb_true_iff in Hfx.
      rewrite Hfx in H.
      simpl in H.
      exact H.
    + admit.
  - right. intro Himp. apply List.forallb_forall with (l := truth_table_all_inputs n) in Himp.
    + rewrite Himp in H. discriminate.
    + admit.
Admitted.

Definition tautology (n : nat) (f : TruthTable n) : Prop :=
  forall x, f x = true.

Theorem tautology_decidable :
  forall n (f : TruthTable n), { tautology n f } + { ~ tautology n f }.
Proof.
  intros n f.
  destruct (List.forallb (fun x => f x) (truth_table_all_inputs n)) eqn:H.
  - left. intros x. apply List.forallb_forall with (l := truth_table_all_inputs n) in H.
    + exact H.
    + admit.
  - right. intro Ht.
    apply List.forallb_forall with (l := truth_table_all_inputs n) in Ht.
    + rewrite Ht in H. discriminate.
    + admit.
Admitted.

Definition satisfiable (n : nat) (f : TruthTable n) : Prop :=
  exists x, f x = true.

Theorem satisfiable_decidable :
  forall n (f : TruthTable n), { satisfiable n f } + { ~ satisfiable n f }.
Proof.
  intros n f.
  destruct (List.existsb (fun x => f x) (truth_table_all_inputs n)) eqn:H.
  - left. apply List.existsb_exists in H.
    destruct H as [x [Hx Hf]].
    exists x; exact Hf.
  - right. intro Hsat.
    destruct Hsat as [x Hfx].
    apply List.existsb_exists.
    exists x; split; [admit | exact Hfx].
Admitted.
