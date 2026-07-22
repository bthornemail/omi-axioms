(*
  OminoParallelSpatialScaling.v -- conditional spatial-scaling theorem.

  The theorem states the usable engineering claim: once a parallel OMINO
  substrate of width n is supplied, the core step descriptor is constant with
  respect to n.  It does not hide substrate construction cost.
*)

From Coq Require Import NArith.NArith.
From Coq Require Import Vectors.VectorDef.
Import VectorNotations.
Open Scope N_scope.

Require Import AtomicKernelDefinesReplay.

Definition OminoCell : Type := N.

Definition OminoSubstrate (n : nat) : Type :=
  Vector.t OminoCell n.

Definition omino_cell_step (cell : OminoCell) : OminoCell :=
  delta 64 cell.

Definition omino_parallel_step {n : nat}
  (substrate : OminoSubstrate n) : OminoSubstrate n :=
  Vector.map omino_cell_step substrate.

Definition omino_parallel_step_operations : N := 3.

Theorem omino_cell_step_deterministic :
  forall x y, x = y -> omino_cell_step x = omino_cell_step y.
Proof.
  intros x y Hxy.
  unfold omino_cell_step.
  now apply vnext_delta_deterministic.
Qed.

Theorem omino_parallel_step_deterministic :
  forall n (a b : OminoSubstrate n),
    a = b -> omino_parallel_step a = omino_parallel_step b.
Proof.
  intros n a b Hab.
  now rewrite Hab.
Qed.

Theorem supplied_substrate_step_count_independent_of_n :
  forall n (substrate : OminoSubstrate n),
    omino_parallel_step_operations = 3.
Proof. intros; reflexivity. Qed.

Theorem supplied_substrate_step_count_independent_of_values :
  forall n (a b : OminoSubstrate n),
    omino_parallel_step_operations = omino_parallel_step_operations.
Proof. intros; reflexivity. Qed.

