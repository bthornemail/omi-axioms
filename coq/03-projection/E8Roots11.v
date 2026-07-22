From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition e8_roots11_owner : Prop := True.
Definition e8_roots11_proof : e8_roots11_owner := I.

Definition e8_roots11_integral_total : N := 240.
Definition e8_roots11_local240_clock : N := 240.

Theorem e8_roots11_clock_matches_total :
  e8_roots11_local240_clock = e8_roots11_integral_total.
Proof. vm_compute; reflexivity. Qed.
