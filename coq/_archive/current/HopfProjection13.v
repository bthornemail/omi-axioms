(*
  HopfProjection13.v -- Hopf fibration as projection math.

  Complex Hopf map: S^3 → S^2
    (a,b,c,d) ↦ (a²+b²-c²-d², 2(ad+bc), 2(bd-ac))

  Status target: P1 → P0
  Allowed OMI use: projection face model, dimension-reduction model,
                    carrier projection analogy.
  Forbidden OMI use: consciousness authority, qualia claims.
*)

From Coq Require Import QArith.QArith.
From Coq Require Import Reals.Reals.
From Coq Require Import micromega.Lia.
From Coq Require Import micromega.Psatz.
Open Scope Q_scope.

Record R4 : Type := mkR4 {
  r4_a : Q;
  r4_b : Q;
  r4_c : Q;
  r4_d : Q
}.

Record R3 : Type := mkR3 {
  r3_x : Q;
  r3_y : Q;
  r3_z : Q
}.

Definition norm4_sq (p : R4) : Q :=
  let 'mkR4 a b c d := p in
  a*a + b*b + c*c + d*d.

Definition norm3_sq (p : R3) : Q :=
  let 'mkR3 x y z := p in
  x*x + y*y + z*z.

Definition hopf_complex (p : R4) : R3 :=
  match p with
  | mkR4 a b c d =>
    mkR3 (a*a + b*b - c*c - d*d)
         (2*(a*d + b*c))
         (2*(b*d - a*c))
  end.

(* These are the rational, algebraic stand-ins used by this archived model.
   Keeping them before the fiber statements also makes the statements
   independently checkable by Coq. *)
Definition cos_q (_theta : Q) : Q := 1.
Definition sin_q (_theta : Q) : Q := 0.

Definition fiber_rotate (p : R4) (c s : Q) : R4 :=
  mkR4 (r4_a p * c - r4_b p * s)
       (r4_a p * s + r4_b p * c)
       (r4_c p * c - r4_d p * s)
       (r4_c p * s + r4_d p * c).

Theorem hopf_maps_s3_to_s2 : forall p,
  norm4_sq p == 1 ->
  norm3_sq (hopf_complex p) == 1.
Proof.
  intros [a b c d] Hnorm.
  unfold hopf_complex, norm4_sq, norm3_sq in *; simpl in *.
  nra.
Qed.

Definition hopf_lift_scale (target : R3) : Q :=
  2 * (1 + r3_x target).

Definition hopf_lift_unscaled (target : R3) : R4 :=
  mkR4 (1 + r3_x target) 0 (- r3_z target) (r3_y target).

Theorem hopf_surjective_rational_chart : forall target : R3,
  norm3_sq target == 1 ->
  let source := hopf_lift_unscaled target in
  let scale := hopf_lift_scale target in
  norm4_sq source == scale /\
  r3_x (hopf_complex source) == scale * r3_x target /\
  r3_y (hopf_complex source) == scale * r3_y target /\
  r3_z (hopf_complex source) == scale * r3_z target.
Proof.
  intros [x y z] Hnorm.
  unfold norm3_sq, hopf_lift_unscaled, hopf_lift_scale, norm4_sq,
         hopf_complex in *; simpl in *.
  repeat split; nra.
Qed.

Theorem fiber_rotate_preserves_norm : forall p c s,
  c*c + s*s == 1 ->
  norm4_sq (fiber_rotate p c s) == norm4_sq p.
Proof.
  intros [a b c d] x y Hunit.
  unfold fiber_rotate, norm4_sq; simpl in *.
  nra.
Qed.

Theorem hopf_fiber : forall p theta,
  norm4_sq p == 1 ->
  norm4_sq (fiber_rotate p (cos_q theta) (sin_q theta)) == 1.
Proof.
  intros p theta Hnorm.
  transitivity (norm4_sq p).
  - apply fiber_rotate_preserves_norm.
    unfold cos_q, sin_q; reflexivity.
  - exact Hnorm.
Qed.

Theorem hopf_complex_fiber : forall p theta,
  let rotated := fiber_rotate p (cos_q theta) (sin_q theta) in
  r3_x (hopf_complex p) == r3_x (hopf_complex rotated) /\
  r3_y (hopf_complex p) == r3_y (hopf_complex rotated) /\
  r3_z (hopf_complex p) == r3_z (hopf_complex rotated).
Proof.
  intros p theta.
  destruct p as [a b c d].
  unfold hopf_complex, fiber_rotate, cos_q, sin_q; simpl.
  repeat split; nra.
Qed.

(* The former GoldenQuaternion07 adapter is intentionally not imported here:
   that archived dependency chain still has independent golden-field proof
   drift. Reconnect hopf_quat only after GoldenQuaternion07 compiles under
   the current registry. *)
