// i242.ts — I-242: the knot, the fold, and delta64 — the author's words in the author's code
//
// The author, 2026-10-30: "this is the hamming example that i used the word zip to describe observing the
// popcount of each individual xor and xnor of a 65536 as the base case of nibbles in bytes increments of
// 16 concentric/consecutive 16^n of 64^n in 65536 and also why i used the word fold and original described
// it as a knot", pointing to boxedPINE core/src/index.ts, Node.bind (the knot), with the compute-hamming
// package's definition (the Hamming distance is the number of differences between two equal sequences).
// And, of the gnomonic projection said of the blob (I-241, blob-imprint): "I said those thing based on
// reading these articles before" (Wikipedia: Gnomonic projection, Azimuth, N-sphere): a reading after
// those articles, not derived here. bind and delta64 are copied below from index.ts as they are.
// Predictions, stated before:
//
//   P1  the knot is a pair: after bind(a, b), knot[knot[a]] = a; bind(a, a) leaves one entry, a to itself
//   P2  the fold: halving a 16-bit word by XOR, 16 to 8 to 4 to 2 to 1, leaves at width w popcounts in the
//       counts 2^(16 - w) C(w, k) over the blob; the XNOR popcount is w - k; the last fold is the parity, 0
//       for half the blob (the "ecc parity of any buffer")
//   P3  delta64 (index.ts), the delta law's shape on eight bytes, has a period to be stated, not assumed
//
// Found: the knot stays a set of pairs only while each key is bound once: after bind(a, b) and bind(a,
// c), b still points at a and a at c. And delta64 returns in 4 steps, not 8: it rotates eight byte
// lanes, not sixteen bits, and over GF(2) its map is L = x + x^3 + x^6 mod x^8 - 1, with L^4 = x^4 + x^12
// + x^24 = x^4 + x^4 + 1 = 1. index.ts has no popcount: the zip as the author describes it, the popcount
// of each XOR and XNOR, is the fold below, not delta64 (DeepSeek's relay called delta64 the zip).
import assert from "node:assert";

// ── from core/src/index.ts, as written ────────────────────────────
const knot: Record<string, string> = {};
function bind(rule: Buffer, ruler: Buffer) {
  const rulerKey = ruler.toString("hex");
  const ruleKey = rule.toString("hex");
  knot[rulerKey] = ruleKey;
  knot[ruleKey] = rulerKey;
  return knot;
}
const rotl = (buf: Buffer, n: number) => Buffer.from(buf.map((_, i) => buf[(i + n) % buf.length]!));
const rotr = (buf: Buffer, n: number) => Buffer.from(buf.map((_, i) => buf[(i - n + buf.length) % buf.length]!));
const xorb = (a: Buffer, b: Buffer) => Buffer.from(a.map((v, i) => v ^ b[i]!));
const delta64 = (buf: Buffer, C: Buffer) => xorb(xorb(xorb(rotl(buf, 1), rotl(buf, 3)), rotr(buf, 2)), C);

const clear = () => { for (const k of Object.keys(knot)) delete knot[k]; };
const A = Buffer.from("0102030405060708", "hex"), B = Buffer.from("1112131415161718", "hex"), C = Buffer.from("2122232425262728", "hex");
const h = (b: Buffer) => b.toString("hex");

// ── P1: the knot is a pair ────────────────────────────────────────
bind(A, B);
assert.equal(knot[knot[h(A)]!], h(A), "knot[knot[a]] = a");
assert.equal(knot[knot[h(B)]!], h(B), "and for b");
assert.equal(Object.keys(knot).length, 2, "two entries, one pair");
clear(); bind(A, A);
assert.deepEqual(knot, { [h(A)]: h(A) }, "a bound to itself: one entry, its own pair");

// ── Found: a second bind of a key breaks the earlier pair ─────────
clear(); bind(A, B); bind(A, C);
assert.equal(knot[h(A)], h(C), "a now to c");
assert.equal(knot[h(B)], h(A), "b still to a");
assert.notEqual(knot[knot[h(B)]!], h(B), "so b's pair is no longer a pair");

// ── P2: the fold ──────────────────────────────────────────────────
const pc = (v: number) => { let c = 0; for (; v; v &= v - 1) c++; return c; };
const choose = (n: number, k: number) => { let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i; return r; };
const fold = (x: number, w: number) => { let v = x, width = 16; while (width > w) { width /= 2; v = (v >> width) ^ (v & ((1 << width) - 1)); } return v; };
for (const w of [8, 4, 2, 1]) {
  const counts = new Array(w + 1).fill(0);
  for (let x = 0; x < 65536; x++) {
    const v = fold(x, w), k = pc(v);
    counts[k]++;
    assert.equal(pc(~v & ((1 << w) - 1)), w - k, "the XNOR popcount is w - k");
  }
  assert.deepEqual(counts, Array.from({ length: w + 1 }, (_, k) => 2 ** (16 - w) * choose(w, k)), `folded to ${w} bits: 2^(16-${w}) C(${w}, k)`);
}
let even = 0; for (let x = 0; x < 65536; x++) if (fold(x, 1) === 0) even++;
assert.equal(even, 32768, "the last fold is the parity: 0 for half the blob");
assert.equal(fold(0x5a3c, 1), pc(0x5a3c) & 1, "and it is the parity of the word's bits");

// ── P3 and the found: delta64's period ────────────────────────────
for (const c of ["0000000000000000", "1d1d1d1d1d1d1d1d", "5a3c5a3c5a3c5a3c"]) {
  const K = Buffer.from(c, "hex");
  for (const s of ["0102030405060708", "8000000000000000", "13579bdf02468ace"]) {
    let x = Buffer.from(s, "hex"), n = 0;
    do { x = delta64(x, K); n++; } while (!x.equals(Buffer.from(s, "hex")) && n < 64);
    assert.ok(n <= 4 && 4 % n === 0, `delta64 with C ${c} from ${s}: back in ${n}, a divisor of 4`);
  }
}
// L = x + x^3 + x^6 on eight lanes: L^4 = 1 (exponents mod 8, pairs cancelling over GF(2))
const mul = (p: number[], q: number[]) => { const r = new Array(8).fill(0); p.forEach((a, i) => q.forEach((b, j) => { r[(i + j) % 8] ^= a & b; })); return r; };
const L = [0, 1, 0, 1, 0, 0, 1, 0];
assert.deepEqual(mul(mul(L, L), mul(L, L)), [1, 0, 0, 0, 0, 0, 0, 0], "L^4 = 1");
// the falsifier: the bit-level law at 16 bits does not return in 4
const r16 = (x: number) => ((((x << 1) | (x >>> 15)) ^ ((x << 3) | (x >>> 13)) ^ ((x >>> 2) | (x << 14))) & 0xffff);
let y = 0x0001; for (let i = 0; i < 4; i++) y = r16(y);
assert.notEqual(y, 0x0001, "the 16-bit law is not back at step 4; delta64's 4 is its own");

console.log("I-242: the knot, the fold, and delta64 — the author's words in the author's code — passed");
console.log("  bind: knot[knot[a]] = a; a key bound twice breaks its earlier pair");
console.log("  the fold 16-8-4-2-1 by XOR: 2^(16-w) C(w,k) at each width, XNOR w - k, the parity last, 0 for half");
console.log("  delta64 rotates bytes: L = x + x^3 + x^6 mod x^8 - 1, L^4 = 1, period 4, not 8; no popcount in index.ts");
