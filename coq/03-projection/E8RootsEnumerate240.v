(*
  E8RootsEnumerate240.v -- active finite E8 root enumeration.

  This module promotes only the assumption-free enumeration facts needed by
  the active registry.  Weyl and octonion archive material remains archived
  until its open obligations are discharged.
*)

From Coq Require Import QArith.QArith.
From Coq Require Import Lists.List.
From Coq Require Import Arith.Arith.
From Coq Require Import Vectors.Vector.
From Coq Require Import Vectors.VectorDef.
From Coq Require Import Vectors.VectorSpec.
Import VectorNotations.
Import ListNotations.
Open Scope Q_scope.

Definition Vec8 : Type := Vector.t Q 8.
Definition vzero8 : Vec8 := Vector.const 0 8.

Definition type1_positions : list (nat * nat) :=
  List.filter
    (fun pos : nat * nat => Nat.ltb (fst pos) (snd pos))
    (List.concat
      (List.map
        (fun i : nat => List.map (fun j : nat => (i, j)) (seq 0%nat 8%nat))
        (seq 0%nat 8%nat))).

Definition sign_pairs : list (Q * Q) :=
  [(1, 1); (1, -1); (-1, 1); (-1, -1)].

Definition make_type1_root (i j : nat) (sgn : Q * Q) : Vec8 :=
  let (si, sj) := sgn in
  Vector.of_list
    (List.map (fun k : nat =>
      if Nat.eq_dec k i then si
      else if Nat.eq_dec k j then sj
      else 0) (seq 0 8)).

Definition e8_type1_roots : list Vec8 :=
  List.concat (List.map (fun pos : nat * nat =>
    let (i, j) := pos in
    List.map (make_type1_root i j) sign_pairs
  ) type1_positions).

Theorem e8_type1_count : length e8_type1_roots = 112%nat.
Proof. vm_compute; reflexivity. Qed.

Definition half_vals : list Q := [1#2; -1#2].

Definition qlt_bool (x y : Q) : bool :=
  if Qlt_le_dec x y then true else false.

Definition even_neg_count_list (l : list Q) : bool :=
  Nat.even (length (List.filter (fun x => qlt_bool x 0) l)).

Definition even_neg_count_vec (v : Vec8) : bool :=
  even_neg_count_list (Vector.to_list v).

Fixpoint half_vectors (n : nat) : list (Vector.t Q n) :=
  match n with
  | O => [[]]
  | S n' =>
      List.concat
        (List.map
          (fun tail : Vector.t Q n' =>
            List.cons
              (Vector.cons Q (1#2) n' tail)
              (List.cons
                (Vector.cons Q (-1#2) n' tail)
                List.nil))
          (half_vectors n'))
  end.

Definition e8_type2_roots : list Vec8 :=
  List.filter even_neg_count_vec (half_vectors 8%nat).

Theorem e8_type2_count : length e8_type2_roots = 128%nat.
Proof. vm_compute; reflexivity. Qed.

Definition e8_roots : list Vec8 := e8_type1_roots ++ e8_type2_roots.

Theorem e8_roots_count : length e8_roots = 240%nat.
Proof.
  unfold e8_roots.
  rewrite app_length.
  rewrite e8_type1_count, e8_type2_count.
  reflexivity.
Qed.

Theorem e8_roots_type_split :
  length e8_type1_roots = 112%nat /\ length e8_type2_roots = 128%nat.
Proof. split; [apply e8_type1_count | apply e8_type2_count]. Qed.

Definition dot (v w : Vec8) : Q :=
  Vector.fold_left Qplus 0 (Vector.map2 Qmult v w).

Theorem e8_roots_norm_two : forall r,
  List.In r e8_roots -> dot r r == 2.
Proof.
  intros r Hr.
  unfold e8_roots in Hr.
  apply List.in_app_or in Hr.
  destruct Hr as [Hr | Hr];
    repeat (destruct Hr as [Hr | Hr];
            [subst r; vm_compute; reflexivity |]);
    destruct Hr.
Qed.
