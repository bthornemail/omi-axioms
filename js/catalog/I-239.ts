// i239.ts — I-239: the celestial orbit, 72 — the clock of 1/73, Wilson at its neighbours, the two periods
//
// The author, 2026-10-29 and 30, of day 4's clock: "the celestial clock was like the aegean we
// described using dionysius and this" (Wirth's PL360 example, R0, R1, R2 and FLAG turned, unbound PLAN9
// src/step.h), "like the main hello world function in C from B" (src/hello.c); then "the celestial
// orbit is the 72 based on the 1008 * 5 of the 5040, which relates to the 1/73 prime factorial like the
// 59,60,61 and modulus of the factorial 9,10,11 in the documentations". The author's documentation,
// cited, not redone: the atomic kernel's crystal.py, "Source: repeating digits of 1/73 (period 8). 73 is
// the smallest prime with decimal period 8 ... so 73 is forced, not chosen", B = [0,1,3,6,9,8,6,3], W =
// 36; and algorithmic_clock_whitepaper_v2.md (omi-files atomic-kernel dev-docs), its table row 73 | 8 |
// 72, Fermat's bound (the period divides q - 1), and its "core intuition": "prime factorials divided by
// numbers outside the primorial produce infinite repeating decimals whose periods are the natural step
// lengths". Dionysius: environment.vtt five-in-the-period, his cycle 532 = 28 x 19. Predictions, this
// record's, stated before the checks:
//
//   P1  5040 : 1008 = 360 : 72 = 5: the five takes 7! to 1008 as it takes the turn to 72, a fifth of it
//   P2  "the 1/73 prime factorial" as Wilson's theorem: (n - 1)! mod n is n - 1 exactly when n is prime:
//       at 73 (72! mod 73 = 72), and at the author's neighbours, 59 and 61 beside 60, 11 beside 10; at the
//       composites between, 9, 10, 60 and 72, it is 0
//   P3  1/73 repeats with period 8 in base 10 (the kernel's T) and 9 in base 2 (2^9 - 1 = 511 = 7 x 73,
//       I-194's E7)
//   P4  the orbit of 72: the residues 1 to 72 under multiplication mod 73 are one cycle, and 20 = 2 x 10,
//       the binary 9 and the decimal 8 together, runs through all of it: 72 = 8 x 9
//
// All four held. That 1/73's digits are B is the author's (crystal.py), and is checked again here.
import assert from "node:assert";

const factMod = (n: bigint, m: bigint) => { let r = 1n; for (let k = 2n; k <= n; k++) r = (r * k) % m; return r; };
const order = (a: number, m: number) => { let x = a % m, k = 1; while (x !== 1) { x = (x * a) % m; k++; } return k; };
const isPrime = (n: number) => n > 1 && [...Array(n).keys()].slice(2).every((d) => d * d > n || n % d);

// ── P1 ────────────────────────────────────────────────────────────
assert.equal(1008 * 5, 5040, "1008 x 5 = 5040 = 7!");
assert.equal(72 * 5, 360, "72 x 5 = 360");
assert.equal(5040 / 1008, 360 / 72, "the same five");
assert.equal(5040 / 72, 70, "and 5040 = 72 x 70");

// ── P2: Wilson ────────────────────────────────────────────────────
for (const n of [9, 10, 11, 59, 60, 61, 72, 73]) {
  const r = factMod(BigInt(n - 1), BigInt(n));
  assert.equal(r, isPrime(n) ? BigInt(n - 1) : 0n, `(${n - 1})! mod ${n} = ${isPrime(n) ? n - 1 : 0}`);
}

// ── P3: the two periods ───────────────────────────────────────────
assert.equal(order(10, 73), 8, "1/73 in base 10: period 8");
assert.equal(order(2, 73), 9, "1/73 in base 2: period 9");
assert.equal(2 ** 9 - 1, 7 * 73, "511 = 7 x 73 (I-194)");
const digits = String(Math.round((10 ** 8 - 1) / 73)).padStart(8, "0");
assert.equal(digits, "01369863", "the repeating block of 1/73");
assert.deepEqual([...digits].map(Number), [0, 1, 3, 6, 9, 8, 6, 3], "is the kernel's B (crystal.py, the author's)");
assert.equal([...digits].reduce((s, d) => s + Number(d), 0), 36, "and its digits sum to W = 36");

// ── P4: the orbit of 72 ───────────────────────────────────────────
assert.equal(order(20, 73), 72, "20 = 2 x 10 has order 72 mod 73");
const orbit = new Set<number>(); let x = 1; for (let k = 0; k < 72; k++) { orbit.add(x); x = (x * 20) % 73; }
assert.equal(orbit.size, 72, "its powers are all 72 residues: one orbit");
assert.equal(order(10, 73) * order(2, 73), 72, "8 x 9 = 72, the decimal and the binary periods");
// the falsifier: 10 alone does not run the orbit, nor does 2
assert.ok(order(10, 73) < 72 && order(2, 73) < 72, "neither base alone runs all 72");
// and beside 60 the reptends are full: 59 and 61 have periods 58 and 60
assert.deepEqual([order(10, 59), order(10, 61)], [58, 60], "1/59 and 1/61 repeat with periods 58 and 60");

console.log("I-239: the celestial orbit, 72 — the clock of 1/73, Wilson at its neighbours, the two periods — passed");
console.log("  5040 : 1008 = 360 : 72 = 5; (n-1)! mod n = n-1 at 11, 59, 61, 73, 0 at 9, 10, 60, 72");
console.log("  1/73: period 8 in base 10 (0 1 3 6 9 8 6 3, the kernel's B), 9 in base 2; 20 = 2 x 10 runs all 72 = 8 x 9");
