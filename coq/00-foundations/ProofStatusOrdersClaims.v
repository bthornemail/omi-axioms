(*
  ProofStatus00.v -- proof status classification for the OMI proof suite.

  Every candidate concept receives one of five statuses:
    P0 — Proven Core       (fully formalized and proven in Coq)
    P1 — Computable        (finite, exhaustively checkable)
    P2 — Mathematical      (math is real, full formalization is larger)
    P3 — Implementation    (prior code exists, not proof authority)
    P4 — Metaphor          (helps intuition, cannot drive validation)
*)

From Coq Require Import Strings.String.

Inductive ProofStatus : Type :=
| P0 : ProofStatus
| P1 : ProofStatus
| P2 : ProofStatus
| P3 : ProofStatus
| P4 : ProofStatus.

Definition status_le (a b : ProofStatus) : Prop :=
  match a, b with
  | P0, _ => True
  | P1, P0 => False | P1, _ => True
  | P2, P2 => True | P2, P3 => True | P2, P4 => True | P2, _ => False
  | P3, P3 => True | P3, P4 => True | P3, _ => False
  | P4, P4 => True | P4, _ => False
  end.

Theorem status_le_refl : forall s, status_le s s.
Proof. intro s; destruct s; unfold status_le; auto. Qed.

Theorem status_le_trans : forall a b c,
  status_le a b -> status_le b c -> status_le a c.
Proof.
  intros a b c Hab Hbc.
  destruct a; destruct b; destruct c; unfold status_le in *; auto.
Qed.

Record ClaimID : Type := mkClaimID {
  claim_id   : string;
  claim_name : string;
  claim_src  : string;
  claim_status : ProofStatus
}.

Record Claim : Type := mkClaim {
  claim_identifier : ClaimID;
  claim_formal  : Prop;
  claim_allowed : string;
  claim_forbidden : string;
  claim_notes   : string
}.

Definition register_claim (id : ClaimID) (formal : Prop)
  (allowed forbidden notes : string) : Claim :=
  mkClaim id formal allowed forbidden notes.

Theorem P0_is_strongest : forall s, status_le P0 s.
Proof. intro s; destruct s; unfold status_le; auto. Qed.

Theorem P4_is_weakest : forall s, status_le s P4.
Proof. intro s; destruct s; unfold status_le; auto. Qed.
