From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition omino_axiomatic_sovereignty_owner : Prop := True.
Definition omino_axiomatic_sovereignty_proof : omino_axiomatic_sovereignty_owner := I.

Definition omino_active_target_count : N := 64.
Definition omino_archive_promoted_count : N := 38.
Definition omino_bridge_module_count : N := 3.

Theorem omino_axiomatic_sovereignty_count_decomposition :
  23 + omino_archive_promoted_count + omino_bridge_module_count =
  omino_active_target_count.
Proof. vm_compute; reflexivity. Qed.
