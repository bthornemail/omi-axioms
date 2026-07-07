(*
  GoldenQuaternion.v -- quaternions over the golden field Q(√5).

  Hamilton multiplication: i² = j² = k² = ijk = -1.
  Noncommutative but associative.  Conjugate and norm.
*)

From Coq Require Import QArith.QArith.
From Coq Require Import micromega.Lia.
Require Import GoldenField.
Open Scope Q_scope.

Record GQuat : Type := mkGQuat {
  qr : Golden;
  qi : Golden;
  qj : Golden;
  qk : Golden
}.

Definition gqeq (x y : GQuat) : Prop :=
  geq (qr x) (qr y) /\
  geq (qi x) (qi y) /\
  geq (qj x) (qj y) /\
  geq (qk x) (qk y).

Definition gq0 : GQuat := mkGQuat gr0 gr0 gr0 gr0.
Definition gq1 : GQuat := mkGQuat gr1 gr0 gr0 gr0.
Definition gq_i : GQuat := mkGQuat gr0 gr1 gr0 gr0.
Definition gq_j : GQuat := mkGQuat gr0 gr0 gr1 gr0.
Definition gq_k : GQuat := mkGQuat gr0 gr0 gr0 gr1.

Definition gq_add (x y : GQuat) : GQuat :=
  mkGQuat (g_add (qr x) (qr y))
          (g_add (qi x) (qi y))
          (g_add (qj x) (qj y))
          (g_add (qk x) (qk y)).

Definition gq_neg (x : GQuat) : GQuat :=
  mkGQuat (g_neg (qr x)) (g_neg (qi x))
          (g_neg (qj x)) (g_neg (qk x)).

Definition gq_sub (x y : GQuat) : GQuat :=
  gq_add x (gq_neg y).

Definition gq_mul (x y : GQuat) : GQuat :=
  let a1 := qr x in let b1 := qi x in let c1 := qj x in let d1 := qk x in
  let a2 := qr y in let b2 := qi y in let c2 := qj y in let d2 := qk y in
  mkGQuat
    (g_sub (g_sub (g_sub (g_mul a1 a2) (g_mul b1 b2)) (g_mul c1 c2)) (g_mul d1 d2))
    (g_add (g_add (g_add (g_mul a1 b2) (g_mul b1 a2)) (g_mul c1 d2)) (g_neg (g_mul d1 c2)))
    (g_sub (g_add (g_sub (g_mul a1 c2) (g_mul b1 d2)) (g_mul c1 a2)) (g_neg (g_mul d1 b2)))
    (g_add (g_sub (g_add (g_mul a1 d2) (g_mul b1 c2)) (g_mul c1 b2)) (g_neg (g_mul d1 a2))).

Definition gq_conj (x : GQuat) : GQuat :=
  mkGQuat (qr x) (g_neg (qi x)) (g_neg (qj x)) (g_neg (qk x)).

Definition gq_norm_sq (x : GQuat) : Golden :=
  g_add (g_add (g_add (g_mul (qr x) (qr x))
                      (g_mul (qi x) (qi x)))
               (g_mul (qj x) (qj x)))
        (g_mul (qk x) (qk x)).

Theorem gq_add_assoc : forall x y z : GQuat,
  gq_add (gq_add x y) z = gq_add x (gq_add y z).
Proof.
  intros x y z; destruct x, y, z; unfold gq_add; simpl.
  f_equal; apply g_add_assoc.
Qed.

Theorem gq_add_comm : forall x y : GQuat,
  gq_add x y = gq_add y x.
Proof.
  intros x y; destruct x, y; unfold gq_add; simpl.
  f_equal; apply g_add_comm.
Qed.

Theorem gq_add_0_l : forall x : GQuat,
  gq_add gq0 x = x.
Proof.
  intro x; destruct x; unfold gq_add, gq0; simpl.
  f_equal; apply g_add_0_l.
Qed.

Theorem gq_add_0_r : forall x : GQuat,
  gq_add x gq0 = x.
Proof.
  intro x; destruct x; unfold gq_add, gq0; simpl.
  f_equal; apply g_add_0_r.
Qed.

Theorem gq_add_neg_r : forall x : GQuat,
  gqeq (gq_add x (gq_neg x)) gq0.
Proof.
  intro x; destruct x; unfold gq_add, gq_neg, gq0; simpl.
  repeat split; apply g_add_neg_r.
Qed.

Theorem gq_mul_assoc : forall x y z : GQuat,
  gqeq (gq_mul (gq_mul x y) z) (gq_mul x (gq_mul y z)).
Proof.
  intros x y z.
  destruct x as [a1 b1 c1 d1].
  destruct y as [a2 b2 c2 d2].
  destruct z as [a3 b3 c3 d3].
  repeat match goal with | g : Golden |- _ => let r := fresh "qR" in let s := fresh "qS" in destruct g as [r s] end.
  unfold gqeq, geq, gq_mul, gq_sub, gq_add, gq_neg, g_mul, g_add, g_neg, g_sub, gr0, gr1; simpl.
  repeat split; ring.
Qed.

Theorem gq_mul_1_l : forall x : GQuat,
  gqeq (gq_mul gq1 x) x.
Proof.
  intro x; destruct x; repeat match goal with | g : Golden |- _ => let r := fresh "qR" in let s := fresh "qS" in destruct g as [r s] end; unfold gq_mul, gq1, gq_sub, gq_add, gq_neg, g_mul, g_add, g_neg, g_sub, gr0, gr1; simpl.
  unfold gqeq, geq; simpl; repeat split; ring.
Qed.

Theorem gq_mul_1_r : forall x : GQuat,
  gqeq (gq_mul x gq1) x.
Proof.
  intro x; destruct x; repeat match goal with | g : Golden |- _ => let r := fresh "qR" in let s := fresh "qS" in destruct g as [r s] end; unfold gq_mul, gq1, gq_sub, gq_add, gq_neg, g_mul, g_add, g_neg, g_sub, gr0, gr1; simpl.
  unfold gqeq, geq; simpl; repeat split; ring.
Qed.

Theorem gq_distrib_l : forall x y z : GQuat,
  gqeq (gq_mul x (gq_add y z)) (gq_add (gq_mul x y) (gq_mul x z)).
Proof.
  intros x y z.
  destruct x, y, z; repeat match goal with | g : Golden |- _ => let r := fresh "qR" in let s := fresh "qS" in destruct g as [r s] end; unfold gq_mul, gq_add, gq_sub, gq_neg, g_mul, g_add, g_neg, g_sub, gr0, gr1; simpl.
  unfold gqeq, geq; simpl; repeat split; ring.
Qed.

Theorem gq_distrib_r : forall x y z : GQuat,
  gqeq (gq_mul (gq_add x y) z) (gq_add (gq_mul x z) (gq_mul y z)).
Proof.
  intros x y z.
  destruct x, y, z; repeat match goal with | g : Golden |- _ => let r := fresh "qR" in let s := fresh "qS" in destruct g as [r s] end; unfold gq_mul, gq_add, gq_sub, gq_neg, g_mul, g_add, g_neg, g_sub, gr0, gr1; simpl.
  unfold gqeq, geq; simpl; repeat split; ring.
Qed.

Theorem gq_conj_involutive : forall x : GQuat,
  gqeq (gq_conj (gq_conj x)) x.
Proof.
  intro x; destruct x; repeat match goal with | g : Golden |- _ => let r := fresh "qR" in let s := fresh "qS" in destruct g as [r s] end; unfold gq_conj, g_neg, g_conj; simpl.
  unfold gqeq, geq; simpl; repeat split; ring.
Qed.

Theorem gq_conj_add : forall x y : GQuat,
  gqeq (gq_conj (gq_add x y)) (gq_add (gq_conj x) (gq_conj y)).
Proof.
  intros x y; destruct x, y; repeat match goal with | g : Golden |- _ => let r := fresh "qR" in let s := fresh "qS" in destruct g as [r s] end; unfold gq_conj, gq_add, g_add, g_neg, g_conj; simpl.
  unfold gqeq, geq; simpl; repeat split; ring.
Qed.

Theorem gq_conj_mul : forall x y : GQuat,
  gqeq (gq_conj (gq_mul x y)) (gq_mul (gq_conj y) (gq_conj x)).
Proof.
  intros x y; destruct x, y; repeat match goal with | g : Golden |- _ => let r := fresh "qR" in let s := fresh "qS" in destruct g as [r s] end; unfold gq_conj, gq_mul, gq_sub, gq_add, gq_neg, g_mul, g_add, g_neg, g_sub, g_conj, gr0, gr1; simpl.
  unfold gqeq, geq; simpl; repeat split; ring.
Qed.

Theorem gq_norm_sq_mul : forall x y : GQuat,
  geq (gq_norm_sq (gq_mul x y)) (g_mul (gq_norm_sq x) (gq_norm_sq y)).
Proof.
  intros x y; destruct x, y; repeat match goal with | g : Golden |- _ => let r := fresh "qR" in let s := fresh "qS" in destruct g as [r s] end; unfold gq_norm_sq, gq_mul, gq_sub, gq_add, gq_neg, g_mul, g_add, g_neg, g_sub, g_conj, gr0, gr1; simpl.
  unfold geq; simpl; split; ring.
Qed.

Theorem gq_conj_mul_self : forall x : GQuat,
  gqeq (gq_mul x (gq_conj x)) (mkGQuat (gq_norm_sq x) gr0 gr0 gr0).
Proof.
  intro x; destruct x; repeat match goal with | g : Golden |- _ => let r := fresh "qR" in let s := fresh "qS" in destruct g as [r s] end; unfold gq_mul, gq_conj, gq_norm_sq, gq_sub, gq_add, gq_neg, g_mul, g_add, g_neg, g_sub, g_conj, gr0, gr1; simpl.
  unfold gqeq, geq; simpl; repeat split; ring.
Qed.

Theorem gq_norm_sq_nonneg_real : forall x : GQuat,
  gr (gq_norm_sq x) == 0 \/ 0 < gr (gq_norm_sq x).
Proof.
  intro x; destruct x; unfold gq_norm_sq; simpl.
  destruct (Qlt_le_dec 0 (gr (g_mul qr qr) + gr (g_mul qi qi) + gr (g_mul qj qj) + gr (g_mul qk qk))).
  - right; auto.
  - left; apply Qle_lt_or_eq in q; tauto.
Qed.

Theorem gq_i_sq : gq_mul gq_i gq_i = gq_neg gq1.
Proof.
  unfold gq_i, gq1, gq_neg, gq_mul, gq_sub, gq_add; simpl.
  repeat f_equal; ring.
Qed.

Theorem gq_j_sq : gq_mul gq_j gq_j = gq_neg gq1.
Proof.
  unfold gq_j, gq1, gq_neg, gq_mul, gq_sub, gq_add; simpl.
  repeat f_equal; ring.
Qed.

Theorem gq_k_sq : gq_mul gq_k gq_k = gq_neg gq1.
Proof.
  unfold gq_k, gq1, gq_neg, gq_mul, gq_sub, gq_add; simpl.
  repeat f_equal; ring.
Qed.

Theorem gq_ijk : gq_mul (gq_mul gq_i gq_j) gq_k = gq_neg gq1.
Proof.
  unfold gq_i, gq_j, gq_k, gq1, gq_neg, gq_mul, gq_sub, gq_add; simpl.
  repeat f_equal; ring.
Qed.
