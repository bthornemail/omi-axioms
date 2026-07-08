(*
  GaugeTable05.v -- 16-control gauge family and earned OMI-Lisp bands.

  Current OMI correction:
    0x0..0xF gauge family
    reflected across earned bands:
      0x00..0x20
      0x00..0x40
      0x00..0x60
      0x00..0x7F

  Status target: P1 → P0
  Allowed OMI use: notation multiplexing, earned codepoint surfaces,
                    OMI-Lisp declaration bands, gauge-controlled relation movement.
*)

From Coq Require Import Fin.
From Coq Require Import Arith.Arith.
From Coq Require Import Lists.List.
From Coq Require Import NArith.NArith.
From Coq Require Import Lia.
From Coq Require Import Program.Equality.
Import ListNotations.
Open Scope N_scope.

Definition Gauge : Type := Fin.t 16.

Inductive EarnedBand : Type :=
| Band20 : EarnedBand
| Band40 : EarnedBand
| Band60 : EarnedBand
| Band7F : EarnedBand.

Definition band_to_bound (b : EarnedBand) : N :=
  match b with
  | Band20 => 0x20
  | Band40 => 0x40
  | Band60 => 0x60
  | Band7F => 0x7F
  end.

Theorem earned_band_ordered_l : forall b, band_to_bound Band20 <= band_to_bound b.
Proof.
  intro b; destruct b; unfold band_to_bound; simpl; lia.
Qed.

Theorem earned_band_ordered_r : forall b, band_to_bound b <= band_to_bound Band7F.
Proof.
  intro b; destruct b; unfold band_to_bound; simpl; lia.
Qed.

Definition gauge_decidable (g h : Gauge) : {g = h} + {g <> h} :=
  Fin.eq_dec g h.

Definition gauge_to_N (g : Gauge) : N :=
  match Fin.to_nat g with
  | exist _ n _ => N.of_nat n
  end.

Theorem gauge_N_bound : forall g, gauge_to_N g < 16.
Proof.
  intro g.
  unfold gauge_to_N.
  destruct (Fin.to_nat g) as [n Hn].
  simpl.
  lia.
Qed.

Definition gauge_codepoint (band : EarnedBand) (g : Gauge) : N :=
  (band_to_bound band) + gauge_to_N g.

Theorem gauge_codepoint_in_band : forall band g,
  band_to_bound band <= gauge_codepoint band g /\
  gauge_codepoint band g < band_to_bound band + 16.
Proof.
  intros band g.
  unfold gauge_codepoint.
  split.
  - apply N.le_add_r.
  - apply N.add_lt_mono_l.
    apply gauge_N_bound.
Qed.

Definition project_gauge (band : EarnedBand) (g : Gauge) : N :=
  gauge_codepoint band g.

Theorem gauge_projection_deterministic : forall band g,
  exists! codepoint : N,
    project_gauge band g = codepoint.
Proof.
  intros band g.
  exists (project_gauge band g).
  split.
  - reflexivity.
  - intros codepoint Hcodepoint.
    exact Hcodepoint.
Qed.

Definition band_max (b : EarnedBand) : N :=
  band_to_bound b + 15.

Theorem band_nonoverlap : forall b1 b2,
  b1 <> b2 ->
  band_max b1 < band_to_bound b2 \/ band_max b2 < band_to_bound b1.
Proof.
  intros b1 b2 Hneq.
  destruct b1; destruct b2; try (exfalso; apply Hneq; reflexivity);
    unfold band_max, band_to_bound; simpl; lia.
Qed.

Definition all_gauges : list Gauge :=
  [ Fin.F1
  ; Fin.FS Fin.F1
  ; Fin.FS (Fin.FS Fin.F1)
  ; Fin.FS (Fin.FS (Fin.FS Fin.F1))
  ; Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))
  ; Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))))
  ; Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))))
  ; Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))))))
  ; Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))))))
  ; Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))))))))
  ; Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))))))))
  ; Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))))))))))
  ; Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))))))))))
  ; Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))))))))))))
  ; Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))))))))))))
  ; Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))))))))))))))
  ].

Theorem all_gauges_complete : forall g : Gauge, In g all_gauges.
Proof.
  intro g.
  repeat (dependent destruction g; simpl; auto).
Qed.
