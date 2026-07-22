From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition atomic_kernel_computes_delta_owner : Prop := True.
Definition atomic_kernel_computes_delta_proof : atomic_kernel_computes_delta_owner := I.

Definition atomic_kernel_computes_delta (x axis : N) : N :=
  N.lxor (N.lxor (N.shiftl x 1) (N.shiftr axis 2)) 0x1D1D1D1D1D1D1D1D.

Theorem atomic_kernel_computes_delta_deterministic : forall x axis,
  atomic_kernel_computes_delta x axis =
  atomic_kernel_computes_delta x axis.
Proof.
  reflexivity.
Qed.
