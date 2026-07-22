(*
  FieldVisibilityInvariants.v -- byte-plane mirror and boundary facts.
*)

From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition antipodal_mirror (position : N) : N :=
  N.lxor position 0x80.

Definition local_boundary_max : N := 0x7F.
Definition remote_boundary_min : N := 0x80.

Theorem antipodal_mirror_involutive_identity :
  forall position, antipodal_mirror (antipodal_mirror position) = position.
Proof.
  intro position.
  unfold antipodal_mirror.
  rewrite N.lxor_assoc.
  rewrite N.lxor_nilpotent.
  apply N.lxor_0_r.
Qed.

Theorem local_plane_boundary_separation :
  local_boundary_max < remote_boundary_min.
Proof. reflexivity. Qed.

Theorem remote_plane_boundary_separation :
  remote_boundary_min <= 0xFF.
Proof.
  vm_compute.
  discriminate.
Qed.

Theorem centroid_orientation_symmetry :
  antipodal_mirror 0x00 = 0x80 /\ antipodal_mirror 0x80 = 0x00.
Proof.
  split; reflexivity.
Qed.
