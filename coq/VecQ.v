(*
  VecQ.v -- exact rational vectors with dot product, norm, and scaling.

  This layer stays on exact Q arithmetic.  No reals or approximations.
  Used as the base for E8 root system and Weyl reflection.
*)

From Coq Require Import QArith.QArith.
From Coq Require Import QArith.Qreduction.
From Coq Require Import QArith.Qminmax.
From Coq Require Import Vectors.VectorDef.
From Coq Require Import Vectors.VectorSpec.
From Coq Require Import micromega.Lia.
From Coq Require Import Arith.Arith.
Import VectorNotations.

Definition Vec (n : nat) : Type := Vector.t Q n.

Definition dot (n : nat) (v w : Vec n) : Q :=
  Vector.fold_left Qplus 0 (Vector.map2 Qmult v w).

Definition norm_sq (n : nat) (v : Vec n) : Q :=
  dot v v.

Definition vadd (n : nat) (v w : Vec n) : Vec n :=
  Vector.map2 Qplus v w.

Definition vneg (n : nat) (v : Vec n) : Vec n :=
  Vector.map Qopp v.

Definition vscale (n : nat) (c : Q) (v : Vec n) : Vec n :=
  Vector.map (Qmult c) v.

Theorem dot_comm : forall n (v w : Vec n), dot v w = dot w v.
Proof.
  intros n v w.
  unfold dot.
  apply Vector.fold_left_ext.
  intros a x y.
  rewrite Qplus_comm.
  f_equal.
  apply Qmult_comm.
Qed.

Theorem dot_add_l : forall n (u v w : Vec n),
  dot (vadd u v) w == dot u w + dot v w.
Proof.
  intros n u v w.
  unfold dot, vadd.
  induction n as [| n IH].
  - reflexivity.
  - simpl.
    rewrite IH.
    ring.
Qed.

Theorem dot_scale_l : forall n (c : Q) (v w : Vec n),
  dot (vscale c v) w == c * dot v w.
Proof.
  intros n c v w.
  unfold dot, vscale.
  induction n as [| n IH].
  - simpl; ring.
  - simpl.
    rewrite IH.
    ring.
Qed.

Theorem norm_sq_nonneg : forall n (v : Vec n),
  0 <= norm_sq v.
Proof.
  intros n v.
  unfold norm_sq, dot.
  induction n as [| n IH].
  - simpl; apply Qle_refl.
  - simpl.
    apply Qplus_le_0_compat.
    + apply Qmult_le_0_compat; [apply Qle_refl | apply Qle_refl].
    + exact IH.
Qed.

Theorem vadd_comm : forall n (v w : Vec n), vadd v w = vadd w v.
Proof.
  intros n v w.
  unfold vadd.
  apply Vector.map2_ext.
  intros x y.
  apply Qplus_comm.
Qed.

Theorem vadd_assoc : forall n (u v w : Vec n),
  vadd (vadd u v) w = vadd u (vadd v w).
Proof.
  intros n u v w.
  unfold vadd.
  apply Vector.map2_ext.
  intros x y z.
  apply Qplus_assoc.
Qed.

Theorem vadd_neg_r : forall n (v : Vec n), vadd v (vneg v) = Vector.const 0 n.
Proof.
  intros n v.
  unfold vadd, vneg.
  induction n as [| n IH].
  - reflexivity.
  - simpl.
    rewrite IH.
    f_equal.
    rewrite Qplus_opp_r.
    reflexivity.
Qed.

Theorem vscale_zero : forall n (v : Vec n), vscale 0 v = Vector.const 0 n.
Proof.
  intros n v.
  unfold vscale.
  induction n as [| n IH].
  - reflexivity.
  - simpl.
    rewrite IH.
    reflexivity.
Qed.

Theorem vscale_one : forall n (v : Vec n), vscale 1 v = v.
Proof.
  intros n v.
  unfold vscale.
  induction n as [| n IH].
  - reflexivity.
  - simpl.
    rewrite IH.
    reflexivity.
Qed.
