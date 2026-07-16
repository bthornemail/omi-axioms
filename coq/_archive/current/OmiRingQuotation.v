(*
  OmiRingQuotation.v -- quoted relation adjudication.

  A quoted relation frames a candidate gauge step without accepting it.
  The Tetragrammatron adjudicates by checking whether the target equals
  the deterministic step result.
*)

From Coq Require Import QArith.QArith.
From Coq Require Import Fin.
From Coq Require Import Arith.Arith.
Open Scope Q_scope.

Require Import GoldenField.
Require Import GoldenQuaternion.
Require Import IcosianUnits.
Require Import OmiRingIcosian.

(* ----------------------------------------------------------------- *)
(*  Quoted relation                                                   *)
(* ----------------------------------------------------------------- *)

Record QuotedRelation : Type := mkQuotedRelation {
  qr_source : OmiRingState;
  qr_gauge  : OmiGauge;
  qr_target : OmiRingState
}.

(* ----------------------------------------------------------------- *)
(*  Adjudication                                                      *)
(* ----------------------------------------------------------------- *)

Definition adjudicates (qr : QuotedRelation) : Prop :=
  qr_target qr = omi_ring_step (qr_source qr) (qr_gauge qr).

Theorem adjudication_decidable : forall qr,
  { adjudicates qr } + { ~ adjudicates qr }.
Proof.
  intro qr.
  unfold adjudicates.
  destruct qr as [s g t].
  destruct (OmiRingState_eq_dec t (omi_ring_step s g)).
  - left; exact e.
  - right; exact n.
Qed.

(* ----------------------------------------------------------------- *)
(*  Equality of OmiRingState is decidable (wraps GQuat equality)     *)
(* ----------------------------------------------------------------- *)

Definition Golden_eq_dec (x y : Golden) : { x = y } + { x <> y } :=
  match x, y with
  | mkGolden ar as, mkGolden br bs =>
    if Qeq_dec ar br
    then if Qeq_dec as bs
         then left; f_equal; assumption
         else right; intro H; injection H; auto
    else right; intro H; injection H; auto
  end.

Definition GQuat_eq_dec (x y : GQuat) : { x = y } + { x <> y } :=
  match x, y with
  | mkGQuat ar ai aj ak, mkGQuat br bi bj bk =>
    if Golden_eq_dec ar br
    then if Golden_eq_dec ai bi
         then if Golden_eq_dec aj bj
              then if Golden_eq_dec ak bk
                   then left; f_equal; assumption
                   else right; intro H; injection H; auto
              else right; intro H; injection H; auto
         else right; intro H; injection H; auto
    else right; intro H; injection H; auto
  end.

Definition OmiRingState_eq_dec (x y : OmiRingState) : { x = y } + { x <> y } :=
  match x, y with
  | mkOmiRingState vx, mkOmiRingState vy =>
    if GQuat_eq_dec vx vy
    then left; f_equal; assumption
    else right; intro H; injection H; auto
  end.

(* ----------------------------------------------------------------- *)
(*  Adjudication properties                                          *)
(* ----------------------------------------------------------------- *)

Theorem adjudication_reflexive : forall s g,
  adjudicates (mkQuotedRelation s g (omi_ring_step s g)).
Proof.
  intros s g.
  unfold adjudicates; simpl.
  reflexivity.
Qed.

Theorem adjudication_deterministic : forall qr1 qr2,
  qr_source qr1 = qr_source qr2 ->
  qr_gauge qr1 = qr_gauge qr2 ->
  adjudicates qr1 ->
  adjudicates qr2 ->
  qr_target qr1 = qr_target qr2.
Proof.
  intros qr1 qr2 Hsrc Hgauge Hadj1 Hadj2.
  unfold adjudicates in Hadj1, Hadj2.
  rewrite Hsrc in Hadj1.
  rewrite Hgauge in Hadj1.
  rewrite Hadj1 in Hadj2.
  exact Hadj2.
Qed.

Theorem adjudication_norm_preserved : forall qr,
  adjudicates qr ->
  gq_norm_sq (ors_value (qr_source qr)) =
  gq_norm_sq (ors_value (qr_target qr)).
Proof.
  intros qr Hadj.
  unfold adjudicates in Hadj.
  rewrite Hadj.
  apply omi_ring_step_preserves_norm.
Qed.

(* ----------------------------------------------------------------- *)
(*  Canonical inquiry statement                                      *)
(* ----------------------------------------------------------------- *)

Theorem omi_ring_icosian_target_adjudicable :
  forall (s : OmiRingState) (g : OmiGauge),
    IsOmiRingState s ->
    (forall x y : OmiRingState,
      x = omi_ring_step s g ->
      y = omi_ring_step s g ->
      x = y) /\
    (gq_norm_sq (ors_value (omi_ring_step s g)) = gq_norm_sq (ors_value s)) /\
    (exists qr : QuotedRelation,
      qr_source qr = s /\
      qr_gauge qr = g /\
      adjudicates qr).
Proof.
  intros s g Hs.
  split.
  - intros x y Hx Hy; rewrite Hx in Hy; exact Hy.
  - split.
    + apply omi_ring_step_preserves_norm.
    + exists (mkQuotedRelation s g (omi_ring_step s g)).
      split; [reflexivity | split; [reflexivity | apply adjudication_reflexive]].
Qed.
