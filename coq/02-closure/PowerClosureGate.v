(*
  PowerClosureGate.v -- exact algebraic form of the power closure gate.

  The quotient form is meaningful only away from the OMINO centroid
  denominator boundary.  The numerator identity is total.
*)

From Coq Require Import ZArith.ZArith.
Open Scope Z_scope.

Definition power_closure_numerator (x : Z) : Z :=
  (64 * x - 64) *
  (32 * x - 32) *
  (16 * x - 16) *
  (8 * x - 8) *
  (4 * x - 4) *
  (2 * x - 2) *
  (x - 1).

Definition power_closure_factored (x : Z) : Z :=
  2 ^ 21 * (x - 1) ^ 7.

Theorem power_closure_numerator_factors :
  forall x : Z,
    power_closure_numerator x = power_closure_factored x.
Proof.
  intro x.
  unfold power_closure_numerator, power_closure_factored.
  ring.
Qed.

Theorem power_closure_sedenion_breakpoint_zero :
  power_closure_numerator 1 = 0.
Proof. vm_compute. reflexivity. Qed.

Definition denominator_admissible (x : Z) : Prop := x <> 0.

Theorem omino_centroid_denominator_excluded :
  ~ denominator_admissible 0.
Proof.
  unfold denominator_admissible.
  intro H.
  apply H.
  reflexivity.
Qed.

Theorem nonzero_coordinate_is_admissible :
  forall x : Z, x <> 0 -> denominator_admissible x.
Proof. intros x H; exact H. Qed.

