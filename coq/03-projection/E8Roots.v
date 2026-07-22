From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition e8_roots_owner : Prop := True.
Definition e8_roots_proof : e8_roots_owner := I.

Definition e8_roots_total : N := 240.
Definition e8_roots_type1 : N := 112.
Definition e8_roots_type2 : N := 128.

Theorem e8_roots_split_sums_to_total :
  e8_roots_type1 + e8_roots_type2 = e8_roots_total.
Proof. vm_compute; reflexivity. Qed.
