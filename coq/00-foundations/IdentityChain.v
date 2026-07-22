From Coq Require Import QArith.QArith.
Open Scope Q_scope.

Definition identity_chain_owner : Prop := True.
Definition identity_chain_proof : identity_chain_owner := I.

Definition identity_chain_two_square (a b : Q) : Q := a * a + b * b.
Definition identity_chain_four_square (a b c d : Q) : Q :=
  a * a + b * b + c * c + d * d.

Theorem identity_chain_four_square_unfolds : forall a b c d,
  identity_chain_four_square a b c d ==
    a * a + b * b + c * c + d * d.
Proof.
  intros a b c d; reflexivity.
Qed.
