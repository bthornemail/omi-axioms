# Proof Spine

The former Volumes I-VIII proof-spine narrative is obsolete. It described
modules containing admitted or parameterized claims as active even though
those drafts are now archived.

The current proof spine is the strict registry in:

- [`coq-docs/PROOF-INDEX.md`](../coq-docs/PROOF-INDEX.md)
- [`coq-docs/OMI-DETERMINISTIC-COMPUTATION-PROOF-BOOK.md`](../coq-docs/OMI-DETERMINISTIC-COMPUTATION-PROOF-BOOK.md)
- [`coq-docs/ARCHIVE.md`](../coq-docs/ARCHIVE.md)

The active dependency order is:

```text
foundations
  -> closure
  -> incidence
  -> projection
  -> execution
```

Only modules listed in `_CoqProject`, compiled by `make proof-strict`, and
accepted by `coqchk` are part of the proof authority rail.
