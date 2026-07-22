From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition cyclic_clock_owner : Prop := True.
Definition cyclic_clock_proof : cyclic_clock_owner := I.

Definition cyclic_clock_local240 (x : N) : N := N.modulo x 240.
Definition cyclic_clock_phase60 (x : N) : N := N.modulo x 60.

Theorem cyclic_clock_local240_wraps_240 :
  cyclic_clock_local240 240 = 0.
Proof. vm_compute; reflexivity. Qed.

Theorem cyclic_clock_phase60_wraps_60 :
  cyclic_clock_phase60 60 = 0.
Proof. vm_compute; reflexivity. Qed.
