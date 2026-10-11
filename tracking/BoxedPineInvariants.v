(* Invariants of boxedPINE (wiki SPEC-07), checked here so the proofs track the
   code: core/src/verified/fano.ts and types/src/OMI/Fano.hs state the same facts.
   Kept outside coq/ so the 70-module active registry is unchanged (AGENTS.md).
   Concrete Z.lxor, Z.lor, Z.land; no Admitted; every theorem by computation. *)

Require Import ZArith List Bool.
Import ListNotations.
Open Scope Z_scope.

(* A Fano mask: bit k is point k + 1. *)
Definition bit (m k : Z) : bool := Z.testbit m k.
Definition put (b : bool) (k : Z) : Z := if b then Z.shiftl 1 k else 0.

(* One output of the convergence step: its own bit OR the three pairs that
   complete a line through it. *)
Definition gate (m self p q r s u v : Z) : bool :=
  orb (bit m self) (orb (andb (bit m p) (bit m q)) (orb (andb (bit m r) (bit m s)) (andb (bit m u) (bit m v)))).

Definition step (m : Z) : Z :=
  Z.lor (put (gate m 0 1 2 3 4 5 6) 0)
  (Z.lor (put (gate m 1 0 2 3 5 4 6) 1)
  (Z.lor (put (gate m 2 0 1 3 6 4 5) 2)
  (Z.lor (put (gate m 3 0 4 1 5 2 6) 3)
  (Z.lor (put (gate m 4 0 3 1 6 2 5) 4)
  (Z.lor (put (gate m 5 0 6 1 3 2 4) 5)
         (put (gate m 6 0 5 1 4 2 3) 6)))))).

Definition closed (m : Z) : bool := Z.eqb (step m) m.
Definition upto (n : nat) : list Z := map Z.of_nat (seq 0 n).

(* I-65: exactly 16 of the 128 masks are XOR-closed. *)
Theorem sixteen_constants : length (filter closed (upto 128)) = 16%nat.
Proof. vm_compute. reflexivity. Qed.

(* I-66: two steps converge every mask to a constant. *)
Theorem converges_in_two_steps : forallb (fun m => closed (step (step m))) (upto 128) = true.
Proof. vm_compute. reflexivity. Qed.

(* I-77: three points as matrix columns; a point goes through by XOR. *)
Definition sel (b : bool) (t : Z) : Z := if b then t else 0.
Definition transform3 (a b c x : Z) : Z := Z.lxor (sel (bit x 0) a) (Z.lxor (sel (bit x 1) b) (sel (bit x 2) c)).
Definition independent (a b c : Z) : bool :=
  negb (a =? 0) && negb (b =? 0) && negb (a =? b) && negb (c =? 0)
  && negb (c =? a) && negb (c =? b) && negb (c =? Z.lxor a b).
Definition triples : list (Z * Z * Z) :=
  flat_map (fun a => flat_map (fun b => map (fun c => (a, b, c)) (upto 8)) (upto 8)) (upto 8).
Definition points : list Z := [1; 2; 3; 4; 5; 6; 7].
Definition permutes (a b c : Z) : bool :=
  forallb (fun y => existsb (fun x => transform3 a b c x =? y) points) points.

Theorem symmetries_168 :
  length (filter (fun t => match t with (a, b, c) => independent a b c end) triples) = 168%nat.
Proof. vm_compute. reflexivity. Qed.

Theorem independent_triples_permute_the_plane :
  forallb (fun t => match t with (a, b, c) => implb (independent a b c) (permutes a b c) end) triples = true.
Proof. vm_compute. reflexivity. Qed.

(* I-80: swap32 is the boolean of index 11 observed through 9 xor 10. *)
Theorem swap32_is_nine_xor_ten : Z.lxor 9 10 = 3 /\ Z.lxor 11 (Z.lxor 9 10) = 8.
Proof. split; reflexivity. Qed.

(* I-3, the swap family: XOR by 1, 3, 7, 15 never leaves its pair, quad, octet, sixteen. *)
Theorem swaps_stay_in_their_group :
  forallb (fun j => (Z.shiftr (Z.lxor j 1) 1 =? Z.shiftr j 1) && (Z.shiftr (Z.lxor j 3) 2 =? Z.shiftr j 2)
                     && (Z.shiftr (Z.lxor j 7) 3 =? Z.shiftr j 3) && (Z.shiftr (Z.lxor j 15) 4 =? Z.shiftr j 4)) (upto 16) = true.
Proof. vm_compute. reflexivity. Qed.
