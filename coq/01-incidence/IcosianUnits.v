From Coq Require Import QArith.QArith.
Open Scope Q_scope.

Definition icosian_units_owner : Prop := True.
Definition icosian_units_proof : icosian_units_owner := I.

Definition icosian_units_norm4 (a b c d : Q) : Q :=
  a * a + b * b + c * c + d * d.

Theorem icosian_units_basis_norm_one :
  icosian_units_norm4 1 0 0 0 == 1.
Proof.
  vm_compute; reflexivity.
Qed.
