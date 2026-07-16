(**
  Typed authority boundary for framing, validation, and interpolation.

  Omnicron supplies a frame. Tetragrammatron computes the decision.
  Metatron may interpolate addresses while preserving that decision.
*)

From Coq Require Import NArith List Bool.
Import ListNotations.

Require Import EarnedControlBandsEncode.
Require Import DiagonalGaugeCloses.
Require Import NullRingCloses.

Open Scope N_scope.

Inductive ValidationDecision : Type :=
| Lawful
| Unlawful.

Record FramedRelation : Type := mkFramedRelation {
  relation_envelope : list N;
  relation_witnesses : list N;
  relation_gauge : N
}.

Definition omnicron_frame_valid (frame : FramedRelation) : bool :=
  valid_omnicron_envelope (relation_envelope frame).

Definition tetragrammatron_validate (frame : FramedRelation)
  : ValidationDecision :=
  if andb
       (omnicron_frame_valid frame)
       (andb
          (diagonal_closure_ready dplus_closure)
          (andb
             (diagonal_closure_ready dminus_closure)
             (N.eqb (xor_reduce (relation_witnesses frame)) 0)))
  then Lawful
  else Unlawful.

Record ValidatedRelation : Type := mkValidatedRelation {
  validated_frame : FramedRelation;
  validation_decision : ValidationDecision
}.

Definition tetragrammatron_decide (frame : FramedRelation)
  : ValidatedRelation :=
  mkValidatedRelation frame (tetragrammatron_validate frame).

Record InterpolatedRelation : Type := mkInterpolatedRelation {
  interpolated_source : N;
  interpolated_destination : N;
  interpolated_decision : ValidationDecision
}.

Definition metatron_interpolate
  (source destination : N) (validated : ValidatedRelation)
  : InterpolatedRelation :=
  mkInterpolatedRelation source destination
    (validation_decision validated).

Theorem omnicron_framing_does_not_decide :
  forall frame,
    omnicron_frame_valid frame =
    valid_omnicron_envelope (relation_envelope frame).
Proof. reflexivity. Qed.

Theorem tetragrammatron_is_decision_source :
  forall frame,
    validation_decision (tetragrammatron_decide frame) =
    tetragrammatron_validate frame.
Proof. reflexivity. Qed.

Theorem metatron_interpolation_preserves_decision :
  forall source destination validated,
    interpolated_decision
      (metatron_interpolate source destination validated) =
    validation_decision validated.
Proof. reflexivity. Qed.

Theorem metatron_cannot_make_unlawful_lawful :
  forall source destination frame,
    tetragrammatron_validate frame = Unlawful ->
    interpolated_decision
      (metatron_interpolate source destination
        (tetragrammatron_decide frame)) = Unlawful.
Proof.
  intros source destination frame H.
  unfold metatron_interpolate, tetragrammatron_decide; simpl.
  exact H.
Qed.

Definition canonical_null_frame : FramedRelation :=
  mkFramedRelation canonical_omnicron_envelope byte_ring_witnesses 255.

Theorem canonical_null_frame_is_lawful :
  tetragrammatron_validate canonical_null_frame = Lawful.
Proof. vm_compute; reflexivity. Qed.

Definition malformed_null_frame : FramedRelation :=
  mkFramedRelation [255; 0; 28; 29; 30; 31; 31; 255]
    byte_ring_witnesses 255.

Theorem malformed_frame_is_unlawful :
  tetragrammatron_validate malformed_null_frame = Unlawful.
Proof. vm_compute; reflexivity. Qed.

Definition open_witness_frame : FramedRelation :=
  mkFramedRelation canonical_omnicron_envelope [32; 95; 128] 255.

Theorem nonclosing_witnesses_are_unlawful :
  tetragrammatron_validate open_witness_frame = Unlawful.
Proof. vm_compute; reflexivity. Qed.
