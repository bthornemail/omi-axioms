(**
  Invisible machine bytes, earned readable bands, and the Omnicron envelope.
*)

From Coq Require Import NArith List Bool Lia.
Import ListNotations.

Open Scope N_scope.

Definition byte (x : N) : Prop := x < 256.

Definition source_zero_text : list N := [48; 120; 48; 48].
Definition machine_nul : N := 0.

Theorem visible_zero_text_is_not_machine_nul :
  source_zero_text <> [machine_nul].
Proof. discriminate. Qed.

Definition pre_language_end : N := 31.
Definition readable_boundary : N := 32.
Definition predicate_boundary : N := 64.
Definition meta_boundary : N := 96.
Definition declaration_boundary : N := 127.

Definition cumulative_surface_size (end_codepoint : N) : N :=
  end_codepoint + 1.

Theorem earned_surface_sizes :
  cumulative_surface_size readable_boundary = 33 /\
  cumulative_surface_size predicate_boundary = 65 /\
  cumulative_surface_size meta_boundary = 97 /\
  cumulative_surface_size declaration_boundary = 128.
Proof. vm_compute; repeat split. Qed.

Theorem pre_language_precedes_readability :
  pre_language_end + 1 = readable_boundary.
Proof. reflexivity. Qed.

Definition omnicron_envelope (gauge : N) : list N :=
  [gauge; 0; 28; 29; 30; 31; 32; gauge].

Definition canonical_omnicron_envelope : list N :=
  omnicron_envelope 255.

Definition gauge_in_f_band (gauge : N) : bool :=
  (240 <=? gauge) && (gauge <=? 255).

Definition valid_omnicron_envelope (bytes : list N) : bool :=
  match bytes with
  | [g0; nul; fs; gs; rs; us; sp; g1] =>
      gauge_in_f_band g0 &&
      (g0 =? g1) &&
      (nul =? 0) &&
      (fs =? 28) &&
      (gs =? 29) &&
      (rs =? 30) &&
      (us =? 31) &&
      (sp =? 32)
  | _ => false
  end.

Theorem canonical_omnicron_envelope_bytes :
  canonical_omnicron_envelope = [255; 0; 28; 29; 30; 31; 32; 255].
Proof. reflexivity. Qed.

Theorem canonical_omnicron_envelope_valid :
  valid_omnicron_envelope canonical_omnicron_envelope = true.
Proof. vm_compute; reflexivity. Qed.

Theorem parameterized_omnicron_envelope_valid :
  forall gauge,
    gauge_in_f_band gauge = true ->
    valid_omnicron_envelope (omnicron_envelope gauge) = true.
Proof.
  intros gauge Hg.
  cbn.
  rewrite Hg, N.eqb_refl.
  reflexivity.
Qed.

Theorem malformed_omnicron_envelope_rejected :
  valid_omnicron_envelope [255; 0; 28; 29; 30; 31; 31; 255] = false.
Proof. vm_compute; reflexivity. Qed.

Definition reflected_gauge (codepoint : N) : N := codepoint mod 16.

Theorem reflected_gauge_is_nibble :
  forall codepoint, reflected_gauge codepoint < 16.
Proof.
  intro codepoint.
  unfold reflected_gauge.
  apply N.mod_lt.
  discriminate.
Qed.

Theorem earned_boundaries_reflect_zero :
  reflected_gauge 32 = 0 /\
  reflected_gauge 64 = 0 /\
  reflected_gauge 96 = 0.
Proof. vm_compute; repeat split. Qed.
