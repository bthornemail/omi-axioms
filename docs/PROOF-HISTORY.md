# Proof History

The first proof root is `coq/AtomicKernel.v`. It is preserved as the historical
front door for the OMI proof stack.

The repository was split from `omi-isa` so that:

- `omi-isa` owns executable machine behavior, bytecode, C runtime, tests, and
  hardware-facing artifacts.
- `omi-axioms` owns Coq laws, formal semantics, projection claims, bridges, and
  refinement theorems.

The initial migration preserved public Coq module names and current import
forms. Generated Coq artifacts from the old `proof/` tree were not migrated.

`verified_execution.v` was repaired during the split so it compiles with the
default proof target. The unresolved concrete GF(2^16) obligations remain
visible as admitted finite-field lemmas rather than being hidden outside the
build.
