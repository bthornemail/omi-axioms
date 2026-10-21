# pending: observations that are not yet a check that can say no

A check enters `../catalog/` only when, run as written, it can fail and does not.
What waits here is real but cannot yet be asserted that way.

## Waiting

- **The raw self-append bomb.** `cat A F B >> F` and the author's
  `cat -An A F B | rev >> F` are **not deterministic**: whether `cat` re-reads
  the bytes it is appending depends on buffering, so the run either doubles a few
  times or diverges to the physical limit (the 121 MB file the author measured).
  A proof must say no the same way every time, so the deterministic form — iterate
  through a snapshot so no byte is read while it is written — is filed instead as
  `B-NOFIX` in the catalogue, which proves the loop has no fixed point. The
  divergence of the *unsnapshotted* loop is a true observation, but it is the
  halting of a nondeterministic process by an external limit, not a check.

- **Redirecting into a file that is also an input loops.** `cat A F B > F` is
  NOT the clean seed-reset it first looks like. `>` truncates F before `cat`
  runs, but `cat` writes A's bytes into F *before* it opens F for reading, so it
  reads what it just wrote and never reaches EOF — observed to hang, not
  terminate. The author's observed "reset to the seed" used a **pipe**
  (`cat A F B | cat > F`), where the producer reads the just-emptied F before the
  consumer has written much back — timing- and buffer-dependent, the same family
  as the self-append bomb above, not a law. The clean, deterministic laws are
  filed instead as `B-TRUNC` (`> F` truncates and replaces, when F is not also an
  input) and `B-GROW` (`>> F` appends). This corrects a first draft of those two
  checks that asserted the looping form as if it were a law; the gate caught it.

- **svg-switch normalizes a missing final newline.** `scripts/svg-switch`
  builds its output as `buf = buf $0 "\n"`, so an input whose last line has no
  trailing newline comes back with one added. `--rev` is therefore an exact
  identity (applied twice) only for newline-terminated input; on input lacking a
  final newline it is identity *up to* that one added byte. `B-FRAME` asserts the
  exact case (newline-terminated, the normal file); this normalization is the
  reason, and is the author's to keep or change in the tool.

## Resolved

- Nothing has moved from here to the catalogue yet.
