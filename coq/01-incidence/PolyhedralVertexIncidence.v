(*
  PolyhedralVertexIncidence.v -- modulo-4 balance of named vertex blocks.
*)

From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition balanced_mod4 (count : N) : Prop := count mod 4 = 0.

Theorem tangent_block_layout_balanced :
  balanced_mod4 4.
Proof. reflexivity. Qed.

Theorem regular_block_layout_balanced :
  balanced_mod4 8.
Proof. reflexivity. Qed.

Theorem stellated_block_layout_balanced :
  balanced_mod4 12.
Proof. reflexivity. Qed.

Theorem triakis_block_layout_balanced :
  balanced_mod4 16.
Proof. reflexivity. Qed.
