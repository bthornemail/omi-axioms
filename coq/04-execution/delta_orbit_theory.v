From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition delta_orbit_theory_owner : Prop := True.
Definition delta_orbit_theory_proof : delta_orbit_theory_owner := I.

Definition delta_orbit_theory_delta (x : N) : N := N.lxor x 0x1D.

Theorem delta_orbit_theory_zero_delta :
  delta_orbit_theory_delta 0 = 0x1D.
Proof.
  reflexivity.
Qed.
