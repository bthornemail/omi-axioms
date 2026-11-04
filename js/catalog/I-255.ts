// i255.ts — I-255: Euclid I.2 on the triangular grid — a line equal to a given line placed at a given point, carried whole and turned by the six units
//
// The author, 2026-11-04: "okay lets contine with the _ELEMENTS", after Euclid I.1 held three ways (I-254, its Verilog
// and Coq in ZIGUAROTH _ELEMENTS). This is I.2's JavaScript side; its Verilog (_ELEMENTS/I/I-2.v, I-2.tb.v, under GPL
// Cver and Icarus Verilog, both printing 115248 115248 115248 0) and Coq (_ELEMENTS/I/I-2.coq.v, coqc, four theorems,
// no axioms) stand beside it.
//
// Heath's I.2: "To place at a given point (as an extremity) a straight line equal to a given straight line." Euclid
// carries the length with I.1 and two circles, his compass closing when lifted; on the triangular grid the line BC is
// carried to A whole, L = A + (C - B), and turned by any of the six units of the grid (1, 1 + w, w, -1, -1 - w, -w),
// each of norm 1, so the six whole places for L on the circle about A of radius BC are A + (C - B) u.
//
// Carried from the Verilog run, checked here first:
//   K1  of the 49 x 49 x 48 = 115,248 cases (A any point, B and C distinct, coordinates in -3..3), AL = BC and
//       AL6 = BC (L6 = A + BC(1 + w)) in every case, computed in bytes as the module computes them
//   K2  the falsifier A + 2 BC is equal in none
// Stated before running here:
//   P1  each of the six units has norm 1, and the six L are distinct for B <> C: six places, not fewer
//   P2  in -5..5 (121^2 x 120 = 1,756,920 cases) every one of the six L keeps the length, in integers
//   P3  no other point at that distance from A is missed among the six when |BC| is a unit: the circle of norm 1 about
//       a point holds exactly six grid points
import assert from "node:assert";

const N = (x: number, y: number) => x * x - x * y + y * y;
const mul = (x: number, y: number, s: number, t: number) => [x * s - y * t, x * t + y * s - y * t] as const;	// (x + yw)(s + tw), w^2 = -1 - w
const UNITS = [[1, 0], [1, 1], [0, 1], [-1, 0], [-1, -1], [0, -1]] as const;
const sb = (v: number) => { v &= 0xff; return v < 0x80 ? v : v - 0x100; };

// K1, K2: bytes, as the Verilog module
let cases = 0, eq = 0, eq6 = 0, twice = 0;
for (let ax = -3; ax <= 3; ax++) for (let ay = -3; ay <= 3; ay++) for (let bx = -3; bx <= 3; bx++) for (let by = -3; by <= 3; by++)
  for (let cx = -3; cx <= 3; cx++) for (let cy = -3; cy <= 3; cy++) {
    if (bx === cx && by === cy) continue;
    cases++;
    const dx = (cx - bx) & 0xff, dy = (cy - by) & 0xff, bc = N(cx - bx, cy - by);
    const L = [sb(ax + dx), sb(ay + dy)], L6 = [sb(ax + dx - dy), sb(ay + dx)];
    if (N(L[0]! - ax, L[1]! - ay) === bc) eq++;
    if (N(L6[0]! - ax, L6[1]! - ay) === bc) eq6++;
    if (N(sb(ax + 2 * dx) - ax, sb(ay + 2 * dy) - ay) === bc) twice++;
  }
assert.deepEqual([cases, eq, eq6, twice], [115248, 115248, 115248, 0], "K1, K2: 115248 115248 115248 0, as both simulators printed");

// P1
for (const [s, t] of UNITS) assert.equal(N(s, t), 1, `P1: unit (${s}, ${t}) has norm 1`);
assert.equal(new Set(UNITS.map(([s, t]) => mul(2, 1, s, t).join())).size, 6, "P1: the six turns of a line are six places");

// P2
let wide = 0;
for (let bx = -5; bx <= 5; bx++) for (let by = -5; by <= 5; by++) for (let cx = -5; cx <= 5; cx++) for (let cy = -5; cy <= 5; cy++) {
  if (bx === cx && by === cy) continue;
  const bc = N(cx - bx, cy - by);
  for (const [s, t] of UNITS) { const [u, v] = mul(cx - bx, cy - by, s, t); assert.equal(N(u, v), bc); }
  wide++;
}
assert.equal(wide * 121, 1756920, "P2: 121 places for A times 14,520 pairs B, C");	// A only translates: N(L - A) does not depend on A

// P3
let onUnitCircle = 0;
for (let x = -3; x <= 3; x++) for (let y = -3; y <= 3; y++) if (N(x, y) === 1) onUnitCircle++;
assert.equal(onUnitCircle, 6, "P3: six grid points at norm 1");

console.log("I-255: Euclid I.2 on the triangular grid — a line equal to a given line placed at a given point, carried whole and turned by the six units — passed");
console.log("  115,248 cases in -3..3, bytes as the Verilog: L and L6 equal to BC in all, A + 2 BC in none (Cver and Icarus: 115248 115248 115248 0)");
console.log("  the six units of norm 1 give six places; every turn keeps the length over -5..5; the circle of norm 1 holds exactly six grid points");
