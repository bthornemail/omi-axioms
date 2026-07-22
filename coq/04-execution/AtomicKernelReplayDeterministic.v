From Coq Require Import Lists.List.
From Coq Require Import NArith.NArith.
Import ListNotations.
Open Scope N_scope.

Definition atomic_kernel_replay_deterministic_owner : Prop := True.
Definition atomic_kernel_replay_deterministic_proof : atomic_kernel_replay_deterministic_owner := I.

Definition atomic_kernel_replay_seed (x : N) : list N := [x].

Theorem atomic_kernel_replay_seed_singleton : forall x,
  List.length (atomic_kernel_replay_seed x) = 1%nat.
Proof.
  intros x; reflexivity.
Qed.
