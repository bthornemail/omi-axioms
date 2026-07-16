(*
  FiniteBasics01.v -- finite cardinality, subsets, and decidable equality.

  Foundational definitions used by the rest of the proof suite.
*)

From Coq Require Import Arith.Arith.
From Coq Require Import Lists.List.
From Coq Require Import Fin.
Import ListNotations.

Definition cardinal (T : Type) (l : list T) : nat := length l.

Theorem cardinal_nonnegative : forall T (l : list T), 0 <= cardinal T l.
Proof. intro T; induction l; simpl; auto. Qed.

Theorem cardinal_app : forall T (a b : list T),
  cardinal T (a ++ b) = cardinal T a + cardinal T b.
Proof. intros T a b; apply app_length. Qed.

Definition subset {T : Type} (a b : list T) : Prop :=
  forall x, In x a -> In x b.

Theorem subset_refl : forall T (l : list T), subset l l.
Proof. intros T l x Hx; exact Hx. Qed.

Theorem subset_trans : forall T (a b c : list T),
  subset a b -> subset b c -> subset a c.
Proof.
  intros T a b c Hab Hbc x Hx.
  apply Hbc; apply Hab; exact Hx.
Qed.

Definition eq_dec {T : Type} (dec : forall x y : T, {x = y} + {x <> y})
  (x y : T) : {x = y} + {x <> y} := dec x y.

Theorem decidable_eq_fin : forall n (x y : Fin.t n), {x = y} + {x <> y}.
Proof.
  intros n x y.
  apply Fin.eq_dec.
Defined.

Theorem decidable_eq_nat : forall x y : nat, {x = y} + {x <> y}.
Proof.
  exact Nat.eq_dec.
Defined.

Definition distinct {T : Type} (l : list T) : Prop :=
  forall x y, In x l -> In y l -> x = y -> x = y.

Definition finite_enumerated {T : Type} (l : list T) (P : T -> Prop) : Prop :=
  forall x, In x l -> P x.

Record FiniteSet (T : Type) : Type := mkFiniteSet {
  fs_elements : list T;
  fs_all      : forall x : T, In x fs_elements
}.

Theorem finite_set_card_pos : forall T (fs : FiniteSet T),
  0 < cardinal T (fs_elements T fs) \/ cardinal T (fs_elements T fs) = 0.
Proof.
  intros T fs.
  destruct (cardinal T (fs_elements T fs)) eqn:Hc.
  - right; reflexivity.
  - left; apply Nat.lt_0_succ.
Qed.
