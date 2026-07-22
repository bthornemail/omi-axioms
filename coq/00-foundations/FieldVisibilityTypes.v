(*
  FieldVisibilityTypes.v -- bounded byte plane and 32-position chart types.
*)

From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition byte_plane_bound : N := 256.
Definition chart_index (position : N) : N := (position mod byte_plane_bound) / 32.
Definition chart_position (position : N) : N := position mod 32.

Theorem byte_plane_max_bounds :
  0xFF < byte_plane_bound.
Proof. reflexivity. Qed.

Theorem chart_index_bounded_eight :
  forall position, chart_index position < 8.
Proof.
  intro position.
  unfold chart_index, byte_plane_bound.
  apply N.div_lt_upper_bound.
  - discriminate.
  - rewrite N.mul_comm.
    apply N.mod_lt.
    discriminate.
Qed.

Theorem chart_position_bounded_thirty_two :
  forall position, chart_position position < 32.
Proof.
  intro position.
  unfold chart_position.
  apply N.mod_lt.
  discriminate.
Qed.

Theorem field_visibility_chart_partition_count :
  byte_plane_bound / 32 = 8.
Proof. reflexivity. Qed.
