# pending: checks that do not hold as written

These were written in the session transcript
`boxedPINE/_archive/_chat_history/All green I-121 passes.md` and shown there as
passing, but they were never run. Extracted unchanged and run on 2026-10-12,
they fail. What each was meant to assert is the author's to say, so they wait
here instead of being changed by guesswork. The catalogue (`../catalog/`) holds
only checks that hold.

| Record | Transcript lines | Fails on | Why |
|--------|------------------|----------|-----|
| I-167 | 5646–5800 | `from inside: 0.841… ≈ 0.999…` | the one-sided difference quotient (f(c) − f(c − r)) / r of sin at 0 is compared with the derivative 1 within 0.001, with r = 1; the quotient approaches the derivative only as r shrinks (at r = 1 it is sin 1 ≈ 0.841; at r = 1e-6 it holds) |
| I-170 | 6832–6989 | `the reverse starts at reset` | reversing the list of links reverses their order but not each link's direction; the first reversed link still runs from its old start to the reset, so a reverse chain also swaps each link's from and to |
| I-171 | 7218–7400 | `both branches agree: 0.841…` | the same step r = 1: the average of the two one-sided quotients of sin at 0 is ≈ 0.841, not within 0.1 of 1 |

Run one: `node proofs/js/pending/I-167.ts`
