From Coq Require Import Lists.List.
From Coq Require Import NArith.NArith.
Import ListNotations.
Open Scope N_scope.

Definition polynomials_owner : Prop := True.
Definition polynomials_proof : polynomials_owner := I.

Definition f2 := bool.
Definition polynomial := list f2.
Definition poly_zero : polynomial := [].
Definition poly_x : polynomial := [false; true].

Theorem polynomials_poly_x_degree_shape :
  List.length poly_x = 2%nat.
Proof.
  reflexivity.
Qed.
