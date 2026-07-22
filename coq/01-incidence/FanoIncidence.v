From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition fano_incidence_owner : Prop := True.
Definition fano_incidence_proof : fano_incidence_owner := I.

Definition fano_incidence_point (x : N) : N := N.modulo x 7.
Definition fano_incidence_line (x : N) : N := N.modulo (N.shiftr x 1) 7.

Theorem fano_incidence_sample_coordinates :
  fano_incidence_point 8 = 1 /\ fano_incidence_line 8 = 4.
Proof.
  split; reflexivity.
Qed.
