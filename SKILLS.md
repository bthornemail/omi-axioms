# OMI Axioms Skills

## Formal Registry Lock

The `coq/` tree is the formal source registry. Treat it as a five-part proof
ladder, not as a scratch directory and not as an implementation runtime.

```text
00-foundations
  finite sets, proof statuses, rational vectors, golden arithmetic,
  truth-table counts, earned control bands

01-incidence
  finite incidence and Miquel incidence

02-closure
  bounded complexity, diagonal gauge closure, null-ring closure

03-projection
  BQF bridge, metric projection, Pi projection witnesses

04-execution
  atomic replay, Delta16 period, protocol boundaries, kernel bridges
```

The archive is preservation only:

```text
coq/_archive
  preserved drafts excluded from active proof claims
```

Do not delete, rewrite, or promote archived proofs casually. Repair is allowed
only when the repaired file compiles assumption-free under the current registry
and has a clear active owner.

## Compilation Rule

All active Coq compilation must preserve the five-part registry and the
canonical logical root:

```text
coqc -Q . OmiCore
```

Generated Coq artifacts must go to:

```text
../artifacts/coq/
```

Generated `.vo`, `.glob`, `.aux`, `.vos`, `.vok`, `.vio`, extracted `.ml`, and
extracted `.mli` files do not belong under `coq/`.

## Archive Re-Entry Rule

An archived proof may return to an active directory only after it satisfies all
of these conditions:

```text
1. no Axiom, Parameter, Conjecture, Admitted, admit, or Abort
2. compiles under the current Coq version
3. passes coqchk
4. has a dedicated coq-docs page or proof-book entry
5. states corrected historical claims explicitly
6. uses current active names rather than numbered-suite drift
```

## Mask and Involution Rule

Archived bitwise proofs repaired for active use must be bounded by the current
16-bit mask and the `r0` involution law.

Canonical forms:

```coq
Definition mask16 (x : N) : N := N.land x 0xFFFF.
Definition r0 (x : N) : N := N.lxor x 0xAAAA.

mask16 (mask16 x) = mask16 x
r0 (r0 x) = x
```

When porting older files that used `x mod 65536`, update the proof surface to
the explicit bitmask form before active promotion.

## No Paradigm Drift

Do not add:

```text
runtime evaluators
heap object models
extraction targets as proof authority
duplicate compatibility proof files
active assumptions
parallel active owners for one theorem family
```

The proof registry proves deterministic laws. Runtime behavior, C tests,
firmware, renderers, and transport adapters remain outside this repository.
