From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition pinch_branch_local_forms14_owner : Prop := True.
Definition pinch_branch_local_forms14_proof : pinch_branch_local_forms14_owner := I.

Definition pinch_branch_local_forms14_low (x : N) : N := N.land x 0x7F.
Definition pinch_branch_local_forms14_high (x : N) : N := N.lxor (N.land x 0x7F) 0x80.

Theorem pinch_branch_local_forms14_low_full :
  pinch_branch_local_forms14_low 0xFF = 0x7F.
Proof. vm_compute; reflexivity. Qed.

Theorem pinch_branch_local_forms14_high_full :
  pinch_branch_local_forms14_high 0xFF = 0xFF.
Proof. vm_compute; reflexivity. Qed.
