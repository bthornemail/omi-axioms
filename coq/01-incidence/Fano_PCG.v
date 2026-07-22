From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition fano_pcg_owner : Prop := True.
Definition fano_pcg_proof : fano_pcg_owner := I.

Definition fano_pcg_left (x : N) : N := N.land x 0x7.
Definition fano_pcg_right (x : N) : N := N.land (N.shiftr x 3) 0x7.

Theorem fano_pcg_byte_halves :
  fano_pcg_left 0x3F = 0x7 /\ fano_pcg_right 0x3F = 0x7.
Proof.
  split; reflexivity.
Qed.
