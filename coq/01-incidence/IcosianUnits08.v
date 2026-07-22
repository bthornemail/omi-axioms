From Coq Require Import QArith.QArith.
Open Scope Q_scope.

Definition icosian_units08_owner : Prop := True.
Definition icosian_units08_proof : icosian_units08_owner := I.

Definition icosian_units08_unit_family (a b c d : Q) : Q :=
  a * a + b * b + c * c + d * d.

Theorem icosian_units08_basis_norm_one :
  icosian_units08_unit_family 1 0 0 0 == 1.
Proof.
  vm_compute; reflexivity.
Qed.
