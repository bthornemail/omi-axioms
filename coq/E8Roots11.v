(*
  E8Roots11.v -- the E8 root system (finite enumeration).

  Status target: P1 → P0
  Allowed OMI use: finite exceptional root reference, Weyl reflection test space,
                    higher-dimensional balance model.
  Forbidden OMI use: protocol authority or identity.
*)

From Coq Require Import QArith.QArith.
From Coq Require Import Lists.List.
From Coq Require Import Arith.Arith.
From Coq Require Import Vectors.VectorDef.
Import VectorNotations.
Import ListNotations.
Open Scope Q_scope.

Require Import FiniteBasics01.

Definition Vec8 : Type := Vector.t Q 8.
Definition vzero8 : Vec8 := Vector.const 0 8.

Definition type1_positions : list (nat * nat) :=
  [ (0,1); (0,2); (0,3); (0,4); (0,5); (0,6); (0,7)
  ; (1,2); (1,3); (1,4); (1,5); (1,6); (1,7)
  ; (2,3); (2,4); (2,5); (2,6); (2,7)
  ; (3,4); (3,5); (3,6); (3,7)
  ; (4,5); (4,6); (4,7)
  ; (5,6); (5,7)
  ; (6,7)
  ].

Definition sign_pairs : list (Q * Q) :=
  [(1, 1); (1, -1); (-1, 1); (-1, -1)].

Definition make_type1_root (i j : nat) (sgn : Q * Q) : Vec8 :=
  let (si, sj) := sgn in
  Vector.of_list 8
    (List.map (fun k : nat =>
      if Nat.eq_dec k i then si
      else if Nat.eq_dec k j then sj
      else 0) (seq 0 8)).

Definition e8_type1_roots : list Vec8 :=
  List.concat (List.map (fun pos : nat * nat =>
    let (i, j) := pos in
    List.map (make_type1_root i j) sign_pairs
  ) type1_positions).

Theorem e8_type1_count : length e8_type1_roots = 112.
Proof. vm_compute; reflexivity. Qed.

Definition half_vals : list Q := [1#2; -1#2].

Definition even_neg_count (l : list Q) : bool :=
  Nat.even (length (List.filter (fun x => Qlt_bool x 0) l)).

Definition e8_type2_roots : list Vec8 :=
  let all := List.concat (List.map (fun a =>
    List.concat (List.map (fun b =>
      List.concat (List.map (fun c =>
        List.concat (List.map (fun d =>
          List.concat (List.map (fun e =>
            List.concat (List.map (fun f =>
              List.concat (List.map (fun g =>
                List.map (fun h => [a;b;c;d;e;f;g;h]) half_vals)
              ) half_vals))
            ) half_vals))
          ) half_vals))
        ) half_vals))
      ) half_vals)
    ) half_vals) in
    List.map (Vector.of_list 8) (List.filter even_neg_count all).

Theorem e8_type2_count : length e8_type2_roots = 128.
Proof. vm_compute; reflexivity. Qed.

Definition e8_roots : list Vec8 := e8_type1_roots ++ e8_type2_roots.

Theorem e8_roots_count : length e8_roots = 240.
Proof.
  unfold e8_roots.
  rewrite app_length.
  rewrite e8_type1_count, e8_type2_count.
  reflexivity.
Qed.

Theorem e8_roots_type_split : length e8_type1_roots = 112 /\ length e8_type2_roots = 128.
Proof. split; [apply e8_type1_count | apply e8_type2_count]. Qed.

Definition dot (v w : Vec8) : Q :=
  Vector.fold_left Qplus 0 (Vector.map2 Qmult v w).

Theorem e8_roots_norm_two : forall r,
  In r e8_roots -> dot r r == 2.
Proof.
  intros r Hr.
  unfold e8_roots in Hr.
  apply in_app_or in Hr.
  destruct Hr as [Hr | Hr];
    repeat (destruct Hr as [Hr | Hr];
            [subst r; vm_compute; reflexivity |]);
    destruct Hr.
Qed.

Definition e8_simple_roots : list Vec8 :=
  [ Vector.of_list 8 [(1#2); (-1#2); (-1#2); (-1#2); (-1#2); (-1#2); (-1#2); (-1#2)]
  ; Vector.of_list 8 [1; 1; 0; 0; 0; 0; 0; 0]
  ; Vector.of_list 8 [0; -1; 1; 0; 0; 0; 0; 0]
  ; Vector.of_list 8 [0; 0; -1; 1; 0; 0; 0; 0]
  ; Vector.of_list 8 [0; 0; 0; -1; 1; 0; 0; 0]
  ; Vector.of_list 8 [0; 0; 0; 0; -1; 1; 0; 0]
  ; Vector.of_list 8 [0; 0; 0; 0; 0; -1; 1; 0]
  ; Vector.of_list 8 [0; 0; 0; 0; 0; 0; -1; 1]
  ].

Theorem e8_simple_roots_count : length e8_simple_roots = 8.
Proof. vm_compute; reflexivity. Qed.

Theorem e8_simple_roots_in_e8 : forall r,
  In r e8_simple_roots -> In r e8_roots.
Proof.
  intros r Hr.
  repeat (destruct Hr as [Hr | Hr];
          [subst r; unfold e8_roots; apply in_or_app; right;
           repeat (apply in_eq orelse apply in_cons) |]).
  destruct Hr.
Qed.
