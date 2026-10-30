// i241.ts — I-241: the 65,536 blob — any state from any other by one XOR, the same arrangement from every point
//
// The author, in a DeepSeek conversation filed at boxed _archive/_chat_history/"We don't have to multiply
// because every" (2026-10-30), their own lines: "We don't have to multiply because every buffer or BLob of
// 65536 already hold the same topological arrangement"; "This is not + and x this is XNOR and XOR because
// we use literal character codepoints not values"; "Yes it's effectively xor and xnor the ecc parity of
// any buffer ... it's like that in the zipping of the hamming code distance and displacement and
// distribution in any 65536 with any 64ⁿ or 16ⁿ"; "Remember the 65536 binary blob is a complete logical
// imprint of any computional environment. We have already displayed that we can reconcile any state from
// any other state." Already proved and cited: I-193 (the author's "ASCII table to the Hamming code ...
// ziptie", the Hamming (7,4) code tiling the 128 ASCII codes), I-141 (the XOR of 0 to 2^n - 1 is 0, the
// parity of the whole range). This record takes the claim to 16 bits. Predictions, stated before:
//
//   P1  any 16-bit state is reached from any other by exactly one XOR, with their difference
//   P2  every row of the 65,536 XOR table is a rearrangement of all 65,536 words: every buffer holds the
//       same arrangement
//   P3  from any point the other states lie at Hamming distances in the same counts, C(16, k), and XOR
//       moves every point without changing any distance: the arrangement is the same from every point
//   P4  the falsifier: addition mod 2^16 changes distances ("not + and x")
//
// All four held.
import assert from "node:assert";

const pc = (v: number) => { let c = 0; for (; v; v &= v - 1) c++; return c; };
const C = (n: number, k: number) => { let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i; return r; };
const POINTS = [0x0000, 0x5a3c, 0x1d1d, 0xffff, 0x03bf, 0x039f];

// ── P1: one XOR between any two ───────────────────────────────────
for (const x of POINTS) for (const y of POINTS) {
  let n = 0; for (let d = 0; d < 65536; d++) if ((x ^ d) === y) n++;
  assert.equal(n, 1, `one d takes ${x} to ${y}`);
  assert.equal(x ^ (x ^ y), y, "and it is their difference");
}

// ── P2: every row the same arrangement ────────────────────────────
for (const x of POINTS) {
  const seen = new Uint8Array(65536);
  for (let d = 0; d < 65536; d++) seen[x ^ d]! += 1;
  assert.ok(seen.every((v) => v === 1), `row ${x} holds each word once`);
}

// ── P3: the same distances from every point ───────────────────────
const want = Array.from({ length: 17 }, (_, k) => C(16, k));
for (const x of POINTS) {
  const h = new Array(17).fill(0);
  for (let y = 0; y < 65536; y++) h[pc(x ^ y)]++;
  assert.deepEqual(h, want, `from ${x}: 1, 16, 120, ..., 12870, ..., 16, 1`);
}
for (let i = 0; i < 100000; i++) {
  const x = (i * 40503) & 0xffff, y = (i * 2654435761) & 0xffff, a = (i * 97) & 0xffff;
  assert.equal(pc((x ^ a) ^ (y ^ a)), pc(x ^ y), "XOR keeps every distance");
}

// ── P4: addition does not ─────────────────────────────────────────
assert.equal(pc(0 ^ 1), 1, "d(0, 1) = 1");
assert.equal(pc(((0 + 1) & 0xffff) ^ ((1 + 1) & 0xffff)), 2, "but d(0 + 1, 1 + 1) = 2: adding the same to both moved them apart");

console.log("I-241: the 65,536 blob — any state from any other by one XOR, the same arrangement from every point — passed");
console.log("  one XOR between any two states; every row of the XOR table a rearrangement of all 65,536");
console.log("  Hamming distances from any point: C(16,k); XOR keeps them, addition does not");
