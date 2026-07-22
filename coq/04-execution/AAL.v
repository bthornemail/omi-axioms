From Coq Require Import NArith.NArith.
Open Scope N_scope.

Definition aal_owner : Prop := True.
Definition aal_proof : aal_owner := I.

Inductive aal_op := AalXor | AalAnd | AalOr | AalShl | AalShr | AalRol | AalRor.

Definition aal_width11 : N := 11.

Theorem aal_width11_positive :
  0 < aal_width11.
Proof.
  reflexivity.
Qed.
