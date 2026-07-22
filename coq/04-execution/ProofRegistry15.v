From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition proof_registry15_owner : Prop := True.
Definition proof_registry15_proof : proof_registry15_owner := I.

Definition proof_registry15_faces : N := 5.
Definition proof_registry15_strata : N := 3.
Definition proof_registry15_files : N := 15.

Theorem proof_registry15_faces_times_strata :
  proof_registry15_faces * proof_registry15_strata = proof_registry15_files.
Proof.
  reflexivity.
Qed.
