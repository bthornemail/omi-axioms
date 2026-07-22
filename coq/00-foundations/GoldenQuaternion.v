From Coq Require Import QArith.QArith.
Open Scope Q_scope.

Definition golden_quaternion_owner : Prop := True.
Definition golden_quaternion_proof : golden_quaternion_owner := I.

Record golden_quaternion := {
  golden_q0 : Q;
  golden_q1 : Q;
  golden_q2 : Q;
  golden_q3 : Q
}.

Definition golden_quaternion_norm (q : golden_quaternion) : Q :=
  golden_q0 q * golden_q0 q + golden_q1 q * golden_q1 q +
  golden_q2 q * golden_q2 q + golden_q3 q * golden_q3 q.

Theorem golden_quaternion_norm_unfolds : forall q,
  golden_quaternion_norm q ==
    golden_q0 q * golden_q0 q + golden_q1 q * golden_q1 q +
    golden_q2 q * golden_q2 q + golden_q3 q * golden_q3 q.
Proof.
  intros q; reflexivity.
Qed.
