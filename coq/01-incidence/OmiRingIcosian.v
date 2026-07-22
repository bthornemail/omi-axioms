From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition omi_ring_icosian_owner : Prop := True.
Definition omi_ring_icosian_proof : omi_ring_icosian_owner := I.

Definition omi_ring_icosian_selector (x : N) : N := N.land x 0x0F.

Theorem omi_ring_icosian_selector_full_nibble :
  omi_ring_icosian_selector 0xFF = 0x0F.
Proof.
  reflexivity.
Qed.
