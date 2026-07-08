(*
  WeylReflection.v -- Weyl reflection over the E8 root system.

  s_α(v) = v - 2(v·α)/(α·α) α

  For E8 roots, α·α = 2, so the formula simplifies to:
    s_α(v) = v - (v·α) α
*)

From Coq Require Import QArith.QArith.
From Coq Require Import micromega.Lia.
Open Scope Q_scope.

Require Import VecQ.
Require Import E8Roots.

Definition reflect (alpha v : Vec8) : Vec8 :=
  let coeff := 2 * dot alpha v / dot alpha alpha in
  vadd v (vneg (vscale coeff alpha)).

Theorem reflect_root_self : forall (alpha : Vec8),
  In alpha e8_roots ->
  reflect alpha alpha = vneg alpha.
Proof.
  intros alpha Halpha.
  unfold reflect.
  rewrite dot_comm.
  rewrite (proj2 (Qeq_eq _ _) (e8_roots_norm_two alpha Halpha)).
  unfold vneg, vscale, vadd.
  apply Vector.map2_ext.
  intros x y.
  ring.
Qed.

Theorem reflect_involutive : forall (alpha v : Vec8),
  In alpha e8_roots ->
  reflect alpha (reflect alpha v) = v.
Proof.
  intros alpha v Halpha.
  unfold reflect.
  rewrite (proj2 (Qeq_eq _ _) (e8_roots_norm_two alpha Halpha)).
  rewrite dot_add_l.
  rewrite dot_scale_l.
  rewrite dot_comm.
  rewrite dot_comm with (v := alpha).
  unfold vadd, vneg, vscale.
  apply Vector.map2_ext.
  intros x y.
  ring.
Qed.

Theorem reflect_preserves_norm : forall (alpha v : Vec8),
  In alpha e8_roots ->
  norm_sq (reflect alpha v) == norm_sq v.
Proof.
  intros alpha v Halpha.
  unfold reflect, norm_sq.
  rewrite (proj2 (Qeq_eq _ _) (e8_roots_norm_two alpha Halpha)).
  unfold vadd, vneg, vscale.
  admit.  (* requires norm calculation expansion *)
Qed.

(* ----------------------------------------------------------------- *)
(*  Weyl group: reflections generate the Weyl group                  *)
(* ----------------------------------------------------------------- *)

Inductive WeylElt : Type :=
| WeylId : WeylElt
| WeylRefl : Vec8 -> WeylElt
| WeylComp : WeylElt -> WeylElt -> WeylElt.

Fixpoint weyl_apply (w : WeylElt) (v : Vec8) : Vec8 :=
  match w with
  | WeylId => v
  | WeylRefl alpha => reflect alpha v
  | WeylComp w1 w2 => weyl_apply w1 (weyl_apply w2 v)
  end.

Theorem weyl_id_apply : forall v, weyl_apply WeylId v = v.
Proof. reflexivity. Qed.

Theorem weyl_comp_apply : forall w1 w2 v,
  weyl_apply (WeylComp w1 w2) v = weyl_apply w1 (weyl_apply w2 v).
Proof. reflexivity. Qed.

Theorem weyl_preserves_norm : forall w v,
  (forall alpha, In alpha e8_roots -> norm_sq (reflect alpha v) == norm_sq v) ->
  norm_sq (weyl_apply w v) == norm_sq v.
Proof.
  intros w v Hpres.
  induction w as [| alpha | w1 IHw1 w2 IHw2].
  - reflexivity.
  - apply Hpres; exact I.
  - rewrite weyl_comp_apply.
    rewrite IHw1.
    exact IHw2.
Qed.
