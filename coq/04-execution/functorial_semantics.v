From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition functorial_semantics_owner : Prop := True.
Definition functorial_semantics_proof : functorial_semantics_owner := I.

Definition functorial_semantics_map (x : N) : N := N.lxor x 0x18.

Theorem functorial_semantics_zero_witness :
  functorial_semantics_map 0 = 0x18.
Proof.
  reflexivity.
Qed.
