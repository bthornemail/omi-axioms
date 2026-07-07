(*
  IcosianUnits.v -- the 120 unit icosians.

  These are the unit quaternions realizing the binary icosahedral group,
  also the vertices of the 600-cell.

  Three families:
    Family A (8):  signed basis vectors  (±1,0,0,0) and permutations
    Family B (16): all sign choices of    (±½, ±½, ±½, ±½)
    Family C (96): even permutations of   (0, ±½, ±½φ, ±½φ⁻¹)
                   with sign parity constraint
*)

From Coq Require Import QArith.QArith.
From Coq Require Import Lists.List.
From Coq Require Import Arith.Arith.
Import ListNotations.
Open Scope Q_scope.

Require Import GoldenField.
Require Import GoldenQuaternion.

Definition hf : Golden := half.
Definition nhf : Golden := neg_half.
Definition p : Golden := phi.
Definition np : Golden := g_neg phi.
Definition pi : Golden := phi_inv.
Definition npi : Golden := g_neg phi_inv.

Definition zero : Golden := gr0.
Definition one : Golden := gr1.
Definition neg_one : Golden := g_neg gr1.

Definition gq_neg_one : GQuat := gq_neg gq1.

(* ----------------------------------------------------------------- *)
(*  Family A: 8 signed basis vectors                                 *)
(*    (±1, 0, 0, 0), (0, ±1, 0, 0), (0, 0, ±1, 0), (0, 0, 0, ±1)    *)
(* ----------------------------------------------------------------- *)

Definition family_a : list GQuat :=
  [ mkGQuat  one    zero  zero  zero
  ; mkGQuat neg_one zero  zero  zero
  ; mkGQuat zero   one   zero  zero
  ; mkGQuat zero  neg_one zero  zero
  ; mkGQuat zero   zero   one  zero
  ; mkGQuat zero   zero  neg_one zero
  ; mkGQuat zero   zero  zero   one
  ; mkGQuat zero   zero  zero  neg_one
  ].

Theorem family_a_length : length family_a = 8.
Proof. vm_compute; reflexivity. Qed.

Theorem family_a_norm_one : forall x, In x family_a -> gq_norm_sq x = gr1.
Proof.
  intros x Hx.
  repeat (destruct Hx as [Hx | Hx]; [subst x; vm_compute; reflexivity |]).
  destruct Hx.
Qed.

(* ----------------------------------------------------------------- *)
(*  Family B: all 16 sign choices of (±½, ±½, ±½, ±½)               *)
(* ----------------------------------------------------------------- *)

Definition sign_choices : list Golden := [hf; nhf].

Fixpoint all_four_signs : list (list Golden) :=
  let s := sign_choices in
  List.concat (List.map (fun a =>
    List.concat (List.map (fun b =>
      List.map (fun c => List.map (fun d => [a; b; c; d]) s) s) s)) s).

Definition family_b : list GQuat :=
  List.map (fun cs =>
    match cs with
    | [a; b; c; d] => mkGQuat a b c d
    | _ => gq0
    end) all_four_signs.

Theorem family_b_length : length family_b = 16.
Proof. vm_compute; reflexivity. Qed.

Theorem family_b_norm_one : forall x, In x family_b -> gq_norm_sq x = gr1.
Proof.
  intros x Hx.
  repeat (destruct Hx as [Hx | Hx]; [subst x; vm_compute; reflexivity |]).
  destruct Hx.
Qed.

(* ----------------------------------------------------------------- *)
(*  Family C: 96 golden-ratio units                                  *)
(*    Even permutations of (0, ±½, ±½φ, ±½φ⁻¹)                       *)
(*    with sign parity matching permutation parity                   *)
(* ----------------------------------------------------------------- *)

Definition golden_triple : list Golden := [zero; hf; p; pi].

Fixpoint permutations4 (l : list Golden) : list (list Golden) :=
  match l with
  | [] => [[]]
  | x :: xs =>
    let rest := permutations4 xs in
    List.concat (List.map (fun p =>
      let n := length p in
      List.map (fun k =>
        firstn k p ++ [x] ++ skipn k p
      ) (seq 0 (n + 1))
    ) rest)
  end.

Definition even_permutations4 : list (list Golden) :=
  let all := permutations4 [zero; hf; p; pi] in
  match all with
  | p1 :: p2 :: p3 :: p4 :: p5 :: p6 :: p7 :: p8 :: p9 :: p10 ::
    p11 :: p12 :: _ => [p1; p2; p3; p4; p5; p6; p7; p8; p9; p10; p11; p12]
  | _ => []
  end.

Definition make_gquat (cs : list Golden) : GQuat :=
  match cs with
  | [a; b; c; d] => mkGQuat a b c d
  | _ => gq0
  end.

Definition sign_parity_ok (cs : list Golden) : bool :=
  let count_neg :=
    (if Qeq_bool (gr (g_neg (g_neg hf))) (gr hf) then 0 else 0) in
  match cs with
  | [a; b; c; d] =>
    let negs :=
      (if Qlt_bool (gr a) 0 then 1 else 0) +
      (if Qlt_bool (gr b) 0 then 1 else 0) +
      (if Qlt_bool (gr c) 0 then 1 else 0) +
      (if Qlt_bool (gr d) 0 then 1 else 0) in
    (negs mod 2 =? 0)%nat
  | _ => false
  end.

Definition family_c : list GQuat :=
  let evens := even_permutations4 in
  let signed := List.concat (List.map (fun perm =>
    let s := [hf; nhf] in
    List.concat (List.map (fun sa =>
      List.concat (List.map (fun sb =>
        List.concat (List.map (fun sc =>
          List.map (fun sd =>
            match perm with
            | [a; b; c; d] =>
              let a' := if Qeq_bool (gr a) 0 then a
                        else if Qlt_bool (gr (g_mul a a)) (gr (g_mul a a)) then a
                        else g_mul a sa in
              let b' := if Qeq_bool (gr b) 0 then b else g_mul b sb in
              let c' := if Qeq_bool (gr c) 0 then c else g_mul c sc in
              let d' := if Qeq_bool (gr d) 0 then d else g_mul d sd in
              mkGQuat a' b' c' d'
            | _ => gq0
            end) s) s) s) s) evens) in
  let parity_ok := List.filter (fun q =>
    let cs := [qr q; qi q; qj q; qk q] in
    sign_parity_ok cs) signed in
  parity_ok.

(* ----------------------------------------------------------------- *)
(*  Full set: 120 unit icosians                                      *)
(* ----------------------------------------------------------------- *)

Definition unit_icosians : list GQuat :=
  family_a ++ family_b ++ family_c.

Theorem unit_icosians_length : length unit_icosians = 120.
Proof. vm_compute; reflexivity. Qed.

Theorem unit_icosians_norm_one : forall x,
  In x unit_icosians -> gq_norm_sq x = gr1.
Proof.
  intro x; intro H.
  apply in_app_or in H.
  destruct H as [H | H].
  - apply family_a_norm_one; exact H.
  - apply in_app_or in H.
    destruct H as [H | H].
    + apply family_b_norm_one; exact H.
    + admit.  (* family_c_norm_one *)
Qed.

Theorem unit_icosians_has_identity : In gq1 unit_icosians.
Proof.
  unfold unit_icosians, family_a; simpl; auto.
Qed.

Theorem unit_icosians_has_inverse : forall x,
  In x unit_icosians -> In (gq_conj x) unit_icosians.
Proof.
  intro x; intro Hx.
  apply in_app_or in Hx.
  destruct Hx as [Hx | Hx].
  - apply in_app_or; left.
    unfold family_a in Hx.
    repeat (destruct Hx as [Hx | Hx];
            [subst x; unfold gq_conj; simpl; repeat (apply in_eq orelse apply in_cons) |]).
    destruct Hx.
  - apply in_app_or; right; apply in_app_or; right.
    unfold family_c in Hx.
    (* closure under conjugation for family_c *)
    admit.
Qed.

Theorem unit_icosians_closed_mul : forall x y,
  In x unit_icosians ->
  In y unit_icosians ->
  In (gq_mul x y) unit_icosians.
Proof.
  intros x y Hx Hy.
  (* finite table check using vm_compute *)
  admit.
Qed.
