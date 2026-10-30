// i248.ts — I-248: the algorithmic clock — time as a word of the 65,536 blob, and step recovery proved again
//
// The author, 2026-10-30, of metaverse-build's time ported to Plan 9: "so this binds time to a logic unit of
// a binary 65536 pixelate right"; then, pointing to omi-files/atomic-kernel/dev-docs/CyclicClock.v,
// algorithmic_clock_whitepaper_v2.md and haskell/The Triple Time System.md: "this is what i meant by "Time"
// as logic"; asked whether to prove it again and port it to Plan 9: "yes both would work". The claim, the
// author's words as CyclicClock.v quotes them: "When prime factorials are divided by even numbers, there is a
// point that makes an infinite recursive fraction. We stop after one full set — that's the step length we
// propagate forward. If we keep track of the values from the infinite recursion, we can factor the step
// results by that small recursive fraction and get the steps it took to get there." (The file formalizes it
// with a prime q outside the primorial, not an even number.)
//
// The clock (whitepaper §6, §9): a state is one 16-bit word, the blob's; next(x) = rotl(x,1) ^ rotl(x,3) ^
// rotr(x,2) ^ 0x1D1D, the delta law (I-195, I-197); a tick XORs B[t mod 8] in first, B = [0,1,3,6,9,8,6,3],
// the digits of 1/73. Step k of a spin is B_k = R k mod (10^T - 1), R = (10^T - 1)/q, T = ord_q(10);
// recovery is k = B_k R^-1 mod q.
//
// The proof of recovery, without axioms. Let q be a prime other than 2 and 5, T = ord_q(10). Then q divides
// 10^T - 1 by the definition of T, so R is an integer and 10^T - 1 = R q. For 1 <= k <= T <= q - 1 < q,
// R k < R q, so B_k = R k exactly, and B_k = R k (mod q). If q does not divide R, R is a unit mod q and
// B_k R^-1 = k (mod q), which is k itself, k being below q. If q divides R, every B_k is 0 mod q and no k
// comes back. So recovery holds for every step exactly when q^2 does not divide 10^T - 1. The whitepaper's
// argument that q never divides R ("then q^2 would divide 10^T - 1, contradicting the minimality of T")
// does not follow: minimality of T says nothing of q^2. q = 3 (10 - 1 = 9) and q = 487 (a base-10
// Wieferich prime) are the two below 2000, where both the whitepaper's §2.2 to §3.2 general claim and
// CyclicClock.v's Axiom roundtrip_general fail.
//
// Predictions, stated before:
//
//   P1  from 0x0001 the whitepaper's cycle, 5D17 98CC CCD3 1110 B3F9 89DD 223D, back at step 8
//   P2  under 0x1D1D not every state turns in 8 and some never move (I-195), against §6.2's "the constant
//       0x1D1D provides mixing to avoid fixed points"
//   P3  with B injected (the clock's tick, §6.5), every state returns at 16: two spins, not one
//   P4  k R is a rotation of R's digits (§2.4) exactly when T = q - 1, so not for 73, the clock's own prime;
//       recovery, which does not use rotation, holds for all of the whitepaper's table
//   P5  CyclicClock.v's Axiom fermat_little (forall p a, is_prime p -> a mod p <> 0 -> 10^(p-1) mod p = 1)
//       is false at p = 2, a = 1: 10 mod 2 = 0. (Coq 8.18 derives False from it alone; the whole file does
//       not compile there, its 142857 in unary nat overflowing the stack.)
//
// All five held. Found, not predicted: the hands' periods (§7.2: minute 16, hour 4) are those of 65,280 of
// the 65,536 states, not all; recovery fails exactly where q divides R, 3 and 487 below 2000.
// Not adopted: the Triple Time System's p-adic, frame and frequency times, which the author dates before hex,
// binary or logic (global.vtt, 2026-10-28); nothing here derives them.
import assert from "node:assert";

const M = 0xffff;
const rotl = (x: number, n: number) => ((x << n) | (x >>> (16 - n))) & M;
const rotr = (x: number, n: number) => ((x >>> n) | (x << (16 - n))) & M;
const next = (x: number) => (rotl(x, 1) ^ rotl(x, 3) ^ rotr(x, 2) ^ 0x1d1d) & M;
const B = [0, 1, 3, 6, 9, 8, 6, 3];
const tick = (t: number, x: number) => next(x ^ B[t % 8]!);
const period = (f: (x: number) => number, x: number) => { let y = f(x), k = 1; while (y !== x) { y = f(y); k++; } return k; };
const counts = (f: (x: number) => number) => { const c = new Map<number, number>(); for (let x = 0; x <= M; x++) { const p = period(f, x); c.set(p, (c.get(p) ?? 0) + 1); } return Object.fromEntries([...c].sort((a, b) => b[0] - a[0])); };

// ── P1: the cycle from 0x0001 ─────────────────────────────────────
const cyc = [1]; for (let i = 0; i < 8; i++) cyc.push(next(cyc.at(-1)!));
assert.deepEqual(cyc, [0x0001, 0x5d17, 0x98cc, 0xccd3, 0x1110, 0xb3f9, 0x89dd, 0x223d, 0x0001], "the whitepaper's 8-cycle");

// ── P2: 0x1D1D turns unevenly; eight states never move ────────────
assert.deepEqual(counts(next), { 8: 61440, 4: 4032, 2: 56, 1: 8 }, "periods under 0x1D1D");
const fixed = [...Array(M + 1).keys()].filter((x) => next(x) === x);
assert.deepEqual(fixed, [0x14be, 0x278d, 0x41eb, 0x72d8, 0x8d27, 0xbe14, 0xd872, 0xeb41], "the eight fixed points");

// ── P3: with B injected every state returns at 16 ─────────────────
for (let x = 0; x <= M; x++) {
  let s = x; for (let t = 0; t < 8; t++) s = tick(t, s);
  assert.notEqual(s, x, `${x}: not back after one spin`);
  for (let t = 8; t < 16; t++) s = tick(t, s);
  assert.equal(s, x, `${x}: back after two spins`);
}

// ── the hands (§7.2), found: their periods hold for 65,280 states ─
const minute = (x: number) => rotl(x, 1) ^ 0xaaaa, hour = (x: number) => rotl(rotl(x, 3), 1) ^ 0xaaaa;
assert.deepEqual(counts(minute), { 16: 65280, 8: 240, 4: 12, 2: 2, 1: 2 }, "minute hand");
assert.deepEqual(counts(hour), { 4: 65280, 2: 240, 1: 16 }, "hour hand");

// ── the cyclic numbers ────────────────────────────────────────────
const isPrime = (n: number) => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
const ord = (q: number) => { let k = 1, v = 10 % q; while (v !== 1) { v = (v * 10) % q; k++; } return k; };
const inv = (a: bigint, q: bigint) => { for (let i = 1n; i < q; i++) if ((a * i) % q === 1n) return i; return undefined; };
const spin = (q: number) => {
  const T = ord(q), Mq = 10n ** BigInt(T) - 1n, R = Mq / BigInt(q), Q = BigInt(q), r = inv(R % Q, Q);
  const blocks = [...Array(T).keys()].map((i) => (R * BigInt(i + 1)) % Mq);
  const recovered = r !== undefined && blocks.every((b, i) => { const k = ((b % Q) * r) % Q; return (k === 0n ? Q : k) === BigInt(i + 1); });
  const s = R.toString().padStart(T, "0");
  const rotations = blocks.every((b) => (s + s).includes(b.toString().padStart(T, "0")));
  return { T, R, recovered, rotations };
};
const table: [number, number, string][] = [[7, 6, "142857"], [11, 2, "9"], [13, 6, "76923"], [17, 16, "588235294117647"], [19, 18, "52631578947368421"],
  [23, 22, "434782608695652173913"], [31, 15, "32258064516129"], [37, 3, "27"], [41, 5, "2439"], [73, 8, "1369863"]];
for (const [q, T, R] of table) {
  const s = spin(q);
  assert.equal(s.T, T, `ord_${q}(10)`); assert.equal(s.R.toString(), R, `R for ${q}`);
  assert.ok(s.recovered, `${q}: every step recovered`);
  // ── P4: rotation exactly at full period ─────────────────────────
  assert.equal(s.rotations, T === q - 1, `${q}: k R a rotation of R iff T = q - 1`);
}
assert.equal([...Array(1000).keys()].find((q) => isPrime(q) && q !== 2 && q !== 5 && ord(q) === 8), 73, "73: the smallest prime of period 8");
assert.deepEqual([...((10n ** 8n - 1n) / 73n).toString().padStart(8, "0")].map(Number), B, "B: the digits of 1/73");
assert.equal(B.reduce((a, b) => a + b), 36, "sum B = 36");

// ── the proof's condition: recovery holds exactly where q does not divide R ─
const fails: number[] = [];
for (let q = 3; q < 2000; q++) {
  if (!isPrime(q) || q === 5) continue;
  const s = spin(q), divides = s.R % BigInt(q) === 0n;
  assert.equal(s.recovered, !divides, `${q}: recovered iff q does not divide R`);
  if (divides) fails.push(q);
}
assert.deepEqual(fails, [3, 487], "below 2000, q divides R at 3 and 487 only");

// ── P5: the axiom fermat_little at p = 2, a = 1 ───────────────────
const pow10mod = (k: number, q: number) => { let v = 1 % q; for (let i = 0; i < k; i++) v = (10 * v) % q; return v; };
assert.ok(isPrime(2) && 1 % 2 !== 0 && pow10mod(2 - 1, 2) !== 1, "fermat_little's premises hold at p = 2, a = 1 and its conclusion does not");

// ── the falsifier: without the injection a spin of 8 returns ──────
let back = 0; for (let x = 0; x <= M; x++) { let s = x; for (let t = 0; t < 8; t++) s = next(s); if (s === x) back++; }
assert.equal(back, 65536, "the bare law returns every state at 8 (I-197), so P3's 16 is the injection's");

console.log("I-248: the algorithmic clock — time as a word of the 65,536 blob, and step recovery proved again — passed");
console.log("  0x0001 cycles in 8; under 0x1D1D 8 states never move; with B injected every state returns at 16, not 8");
console.log("  k R rotates R only at full period (not at 73); recovery holds exactly where q does not divide R: fails at 3 and 487");
console.log("  CyclicClock.v's fermat_little is false at p = 2");
