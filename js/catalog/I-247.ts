// i247.ts — I-247: the tetrahedron as three pairs of orthogonal edges in parallel planes
//
// The author, 2026-10-30, of I-246's proof (the delta law's period W/2 at every width, derived by Claude
// at the author's request, the squaring move of zgnomon's 16-bit check): "yes two infinite parallel lines,
// cross with 2 orthogonal pairs of parallel incidences of instationtaions and its a tetrahedron". Read on
// the tetrahedron already in the record: the even one of the stella octangula, the 3-bit words of even
// parity, {0, 3, 5, 6} (omi-types testStellaOctangula; steiner-miquel: the Fano line 3 5 6 with the null).
// Predictions, stated before:
//
//   P1  its six edges are three pairs of opposite edges (the author's one pair of lines and two pairs)
//   P2  the two edges of each pair lie in two parallel planes, opposite faces of the cube, one coordinate
//       fixed at 0 for one edge and at 1 for the other
//   P3  the two edges of each pair are orthogonal
//   P4  joining the endpoints of two such edges gives all six edges: the tetrahedron is the two segments
//
// All four held. Not adopted from DeepSeek's relay: x and x^-1 as the lines and y and y^-1 as the pairs
// (y = x + 1 has no inverse in GF(2)[x]/(x^W - 1), where y^W = 0); "the author's proof" (it was derived
// here, at the author's request).
import assert from "node:assert";

const P = (w: number) => [(w >> 2) & 1, (w >> 1) & 1, w & 1];
const T = [0, 3, 5, 6];
const edges = T.flatMap((a, i) => T.slice(i + 1).map((b) => [a, b] as [number, number]));
assert.equal(edges.length, 6, "six edges");

// ── P1: three pairs of opposite edges ─────────────────────────────
const opposite = (e: [number, number], f: [number, number]) => !e.some((v) => f.includes(v));
const pairs = edges.flatMap((e, i) => edges.slice(i + 1).filter((f) => opposite(e, f)).map((f) => [e, f] as const));
assert.equal(pairs.length, 3, "three pairs of opposite edges");

for (const [[a, b], [c, d]] of pairs) {
  const A = P(a), B = P(b), C = P(c), D = P(d);
  // ── P2: parallel planes ─────────────────────────────────────────
  const axis = [0, 1, 2].find((i) => A[i] === B[i] && C[i] === D[i] && A[i] !== C[i]);
  assert.ok(axis !== undefined, `${a}-${b} and ${c}-${d}: in two parallel faces of the cube`);
  // ── P3: orthogonal ──────────────────────────────────────────────
  const u = A.map((v, i) => B[i]! - v), v = C.map((x, i) => D[i]! - x);
  assert.equal(u.reduce((s, x, i) => s + x * v[i]!, 0), 0, `${a}-${b} and ${c}-${d}: orthogonal`);
  // ── P4: the two segments make the tetrahedron ───────────────────
  const joined = [[a, b], [c, d], [a, c], [a, d], [b, c], [b, d]].map(([p, q]) => [Math.min(p!, q!), Math.max(p!, q!)].join("-")).sort();
  assert.deepEqual(joined, edges.map(([p, q]) => `${p}-${q}`).sort(), "their endpoints joined: all six edges");
}
// the falsifier: two edges sharing a vertex are not in parallel faces
const [[a, b]] = [edges[0]!], f = edges.find((e) => e.includes(a) && e !== edges[0])!;
const A = P(a), B = P(b), C = P(f[0]), D = P(f[1]);
assert.equal([0, 1, 2].find((i) => A[i] === B[i] && C[i] === D[i] && A[i] !== C[i]), undefined, "adjacent edges are not in parallel faces");

console.log("I-247: the tetrahedron as three pairs of orthogonal edges in parallel planes — passed");
console.log("  {0,3,5,6}: 0-3 / 5-6, 0-5 / 3-6, 0-6 / 3-5; each pair in opposite cube faces, orthogonal; two segments joined make all six edges");
