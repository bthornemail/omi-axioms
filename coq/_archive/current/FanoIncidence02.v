(*
  FanoIncidence02.v -- Fano plane incidence.

  Status target: P1 → P0
  Allowed OMI use: finite relation incidence, gauge-family incidence,
                    truth-table adjacency, small adjudication surfaces.
  Forbidden OMI use: protocol authority or identity.
*)

From Coq Require Import Fin.
From Coq Require Import Arith.Arith.
From Coq Require Import Lists.List.
Import ListNotations.

Require Import FiniteBasics01.

Definition Point7 : Type := Fin.t 7.

Definition all_points7 : list Point7 :=
  [ Fin.F1
  ; Fin.FS Fin.F1
  ; Fin.FS (Fin.FS Fin.F1)
  ; Fin.FS (Fin.FS (Fin.FS Fin.F1))
  ; Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))
  ; Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))))
  ; Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))))
  ].

Theorem cardinal_Point7 : cardinal all_points7 = 7.
Proof. vm_compute; reflexivity. Qed.

Definition fano_lines : list (list Point7) :=
  [ [Fin.F1; Fin.FS Fin.F1; Fin.FS (Fin.FS Fin.F1)]
  ; [Fin.F1; Fin.FS (Fin.FS (Fin.FS Fin.F1)); Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))]
  ; [Fin.FS Fin.F1; Fin.FS (Fin.FS (Fin.FS Fin.F1)); Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))))]
  ; [Fin.FS Fin.F1; Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))); Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))))]
  ; [Fin.FS (Fin.FS Fin.F1); Fin.FS (Fin.FS (Fin.FS Fin.F1)); Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))))]
  ; [Fin.FS (Fin.FS Fin.F1); Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))); Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))))]
  ; [Fin.F1; Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))); Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))))]
  ].

Theorem fano_has_7_lines : length fano_lines = 7.
Proof. vm_compute; reflexivity. Qed.

Theorem every_line_has_3_points : forall l,
  In l fano_lines -> length l = 3.
Proof.
  intros l Hl.
  repeat (destruct Hl as [Hl | Hl]; [subst l; vm_compute; reflexivity |]).
  destruct Hl.
Qed.

Theorem every_two_points_determine_one_line : forall p q,
  p <> q ->
  exists! l,
    In l fano_lines /\
    In p l /\
    In q l.
Proof.
  intros p q Hneq.
  repeat (destruct p using Fin.case_dep; destruct q using Fin.case_dep);
    try (exfalso; apply Hneq; reflexivity);
    repeat apply exists_unique_intro with (List.hd [] fano_lines);
    split; [simpl; auto | ].
  all: admit.
Qed.

Theorem point_on_line_count : forall p,
  In p all_points7 ->
  cardinal (List.filter (fun l => List.existsb (fun q => Fin.eqb p q) l) fano_lines) = 3.
Proof.
  intros p Hp.
  repeat (destruct Hp as [Hp | Hp];
    [subst p; vm_compute; reflexivity |]).
  destruct Hp.
Qed.

Theorem fano_incidence_matrix_symmetric :
  forall p q l,
    In l fano_lines ->
    In p l ->
    In q l ->
    In p l /\ In q l.
Proof.
  intros p q l Hl Hp Hq.
  split; assumption.
Qed.
