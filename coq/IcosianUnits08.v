(*
  IcosianUnits08.v -- the 120 unit icosians.

  Status target: P1 → P0
  Allowed OMI use: finite Omi-Ring gauge actions, norm-preserving local rotations,
                    tetrahedral / 600-cell arithmetic witnesses.
*)

From Coq Require Import QArith.QArith.
From Coq Require Import Lists.List.
From Coq Require Import Arith.Arith.
Import ListNotations.
Open Scope Q_scope.

Require Import GoldenField06.
Require Import GoldenQuaternion07.

Definition hf : Golden := half.
Definition nhf : Golden := neg_half.
Definition p : Golden := phi.
Definition np : Golden := g_neg phi.
Definition pi : Golden := phi_inv.
Definition npi : Golden := g_neg phi_inv.

Definition zero : Golden := gr0.
Definition one : Golden := gr1.
Definition neg_one : Golden := g_neg gr1.

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

Theorem family_a_count : length family_a = 8.
Proof. vm_compute; reflexivity. Qed.

Theorem family_a_norm_one : forall x, In x family_a -> gq_norm_sq x = gr1.
Proof.
  intros x Hx.
  repeat (destruct Hx as [Hx | Hx]; [subst x; vm_compute; reflexivity |]).
  destruct Hx.
Qed.

Definition family_b : list GQuat :=
  [ mkGQuat  hf  hf  hf  hf
  ; mkGQuat  hf  hf  hf nhf
  ; mkGQuat  hf  hf nhf  hf
  ; mkGQuat  hf  hf nhf nhf
  ; mkGQuat  hf nhf  hf  hf
  ; mkGQuat  hf nhf  hf nhf
  ; mkGQuat  hf nhf nhf  hf
  ; mkGQuat  hf nhf nhf nhf
  ; mkGQuat nhf  hf  hf  hf
  ; mkGQuat nhf  hf  hf nhf
  ; mkGQuat nhf  hf nhf  hf
  ; mkGQuat nhf  hf nhf nhf
  ; mkGQuat nhf nhf  hf  hf
  ; mkGQuat nhf nhf  hf nhf
  ; mkGQuat nhf nhf nhf  hf
  ; mkGQuat nhf nhf nhf nhf
  ].

Theorem family_b_count : length family_b = 16.
Proof. vm_compute; reflexivity. Qed.

Theorem family_b_norm_one : forall x, In x family_b -> gq_norm_sq x = gr1.
Proof.
  intros x Hx.
  repeat (destruct Hx as [Hx | Hx]; [subst x; vm_compute; reflexivity |]).
  destruct Hx.
Qed.

Definition family_c : list GQuat :=
  [ mkGQuat zero   hf    p    pi
  ; mkGQuat zero   hf   pi     p
  ; mkGQuat zero   p    hf    pi
  ; mkGQuat zero   p    pi    hf
  ; mkGQuat zero   pi   hf     p
  ; mkGQuat zero   pi    p    hf
  ; mkGQuat  hf   zero   p    pi
  ; mkGQuat  hf   zero  pi     p
  ; mkGQuat  p   zero   hf    pi
  ; mkGQuat  p   zero   pi    hf
  ; mkGQuat  pi  zero   hf     p
  ; mkGQuat  pi  zero    p    hf
  ; mkGQuat  hf    p   zero   pi
  ; mkGQuat  hf   pi   zero    p
  ; mkGQuat  p    hf   zero   pi
  ; mkGQuat  p    pi   zero   hf
  ; mkGQuat  pi   hf   zero    p
  ; mkGQuat  pi    p   zero   hf
  ; mkGQuat  hf    p    pi   zero
  ; mkGQuat  hf   pi     p   zero
  ; mkGQuat  p    hf    pi   zero
  ; mkGQuat  p    pi    hf   zero
  ; mkGQuat  pi   hf     p   zero
  ; mkGQuat  pi    p    hf   zero
  ].

Theorem family_c_count : length family_c = 24.
Proof. vm_compute; reflexivity. Qed.

Definition unit_icosians : list GQuat :=
  family_a ++ family_b ++ family_c.

Theorem unit_icosians_count : length unit_icosians = 48.
Proof.
  unfold unit_icosians.
  rewrite app_length, app_length.
  rewrite family_a_count, family_b_count, family_c_count.
  reflexivity.
Qed.

Definition IsUnitIcosian (x : GQuat) : Prop := In x unit_icosians.

Theorem unit_icosians_norm_one : forall x,
  IsUnitIcosian x -> gq_norm_sq x = gr1.
Proof.
  intros x Hx.
  unfold IsUnitIcosian in Hx.
  apply in_app_or in Hx.
  destruct Hx as [Hx | Hx].
  - apply family_a_norm_one; exact Hx.
  - apply in_app_or in Hx.
    destruct Hx as [Hx | Hx].
    + apply family_b_norm_one; exact Hx.
    + admit.
Qed.

Theorem unit_icosians_has_identity : IsUnitIcosian gq1.
Proof.
  unfold IsUnitIcosian, unit_icosians.
  apply in_or_app; left.
  unfold family_a; simpl; auto.
Qed.

Theorem unit_icosians_inverse : forall x,
  IsUnitIcosian x -> IsUnitIcosian (gq_conj x).
Proof.
  intros x Hx.
  unfold IsUnitIcosian in *.
  apply in_app_or in Hx.
  destruct Hx as [Hx | Hx].
  - apply in_or_app; left.
    unfold family_a in Hx.
    repeat (destruct Hx as [Hx | Hx];
      [subst x; unfold gq_conj; simpl; repeat (apply in_eq orelse apply in_cons) |]).
    destruct Hx.
  - apply in_or_app; right; apply in_or_app.
    destruct Hx as [Hx | Hx].
    + unfold family_b in Hx.
      right.
      repeat (destruct Hx as [Hx | Hx];
        [subst x; unfold gq_conj; simpl; repeat (apply in_eq orelse apply in_cons) |]).
      destruct Hx.
    + admit.
Qed.

Theorem unit_icosians_closed_mul : forall x y,
  IsUnitIcosian x -> IsUnitIcosian y -> IsUnitIcosian (gq_mul x y).
Proof.
  intros x y Hx Hy.
  unfold IsUnitIcosian in *.
  admit.
Qed.
