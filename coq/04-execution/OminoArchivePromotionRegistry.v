From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition omino_archive_promotion_registry_owner : Prop := True.
Definition omino_archive_promotion_registry_proof : omino_archive_promotion_registry_owner := I.

Definition omino_archive_promotion_registry_active : N := 64.
Definition omino_archive_promotion_registry_existing : N := 23.
Definition omino_archive_promotion_registry_promoted : N := 38.
Definition omino_archive_promotion_registry_bridges : N := 3.

Theorem omino_archive_promotion_registry_decomposition :
  omino_archive_promotion_registry_existing +
  omino_archive_promotion_registry_promoted +
  omino_archive_promotion_registry_bridges =
  omino_archive_promotion_registry_active.
Proof.
  reflexivity.
Qed.
