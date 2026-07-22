From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition fano_incidence02_owner : Prop := True.
Definition fano_incidence02_proof : fano_incidence02_owner := I.

Definition fano_incidence02_flag (point line : N) : N :=
  N.land (N.lxor point line) 0x7.

Theorem fano_incidence02_equal_flag_zero :
  fano_incidence02_flag 5 5 = 0.
Proof.
  reflexivity.
Qed.
