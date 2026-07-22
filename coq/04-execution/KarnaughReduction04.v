From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition karnaugh_reduction04_owner : Prop := True.
Definition karnaugh_reduction04_proof : karnaugh_reduction04_owner := I.

Definition karnaugh_reduction04_row (x : N) : N := N.land x 0x3F.
Definition karnaugh_reduction04_lookup (table input : N) : bool :=
  N.testbit table (karnaugh_reduction04_row input).

Theorem karnaugh_reduction04_row_full_byte :
  karnaugh_reduction04_row 0xFF = 0x3F.
Proof. vm_compute; reflexivity. Qed.

Theorem karnaugh_reduction04_lookup_all_ones_last_row :
  karnaugh_reduction04_lookup 0xFFFFFFFFFFFFFFFF 0x3F = true.
Proof. vm_compute; reflexivity. Qed.
