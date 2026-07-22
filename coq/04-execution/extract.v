From Coq Require Import Extraction.
From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition extract_owner : Prop := True.
Definition extract_proof : extract_owner := I.

Definition extract_target_word (x : N) : N := N.land x 0xFFFFFFFFFFFFFFFF.

Theorem extract_target_word_full64 :
  extract_target_word 0xFFFFFFFFFFFFFFFF = 0xFFFFFFFFFFFFFFFF.
Proof.
  reflexivity.
Qed.
