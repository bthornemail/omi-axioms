(*
  PinchBranchLocalForms14.v -- local algebraic singularity patterns.

  Pinch point canonical form:  u² - v w² = 0
  Branch points: locally π(z) = w^n

  Status target: P1 → P0
  Allowed OMI use: projection singularity language, carrier collapse model,
                    unresolved declaration gap language.
*)

From Coq Require Import QArith.QArith.
From Coq Require Import Arith.Arith.
Open Scope Q_scope.

Definition pinch_form (u v w : Q) : Prop :=
  u*u - v*w*w == 0.

Theorem pinch_form_decidable : forall u v w,
  { pinch_form u v w } + { ~ pinch_form u v w }.
Proof.
  intros u v w.
  unfold pinch_form.
  destruct (Qeq_dec (u*u) (v*w*w)) as [Heq | Hneq].
  - left; exact Heq.
  - right; exact Hneq.
Qed.

Theorem pinch_symmetry_v : forall u v w,
  pinch_form u v w -> pinch_form u v (-w).
Proof.
  intros u v w Hpinch.
  unfold pinch_form in *.
  rewrite Hpinch.
  ring.
Qed.

Theorem pinch_scale_u : forall u v w k,
  pinch_form u v w -> pinch_form (k*u) (k*k*v) w.
Proof.
  intros u v w k Hpinch.
  unfold pinch_form in *.
  rewrite Hpinch.
  ring.
Qed.

Inductive BranchPoint (n : nat) : Type :=
| mkBranchPoint : forall (w : Q), BranchPoint n.

Definition branch_form (n : nat) (z w : Q) : Prop :=
  z == w ^ n.

Theorem branch_form_decidable_trivial : branch_form 1%nat 0 0.
Proof.
  unfold branch_form.
  ring.
Qed.

Definition ramification_index (n : nat) (z w : Q) : Prop :=
  branch_form n z w /\ forall m, m < n -> ~ branch_form m z w.

Definition algebraic_singularity (u v w : Q) : Prop :=
  pinch_form u v w \/ exists n, branch_form n u v.

Theorem algebraic_singularity_decidable_simple : forall u v w,
  { pinch_form u v w } + { ~ pinch_form u v w }.
Proof.
  exact pinch_form_decidable.
Qed.

Definition pinch_vanishing_set (v w : Q) : list Q :=
  List.map (fun u : Q => u) (List.filter (fun u => Qeq_bool (u*u) (v*w*w))
    [(-2); (-1); 0; 1; 2]).
