From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition omi_ring_step09_owner : Prop := True.
Definition omi_ring_step09_proof : omi_ring_step09_owner := I.

Definition omi_ring_step09_step (x : N) : N := N.lxor x 0x18.

Theorem omi_ring_step09_zero_witness :
  omi_ring_step09_step 0 = 0x18.
Proof.
  reflexivity.
Qed.
