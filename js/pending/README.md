# pending: checks that do not hold as written

Checks wait here when, run as written, they fail, and what they were meant to
assert is the author's to say. The catalogue (`../catalog/`) holds only checks
that hold.

| Record | Source | Why it waits |
|--------|--------|--------------|
| I-178 | the author, 2026-10-12: "the connecting rule is the allocated raw buffer, because entropy degradation is a signal"; and "it should be xored by user agent" | Rewritten on 2026-10-12 with the author's replacement: a step is `Atomics.compareExchange(state, i, b, b ^ u)` by an agent carrying the byte u, on the raw buffer as allocated (zeros). It checks the stale exchange, that the order of agents does not change the bytes, and that the same agent walked back restores the buffer. One choice is the author's: whether the signal is each step's change in entropy or the total from start to end. Measured, A, B, A over 59, 63, 127: each step 0.0369 0.0290 0.0261 0.0108 0 -0.0108 0.0108 0 -0.0108; the total 0.0920. Measured against the author's "the deviation is anything not all 1s, all 0s, or 0xaa55": steps at 59, 63, 127 change one byte of each two-byte word, so from the raw buffer they reach only all 0s; a non-zero agent makes a deviation and only that agent stepping again undoes it. The author, later the same day: "all the data is static indices, we are considering the routing; the values come from the proxy and the reflect of the user literals from their proof tree", and of the static indices, "its positions to hold to keep the same frame in view or same window". Open with it: where 0xAA55 counts (at 0x7DFE, or in any word), whether all 1s and all 0s go word by word or across the whole buffer, and whether the signal is whether there is a deviation or a measure of it. |

## Resolved

- I-167, I-170, I-171 failed as extracted from the session transcript (a
  difference quotient with step 1; a reversed chain whose links kept their
  direction). The author stated the threshold on 2026-10-12, the limit (r -> 0)
  and the swap of each link's ends; they hold in the catalogue.
- I-177 asserted 60 ⊕ 68 = 128; 60 ⊕ 68 is 120. Corrected on 2026-10-12 to name
  the span (127 - 59 = 68), its XOR with 60 (120) and the pole (60 ⊕ 128 = 188);
  it holds in the catalogue, and its document says which of its claims are checked.
- I-180, as first written up, set its own numbers (a 512-byte page, a
  64-to-1 ratio, a "2 MB measured" nobody measured). The author stated the
  claim on 2026-10-12, "x86 initializes a virtual 4gb", and that the 8 MB is
  the tables; rewritten to measure the tables (8212 kB for the 4 GB) and to run
  under a 64 MB cap, it holds in the catalogue.
