# Generated Proof Artifacts

`artifacts/coq/` is the build output directory for Coq-generated files:

- `.vo`
- `.vos`
- `.vok`
- `.glob`
- `.aux`

Only `.gitkeep` is tracked. Run `make clean` to remove generated output and
`make proof` or `make proof-strict` to rebuild it.
