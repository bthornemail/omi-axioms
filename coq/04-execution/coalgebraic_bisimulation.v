From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition coalgebraic_bisimulation_owner : Prop := True.
Definition coalgebraic_bisimulation_proof : coalgebraic_bisimulation_owner := I.

Definition coalgebraic_bisimulation_step (x axis : N) : N :=
  N.lxor (N.shiftl x 1) (N.shiftr axis 2).

Theorem coalgebraic_bisimulation_step_deterministic : forall x axis,
  coalgebraic_bisimulation_step x axis =
  coalgebraic_bisimulation_step x axis.
Proof.
  reflexivity.
Qed.
