(*
  GoldenField06.v -- the golden field Q(√5).

  Status target: P0
  Allowed OMI use: Omi-Ring candidate arithmetic, norm-preserving gauge steps,
                    icosian bridge.
*)

From Coq Require Import QArith.QArith.
From Coq Require Import QArith.Qreduction.
From Coq Require Import micromega.Lia.
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
  let c := g_mul x (g_conj x) in gr c.

Theorem g_add_assoc : forall x y z,
  g_add (g_add x y) z = g_add x (g_add y z).
Proof.
  intros x y z; destruct x, y, z; unfold g_add; simpl; f_equal; ring.
Qed.

Theorem g_add_comm : forall x y, g_add x y = g_add y x.
Proof.
  intros x y; destruct x, y; unfold g_add; simpl; f_equal; ring.
Qed.

Theorem g_add_0_l : forall x, g_add gr0 x = x.
Proof. intro x; destruct x; unfold g_add, gr0; simpl; f_equal; ring. Qed.

Theorem g_add_0_r : forall x, g_add x gr0 = x.
Proof. intro x; destruct x; unfold g_add, gr0; simpl; f_equal; ring. Qed.

Theorem g_add_neg_r : forall x, g_add x (g_neg x) = gr0.
Proof. intro x; destruct x; unfold g_add, g_neg, gr0; simpl; f_equal; ring. Qed.

Theorem g_mul_assoc : forall x y z,
  g_mul (g_mul x y) z = g_mul x (g_mul y z).
Proof.
  intros x y z; destruct x, y, z; unfold g_mul; simpl; f_equal; ring.
Qed.

Theorem g_mul_comm : forall x y, g_mul x y = g_mul y x.
Proof.
  intros x y; destruct x, y; unfold g_mul; simpl; f_equal; ring.
Qed.

Theorem g_mul_1_l : forall x, g_mul gr1 x = x.
Proof. intro x; destruct x; unfold g_mul, gr1; simpl; f_equal; ring. Qed.

Theorem g_mul_1_r : forall x, g_mul x gr1 = x.
Proof. intro x; destruct x; unfold g_mul, gr1; simpl; f_equal; ring. Qed.

Theorem g_mul_0_l : forall x, g_mul gr0 x = gr0.
Proof. intro x; destruct x; unfold g_mul, gr0; simpl; f_equal; ring. Qed.

Theorem g_mul_0_r : forall x, g_mul x gr0 = gr0.
Proof. intro x; destruct x; unfold g_mul, gr0; simpl; f_equal; ring. Qed.

Theorem g_distrib_l : forall x y z,
  g_mul x (g_add y z) = g_add (g_mul x y) (g_mul x z).
Proof.
  intros x y z; destruct x, y, z; unfold g_mul, g_add; simpl; f_equal; ring.
Qed.

Theorem g_distrib_r : forall x y z,
  g_mul (g_add x y) z = g_add (g_mul x z) (g_mul y z).
Proof.
  intros x y z; destruct x, y, z; unfold g_mul, g_add; simpl; f_equal; ring.
Qed.

Theorem g_conj_involutive : forall x, g_conj (g_conj x) = x.
Proof. intro x; destruct x; unfold g_conj; simpl; f_equal; ring. Qed.

Theorem g_conj_add : forall x y, g_conj (g_add x y) = g_add (g_conj x) (g_conj y).
Proof.
  intros x y; destruct x, y; unfold g_conj, g_add; simpl; f_equal; ring.
Qed.

Theorem g_conj_mul : forall x y, g_conj (g_mul x y) = g_mul (g_conj x) (g_conj y).
Proof.
  intros x y; destruct x, y; unfold g_conj, g_mul; simpl; f_equal; ring.
Qed.

Theorem golden_norm_mul : forall x y,
  g_norm_sq (g_mul x y) = g_norm_sq x * g_norm_sq y.
Proof.
  intros x y; destruct x, y; unfold g_norm_sq, g_mul, g_conj; simpl; ring.
Qed.

Theorem phi_sq_eq_phi_plus_one : g_mul phi phi = g_add phi gr1.
Proof. unfold phi, gr1; unfold g_mul, g_add; simpl; f_equal; ring. Qed.

Theorem phi_times_phi_inv : g_mul phi phi_inv = gr1.
Proof. unfold phi, phi_inv, gr1; unfold g_mul; simpl; f_equal; ring. Qed.
