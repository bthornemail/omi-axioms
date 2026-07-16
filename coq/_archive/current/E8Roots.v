(*
  E8Roots.v -- the E8 root system.

  The E8 root system has 240 roots, split into 112 type-1 roots
  (±1, ±1, 0, 0, 0, 0, 0, 0) and 128 type-2 roots
  (±½, ±½, ±½, ±½, ±½, ±½, ±½, ±½) with even number of minus signs.
*)

From Coq Require Import QArith.QArith.
From Coq Require Import Lists.List.
From Coq Require Import Arith.Arith.
From Coq Require Import Vectors.VectorDef.
From Coq Require Import Vectors.VectorSpec.
Import VectorNotations.
Import ListNotations.
Open Scope Q_scope.

Require Import VecQ.

Definition Vec8 : Type := Vec 8.
Definition vzero8 : Vec8 := Vector.const 0 8.

(* ----------------------------------------------------------------- *)
(*  Type-1 roots: (±1, ±1, 0, 0, 0, 0, 0, 0)                       *)
(* ----------------------------------------------------------------- *)

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

Definition type1_roots : list Vec8 :=
  List.concat (List.map (fun pos : nat * nat =>
    let (i, j) := pos in
    List.map (make_type1_root i j) sign_pairs
  ) type1_positions).

Theorem type1_roots_count : length type1_roots = 112.
Proof. vm_compute; reflexivity. Qed.

(* ----------------------------------------------------------------- *)
(*  Type-2 roots: (±½, ±½, ±½, ±½, ±½, ±½, ±½, ±½) with             *)
(*  even number of minus signs                                       *)
(* ----------------------------------------------------------------- *)

Definition half_vals : list Q := [1#2; -1#2].

Definition even_neg_count (l : list Q) : bool :=
  let negs := length (List.filter (fun x => Qlt_bool x 0) l) in
  Nat.even negs.

Definition type2_roots : list Vec8 :=
  let all_signs :=
    List.concat (List.map (fun a =>
      List.concat (List.map (fun b =>
        List.concat (List.map (fun c =>
          List.concat (List.map (fun d =>
            List.concat (List.map (fun e =>
              List.concat (List.map (fun f =>
                List.concat (List.map (fun g =>
                  List.map (fun h => [a; b; c; d; e; f; g; h]) half_vals)
                ) half_vals))
              ) half_vals))
            ) half_vals))
          ) half_vals))
        ) half_vals)
      ) half_vals) in
  List.map (Vector.of_list 8) (List.filter even_neg_count all_signs).

Theorem type2_roots_count : length type2_roots = 128.
Proof. vm_compute; reflexivity. Qed.

(* ----------------------------------------------------------------- *)
(*  Full E8 root system                                              *)
(* ----------------------------------------------------------------- *)

Definition e8_roots : list Vec8 := type1_roots ++ type2_roots.

Theorem e8_roots_count : length e8_roots = 240.
Proof.
  unfold e8_roots.
  rewrite app_length.
  rewrite type1_roots_count.
  rewrite type2_roots_count.
  reflexivity.
Qed.

Theorem e8_roots_norm_two : forall r, In r e8_roots -> norm_sq r == 2.
Proof.
  intros r Hr.
  unfold e8_roots in Hr.
  apply in_app_or in Hr.
  destruct Hr as [Hr | Hr];
    repeat (destruct Hr as [Hr | Hr];
            [subst r; vm_compute; reflexivity |]);
    destruct Hr.
Qed.

(* ----------------------------------------------------------------- *)
(*  Simple roots                                                     *)
(* ----------------------------------------------------------------- *)

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

Theorem e8_simple_roots_in_e8 : forall r, In r e8_simple_roots -> In r e8_roots.
Proof.
  intros r Hr.
  repeat (destruct Hr as [Hr | Hr]; [subst r; unfold e8_roots; apply in_or_app; right;
    repeat (apply in_eq orelse apply in_cons) |]).
  destruct Hr.
Qed.
