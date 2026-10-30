// i246.ts — I-246: the delta law's period is W/2 at every width W = 2^n, and from 8 bits up every constant drops out
//
// The author, 2026-10-30: "cool lets prove it, i think the proof is in coq but let s prove it agaign so we
// can port to plan9" (questions.vtt delta-order; delta64-scaling). Coq has the 16-bit case,
// proofs/coq/04-execution/Delta16HasExactPeriodEight.v, for the constants 0x001D and 0x1337, by composed
// affine Boolean forms and a certificate against each shorter period. The general proof:
//
//   Let W = 2^n and L = x + x^3 + x^-2 in GF(2)[x]/(x^W - 1), the replacement law's linear part.
//   (1) Over GF(2), (a + b)^2 = a^2 + b^2, so L^(2^k) = x^(2^k) + x^(3 2^k) + x^(-2 2^k): squaring doubles
//       the three exponents and nothing else.
//   (2) At 2^k = W/2 the exponents are W/2, 3W/2 = W/2 and -W = 0 (mod W): the two W/2 cancel, L^(W/2) = 1.
//   (3) The order divides W/2, a power of two; at W/4 the exponents W/4, 3W/4, W/2 are three, distinct and
//       non-zero for W >= 4, so L^(W/4) != 1: the order is exactly W/2.
//   (4) With a constant C, Delta^(W/2)(x) = L^(W/2) x + S C with S = 1 + L + ... + L^(W/2 - 1) =
//       (1 + L)^(W/2 - 1) (in characteristic two every binomial coefficient of 2^m - 1 is odd); and
//       1 + L = y^3 (1 + y + y^2), y = x + 1, a unit times y^3 (I-245), while x^W - 1 = y^W. So S = 0 exactly
//       when 3 (W/2 - 1) >= W, that is W >= 6: from 8 bits up every constant drops out and every state
//       returns at step W/2; the map is not the identity at W/4 since its linear part is not.
//
// The checks: the certificate of (2) and (3) as exponent arithmetic for n = 2 to 60; (4)'s inequality; the
// replacement law run at 8, 16, 32 and 64 bits with several constants; and the falsifier at W = 4, where a
// constant survives.
import assert from "node:assert";

// ── the certificate: exponents of L^(2^k), pairs cancelling over GF(2) ─
const powerExponents = (n: number, k: number): bigint[] => {
  const W = 1n << BigInt(n), m = 1n << BigInt(k);
  const raw = [1n * m, 3n * m, -2n * m].map((e) => ((e % W) + W) % W);
  const odd = new Map<bigint, number>(); for (const e of raw) odd.set(e, (odd.get(e) ?? 0) ^ 1);
  return [...odd].filter(([, c]) => c).map(([e]) => e).sort((a, b) => (a < b ? -1 : 1));
};
for (let n = 2; n <= 60; n++) {
  assert.deepEqual(powerExponents(n, n - 1), [0n], `W = 2^${n}: L^(W/2) = x^0 = 1`);
  const q = powerExponents(n, n - 2);
  assert.ok(q.length === 3 && q.every((e) => e !== 0n), `W = 2^${n}: L^(W/4) has three non-zero exponents, not 1`);
  assert.equal(3 * ((2 ** n) / 2 - 1) >= 2 ** n, n >= 3, `W = 2^${n}: S = (1 + L)^(W/2 - 1) is 0 iff W >= 8`);
}

// ── witnesses: the law itself ─────────────────────────────────────
const run = (W: number, C: bigint, x0: bigint) => {
  const M = (1n << BigInt(W)) - 1n, w = BigInt(W);
  const rl = (x: bigint, s: bigint) => ((x << s) | (x >> (w - s))) & M, rr = (x: bigint, s: bigint) => ((x >> s) | (x << (w - s))) & M;
  const D = (x: bigint) => rl(x, 1n) ^ rl(x, 3n) ^ rr(x, 2n) ^ C;
  let x = x0; for (let i = 0; i < W / 2; i++) x = D(x);
  let y = x0; for (let i = 0; i < W / 4; i++) y = D(y);
  return { back: x === x0, quarter: y === x0 };
};
for (const W of [8, 16, 32, 64]) {
  const M = (1n << BigInt(W)) - 1n;
  for (const C of [0n, 0x1dn, 0x5a3cn, 0x1d1d1d1d1d1d1d1dn & M, M]) {
    for (const x0 of [1n, 0x2bn & M, 0x9e3779b97f4a7c15n & M]) {
      assert.ok(run(W, C & M, x0).back, `W = ${W}, C = ${C.toString(16)}: back at W/2`);
    }
  }
  assert.ok(!run(W, 0n, 1n).quarter, `W = ${W}: not back at W/4`);
}

// ── the falsifier: at W = 4 a constant survives ───────────────────
let survives = 0;
for (let C = 0n; C < 16n; C++) if (!run(4, C, 0n).back) survives++;
assert.ok(survives > 0, "W = 4: some constant does not drop out (3 (W/2 - 1) < W)");

console.log("I-246: the delta law's period is W/2 at every width W = 2^n, and from 8 bits up every constant drops out — passed");
console.log("  L^(2^k) doubles three exponents; at W/2 they are W/2, W/2, 0 and cancel to 1; at W/4 three remain");
console.log(`  S = (1 + L)^(W/2 - 1) = y^(3(W/2-1)) unit is 0 iff W >= 8; at W = 4, ${survives} of 16 constants survive`);
