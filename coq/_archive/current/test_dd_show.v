From Coq Require Import QArith.QArith.
From Coq Require Import Vectors.VectorDef.
From Coq Require Import Program.Equality.
From Coq Require Import Vectors.VectorSpec.
Import VectorNotations.
Definition Vec (n : nat) : Type := Vector.t Q n.
Goal forall n (v w : Vec (S n)), Vector.fold_left Qplus 0 (Vector.map2 Qmult v w) = Vector.fold_left Qplus 0 (Vector.map2 Qmult w v).
  intros n v w.
  induction v as [| h n t IH]; intro w.
  - elimmatch w with Vector.nil _ => idtac end.
  - dependent destruction w.
    all: admit.
Abort.
