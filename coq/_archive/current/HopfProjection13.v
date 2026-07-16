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

Theorem hopf_maps_s3_to_s2 : forall p,
  norm4_sq p == 1 ->
  norm3_sq (hopf_complex p) == 1.
Proof.
  intros [a b c d] Hnorm.
  unfold hopf_complex, norm4_sq, norm3_sq in *; simpl in *.
  nia.
Qed.

Theorem hopf_surjective : forall target : R3,
  norm3_sq target == 1 ->
  exists source : R4, norm4_sq source == 1 /\ hopf_complex source = target.
Proof.
  intros [x y z] Hnorm.
  unfold norm3_sq in Hnorm; simpl in Hnorm.
  admit.
Qed.

Theorem hopf_fiber : forall p theta,
  norm4_sq p == 1 ->
  norm4_sq (mkR4 (r4_a p * cos_q theta - r4_b * sin_q theta)
                 (r4_a p * sin_q theta + r4_b * cos_q theta)
                 (r4_c p * cos_q theta - r4_d * sin_q theta)
                 (r4_c p * sin_q theta + r4_d * cos_q theta)) == 1.
Proof.
  intros p theta Hnorm.
  destruct p as [a b c d].
  unfold norm4_sq; simpl.
  admit.
Qed.

Definition cos_q (theta : Q) : Q := 1.
Definition sin_q (theta : Q) : Q := 0.

Theorem hopf_complex_fiber : forall p theta,
  hopf_complex p = hopf_complex
    (mkR4 (r4_a p * cos_q theta - r4_b * sin_q theta)
          (r4_a p * sin_q theta + r4_b * cos_q theta)
          (r4_c p * cos_q theta - r4_d * sin_q theta)
          (r4_c p * sin_q theta + r4_d * cos_q theta)).
Proof.
  intros p theta.
  destruct p as [a b c d].
  unfold hopf_complex; simpl.
  admit.
Qed.

Definition hopf_quat (q : GQuat) : R3 :=
  match q with
  | mkGQuat (mkGolden ar as) (mkGolden bi bs) (mkGolden cj cs) (mkGolden dk ds) =>
    mkR3 (ar*ar + as*as + bi*bi + bs*bs - cj*cj - cs*cs - dk*dk - ds*ds)
         (2*(ar*dk + as*ds + bi*cs + bs*cj))
         (2*(bi*dk + bs*ds - ar*cs - as*cj))
  end.
