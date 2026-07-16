(*
  MiquelIncidenceBalancesFlags.v -- finite Tetragrammatron governor witnesses.

  This file proves bounded combinatorial laws only.  It does not identify the
  OMI 5+6 oversight frame with the standard abstract regular 11-cell, create
  runtime keywords, validate arbitrary frames, or accept receipts.
*)

From Coq Require Import NArith.NArith.
From Coq Require Import ZArith.ZArith.
From Coq Require Import Lists.List.
Import ListNotations.
Open Scope N_scope.

Definition clock_count : N := 3.
Definition offset_count : N := 4.
Definition governor_count : N := 5.

Theorem polyharmonic_axis_counts :
  clock_count = 3 /\ offset_count = 4 /\ governor_count = 5.
Proof. vm_compute. auto. Qed.

Definition visible_offsets : list N := [1; 16; 256; 4096].

Theorem visible_offset_count : length visible_offsets = 4%nat.
Proof. vm_compute. reflexivity. Qed.

Theorem visible_offsets_step_by_nibble :
  N.shiftl 1 4 = 16 /\
  N.shiftl 16 4 = 256 /\
  N.shiftl 256 4 = 4096.
Proof. vm_compute. auto. Qed.

Inductive Governor : Type :=
| Facts
| Rules
| Closures
| Combinators
| Cons.

Definition governor_exponent (g : Governor) : Z :=
  match g with
  | Facts => (-1)%Z
  | Rules => 0%Z
  | Closures => 1%Z
  | Combinators => 2%Z
  | Cons => 3%Z
  end.

Definition governors : list Governor :=
  [Facts; Rules; Closures; Combinators; Cons].

Definition governor_exponents : list Z :=
  map governor_exponent governors.

Theorem governor_axis_has_five_positions :
  length governors = 5%nat.
Proof. vm_compute. reflexivity. Qed.

Theorem governor_exponents_are_consecutive :
  governor_exponents = [(-1)%Z; 0%Z; 1%Z; 2%Z; 3%Z].
Proof. reflexivity. Qed.

Theorem rules_is_genesis_pivot :
  governor_exponent Rules = 0%Z.
Proof. reflexivity. Qed.

Theorem facts_and_cons_are_declared_endpoints :
  governor_exponent Facts = (-1)%Z /\ governor_exponent Cons = 3%Z.
Proof. auto. Qed.

Definition miquel_points : list N := [0; 1; 2; 3; 4; 5; 6; 7].

(*
  Abstract labels 0..3 are the sealed gauge states.  Labels 4..7 are the open
  counterparts that the hexadecimal card surface names C..F.
*)
Definition miquel_blocks : list (list N) :=
  [ [0; 1; 4; 5]
  ; [0; 2; 4; 6]
  ; [0; 3; 4; 7]
  ; [1; 2; 5; 6]
  ; [1; 3; 5; 7]
  ; [2; 3; 6; 7]
  ].

Definition n_mem (x : N) (xs : list N) : bool :=
  existsb (N.eqb x) xs.

Definition point_degree (p : N) : nat :=
  length (filter (n_mem p) miquel_blocks).

Definition flag_count : nat :=
  fold_left (fun total block => (total + length block)%nat)
            miquel_blocks 0%nat.

Theorem miquel_point_count :
  length miquel_points = 8%nat.
Proof. vm_compute. reflexivity. Qed.

Theorem miquel_block_count :
  length miquel_blocks = 6%nat.
Proof. vm_compute. reflexivity. Qed.

Theorem miquel_each_block_has_four_points :
  forall block, In block miquel_blocks -> length block = 4%nat.
Proof.
  intros block H.
  repeat (destruct H as [H | H]; [subst; vm_compute; reflexivity |]).
  contradiction.
Qed.

Theorem miquel_each_point_has_degree_three :
  forall p, In p miquel_points -> point_degree p = 3%nat.
Proof.
  intros p H.
  repeat (destruct H as [H | H]; [subst; vm_compute; reflexivity |]).
  contradiction.
Qed.

Theorem miquel_flag_count :
  flag_count = 24%nat.
Proof. vm_compute. reflexivity. Qed.

Theorem miquel_incidence_balance :
  (8 * 3 = 6 * 4)%N.
Proof. vm_compute. reflexivity. Qed.

Definition hidden_governor_positions : N := 5.
Definition pairwise_gauge_planes : N := 6.
Definition omi_oversight_positions : N :=
  hidden_governor_positions + pairwise_gauge_planes.

Theorem four_gauges_have_six_pairs :
  (4 * 3 / 2 = pairwise_gauge_planes)%N.
Proof. vm_compute. reflexivity. Qed.

Theorem omi_oversight_is_five_plus_six :
  omi_oversight_positions = 11.
Proof. vm_compute. reflexivity. Qed.

Inductive AuthorityRole : Type :=
| StageContext
| ValidateCarry
| ScribeProjection
| AcceptReplayStable.

Definition tetragrammatron_role : AuthorityRole := ValidateCarry.
Definition receipt_role : AuthorityRole := AcceptReplayStable.

Theorem validation_is_not_acceptance :
  tetragrammatron_role <> receipt_role.
Proof. discriminate. Qed.
