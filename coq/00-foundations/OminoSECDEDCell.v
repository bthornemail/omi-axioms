(*
  OminoSECDEDCell.v -- canonical [8,4,4] streaming cell.

  Executable bit order:
    [LOGOS NOMOS FS PATHOS GS RS US OMINO]

  OMINO is bit 7: the complete-cell balance hinge.
*)

From Coq Require Import Bool.Bool.
From Coq Require Import NArith.NArith.
From Coq Require Import micromega.Lia.
Open Scope N_scope.

Definition bit_at (word index : N) : bool :=
  N.testbit word index.

Definition bitN (b : bool) : N :=
  if b then 1 else 0.

Definition LOGOS (word : N) : bool := bit_at word 0.
Definition NOMOS (word : N) : bool := bit_at word 1.
Definition FS (word : N) : bool := bit_at word 2.
Definition PATHOS (word : N) : bool := bit_at word 3.
Definition GS (word : N) : bool := bit_at word 4.
Definition RS (word : N) : bool := bit_at word 5.
Definition US (word : N) : bool := bit_at word 6.
Definition OMINO (word : N) : bool := bit_at word 7.

Definition computed_omino (word : N) : bool :=
  xorb (LOGOS word)
  (xorb (NOMOS word)
  (xorb (FS word)
  (xorb (PATHOS word)
  (xorb (GS word)
  (xorb (RS word) (US word)))))).

Definition overall_mismatch (word : N) : bool :=
  xorb (OMINO word) (computed_omino word).

Definition sLOGOS (word : N) : bool :=
  xorb (LOGOS word) (xorb (FS word) (xorb (GS word) (US word))).

Definition sNOMOS (word : N) : bool :=
  xorb (NOMOS word) (xorb (FS word) (xorb (RS word) (US word))).

Definition sPATHOS (word : N) : bool :=
  xorb (PATHOS word) (xorb (GS word) (xorb (RS word) (US word))).

Definition syndrome (word : N) : N :=
  bitN (sLOGOS word) +
  N.shiftl (bitN (sNOMOS word)) 1 +
  N.shiftl (bitN (sPATHOS word)) 2.

Definition syndrome_nonzero (word : N) : bool :=
  negb (N.eqb (syndrome word) 0).

Definition syndrome_zero (word : N) : bool :=
  N.eqb (syndrome word) 0.

Definition interior_mask (word : N) : bool :=
  andb (overall_mismatch word) (syndrome_nonzero word).

Definition omino_mask (word : N) : bool :=
  andb (overall_mismatch word) (syndrome_zero word).

Definition correctable_bit_index (word : N) : N :=
  let s := syndrome word in
  if N.eqb s 0 then 7 else N.pred s.

Definition correction_bitmask (word : N) : N :=
  if overall_mismatch word
  then N.shiftl 1 (correctable_bit_index word)
  else 0.

Definition corrected_word (word : N) : N :=
  N.lxor word (correction_bitmask word).

Definition double_error (word : N) : bool :=
  andb (syndrome_nonzero word) (negb (overall_mismatch word)).

Definition result_code (word : N) : N :=
  match syndrome_zero word, overall_mismatch word with
  | true, false => 0
  | false, true => 1
  | true, true => 2
  | false, false => 3
  end.

Theorem bitN_bound : forall b, bitN b <= 1.
Proof. intro b; destruct b; unfold bitN; lia. Qed.

Theorem syndrome_bound : forall word, syndrome word <= 7.
Proof.
  intro word.
  unfold syndrome.
  destruct (sLOGOS word);
  destruct (sNOMOS word);
  destruct (sPATHOS word);
  unfold bitN; cbn; lia.
Qed.

Theorem result_code_bound : forall word, result_code word <= 3.
Proof.
  intro word.
  unfold result_code.
  destruct (syndrome_zero word), (overall_mismatch word);
    lia.
Qed.

Theorem pristine_result_code :
  forall word,
    syndrome word = 0 ->
    overall_mismatch word = false ->
    result_code word = 0.
Proof.
  intros word Hs Ho.
  unfold result_code, syndrome_zero.
  rewrite Hs, Ho.
  reflexivity.
Qed.

Theorem interior_single_result_code :
  forall word,
    syndrome word <> 0 ->
    overall_mismatch word = true ->
    result_code word = 1.
Proof.
  intros word Hs Ho.
  unfold result_code, syndrome_zero.
  rewrite Ho.
  destruct (N.eqb_spec (syndrome word) 0); [contradiction|reflexivity].
Qed.

Theorem omino_single_result_code :
  forall word,
    syndrome word = 0 ->
    overall_mismatch word = true ->
    result_code word = 2.
Proof.
  intros word Hs Ho.
  unfold result_code, syndrome_zero.
  rewrite Hs, Ho.
  reflexivity.
Qed.

Theorem double_error_result_code :
  forall word,
    syndrome word <> 0 ->
    overall_mismatch word = false ->
    result_code word = 3.
Proof.
  intros word Hs Ho.
  unfold result_code, syndrome_zero.
  rewrite Ho.
  destruct (N.eqb_spec (syndrome word) 0); [contradiction|reflexivity].
Qed.
