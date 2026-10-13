# pending: checks that do not hold as written

Checks wait here when, run as written, they fail, and what they were meant to
assert is the author's to say. The catalogue (`../catalog/`) holds only checks
that hold.

| Record | Source | Why it waits |
|--------|--------|--------------|
| I-178 | the author, 2026-10-12: "the connecting rule is the allocated raw buffer, because entropy degradation is a signal" (as written up in the session) | It holds as written, but several assertions cannot fail: no `Atomics` call is made (the "atomic" step is an ordinary read and write), §12 asserts `finalEntropy !== h0 \|\| true`, the signals are only checked to be finite, the buffers are filled by hand rather than allocated raw, and I-171's agreement is unused. Two choices are the author's: the replacement (the byte moved by ±1, or XORed) and the signal (each step's entropy change, or the total). Measured: with ±1 at 59, 63, 127 the entropy falls 0.0078 at each index's first step and then stays put. |
| I-180 | the other assistant's write-up, 2026-10-12, of the author's "64MB has 4GB worth of virtual memory", "16 bits has 8MB" and "seconds, minutes, or hours of precision?"; the author has not stated the claim in their own words | It holds as written, but it holds as arithmetic on numbers it chose, not as a reading of this machine. Its page-table ratio of 64 (512-byte pages, 8-byte entries) is not this machine's: the page here is 4096 bytes (`getconf PAGESIZE`), so 4 GB is 2^20 pages, 8-byte entries are 8 MB of page tables, and the ratio is 512. Its "2 MB measured" was not measured: I-179 measures 0.3 MB of resident growth. §§6–8, 11 and 13 assert constants or strings they set themselves. §12 sets the 8 KB proof Blob's 2^16 bits equal to the count of 64 KB pages in 4 GB: the two numbers match, but nothing ties the Blob to those pages. The times in §§9–10 assume 1 GB/s. One reading lines up with this machine: 4 GB in 4 KB pages takes 8 MB of page tables, which could be the "8MB" in "16 bits has 8MB". Whether that is the author's meaning is the author's to say. |

## Resolved

- I-167, I-170, I-171 failed as extracted from the session transcript (a
  difference quotient with step 1; a reversed chain whose links kept their
  direction). The author stated the threshold on 2026-10-12, the limit (r -> 0)
  and the swap of each link's ends; they hold in the catalogue.
- I-177 asserted 60 ⊕ 68 = 128; 60 ⊕ 68 is 120. Corrected on 2026-10-12 to name
  the span (127 - 59 = 68), its XOR with 60 (120) and the pole (60 ⊕ 128 = 188);
  it holds in the catalogue, and its document says which of its claims are checked.
