From Coq Require Import QArith.QArith.
Open Scope Q_scope.

Definition hopf_projection13_owner : Prop := True.
Definition hopf_projection13_proof : hopf_projection13_owner := I.

Record hopf_projection13_r4 := {
  hopf13_x0 : Q;
  hopf13_x1 : Q;
  hopf13_x2 : Q;
  hopf13_x3 : Q
}.

Definition hopf_projection13_norm4 (p : hopf_projection13_r4) : Q :=
  hopf13_x0 p * hopf13_x0 p + hopf13_x1 p * hopf13_x1 p +
  hopf13_x2 p * hopf13_x2 p + hopf13_x3 p * hopf13_x3 p.

Theorem hopf_projection13_norm4_unfolds : forall p,
  hopf_projection13_norm4 p ==
    hopf13_x0 p * hopf13_x0 p + hopf13_x1 p * hopf13_x1 p +
    hopf13_x2 p * hopf13_x2 p + hopf13_x3 p * hopf13_x3 p.
Proof.
  intros p; reflexivity.
Qed.
