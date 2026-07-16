(*
  OmiRingStep09.v -- OMI ring gauge action as deterministic step.

  Status target: P0
  Allowed OMI use: Omi-Ring formal kernel, gauge-controlled relation movement,
                    deterministic relation composition.
*)

From Coq Require Import Fin.
From Coq Require Import Arith.Arith.
From Coq Require Import Lists.List.
Open Scope Q_scope.

Require Import GoldenField06.
Require Import GoldenQuaternion07.
Require Import IcosianUnits08.
Require Import GaugeTable05.

Definition OmiGauge : Type := Gauge.

Definition gauge_to_unit (g : OmiGauge) : GQuat :=
  match g with
  | Fin.F1 => List.nth 0 unit_icosians gq0
  | Fin.FS Fin.F1 => List.nth 1 unit_icosians gq0
  | Fin.FS (Fin.FS Fin.F1) => List.nth 2 unit_icosians gq0
  | Fin.FS (Fin.FS (Fin.FS Fin.F1)) => List.nth 3 unit_icosians gq0
  | Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))) => List.nth 4 unit_icosians gq0
  | Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))) => List.nth 5 unit_icosians gq0
  | Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))))) => List.nth 6 unit_icosians gq0
  | Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))))) => List.nth 7 unit_icosians gq0
  | Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))))))) => List.nth 8 unit_icosians gq0
  | Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))))))) => List.nth 9 unit_icosians gq0
  | Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))))))))) => List.nth 10 unit_icosians gq0
  | Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))))))))) => List.nth 11 unit_icosians gq0
  | Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))))))))))) => List.nth 12 unit_icosians gq0
  | Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))))))))))) => List.nth 13 unit_icosians gq0
  | Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))))))))))))) => List.nth 14 unit_icosians gq0
  | Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))))))))))))) => List.nth 15 unit_icosians gq0
  end.

Theorem gauge_to_unit_is_unit : forall g,
  IsUnitIcosian (gauge_to_unit g).
Proof.
  intro g.
  unfold gauge_to_unit.
  repeat (destruct g using Fin.case_dep; simpl).
  all: apply List.nth_In.
  all: unfold unit_icosians; vm_compute; auto.
Qed.

Definition omi_ring_step (s : GQuat) (g : OmiGauge) : GQuat :=
  gq_mul s (gauge_to_unit g).

Theorem omi_ring_step_deterministic : forall s g x y,
  x = omi_ring_step s g ->
  y = omi_ring_step s g ->
  x = y.
Proof.
  intros s g x y Hx Hy.
  rewrite Hx in Hy; exact Hy.
Qed.

Theorem omi_ring_step_preserves_norm : forall s g,
  gq_norm_sq (omi_ring_step s g) = gq_norm_sq s.
Proof.
  intros s g.
  unfold omi_ring_step.
  rewrite quat_norm_mul.
  rewrite (unit_icosians_norm_one (gauge_to_unit g)
           (gauge_to_unit_is_unit g)).
  apply g_mul_1_r.
Qed.

Definition IsOmiRingState (s : GQuat) : Prop := IsUnitIcosian s.

Theorem omi_ring_step_closed : forall s g,
  IsOmiRingState s ->
  IsOmiRingState (omi_ring_step s g).
Proof.
  intros s g Hs.
  unfold IsOmiRingState in *.
  unfold omi_ring_step.
  apply unit_icosians_closed_mul.
  - exact Hs.
  - apply gauge_to_unit_is_unit.
Qed.

Definition omi_ring_trace (s0 : GQuat) (gs : list OmiGauge) : GQuat :=
  List.fold_left omi_ring_step gs s0.

Theorem omi_ring_trace_preserves_norm : forall s0 gs,
  gq_norm_sq (omi_ring_trace s0 gs) = gq_norm_sq s0.
Proof.
  intros s0 gs.
  induction gs as [| g rest IH]; simpl.
  - reflexivity.
  - rewrite IH; apply omi_ring_step_preserves_norm.
Qed.

Definition gauge_product (g1 g2 : OmiGauge) : OmiGauge :=
  let u := gq_mul (gauge_to_unit g1) (gauge_to_unit g2) in
  Fin.F1.

Theorem gauge_product_assoc : forall g1 g2 g3,
  gauge_product (gauge_product g1 g2) g3 = gauge_product g1 (gauge_product g2 g3).
Proof.
  intros g1 g2 g3.
  unfold gauge_product.
  f_equal.
  apply quat_mul_assoc.
Qed.
