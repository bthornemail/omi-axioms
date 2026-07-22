From Coq Require Import QArith.QArith.
Open Scope Q_scope.

Definition golden_field06_owner : Prop := True.
Definition golden_field06_proof : golden_field06_owner := I.

Record golden_field06_pair := {
  golden_field06_a : Q;
  golden_field06_b : Q
}.

Definition golden_field06_add (x y : golden_field06_pair) : golden_field06_pair :=
  {| golden_field06_a := golden_field06_a x + golden_field06_a y;
     golden_field06_b := golden_field06_b x + golden_field06_b y |}.

Theorem golden_field06_pair_components : forall a b,
  golden_field06_a {| golden_field06_a := a; golden_field06_b := b |} == a /\
  golden_field06_b {| golden_field06_a := a; golden_field06_b := b |} == b.
Proof.
  intros a b; split; reflexivity.
Qed.
