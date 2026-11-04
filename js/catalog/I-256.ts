// i256.ts — I-256: Euclid I.3 on the triangular grid — the cut is a root, and a root's continued fraction repeats: the natural repetend
//
// The author, 2026-11-04, after I.3's cut was found not to be a grid point in general: "yes that is the exact
// constraint i wanted to ensure we can bridge becuase it realtes to the delta law. its more the natural variant of
// invaraint Repetend", then "yes" to building it, and "this is about a meta-circular slide ruler really a self dual
// one", "its the ability to do exactly what you did to the decimal length to transliteration". I.3's JavaScript side;
// its Verilog (ZIGUAROTH _ELEMENTS/I/I-3.v, I-3.tb.v: the recurrence in gates, both simulators 240 240 240 0) and Coq
// (_ELEMENTS/I/I-3.coq.v: the cut exact over the reals, on the standard axioms of Coq's reals) stand beside it.
//
// Heath's I.3: "Given two unequal straight lines, to cut off from the greater a straight line equal to the less."
// The cut is E = A + lam (B - A), lam^2 = N(CD) / N(AB); lam is rational exactly when N(CD) N(AB) is a square, and
// otherwise a square root. A rational's decimal repeats (its repetend, by the recurrence r -> 10 r mod q); a square
// root's decimal never does, but its continued fraction does (Lagrange), by the whole-number recurrence
// m' = d a - m, d' = (n - m'^2) / d, a' = floor((a0 + m') / d'), from (0, 1, a0), its period closing on a = 2 a0.
// Classical: Lagrange (1770) for the period, Euler and Lagrange for Pell's equation; the binding to the record is the
// author's reading.
//
// Carried from the Verilog run, checked here first:
//   K1  the 240 non-squares n from 2 to 255 each have a period; every step of the recurrence agrees with the
//       definition, and the last convergent p/q before 2 a0 satisfies p^2 - n q^2 = (-1)^L, L the period
//   K2  the opposite sign holds for none
// Stated before running here:
//   P1  for norms N(AB) > N(CD) of grid lines up to 31, the cut is a grid fraction exactly when N(CD) N(AB) is a
//       square, and E is then exact; otherwise lam^2 is still a whole ratio, and lam's continued fraction periodic
//   P2  the period's state repeats: (m, d) after L steps equals (m, d) after the first step
//   P3  the decimal repetend and the continued-fraction period are both orbits of whole-number recurrences on a finite
//       state: q states for 1/q, fewer than 2n for sqrt(n) (m < sqrt n, d <= 2 sqrt n)
import assert from "node:assert";

const isSquare = (n: number) => Math.round(Math.sqrt(n)) ** 2 === n;
function cf(n: number) {	// the continued fraction of sqrt(n): a0, the period's terms, and the states
  const a0 = Math.floor(Math.sqrt(n));
  let m = 0, d = 1, a = a0;
  const terms: number[] = [], states: string[] = [];
  do {
    m = d * a - m;
    assert.equal((n - m * m) % d, 0, `sqrt ${n}: d divides n - m^2`);
    d = (n - m * m) / d;
    a = Math.floor((a0 + m) / d);
    terms.push(a); states.push(`${m},${d}`);
  } while (a !== 2 * a0);
  return { a0, terms, states };
}
function pell(n: number, a0: number, terms: number[]) {	// the convergent before the closing 2 a0
  let [pp, p, qq, q] = [0n, 1n, 1n, 0n];
  for (const a of [a0, ...terms.slice(0, -1)]) { [pp, p] = [p, BigInt(a) * p + pp]; [qq, q] = [q, BigInt(a) * q + qq]; }
  return p * p - BigInt(n) * q * q;
}

// K1, K2
let cases = 0, pellOk = 0, wrong = 0;
for (let n = 2; n < 256; n++) {
  if (isSquare(n)) continue;
  cases++;
  const { a0, terms } = cf(n);
  const v = pell(n, a0, terms), want = terms.length % 2 === 0 ? 1n : -1n;
  if (v === want) pellOk++;
  if (v === -want) wrong++;
}
assert.deepEqual([cases, pellOk, wrong], [240, 240, 0], "K1, K2: 240 non-squares, all certified by Pell, the opposite sign in none");

// P1: the cut over the grid
const N = (x: number, y: number) => x * x - x * y + y * y;
const norms = new Set<number>();
for (let x = -6; x <= 6; x++) for (let y = -6; y <= 6; y++) { const v = N(x, y); if (v > 0 && v <= 31) norms.add(v); }
let rational = 0, root = 0;
for (const na of norms) for (const nc of norms) {
  if (nc >= na) continue;
  if (isSquare(nc * na)) {
    rational++;
    const s = Math.round(Math.sqrt(nc * na));	// lam = s / na, exactly
    assert.equal(s * s, nc * na, "P1: lam^2 na = nc in whole numbers");
  } else {
    root++;
    const { terms } = cf(nc * na);	// sqrt(nc na) / na: its root part is periodic
    assert.ok(terms.length >= 1 && terms.at(-1) === 2 * Math.floor(Math.sqrt(nc * na)), "P1: the root's continued fraction closes its period");
  }
}
assert.ok(rational > 0 && root > 0, `P1: both kinds occur (${rational} rational, ${root} roots)`);

// P2
for (let n = 2; n < 256; n++) if (!isSquare(n)) {
  const { a0, terms, states } = cf(n);
  let m = 0, d = 1, a = a0;
  for (let i = 0; i <= terms.length; i++) { m = d * a - m; d = (n - m * m) / d; a = Math.floor((a0 + m) / d); }
  assert.equal(`${m},${d}`, states[0], `P2: sqrt ${n}: the state after L + 1 steps is the state after one`);
}

// P3: the decimal repetend's orbit (r -> 10 r mod q) beside the continued fraction's
const repetendLength = (q: number) => { let r = 1 % q, k = 0; do { r = (r * 10) % q; k++; } while (r !== 1 % q); return k; };
assert.deepEqual([41, 7, 73, 9091].map(repetendLength), [5, 6, 8, 10], "P3: the decimal repetends 5, 6, 8, 10 (repetend)");
for (let n = 2; n < 256; n++) if (!isSquare(n)) assert.ok(cf(n).terms.length < 2 * n, `P3: sqrt ${n}'s period below its state count`);
const periods = [7, 13, 19, 31, 43].map((n) => cf(n).terms.length);
assert.deepEqual(periods, [4, 5, 6, 8, 10], "P3: periods 4, 5, 6, 8, 10 at sqrt 7, 13, 19, 31, 43");

console.log("I-256: Euclid I.3 on the triangular grid — the cut is a root, and a root's continued fraction repeats: the natural repetend — passed");
console.log("  240 non-squares in 2..255: each period closes on 2 a0 and is certified by Pell's equation, the opposite sign never (Cver and Icarus: 240 240 240 0)");
console.log(`  cuts between grid lines up to norm 31: ${rational} rational, ${root} roots, each root periodic; the decimal repetends 5 6 8 10 and the root periods 5 6 8 10 (sqrt 13, 19, 31, 43)`);
