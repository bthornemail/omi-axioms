From Coq Require Import QArith.QArith.
Open Scope Q_scope.

Definition icosian_span_owner : Prop := True.
Definition icosian_span_proof : icosian_span_owner := I.

Record icosian_span_coord := {
  icosian_span_a : Q;
  icosian_span_b : Q;
  icosian_span_c : Q;
  icosian_span_d : Q
}.

Theorem icosian_span_components : forall a b c d,
  icosian_span_a {| icosian_span_a := a; icosian_span_b := b;
                    icosian_span_c := c; icosian_span_d := d |} == a /\
  icosian_span_d {| icosian_span_a := a; icosian_span_b := b;
                    icosian_span_c := c; icosian_span_d := d |} == d.
Proof.
  intros a b c d; split; reflexivity.
Qed.
