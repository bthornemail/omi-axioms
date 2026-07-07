(*
  RelationalQuotation10.v -- candidate relation quotation and adjudication.

  Status target: P0
  Allowed OMI use: formal relation quotation, Tetragrammatron adjudication,
                    deterministic validation.
*)

From Coq Require Import QArith.QArith.
Open Scope Q_scope.

Require Import GoldenField06.
Require Import GoldenQuaternion07.
Require Import IcosianUnits08.
Require Import OmiRingStep09.

Record QuotedRelation : Type := mkQuotedRelation {
  qr_source : GQuat;
  qr_gauge  : OmiGauge;
  qr_target : GQuat
}.

Definition adjudicates (qr : QuotedRelation) : Prop :=
  qr_target qr = omi_ring_step (qr_source qr) (qr_gauge qr).

Definition Golden_eq_dec (x y : Golden) : {x = y} + {x <> y}.
Proof.
  destruct x as [ar as], y as [br bs].
  destruct (Qeq_dec ar br) as [Heqr | Heqr];
    destruct (Qeq_dec as bs) as [Heqs | Heqs].
  - left; f_equal; assumption.
  - right; intro H; injection H; auto.
  - right; intro H; injection H; auto.
  - right; intro H; injection H; auto.
Defined.

Definition GQuat_eq_dec (x y : GQuat) : {x = y} + {x <> y}.
Proof.
  destruct x as [ar ai aj ak], y as [br bi bj bk].
  destruct (Golden_eq_dec ar br);
    destruct (Golden_eq_dec ai bi);
    destruct (Golden_eq_dec aj bj);
    destruct (Golden_eq_dec ak bk).
  - left; f_equal; assumption.
  - right; intro H; injection H; auto.
  - right; intro H; injection H; auto.
  - right; intro H; injection H; auto.
  - right; intro H; injection H; auto.
  - right; intro H; injection H; auto.
  - right; intro H; injection H; auto.
  - right; intro H; injection H; auto.
  - right; intro H; injection H; auto.
  - right; intro H; injection H; auto.
  - right; intro H; injection H; auto.
  - right; intro H; injection H; auto.
  - right; intro H; injection H; auto.
  - right; intro H; injection H; auto.
  - right; intro H; injection H; auto.
  - right; intro H; injection H; auto.
Defined.

Theorem adjudication_decidable : forall qr,
  { adjudicates qr } + { ~ adjudicates qr }.
Proof.
  intro qr.
  unfold adjudicates.
  destruct qr as [s g t].
  destruct (GQuat_eq_dec t (omi_ring_step s g)) as [Heq | Hneq].
  - left; exact Heq.
  - right; exact Hneq.
Qed.

Theorem adjudication_reflexive : forall s g,
  adjudicates (mkQuotedRelation s g (omi_ring_step s g)).
Proof.
  intros s g.
  unfold adjudicates; reflexivity.
Qed.

Theorem accepted_relation_unique : forall source gauge target1 target2,
  adjudicates (mkQuotedRelation source gauge target1) ->
  adjudicates (mkQuotedRelation source gauge target2) ->
  target1 = target2.
Proof.
  intros source gauge target1 target2 Hadj1 Hadj2.
  unfold adjudicates in Hadj1, Hadj2.
  rewrite Hadj1 in Hadj2.
  exact Hadj2.
Qed.

Theorem adjudication_norm_preserved : forall qr,
  adjudicates qr ->
  gq_norm_sq (qr_source qr) = gq_norm_sq (qr_target qr).
Proof.
  intros qr Hadj.
  unfold adjudicates in Hadj.
  rewrite Hadj.
  apply omi_ring_step_preserves_norm.
Qed.

Theorem omi_ring_icosian_target : forall s g,
  IsOmiRingState s ->
  (forall x y, x = omi_ring_step s g -> y = omi_ring_step s g -> x = y) /\
  (gq_norm_sq (omi_ring_step s g) = gq_norm_sq s) /\
  (exists qr, qr_source qr = s /\ qr_gauge qr = g /\ adjudicates qr).
Proof.
  intros s g Hs.
  split.
  - intros x y Hx Hy; rewrite Hx in Hy; exact Hy.
  - split.
    + apply omi_ring_step_preserves_norm.
    + exists (mkQuotedRelation s g (omi_ring_step s g)).
      split; [reflexivity | split; [reflexivity | apply adjudication_reflexive]].
Qed.
