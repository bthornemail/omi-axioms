From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition omi_bialgebra_owner : Prop := True.
Definition omi_bialgebra_proof : omi_bialgebra_owner := I.

Definition omi_bialgebra_car (x : N) : N := N.land x 0x0F.
Definition omi_bialgebra_cdr (x : N) : N := N.shiftr x 4.

Theorem omi_bialgebra_byte_split_sample :
  omi_bialgebra_car 0xFF = 0x0F /\ omi_bialgebra_cdr 0xFF = 0x0F.
Proof.
  split; reflexivity.
Qed.
