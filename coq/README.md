# Coq Source Registry

| Directory | Role |
| --- | --- |
| `00-foundations/` | Finite, vector, field, and proof-status foundations |
| `01-incidence/` | Finite and Miquel incidence proofs |
| `02-closure/` | Closure and bounded-complexity proofs |
| `03-projection/` | BQF, metric, and Pi projection proofs |
| `04-execution/` | Bounded kernels, protocol validators, and execution bridges |
| `_archive/` | Preserved unresolved drafts; excluded from the strict registry |

Generated compiler output belongs in `../artifacts/coq/`, never beside source.

Active compilation must preserve the canonical root map:

```text
coqc -Q . OmiCore
```

The existing categorized roots are retained for the current unqualified module
imports, but `OmiCore` is the registry-wide logical root.

Archived bitwise proofs repaired for active use must adopt the current 16-bit
forms:

```coq
Definition mask16 (x : N) : N := N.land x 0xFFFF.
Definition r0 (x : N) : N := N.lxor x 0xAAAA.
```

Active OMINO proof anchors:

```text
00-foundations/OminoSECDEDCell.v
  canonical [8,4,4] bit map, syndrome, computed_omino, overall_mismatch

02-closure/PowerClosureGate.v
  total numerator factorization and explicit denominator boundary

03-projection/E8RootsEnumerate240.v
  assumption-free finite E8 root enumeration: 112 + 128 = 240

04-execution/OminoParallelSpatialScaling.v
  supplied-substrate constant step descriptor for parallel OMINO cells
```
