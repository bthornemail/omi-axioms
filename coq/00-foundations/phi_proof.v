From Coq Require Import QArith.QArith.
Open Scope Q_scope.

Definition phi_proof_owner : Prop := True.
Definition phi_proof_proof : phi_proof_owner := I.

Definition phi_num : Q := 1.
Definition phi_den : Q := 2.
Definition phi_pair : Q * Q := (phi_num, phi_den).

Theorem phi_proof_pair_components :
  fst phi_pair == 1 /\ snd phi_pair == 2.
Proof.
  split; reflexivity.
Qed.
