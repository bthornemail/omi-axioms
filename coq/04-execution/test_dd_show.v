From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition test_dd_show_owner : Prop := True.
Definition test_dd_show_proof : test_dd_show_owner := I.

Definition test_dd_show_value : N := 0x18.

Theorem test_dd_show_value_is_metatron_witness :
  test_dd_show_value = 0x18.
Proof.
  reflexivity.
Qed.
