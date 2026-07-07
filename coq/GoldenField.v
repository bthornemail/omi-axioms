(*
  GoldenField.v -- the golden field Q(√5).

  Elements are represented as gr + gs√5 with gr, gs ∈ Q.
  Golden ratio φ = (1+√5)/2 and its inverse φ⁻¹ = (√5-1)/2.
*)

From Coq Require Import QArith.QArith.
From Coq Require Import QArith.Qreduction.
From Coq Require Import QArith.Qring.
From Coq Require Import micromega.Lia.
From Coq Require Import Reals.Reals.
Open Scope Q_scope.

Record Golden : Type := mkGolden {
  gr : Q;
  gs : Q
}.

Definition gr0 : Golden := mkGolden 0 0.
Definition gr1 : Golden := mkGolden 1 0.
Definition phi : Golden := mkGolden (1#2) (1#2).
Definition phi_inv : Golden := mkGolden (-1#2) (1#2).
Definition half : Golden := mkGolden (1#2) 0.
Definition neg_half : Golden := mkGolden (-1#2) 0.

Definition g_add (x y : Golden) : Golden :=
  mkGolden (gr x + gr y) (gs x + gs y).

Definition g_neg (x : Golden) : Golden :=
  mkGolden (- gr x) (- gs x).

Definition g_mul (x y : Golden) : Golden :=
  mkGolden (gr x * gr y + 5 * gs x * gs y)
           (gr x * gs y + gs x * gr y).

Definition g_sub (x y : Golden) : Golden :=
  g_add x (g_neg y).

Definition g_conj (x : Golden) : Golden :=
  mkGolden (gr x) (- gs x).

Definition g_norm_sq (x : Golden) : Q :=
  let c := g_mul x (g_conj x) in
  gr c.

Fixpoint g_pow (x : Golden) (n : nat) : Golden :=
  match n with
  | 0%nat => gr1
  | S m => g_mul x (g_pow x m)
  end.

Lemma Qnum_Qden_inj n1 d1 n2 d2 : n1 = n2 -> d1 = d2 -> Qmake n1 d1 = Qmake n2 d2.
Proof. intros; subst; reflexivity. Qed.

Ltac close_pos :=
  repeat rewrite ?Pos.mul_assoc;
  try (rewrite Pos.mul_comm; repeat rewrite ?Pos.mul_assoc);
  try apply Pos.mul_1_l; try apply Pos.mul_1_r;
  try reflexivity.

Ltac golden_eq :=
  repeat match goal with
  | x : Golden |- _ => destruct x
  | q : Q |- _ => destruct q
  end;
  unfold g_add, g_neg, g_mul, g_sub, g_conj, gr0, gr1, phi, phi_inv, half, neg_half, Qplus, Qmult;
  simpl;
  f_equal; f_equal; [ring | close_pos | ring | close_pos].

Theorem g_add_assoc : forall x y z : Golden,
  g_add (g_add x y) z = g_add x (g_add y z).
Proof. golden_eq. Qed.

Theorem g_add_comm : forall x y : Golden,
  g_add x y = g_add y x.
Proof. golden_eq. Qed.

Theorem g_add_0_l : forall x : Golden,
  g_add gr0 x = x.
Proof. golden_eq. Qed.

Theorem g_add_0_r : forall x : Golden,
  g_add x gr0 = x.
Proof. golden_eq. Qed.

Theorem g_add_neg_r : forall x : Golden,
  gr (g_add x (g_neg x)) == 0 /\ gs (g_add x (g_neg x)) == 0.
Proof.
  destruct x; unfold g_add, g_neg, gr, gs; simpl; split; ring.
Qed.

Theorem g_mul_assoc : forall x y z : Golden,
  g_mul (g_mul x y) z = g_mul x (g_mul y z).
Proof. golden_eq. Qed.

Theorem g_mul_comm : forall x y : Golden,
  g_mul x y = g_mul y x.
Proof. golden_eq. Qed.

Theorem g_mul_1_l : forall x : Golden,
  g_mul gr1 x = x.
Proof. golden_eq. Qed.

Theorem g_mul_1_r : forall x : Golden,
  g_mul x gr1 = x.
Proof. golden_eq. Qed.

Theorem g_mul_0_l : forall x : Golden,
  gr (g_mul gr0 x) == 0 /\ gs (g_mul gr0 x) == 0.
Proof.
  destruct x; unfold g_mul, gr0, gr, gs; simpl; split; ring.
Qed.

Theorem g_mul_0_r : forall x : Golden,
  gr (g_mul x gr0) == 0 /\ gs (g_mul x gr0) == 0.
Proof.
  destruct x; unfold g_mul, gr0, gr, gs; simpl; split; ring.
Qed.

Theorem g_distrib_l : forall x y z : Golden,
  g_mul x (g_add y z) = g_add (g_mul x y) (g_mul x z).
Proof. golden_eq. Qed.

Theorem g_distrib_r : forall x y z : Golden,
  g_mul (g_add x y) z = g_add (g_mul x z) (g_mul y z).
Proof. golden_eq. Qed.

Theorem g_conj_involutive : forall x : Golden,
  g_conj (g_conj x) = x.
Proof. golden_eq. Qed.

Theorem g_conj_add : forall x y : Golden,
  g_conj (g_add x y) = g_add (g_conj x) (g_conj y).
Proof. golden_eq. Qed.

Theorem g_conj_mul : forall x y : Golden,
  g_conj (g_mul x y) = g_mul (g_conj x) (g_conj y).
Proof. golden_eq. Qed.

Theorem g_norm_sq_mul : forall x y : Golden,
  g_norm_sq (g_mul x y) == g_norm_sq x * g_norm_sq y.
Proof.
  intros x y.
  destruct x, y; unfold g_norm_sq, g_mul, g_conj; simpl; ring.
Qed.

Theorem phi_sq_eq_phi_plus_one :
  gr (g_mul phi phi) == gr (g_add phi gr1) /\ gs (g_mul phi phi) == gs (g_add phi gr1).
Proof.
  unfold phi, gr1, g_mul, g_add, gr, gs; simpl; split; ring.
Qed.

Theorem phi_inv_eq_phi_minus_one :
  gr phi_inv == gr (g_sub phi gr1) /\ gs phi_inv == gs (g_sub phi gr1).
Proof.
  unfold phi_inv, phi, gr1, g_sub, g_add, g_neg, gr, gs; simpl; split; ring.
Qed.

Theorem phi_times_phi_inv :
  gr (g_mul phi phi_inv) == 1 /\ gs (g_mul phi phi_inv) == 0.
Proof.
  unfold phi, phi_inv, gr1, g_mul, gr, gs; simpl; split; ring.
Qed.
