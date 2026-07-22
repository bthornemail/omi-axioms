From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition relational_quotation10_owner : Prop := True.
Definition relational_quotation10_proof : relational_quotation10_owner := I.

Definition relational_quotation10_quote (x : N) : N := N.lxor x 0x1E.

Theorem relational_quotation10_zero_relation_witness :
  relational_quotation10_quote 0 = 0x1E.
Proof.
  reflexivity.
Qed.
