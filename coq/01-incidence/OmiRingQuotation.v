From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition omi_ring_quotation_owner : Prop := True.
Definition omi_ring_quotation_proof : omi_ring_quotation_owner := I.

Definition omi_ring_quotation_quote (x : N) : N := N.lxor x 0x18.

Theorem omi_ring_quotation_zero_witness :
  omi_ring_quotation_quote 0 = 0x18.
Proof.
  reflexivity.
Qed.
