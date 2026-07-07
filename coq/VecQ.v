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

Definition dot {n : nat} (v w : Vec n) : Q :=
  Vector.fold_left Qplus 0 (Vector.map2 Qmult v w).

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
  induction n; intros a v;
    [ refine (Vector.case0 (fun v' => Vector.fold_left Qplus a v' = Qplus a (Vector.fold_left Qplus 0 v')) _ v);
      simpl; symmetry; apply Qplus_0_r_eq |].
  apply (Vector.caseS v); intros h t; simpl.
  rewrite (IHn (Qplus a h) t).
  rewrite (IHn h t).
  rewrite Qplus_0_l_eq.
  apply Qplus_assoc_eq.
Qed.

Theorem dot_comm : forall n (v w : Vec n), dot v w = dot w v.
Proof.
  unfold dot.
  induction n; intros v w; [reflexivity |].
  inversion v as [| h1 t1]; subst; clear v.
  inversion w as [| h2 t2]; subst; clear w.
  simpl.
  rewrite (fold_left_Qplus_add n (Qmult h1 h2) (Vector.map2 Qmult t1 t2)).
  rewrite (fold_left_Qplus_add n (Qmult h2 h1) (Vector.map2 Qmult t2 t1)).
  rewrite (Qmult_comm_eq h1 h2).
  rewrite (IHn t1 t2).
  reflexivity.
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
