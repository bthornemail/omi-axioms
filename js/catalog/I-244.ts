// i244.ts — I-244: the renamed authorities' witnesses — 0x1E, 0x3C, 0x78, 0x18, and the azimuth's seam
//
// The author, 2026-10-30, of why the protocol's names: "okay i found it thi explais why i used the names.
// i was trying to bind them to narratives so that they help me narrate the model build boundaries
// constraints and nesting and inference rules or references", pointing to omi-canon dev-docs (The OMINO
// Azimuth and Centroidal Conservation Model; The OMI Standard Model; The Geometry of the Word as Form;
// scaling the delta law; Logical Encoding Surface of a Composable Tetrahedral Polyharmonic Block) and
// _temp/projection vs affine/The Renaming of the OMI Resolver Authorities.md (Tetragrammatron Relation
// Governor, Metatron Incidence Scribe, Gnomonic Projection Azimuth, Omicron, Omnicron). Its witnesses,
// the author's, checked here. Predictions, stated before:
//
//   P1  over the Polybius nibble field 0..F, the diagonals D+ = {0,5,A,F} and D- = {3,6,9,C} each XOR to 0
//       and each sum to 0x1E (§3.3)
//   P2  the eight diagonal cells and the other eight both sum to 0x3C; the field sums to 0x78 = 0x3C << 1;
//       0x3C ^ 0x78 = 0x44 (§3.4, §3.5)
//   P3  B ^ (B ^ 0x1B) ^ (B ^ 0x1C) ^ (B ^ 0x1F) = 0x18 = 4! in each sector, B four times cancelling, so
//       for every byte B (§4.3); with addition it does not hold
//   P4  0xAA55 and 0x55AA each hold eight ones and eight zeros, and are complements (§5.2)
//
// All four held. Found: §5.2's "every adjacent step displays contrast" holds within each byte, not across
// the word: 0xAA55 and 0x55AA each have one pair of equal neighbouring bits, where the two bytes meet (a
// word alternating throughout, 0xAAAA, has none); the seam is where the boot signature's two bytes join
// (I-154, I-243).
import assert from "node:assert";

const xr = (a: number[]) => a.reduce((x, y) => x ^ y, 0);
const sm = (a: number[]) => a.reduce((x, y) => x + y, 0);
const FIELD = [...Array(16).keys()];
const Dp = [0x0, 0x5, 0xa, 0xf], Dm = [0x3, 0x6, 0x9, 0xc];

// ── P1 ────────────────────────────────────────────────────────────
assert.equal(xr(Dp), 0, "D+ XORs to 0");
assert.equal(xr(Dm), 0, "D- XORs to 0");
assert.equal(sm(Dp), 0x1e, "D+ sums to 0x1E");
assert.equal(sm(Dm), 0x1e, "D- sums to 0x1E");

// ── P2 ────────────────────────────────────────────────────────────
const U = [...Dp, ...Dm], K = FIELD.filter((v) => !U.includes(v));
assert.deepEqual(K, [0x1, 0x2, 0x4, 0x7, 0x8, 0xb, 0xd, 0xe], "the complement {1,2,4,7,8,B,D,E}");
assert.equal(sm(U), 0x3c, "the diagonals sum to 0x3C");
assert.equal(sm(K), 0x3c, "and so does the rest");
assert.equal(sm(FIELD), 0x78, "the field sums to 0x78");
assert.equal(0x3c << 1, 0x78, "0x3C << 1 = 0x78");
assert.equal(0x3c ^ 0x78, 0x44, "0x3C ^ 0x78 = 0x44");

// ── P3 ────────────────────────────────────────────────────────────
for (const B of [0x00, 0x20, 0x40, 0x60]) assert.equal(B ^ (B ^ 0x1b) ^ (B ^ 0x1c) ^ (B ^ 0x1f), 0x18, `sector ${B.toString(16)}`);
for (let B = 0; B < 256; B++) assert.equal(B ^ (B ^ 0x1b) ^ (B ^ 0x1c) ^ (B ^ 0x1f), 0x18, "every byte B");
assert.equal(0x18, 24, "0x18 = 24 = 4!");
let added = 0; for (let B = 0; B < 256; B++) if (((B + (B + 0x1b) + (B + 0x1c) + (B + 0x1f)) & 0xff) === 0x18) added++;
assert.equal(added, 0, "the falsifier: with addition, no B gives 0x18");

// ── P4 and the found ──────────────────────────────────────────────
const pc = (v: number) => { let c = 0; for (; v; v &= v - 1) c++; return c; };
const equalNeighbours = (v: number, width = 16) => { let e = 0; for (let i = 0; i < width - 1; i++) if (((v >> i) & 1) === ((v >> (i + 1)) & 1)) e++; return e; };
assert.deepEqual([pc(0xaa55), pc(0x55aa)], [8, 8], "eight ones each");
assert.equal(0xaa55 ^ 0x55aa, 0xffff, "complements");
assert.deepEqual([equalNeighbours(0xaa55), equalNeighbours(0x55aa)], [1, 1], "one pair of equal neighbours each");
assert.equal((0xaa55 >> 7) & 1, (0xaa55 >> 8) & 1, "and it is at the seam, bits 7 and 8");
assert.equal(equalNeighbours(0xaaaa), 0, "a word alternating throughout has none");
assert.deepEqual([equalNeighbours(0xaa, 8), equalNeighbours(0x55, 8)], [0, 0], "each byte alone alternates");

console.log("I-244: the renamed authorities' witnesses — 0x1E, 0x3C, 0x78, 0x18, and the azimuth's seam — passed");
console.log("  diagonals XOR 0, sum 0x1E; diagonals and rest 0x3C each; field 0x78; 0x3C ^ 0x78 = 0x44");
console.log("  B ^ (B^1B) ^ (B^1C) ^ (B^1F) = 0x18 = 4! for every byte; 0xAA55, 0x55AA: 8 ones, one equal pair at the seam");
