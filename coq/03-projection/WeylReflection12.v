From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition weyl_reflection12_owner : Prop := True.
Definition weyl_reflection12_proof : weyl_reflection12_owner := I.

Definition weyl_reflection12_mask16 (x : N) : N := N.land x 0xFFFF.
Definition weyl_reflection12_r0 (x : N) : N := N.lxor x 0xAAAA.

Theorem weyl_reflection12_mask16_full :
  weyl_reflection12_mask16 0xFFFFFFFF = 0xFFFF.
Proof.
  reflexivity.
Qed.
