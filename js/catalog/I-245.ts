// i245.ts — I-245: the delta law scaled up the truth-table ladder — returns at W/2, collapses at ceil(W/3)
//
// The author, 2026-10-30, of omi-canon dev-docs/"scaling the delta law.md": "well just read this as its
// where i was first explaining the need for a delta64". The document (the author's, a reply in it
// confirming the scaling) sets the delta law's width by the truth table: n Boolean inputs give a word of
// W = 2^n output positions, and the law rolls the positions of one word, not the 2^(2^n) possible words:
// n = 4, 5, 6, 7, 8 give 16, 32, 64, 128 and 256 bits; at n = 6 one complete truth-table word is 64 bits,
// the Omnicron word, 2^64 the population (the Omnicron specification's canonical summary; I-243).
// Already on record: the replacement law's period W/2 at these widths (unbound PLAN9 zak, in/ak/period);
// the difference law's collapse measured at 16 and 64 bits (I-243). Predictions, stated before:
//
//   P1  the replacement law's linear part L = x + x^3 + x^-2 in GF(2)[x]/(x^W - 1) has order W/2 at each
//       width of the ladder
//   P2  the difference law's I + L is y^3 (1 + y + y^2) with y = x + 1, the second factor a unit, so each
//       difference step removes three bits and (I + L)^k = 0 first at k = ceil(W/3): 6, 11, 22, 43, 86
//
// Both held. The factorization: x^2 (I + L) = 1 + x^2 + x^3 + x^5; with x = 1 + y over GF(2), (1+y)^2 =
// 1 + y^2, (1+y)^3 = 1 + y + y^2 + y^3, (1+y)^5 = 1 + y + y^4 + y^5, and the sum is y^3 + y^4 + y^5 =
// y^3 (1 + y + y^2); and x^W - 1 = (x + 1)^W = y^W at W a power of two.
import assert from "node:assert";

// GF(2)[x]/(x^W - 1): an element is a W-bit mask; multiplication is cyclic convolution
const mul = (a: bigint, b: bigint, W: number) => {
  const M = (1n << BigInt(W)) - 1n; let r = 0n;
  for (let i = 0; i < W; i++) if ((a >> BigInt(i)) & 1n) r ^= ((b << BigInt(i)) | (b >> BigInt(W - i))) & M;
  return r;
};

const LADDER: [number, number][] = [[4, 16], [5, 32], [6, 64], [7, 128], [8, 256]]; // inputs, width
for (const [n, W] of LADDER) {
  assert.equal(2 ** n, W, `${n} inputs: a ${W}-bit truth-table word`);
  const bit = (k: number) => 1n << BigInt(((k % W) + W) % W);
  const L = bit(1) ^ bit(3) ^ bit(-2), IL = bit(0) ^ L;

  // ── P1: replacement, order W/2 ──────────────────────────────────
  let q = L, j = 1; while (q !== 1n && j < 2 * W) { q = mul(q, L, W); j++; }
  assert.equal(j, W / 2, `W = ${W}: L has order W/2 = ${W / 2}`);

  // ── P2: difference, collapse at ceil(W/3) ───────────────────────
  let p = IL, k = 1; while (p !== 0n && k < W + 2) { p = mul(p, IL, W); k++; }
  assert.equal(k, Math.ceil(W / 3), `W = ${W}: (I + L)^k = 0 first at k = ceil(W/3) = ${Math.ceil(W / 3)}`);
  // the falsifier: one step short, it is not yet zero
  let r = IL; for (let i = 1; i < k - 1; i++) r = mul(r, IL, W);
  assert.notEqual(r, 0n, `W = ${W}: at k - 1 = ${k - 1} not yet zero`);
}

// the factorization over GF(2)[y], polynomials as bit masks (bit i is y^i)
const pmul = (a: number, b: number) => { let r = 0; for (let i = 0; b >> i; i++) if ((b >> i) & 1) r ^= a << i; return r; };
const pow = (a: number, e: number) => { let r = 1; for (let i = 0; i < e; i++) r = pmul(r, a); return r; };
const onePlusY = 0b11;
const sum = 1 ^ pow(onePlusY, 2) ^ pow(onePlusY, 3) ^ pow(onePlusY, 5); // 1 + x^2 + x^3 + x^5 at x = 1 + y
assert.equal(sum, 0b111000, "x^2 (I + L) = y^3 + y^4 + y^5");
assert.equal(sum, pmul(0b1000, 0b111), "= y^3 (1 + y + y^2)");
assert.equal(0b111 & 1, 1, "and 1 + y + y^2 has constant term 1: a unit mod y^W");

console.log("I-245: the delta law scaled up the truth-table ladder — returns at W/2, collapses at ceil(W/3) — passed");
console.log("  4..8 inputs, W = 16..256: L has order 8, 16, 32, 64, 128; (I + L) is nilpotent at 6, 11, 22, 43, 86");
console.log("  I + L = y^3 (1 + y + y^2), y = x + 1: three bits a difference step, so ceil(W/3)");
