From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition omino_five_binary_substrate_owner : Prop := True.
Definition omino_five_binary_substrate_proof : omino_five_binary_substrate_owner := I.

Definition rules_o : N := 0.
Definition facts_o : N := 1.
Definition closures_o : N := 2.
Definition combinators_o : N := 3.
Definition cons_o : N := 4.

Theorem omino_five_binary_substrate_count :
  cons_o + 1 = 5.
Proof. vm_compute; reflexivity. Qed.

Theorem omino_five_binary_substrate_rules_before_cons :
  rules_o < cons_o.
Proof. vm_compute; reflexivity. Qed.
