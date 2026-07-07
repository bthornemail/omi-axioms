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
From Coq Require Import ZArithRing.
From Coq Require Import micromega.Psatz.
Import VectorNotations.

Definition Vec (n : nat) : Type := Vector.t Q n.

Fixpoint dotn (n : nat) : Vec n -> Vec n -> Q :=
  match n with
  | 0 => fun _ _ => 0
  | S n' => fun v w => Qplus (Qmult (Vector.hd v) (Vector.hd w))
                              (dotn n' (Vector.tl v) (Vector.tl w))
  end.

Definition dot {n : nat} (v w : Vec n) : Q := dotn n v w.

Definition norm_sq {n : nat} (v : Vec n) : Q :=
  dot v v.

Definition vadd {n : nat} (v w : Vec n) : Vec n :=
  Vector.map2 Qplus v w.

Definition vneg {n : nat} (v : Vec n) : Vec n :=
  Vector.map Qopp v.

Definition vscale {n : nat} (c : Q) (v : Vec n) : Vec n :=
  Vector.map (Qmult c) v.

Lemma Qnum_Qden_inj n1 d1 n2 d2 : n1 = n2 -> d1 = d2 -> Qmake n1 d1 = Qmake n2 d2.
Proof. intros; subst; reflexivity. Qed.

Lemma Qplus_0_l_eq : forall a : Q, Qplus 0 a = a.
Proof.
  destruct a; unfold Qplus; simpl; rewrite Z.mul_1_r; reflexivity.
Qed.

Lemma Qplus_0_r_eq : forall a : Q, Qplus a 0 = a.
Proof.
  destruct a; unfold Qplus; simpl; rewrite Z.mul_1_r, Z.add_0_r, Pos.mul_1_r; reflexivity.
Qed.

Lemma Qplus_assoc_eq : forall a b c : Q, Qplus (Qplus a b) c = Qplus a (Qplus b c).
Proof.
  destruct a as [na da], b as [nb db], c as [nc dc]; unfold Qplus; simpl.
  f_equal; [nia | symmetry; apply Pos.mul_assoc].
Qed.

Lemma Qplus_comm_eq : forall a b : Q, Qplus a b = Qplus b a.
Proof.
  destruct a as [na da], b as [nb db]; unfold Qplus; simpl.
  f_equal; [ring | apply Pos.mul_comm].
Qed.

Lemma Qmult_comm_eq : forall a b : Q, Qmult a b = Qmult b a.
Proof.
  destruct a as [na da], b as [nb db]; unfold Qmult; simpl.
  f_equal; [ring | apply Pos.mul_comm].
Qed.

Lemma fold_left_Qplus_add : forall n a (v : Vec n),
  Vector.fold_left Qplus a v = Qplus a (Vector.fold_left Qplus 0 v).
Proof.
  intros n a v.
  induction v as [| h n t IHv] in a |- *; simpl.
  - symmetry; apply Qplus_0_r_eq.
  - rewrite (IHv (Qplus a h)).
    rewrite (IHv (Qplus 0 h)).
    rewrite Qplus_0_l_eq.
    apply Qplus_assoc_eq.
Qed.

Theorem dot_comm : forall n (v w : Vec n), dot v w = dot w v.
Proof.
  unfold dot.
  induction n; intros v w; simpl.
  - reflexivity.
  - rewrite (Qmult_comm_eq (Vector.hd v) (Vector.hd w)).
    rewrite (IHn (Vector.tl v) (Vector.tl w)).
    reflexivity.
Qed.

Theorem dot_add_l : forall n (u v w : Vec n),
  dot (vadd u v) w == dot u w + dot v w.
Proof.
  unfold dot.
  induction n; intros u v w; simpl.
  - ring.
  - rewrite !Vector.hd_map2, !Vector.tl_map2.
    rewrite (IHn (Vector.tl u) (Vector.tl v) (Vector.tl w)).
    ring.
Qed.

Theorem dot_scale_l : forall n (c : Q) (v w : Vec n),
  dot (vscale c v) w == c * dot v w.
Proof.
  unfold dot.
  induction n; intros c v w; simpl.
  - ring.
  - rewrite !Vector.hd_map, !Vector.tl_map.
    rewrite (IHn c (Vector.tl v) (Vector.tl w)).
    ring.
Qed.

Theorem norm_sq_nonneg : forall n (v : Vec n),
  0 <= norm_sq v.
Proof.
  intros n v.
  unfold norm_sq, dot.
  induction n; simpl.
  - apply Qle_refl.
  - apply Qplus_le_0_compat.
    + apply Qmult_le_0_compat; [apply Qle_refl | apply Qle_refl].
    + apply IHn.
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
