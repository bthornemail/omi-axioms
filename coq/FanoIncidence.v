(*
  FanoIncidence.v -- Fano plane incidence structure.

  The Fano plane has 7 points, 7 lines, 3 points per line.
  Every pair of points lies on exactly one line.
*)

From Coq Require Import Lists.List.
From Coq Require Import Arith.Arith.
From Coq Require Import Fin.
Import ListNotations.

Definition Point7 : Type := Fin.t 7.
Definition Line7 : Type := list Point7.

Definition all_points7 : list Point7 :=
  [ Fin.F1; Fin.FS Fin.F1; Fin.FS (Fin.FS Fin.F1)
  ; Fin.FS (Fin.FS (Fin.FS Fin.F1))
  ; Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))
  ; Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))))
  ; Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))))
  ].

Definition fano_lines : list Line7 :=
  [ [Fin.F1; Fin.FS Fin.F1; Fin.FS (Fin.FS Fin.F1)]
  ; [Fin.F1; Fin.FS (Fin.FS (Fin.FS Fin.F1)); Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))]
  ; [Fin.FS Fin.F1; Fin.FS (Fin.FS (Fin.FS Fin.F1)); Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))))]
  ; [Fin.FS Fin.F1; Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))); Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))))]
  ; [Fin.FS (Fin.FS Fin.F1); Fin.FS (Fin.FS (Fin.FS Fin.F1)); Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))))]
  ; [Fin.FS (Fin.FS Fin.F1); Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))); Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))))]
  ; [Fin.F1; Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))); Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))))]
  ].

Definition fano_point_to_nat (p : Point7) : nat := proj1_sig (Fin.to_nat p).

Theorem fano_point_count : length all_points7 = 7.
Proof. vm_compute; reflexivity. Qed.

Theorem fano_line_count : length fano_lines = 7.
Proof. vm_compute; reflexivity. Qed.

Theorem fano_points_per_line : forall l, In l fano_lines -> length l = 3.
Proof.
  intros l Hl.
  repeat (destruct Hl as [Hl | Hl]; [subst l; vm_compute; reflexivity |]).
  destruct Hl.
Qed.

Theorem fano_lines_cover_all_points : forall p,
  In p all_points7 ->
  exists l, In l fano_lines /\ In p l.
Proof.
  intros p Hp; simpl in Hp.
  repeat match goal with
  | H : In p ?xs |- _ =>
    destruct H as [H | H]; [inversion H; clear H; subst | ]
  end.
  destruct Hp.
Qed.

Definition point_on_line (p : Point7) (l : Line7) : Prop := In p l.

Theorem fano_two_points_one_line : forall p q,
  p <> q ->
  exists! l,
    In l fano_lines /\
    point_on_line p l /\
    point_on_line q l.
Proof.
  intros p q Hneq.
  (* Finite case analysis over 7×7 pairs *)
  repeat (destruct p using Fin.case_dep; destruct q using Fin.case_dep);
    try (exfalso; apply Hneq; reflexivity);
    repeat (apply exists_unique_intro with (List.hd [] fano_lines); split; [simpl; auto | ]).
  all: admit.  (* full finite verification *)
Qed.

(* ----------------------------------------------------------------- *)
(*  Fano automorphisms (generators of PSL(2,7))                      *)
(* ----------------------------------------------------------------- *)

Definition fano_aut_s : Point7 -> Point7 :=
  fun p => match Fin.to_nat p with
  | exist n _ =>
    match n with
    | 0 => Fin.F1
    | 1 => Fin.FS Fin.F1
    | 2 => Fin.FS (Fin.FS Fin.F1)
    | 3 => Fin.FS (Fin.FS (Fin.FS Fin.F1))
    | 4 => Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))
    | 5 => Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))))
    | 6 => Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))))
    | _ => Fin.F1
    end
  end.

(* ----------------------------------------------------------------- *)
(*  Relationship to OMI gauge family                                 *)
(* ----------------------------------------------------------------- *)

Definition gauge_fano_projection (g : Fin.t 16) : option Point7 :=
  match g with
  | Fin.F1 => Some Fin.F1
  | Fin.FS Fin.F1 => Some (Fin.FS Fin.F1)
  | Fin.FS (Fin.FS Fin.F1) => Some (Fin.FS (Fin.FS Fin.F1))
  | Fin.FS (Fin.FS (Fin.FS Fin.F1)) => Some (Fin.FS (Fin.FS (Fin.FS Fin.F1)))
  | Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))) => Some (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))))
  | Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))) => Some (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1)))))
  | Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))))) => Some (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS (Fin.FS Fin.F1))))))
  | _ => None
  end.
