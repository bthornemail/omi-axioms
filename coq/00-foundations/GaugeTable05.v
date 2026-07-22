From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition gauge_table05_owner : Prop := True.
Definition gauge_table05_proof : gauge_table05_owner := I.

Definition gauge_table05_slot (x : N) : N := N.land x 0x0F.
Definition gauge_table05_witness : N := 0x18.

Theorem gauge_table05_slot_full_nibble :
  gauge_table05_slot 0xFF = 0x0F.
Proof. vm_compute; reflexivity. Qed.

Theorem gauge_table05_witness_is_twenty_four :
  gauge_table05_witness = 24.
Proof. vm_compute; reflexivity. Qed.
