// i249.ts — I-249: the Klein configuration from the author's coordinates, and Miquel's cube inside it
//
// The author, 2026-11-01, of networking the gates: "yes we connect or network the miquel cofiguration of the
// 8T and 6T with mobius-kantor of 5T and 10T", correcting the relay that named Möbius-Kantor: "the 5t and 10
// are described with the Klien configuration"; and, pointing to the author's documents (omi-ii Research Lab,
// The Light Garden Perfect CLoCK; The 240 LED Clock; The Final Invariant Time; boxed _archive, The OMI
// Algorithms, Algorithm 37): the Klein configuration, 60 points, 60 planes, 15 through each, 60 x 4 = 240,
// and its points "4D projective coordinate[s]": P1 = [0:0:1:1], P2 = [0:0:1:i], ..., P60 = [1:-i:-i:-1].
//
// Found first, by a search (exploration, not predicted): the projective points with coordinates in
// {0, ±1, ±i}, under coordinate permutations and phases i^k whose product is 1, fall into orbits of 4, 16,
// 16, 16, 16, 24 and 64; a point p lies on the plane q when p . q = 0; of all unions of orbits, exactly one
// has 60 points with each on 15 of the 60 planes and holds the author's three named points: the 4 unit
// points, the 24 with two coordinates, and the 32 with four (an even number of them ±i). The incidence is
// symmetric, so each plane holds 15 points: (60_15), by planes, where the documents say lines.
// Found with it: the other 32 of the 64 (an odd number of ±i) give a (60_15) too, the same configuration with
// one coordinate times i, holding neither the author's P60 nor the cube. Predicted then, for Miquel's configuration (the cube: 8 points, 6 circles; braille-miquel, stella-swap):
//
//   P1  the cube's 8 points [1:±1:±1:±1] are among the 60
//   P2  the 6 planes [1:∓1:0:0], [1:0:∓1:0], [1:0:0:∓1] are among the 60, each holding one face of the cube
//       (4 of its 8 points), each cube point on 3 of them: Miquel's (8_3 6_4) inside Klein's (60_15)
//   P3  each of those 6 planes holds 15 of the 60, so each face is 4 of 15
//   P4  split by sign parity, the stella octangula's two tetrahedra put 2 points of each in each of the 6
//
// All four held. Not derived here: which configuration the 5T and 10T gates are (the author's reading), and
// the documents' "15 lines through each point" (the 60 are joined by planes here).
import assert from "node:assert";

type C = [number, number];	// a + bi, a and b in {-1, 0, 1}
const mul = (x: C, y: C): C => [x[0] * y[0] - x[1] * y[1], x[0] * y[1] + x[1] * y[0]];
const add = (x: C, y: C): C => [x[0] + y[0], x[1] + y[1]];
const U: C[] = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const ZERO: C = [0, 0];
const isZero = (x: C) => x[0] === 0 && x[1] === 0;
const inv = (x: C): C => [x[0], -x[1]];	// for a unit, its conjugate
const key = (v: C[]) => v.map((x) => `${x[0]},${x[1]}`).join(";");
function norm(v: C[]): C[] {	// scaled so its first non-zero coordinate is 1
  const f = v.find((x) => !isZero(x))!;
  return v.map((x) => mul(x, inv(f)));
}
const dot = (p: C[], q: C[]) => isZero(p.reduce((s, x, i) => add(s, mul(x, q[i]!)), ZERO));

// every projective point with coordinates in {0, ±1, ±i}
const all = new Map<string, C[]>();
const vals: C[] = [ZERO, ...U];
for (const a of vals) for (const b of vals) for (const c of vals) for (const d of vals) {
  const v = [a, b, c, d];
  if (v.every(isZero)) continue;
  const n = norm(v); all.set(key(n), n);
}
const perms = (n: number): number[][] => (n === 1 ? [[0]] : perms(n - 1).flatMap((p) => Array.from({ length: n }, (_, i) => [...p.slice(0, i), n - 1, ...p.slice(i)])));
const P4 = perms(4);
const phases = U.flatMap((a) => U.flatMap((b) => U.flatMap((c) => U.map((d) => [a, b, c, d])))).filter((ph) => { const p = ph.reduce((s, x) => mul(s, x), [1, 0] as C); return p[0] === 1 && p[1] === 0; });
const orbitOf = (v: C[]) => new Set(P4.flatMap((pm) => phases.map((ph) => key(norm(pm.map((j, k) => mul(v[j]!, ph[k]!)))))));
const orbits: string[][] = [];
const seen = new Set<string>();
for (const [k, v] of all) { if (seen.has(k)) continue; const o = orbitOf(v); o.forEach((x) => seen.add(x)); orbits.push([...o]); }
assert.deepEqual(orbits.map((o) => o.length).sort((a, b) => a - b), [4, 16, 16, 16, 16, 24, 64], "the orbits");

const named = [[ZERO, ZERO, [1, 0], [1, 0]], [ZERO, ZERO, [1, 0], [0, 1]], [[1, 0], [0, -1], [0, -1], [-1, 0]]].map((v) => key(norm(v as C[])));
const regular = (S: C[][]) => S.every((p) => S.filter((q) => dot(p, q)).length === 15);
const found: string[][] = [];
for (let mask = 1; mask < 1 << orbits.length; mask++) {
  const S = orbits.filter((_, i) => mask & (1 << i)).flat();
  if (S.length !== 60 || !named.every((n) => S.includes(n))) continue;
  if (regular(S.map((k) => all.get(k)!))) found.push(S);
}
assert.equal(found.length, 1, "exactly one union of orbits: 60 points, each on 15 of the 60 planes, the named three among them");
const K = found[0]!.map((k) => all.get(k)!);
const inK = (v: C[]) => found[0]!.includes(key(norm(v)));
const zeros = (v: C[]) => v.filter(isZero).length;
assert.deepEqual([0, 2, 3].map((z) => K.filter((v) => zeros(v) === z).length), [32, 24, 4], "32 with four coordinates, 24 with two, 4 units");
assert.ok(K.every((q) => K.filter((p) => dot(p, q)).length === 15), "each plane holds 15: the incidence is symmetric");

// ── P1: the cube's 8 points ──────────────────────────────────────
const sign = (s: number): C => [s, 0];
const cube = [-1, 1].flatMap((a) => [-1, 1].flatMap((b) => [-1, 1].map((c) => [sign(1), sign(a), sign(b), sign(c)])));
assert.ok(cube.every(inK), "P1: [1:±1:±1:±1] among the 60");

// ── P2, P3: the 6 face planes ────────────────────────────────────
const faces = [1, 2, 3].flatMap((j) => [-1, 1].map((s) => { const q: C[] = [sign(1), ZERO, ZERO, ZERO]; q[j] = sign(-s); return { j, s, q }; }));
for (const f of faces) {
  assert.ok(inK(f.q), "P2: the face plane among the 60");
  const on = cube.filter((p) => dot(p, f.q));
  assert.equal(on.length, 4, "P2: a face, 4 of the cube's 8");
  assert.ok(on.every((p) => p[f.j]![0] === f.s), "P2: the face where coordinate j is s");
  assert.equal(K.filter((p) => dot(p, f.q)).length, 15, "P3: 15 of the 60 on it");
}
assert.ok(cube.every((p) => faces.filter((f) => dot(p, f.q)).length === 3), "P2: each cube point on 3 faces: (8_3 6_4)");

// ── P4: the stella octangula ─────────────────────────────────────
const parity = (p: C[]) => p.slice(1).filter((x) => x[0] < 0).length % 2;
for (const f of faces) {
  const on = cube.filter((p) => dot(p, f.q));
  assert.deepEqual([0, 1].map((t) => on.filter((p) => parity(p) === t).length), [2, 2], "P4: 2 of each tetrahedron on each face");
}

// ── found: the other 32 of the 64 give a (60_15) too, the same configuration with one coordinate times i;
//    it holds neither the author's P60 = [1:-i:-i:-1] nor the cube: the named point picks the copy with Miquel
const other = orbits.filter((o) => o.length === 16 && !o.some((k) => found[0]!.includes(k))).flat();
const K2 = [...K.filter((v) => zeros(v) !== 0), ...other.map((k) => all.get(k)!)];
assert.equal(K2.length, 60);
assert.ok(regular(K2), "found: the other half gives (60_15) as well");
const timesI = (v: C[]) => key(norm([v[0]!, v[1]!, v[2]!, mul(v[3]!, [0, 1])]));
assert.ok(K.every((v) => K2.map((w) => key(norm(w))).includes(timesI(v))), "found: it is the first with the last coordinate times i");
assert.ok(!K2.map((w) => key(norm(w))).includes(named[2]!) && !cube.some((p) => K2.map((w) => key(norm(w))).includes(key(norm(p)))), "found: it holds neither P60 nor the cube");

// ── the falsifier: one point swapped between the two halves breaks the 15 ──
const swapped = [...K.filter((v) => key(norm(v)) !== key(norm(cube[0]!))), all.get(other[0]!)!];
assert.equal(swapped.length, 60);
assert.ok(!regular(swapped), "one point swapped: no longer each on 15");

console.log("I-249: the Klein configuration from the author's coordinates, and Miquel's cube inside it — passed");
console.log("  one union of orbits of {0,±1,±i} points holds the named three: 4 + 24 + 32 = 60, each on 15 of 60 planes");
console.log("  the cube's 8 points and 6 face planes are among them: Miquel's (8_3 6_4) inside Klein's (60_15)");
