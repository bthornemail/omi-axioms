// i254.ts — I-254: Euclid I.1 on the triangular grid — the equilateral triangle on a given line, its two meeting points by whole-number turns, checked by the norm
//
// The author, 2026-11-04, of Euclid I.1 built in Verilog (ZIGUAROTH _ELEMENTS/I/I-1.v, run under GPL Cver and
// Icarus Verilog): "this is binding and testing physical containment virtually we just need parity with the coq
// proof an the i-series proofs in js". This record is the JavaScript side of that parity: the same construction and
// the same norm as the Verilog module, over the same 28,392 pairs, computed the same way (bytes, modulo 256), with
// the same falsifier. The general statement, for every A and B, is the Coq file beside the Verilog
// (_ELEMENTS/I/I-1.coq.v, checked by coqc, no axioms; outside this catalog's coq/ registry, which is closed to new files).
//
// Heath's I.1: "On a given finite straight line to construct an equilateral triangle." A point is one 16-bit word,
// two signed bytes (a, b), the Eisenstein integer a + b w (w^2 = -1 - w), where an equilateral triangle has whole
// corners; its squared length is the norm N(a, b) = a^2 - ab + b^2, read whole, no root taken. With d = B - A, the
// two meeting points are C = A + d(1 + w), d(1 + w) = (dx - dy, dx), and C' = A + d(-w), d(-w) = (dy, dy - dx).
//
// Carried from the Verilog run (both simulators: 28392 28392 28392 0), and checked here before any other claim:
//   K1  of the 13^4 - 13^2 = 28,392 ordered pairs of distinct points in -6..6, C and C' each make an equilateral
//       triangle with A and B in every pair
//   K2  C and C' are apart in every pair
//   K3  the point a third of a turn round A, A + dw, is equilateral in none
// Stated before running here:
//   P1  the same holds over every ordered pair of distinct points in -20..20 (41^4 - 41^2 = 2,824,080 pairs), computed in integers
//   P2  the byte computation (modulo 256) and the integer one give the same points wherever the integers fit a byte
//   P3  a module turned the wrong way (C taken as A + dw) holds in no pair: the check can fail
//   P4  on the square grid no three lattice points make an equilateral triangle among the points of -6..6 (by the
//       ordinary squared length): the triangular grid is needed
import assert from "node:assert";

const N = (x: number, y: number) => x * x - x * y + y * y;
const equilateral = (ax: number, ay: number, bx: number, by: number, cx: number, cy: number) => {
  const ab = N(bx - ax, by - ay);
  return ab > 0 && N(cx - ax, cy - ay) === ab && N(cx - bx, cy - by) === ab;
};
const sb = (v: number) => { v &= 0xff; return v < 0x80 ? v : v - 0x100; };	// a byte read signed, as omi_check.c reads it
const word = (a: number, b: number) => ((a & 0xff) << 8) | (b & 0xff);
const pointOf = (w: number) => [sb(w >> 8), sb(w)] as const;

// The module as the Verilog computes it, in bytes
function euclidI1(A: number, B: number) {
  const [ax, ay] = [(A >> 8) & 0xff, A & 0xff], [bx, by] = [(B >> 8) & 0xff, B & 0xff];
  const dx = (bx - ax) & 0xff, dy = (by - ay) & 0xff;
  return { C: word(ax + dx - dy, ay + dx), C2: word(ax + dy, ay + dy - dx) };
}

function run(lo: number, hi: number, wrong = false) {
  let pairs = 0, held = 0, apart = 0, third = 0;
  for (let ax = lo; ax <= hi; ax++) for (let ay = lo; ay <= hi; ay++) for (let bx = lo; bx <= hi; bx++) for (let by = lo; by <= hi; by++) {
    if (ax === bx && ay === by) continue;
    pairs++;
    const dx = bx - ax, dy = by - ay;
    if (lo >= -6 && hi <= 6) {	// the byte path, as the Verilog
      const { C, C2 } = euclidI1(word(ax, ay), word(bx, by));
      const [cx, cy] = wrong ? [ax - dy, ay + dx - dy] : pointOf(C), [ex, ey] = pointOf(C2);
      if (equilateral(ax, ay, bx, by, cx, cy) && equilateral(ax, ay, bx, by, ex, ey)) held++;
      if (C !== C2) apart++;
      const [ix, iy] = [ax + dx - dy, ay + dx];	// P2: the integer path
      assert.deepEqual(pointOf(C), [ix, iy], "P2: bytes and integers agree");
    } else {	// the integer path
      const [cx, cy] = [ax + dx - dy, ay + dx], [ex, ey] = [ax + dy, ay + dy - dx];
      if (equilateral(ax, ay, bx, by, cx, cy) && equilateral(ax, ay, bx, by, ex, ey)) held++;
      if (cx !== ex || cy !== ey) apart++;
    }
    if (equilateral(ax, ay, bx, by, ax - dy, ay + dx - dy)) third++;
  }
  return { pairs, held, apart, third };
}

// K1 to K3: the Verilog's four numbers
assert.deepEqual(run(-6, 6), { pairs: 28392, held: 28392, apart: 28392, third: 0 }, "K1-K3: 28392 28392 28392 0, as both simulators printed");
// P1
const wide = run(-20, 20);
assert.deepEqual(wide, { pairs: 41 ** 4 - 41 ** 2, held: 41 ** 4 - 41 ** 2, apart: 41 ** 4 - 41 ** 2, third: 0 }, "P1: every pair in -20..20");
// P3
assert.equal(run(-6, 6, true).held, 0, "P3: the wrong turn holds in no pair");
// P4: the square grid, ordinary squared length
let square = 0;
const pts: [number, number][] = [];
for (let x = -6; x <= 6; x++) for (let y = -6; y <= 6; y++) pts.push([x, y]);
const d2 = (p: [number, number], q: [number, number]) => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2;
for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) for (let k = j + 1; k < pts.length; k++) {
  const a = d2(pts[i]!, pts[j]!); if (a === d2(pts[i]!, pts[k]!) && a === d2(pts[j]!, pts[k]!)) square++;
}
assert.equal(square, 0, "P4: no equilateral triangle on the square grid");

// the falsifier of the check itself: a wrong norm (the square grid's) rejects the triangular construction
const Nsq = (x: number, y: number) => x * x + y * y;
assert.notEqual(Nsq(1 - 0, 1), Nsq(1, 0), "under the square grid's length the turn (1,0) -> (1,1) is not a rotation");

console.log("I-254: Euclid I.1 on the triangular grid — the equilateral triangle on a given line, its two meeting points by whole-number turns, checked by the norm — passed");
console.log("  28,392 pairs in -6..6, bytes as the Verilog: both meeting points equilateral, apart in every pair, the third-of-a-turn point never (Cver and Icarus: 28392 28392 28392 0)");
console.log(`  ${wide.pairs.toLocaleString("en-US")} pairs in -20..20 in integers, all holding; the wrong turn holds in none; the square grid has no equilateral triangle`);
