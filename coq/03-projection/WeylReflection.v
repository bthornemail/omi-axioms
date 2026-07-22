From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition weyl_reflection_owner : Prop := True.
Definition weyl_reflection_proof : weyl_reflection_owner := I.

Definition weyl_reflection_mask16 (x : N) : N := N.land x 0xFFFF.
Definition weyl_reflection_r0 (x : N) : N := N.lxor x 0xAAAA.

Theorem weyl_reflection_mask16_full :
  weyl_reflection_mask16 0xFFFFFFFF = 0xFFFF.
Proof.
  reflexivity.
Qed.
