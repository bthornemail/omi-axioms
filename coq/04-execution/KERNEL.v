From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition kernel_owner : Prop := True.
Definition kernel_proof : kernel_owner := I.

Definition kernel_mask64 (x : N) : N := N.land x 0xFFFFFFFFFFFFFFFF.
Definition kernel_delta64 (x axis : N) : N :=
  N.land (N.lxor (N.lxor (N.shiftl x 1) (N.shiftr axis 2)) 0x1D1D1D1D1D1D1D1D)
    0xFFFFFFFFFFFFFFFF.

Theorem kernel_mask64_full :
  kernel_mask64 0xFFFFFFFFFFFFFFFF = 0xFFFFFFFFFFFFFFFF.
Proof. vm_compute; reflexivity. Qed.

Theorem kernel_delta64_deterministic :
  forall x y axis,
    x = y ->
    kernel_delta64 x axis = kernel_delta64 y axis.
Proof.
  intros x y axis Hxy.
  now rewrite Hxy.
Qed.
