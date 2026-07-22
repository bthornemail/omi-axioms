From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition bitmask_closure03_owner : Prop := True.
Definition bitmask_closure03_proof : bitmask_closure03_owner := I.

Definition bitmask_closure03_mask7 (x : N) : N := N.land x 0x7F.
Definition bitmask_closure03_omino_step (x axis : N) : N :=
  N.lxor (N.lxor (N.shiftl x 1) (N.shiftr axis 2)) 0x1D1D1D1D1D1D1D1D.

Theorem bitmask_closure03_mask7_full_byte :
  bitmask_closure03_mask7 0xFF = 0x7F.
Proof. vm_compute; reflexivity. Qed.

Theorem bitmask_closure03_step_deterministic :
  forall x y axis,
    x = y ->
    bitmask_closure03_omino_step x axis =
    bitmask_closure03_omino_step y axis.
Proof.
  intros x y axis Hxy.
  now rewrite Hxy.
Qed.
