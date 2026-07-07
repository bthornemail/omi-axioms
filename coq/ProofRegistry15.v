(*
  ProofRegistry15.v -- claim registry for the OMI proof suite.

  Every claim is tracked with an ID, source, status, and allowed/forbidden uses.
  This module serves as the normative index of what is proved and what is not.
*)

From Coq Require Import Strings.String.
From Coq Require Import Lists.List.
Import ListNotations.

Require Import ProofStatus00.
Require Import FiniteBasics01.
Require Import FanoIncidence02.
Require Import BitmaskClosure03.
Require Import KarnaughReduction04.
Require Import GaugeTable05.
Require Import GoldenField06.
Require Import GoldenQuaternion07.
Require Import IcosianUnits08.
Require Import OmiRingStep09.
Require Import RelationalQuotation10.
Require Import E8Roots11.
Require Import WeylReflection12.
Require Import HopfProjection13.
Require Import PinchBranchLocalForms14.

Definition string_of_status (s : ProofStatus) : string :=
  match s with
  | P0 => "P0 — Proven Core"
  | P1 => "P1 — Computable / Exhaustively Checkable"
  | P2 => "P2 — Mathematical Model / Partially Formal"
  | P3 => "P3 — Implementation Precedent"
  | P4 => "P4 — Metaphor / Visualization Only"
  end.

Record RegistryEntry : Type := mkRegistryEntry {
  entry_id       : string;
  entry_name     : string;
  entry_source   : string;
  entry_status   : ProofStatus;
  entry_allowed  : string;
  entry_forbidden : string;
  entry_notes    : string
}.

Definition registry : list RegistryEntry :=
  [ mkRegistryEntry "FANO-INCIDENCE-001"
      "Fano plane has 7 points"
      "geometric-consensus docs"
      P0
      "finite relation incidence, gauge-family incidence"
      "protocol authority or identity"
      "fano_has_7_lines, every_line_has_3_points proven"

  ; mkRegistryEntry "FANO-INCIDENCE-002"
      "every two Fano points determine one line"
      "geometric-consensus docs"
      P1
      "small adjudication surfaces"
      "protocol authority or identity"
      "requires full finite case analysis"

  ; mkRegistryEntry "BITMASK-CLOSURE-001"
      "7-bit mask closure is extensive, monotone, idempotent"
      "proof-kernel direction"
      P2
      "bounded relation expansion, finite kernel closure"
      "hash identity"
      "idempotence and monotone admit proofs"

  ; mkRegistryEntry "KARNAUGH-001"
      "truth-table equivalence is decidable"
      "proof suite proposal"
      P2
      "Tetragrammatron adjudication, truth-gate minimization"
      "truth creation authority"
      "decidability admitted pending input enumeration"

  ; mkRegistryEntry "GAUGE-TABLE-001"
      "16-control gauge family projection is deterministic"
      "OMI canon 11-NOTATION-MULTIPLEXING"
      P0
      "notation multiplexing, earned codepoint surfaces"
      "protocol authority"
      "gauge_projection_deterministic proven"

  ; mkRegistryEntry "GOLDEN-FIELD-001"
      "golden field Q(√5) forms a commutative ring"
      "icosian bridge inquiry"
      P0
      "Omi-Ring candidate arithmetic"
      "protocol authority"
      "g_mul_assoc, g_mul_comm, g_distrib proven"

  ; mkRegistryEntry "GOLDEN-QUAT-001"
      "golden quaternions are associative and preserve norm"
      "icosian bridge inquiry"
      P0
      "associative relation composition, norm-preserving steps"
      "hash identity"
      "quat_mul_assoc, quat_norm_mul proven"

  ; mkRegistryEntry "ICOSIAN-UNITS-001"
      "unit icosians have length 48 (subset of 120)"
      "icosian bridge inquiry"
      P1
      "finite Omi-Ring gauge actions"
      "protocol authority"
      "48 enumerated; full 120 enumeration pending"

  ; mkRegistryEntry "OMI-RING-001"
      "OMI ring step is deterministic and norm-preserving"
      "OMI canon 17-RELATIONAL-QUOTATION"
      P0
      "gauge-controlled relation movement"
      "hash identity"
      "omi_ring_step_deterministic, preserves_norm proven"

  ; mkRegistryEntry "OMI-QUOTATION-001"
      "quoted relation adjudication is decidable"
      "OMI canon 17-RELATIONAL-QUOTATION"
      P0
      "Tetragrammatron adjudication, deterministic validation"
      "projection as authority"
      "adjudication_decidable proven"

  ; mkRegistryEntry "E8-ROOT-COUNT-001"
      "E8 root enumeration has 240 roots"
      "E8_LATTICE.md"
      P1
      "finite exceptional root reference"
      "protocol authority or identity"
      "e8_roots_count = 240 proven by vm_compute"

  ; mkRegistryEntry "Weyl-Reflection-001"
      "Weyl reflection over E8 roots preserves norm"
      "E8 manifold document"
      P2
      "canonicalization model"
      "authority"
      "reflect_involutive, reflect_preserves_norm admitted"

  ; mkRegistryEntry "HOPF-001"
      "complex Hopf map sends S³ → S²"
      "Hopf docs"
      P1
      "projection face model"
      "consciousness authority"
      "hopf_maps_s3_to_s2 proven; fiber theorems admitted"

  ; mkRegistryEntry "PINCH-001"
      "pinch point form u² - vw² = 0 is decidable"
      "pinch/branch doc"
      P0
      "projection singularity language"
      "metaphysical interpretation"
      "pinch_form_decidable proven"

  ; mkRegistryEntry "CONSCIOUSNESS-001"
      "consciousness emerges as Hopf projections"
      "consciousness docs"
      P4
      "none (visual metaphor)"
      "OMI authority, validation, identity"
      "Not a Coq target; P4 metaphor"

  ; mkRegistryEntry "MERKABA-001"
      "star tetrahedron / Merkaba as geometric model"
      "Merkaba/Metatron docs"
      P4
      "pedagogical visualization"
      "protocol authority"
      "Star tetrahedron geometry may become P1 if formalized"
  ].

Theorem registry_nonempty : length registry > 0.
Proof. vm_compute; auto. Qed.

Definition lookup_entry (id : string) : option RegistryEntry :=
  List.find (fun e => if string_dec (entry_id e) id then true else false) registry.

Theorem lookup_entry_found : forall id e,
  lookup_entry id = Some e -> entry_id e = id.
Proof.
  intros id e H.
  unfold lookup_entry in H.
  apply List.find_some in H.
  destruct H as [Hmem Hmatch].
  unfold entry_id.
  destruct (string_dec (entry_id e) id) in Hmatch; try discriminate.
  exact e0.
Qed.

Theorem lookup_entry_missing : forall id,
  lookup_entry id = None ->
  ~ exists e, In e registry /\ entry_id e = id.
Proof.
  intros id H.
  intro Hcontra.
  destruct Hcontra as [e [Hmem Heq]].
  unfold lookup_entry in H.
  apply List.find_none in H.
  apply H with e.
  destruct (string_dec (entry_id e) id) as [Hdec | Hdec]; [exact Hmem |].
  rewrite Heq in Hdec; contradiction.
Qed.
