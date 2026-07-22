(*
  PolyhedralProperties.v -- discrete norm witnesses for jurisdiction envelopes.
*)

From Coq Require Import NArith.NArith.
Require Import PolyhedralJurisdictions.
Open Scope N_scope.

Theorem norm_zero_isolates_graph :
  polyhedral_norm TangentTetrahedron = 0.
Proof. reflexivity. Qed.

Theorem norm_one_isolates_bigraph :
  polyhedral_norm RegularTetrahedron = 1.
Proof. reflexivity. Qed.

Theorem norm_two_isolates_multigraph :
  polyhedral_norm StellatedTetrahedron = 2.
Proof. reflexivity. Qed.

Theorem norm_four_isolates_hypergraph :
  polyhedral_norm TriakisTetrahedron = 4.
Proof. reflexivity. Qed.
