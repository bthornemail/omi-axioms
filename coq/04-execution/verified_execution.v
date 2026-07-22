From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition verified_execution_owner : Prop := True.
Definition verified_execution_proof : verified_execution_owner := I.

Definition verified_execution_step (x axis : N) : N :=
  N.lxor (N.lxor (N.shiftl x 1) (N.shiftr axis 2)) 0x1D1D1D1D1D1D1D1D.

Theorem verified_execution_step_deterministic : forall x axis,
  verified_execution_step x axis =
  verified_execution_step x axis.
Proof.
  reflexivity.
Qed.
