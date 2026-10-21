# busybox: the BusyBox proofs

Candidates **for consideration**, outside the locked `coq/` registry (AGENTS.md:
no new Coq proof files), in the manner of `js/` and `svg/`. In
`PROOF_CANONIZATION.md`'s levels every check here is **P1**: a finite, rerunnable
check that can fail. Nothing here enters the deterministic core on its own.

Each check is one POSIX shell script that calls real `busybox` applets and exits
nonzero when its claim does not hold. The two switches of the Light Garden —
direction (`rev`) and encoding (`tr`) — are the heart of the family;
`scripts/svg-switch` is their twin, and `B-FRAME` checks it.

| Folder | What it holds |
|--------|---------------|
| `catalog/` | the checks, one per record (`B-<TAG>.sh`); the catalogue holds only checks that hold |
| `pending/` | observations that cannot be asserted as a check that says no (kept, not forced green) |
| `tools/` | `build.mjs` — runs every check and writes `catalog.json` and the documents |
| `catalog.json` | every record: tag, title, category, applets, the claim, its statements, whether it holds |

The documents are in `../busybox-docs/`. They are built from the checks, so they
say only what the checks check.

## Records

| tag | title | the switch it is |
|-----|-------|------------------|
| `REV2` | rev is its own inverse | direction |
| `ROT2` | rot13 (tr) is its own inverse | encoding |
| `COMMUTE` | the two switches commute | direction ∘ encoding = encoding ∘ direction |
| `TRUNC` | `>` truncates before the read | the seed-reset |
| `GROW` | `>>` grows by the bytes read | the complement of TRUNC |
| `NOFIX` | the self-append loop has no fixed point | halts only by an external limit |
| `FRAME` | svg-switch toggles payload, not frame; twice = identity | literal vs reading |
| `CATID` | cat is a byte identity | the carrier the switches ride on |
| `LIST` | an applet's name is the leaf of its install path | frame vs payload |
| `TETRA` | XOR byte-distance is a metric (the tetrahedron's six edges) | distance from 0, the fail-safe seed |
| `FANO` | every 7-bit margin state resolves to one of the 16 constants in ≤2 steps | the SVG-margin reader, dual `i⊕15` |
| `WILSON` | `(n−1)! mod n = n−1` iff `n` prime; CAS selects prime vs composite | the factorial ladder, `n=4` the lone Catch |

## Tags

Each record's tag is a literal in `/A-Z0-9/` naming what it checks (`REV2`, `ROT2`,
`TRUNC`, …) — not a hash. The tag is the record.

## Run

```
make busybox        # run every catalogue check (fails if any check fails)
make busybox-docs   # rebuild catalog.json and ../busybox-docs/ from the checks
```

Override the binary with `BB=/path/to/busybox`, and the svg-switch path (for
`B-FRAME`) with `SVG_SWITCH=/path/to/svg-switch`.
