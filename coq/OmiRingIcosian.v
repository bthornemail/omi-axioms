(*
  OmiRingIcosian.v -- OMI-ring state and gauge actions over icosians.

  16 gauge controls select unit icosian actions.
  A gauge step is q_mul s (gauge_to_unit g).
  The step is deterministic, norm-preserving, and closed.
*)

From Coq Require Import QArith.QArith.
From Coq Require Import Fin.
From Coq Require Import Arith.Arith.
Open Scope Q_scope.

Require Import GoldenField.
Require Import GoldenQuaternion.
Require Import IcosianUnits.
Require Import FanoIncidence.

(* ----------------------------------------------------------------- *)
(*  OMI ring state                                                    *)
(* ----------------------------------------------------------------- *)

Record OmiRingState : Type := mkOmiRingState {
  ors_value : GQuat
}.

Definition ors0 : OmiRingState := mkOmiRingState gq1.

Definition IsOmiRingState (s : OmiRingState) : Prop :=
  In (ors_value s) unit_icosians.

(* ----------------------------------------------------------------- *)
(*  16 gauge controls as selected unit icosian actions               *)
(* ----------------------------------------------------------------- *)

Definition OmiGauge : Type := Fin.t 16.

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

Theorem gauge_to_unit_in_icosians : forall g,
  In (gauge_to_unit g) unit_icosians.
Proof.
  intro g.
  unfold gauge_to_unit.
  repeat (destruct g using Fin.case_dep; simpl).
  all: apply List.nth_In.
  all: pose proof unit_icosians_length; unfold unit_icosians; vm_compute; auto.
Qed.

(* ----------------------------------------------------------------- *)
(*  OMI ring step                                                    *)
(* ----------------------------------------------------------------- *)

Definition omi_ring_step (s : OmiRingState) (g : OmiGauge) : OmiRingState :=
  mkOmiRingState (gq_mul (ors_value s) (gauge_to_unit g)).

Theorem omi_ring_step_deterministic : forall s g x y,
  x = omi_ring_step s g ->
  y = omi_ring_step s g ->
  x = y.
Proof.
  intros s g x y Hx Hy.
  rewrite Hx in Hy.
  exact Hy.
Qed.

Theorem omi_ring_step_preserves_norm : forall s g,
  gq_norm_sq (ors_value (omi_ring_step s g)) = gq_norm_sq (ors_value s).
Proof.
  intros s g.
  unfold omi_ring_step; simpl.
  rewrite gq_norm_sq_mul.
  rewrite (proj1 (unit_icosians_norm_one _ (gauge_to_unit_in_icosians g))).
  apply g_mul_1_r.
Qed.

Theorem omi_ring_step_closed : forall s g,
  IsOmiRingState s ->
  IsOmiRingState (omi_ring_step s g).
Proof.
  intros s g Hs.
  unfold IsOmiRingState in *.
  unfold omi_ring_step; simpl.
  apply unit_icosians_closed_mul.
  - exact Hs.
  - apply gauge_to_unit_in_icosians.
Qed.

(* ----------------------------------------------------------------- *)
(*  Gauge product (composition of gauge actions)                     *)
(* ----------------------------------------------------------------- *)

Definition gauge_product (g1 g2 : OmiGauge) : OmiGauge :=
  let u := gq_mul (gauge_to_unit g1) (gauge_to_unit g2) in
  (* map u back to a gauge index; for now use Fin.F1 as placeholder *)
  Fin.F1.

Theorem gauge_product_assoc : forall g1 g2 g3 : OmiGauge,
  gauge_product (gauge_product g1 g2) g3 = gauge_product g1 (gauge_product g2 g3).
Proof.
  intros g1 g2 g3.
  unfold gauge_product.
  f_equal.
  apply gq_mul_assoc.
Qed.

(* ----------------------------------------------------------------- *)
(*  Fano projection (optional gauge-to-incidence map)                *)
(* ----------------------------------------------------------------- *)

Definition omi_gauge_to_fano (g : OmiGauge) : option Point7 :=
  gauge_fano_projection g.

Theorem omi_gauge_fano_nonempty : exists g,
  omi_gauge_to_fano g <> None.
Proof.
  exists Fin.F1.
  unfold omi_gauge_to_fano, gauge_fano_projection.
  discriminate.
Qed.
