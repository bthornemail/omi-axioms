// i240.ts — I-240: Agreement Is All You Need — the omicron cast, the frame's width, the period within eight
//
// The author, 2026-10-30, of their essay "Agreement Is All You Need" (boxed _archive/_inbox/ATENTtion
// AGREEment/, with its doctrine and operators): "this was before the we came up with the Axiom of
// Propagation, I was my version of attention is all we need, but with agreement". The essay is the
// author's, signed; its claims checked here are the ones the record can reach: the frame omi---imo, the
// genesis frame 0100-03bf-7c00-2b01-2f01-1434-039f-01ff (omi-tetragrammatron portal's GOLDEN_POINTER),
// the quadratic law, and the delta law with C = 0x5A3C (omi-tetragrammatron core/omicron.c, delta16).
// Not found on this machine and so not checked: the ring slot 1504, the 572 tests, the eBPF/XDP gate and
// the WASM module; they stand as the essay's statements. Predictions, this record's, stated before:
//
//   P1  omi, U+03BF, and imo, U+039F, segments 2 and 7 of the genesis frame, differ by 0x20: the case
//       cast (OMI.WSN lowers a vowel by 0x20), so omi and imo are one letter, cast
//   P2  under the delta law with C = 0x5A3C, eight steps return every one of the 65,536 states (the
//       constant drops out at 16 bits; unbound zgnomon)
//   P3  the frame's eight 16-bit segments are 128 bits, the width of an IPv6 address
//   P4  the quadratic law, 60x^2 + 16xy + 4y^2, is omi_pi_proof.v's bqf (I-182)
//
// Found: P2 holds, but "every state returns to its origin in exactly eight steps" is within eight, not
// exactly: 61,440 states return first at 8, 4,032 at 4, 56 at 2, and 8 at 1, the same for C = 0x1D1D (the
// atomic kernel's); the states returned by steps 1, 2, 4 and 8 number 2^3, 2^6, 2^12 and 2^16. The fixed
// points are eight: a space of three bits. All four predictions held.
import assert from "node:assert";

const rotl = (x: number, n: number) => ((x << n) | (x >>> (16 - n))) & 0xffff;
const rotr = (x: number, n: number) => ((x >>> n) | (x << (16 - n))) & 0xffff;
const delta = (x: number, c: number) => rotl(x, 1) ^ rotl(x, 3) ^ rotr(x, 2) ^ c;

// ── P1: the omicron cast ──────────────────────────────────────────
const FRAME = "0100-03bf-7c00-2b01-2f01-1434-039f-01ff".split("-").map((h) => parseInt(h, 16));
assert.equal(FRAME[1], 0x03bf, "segment 2: omi, small omicron");
assert.equal(FRAME[6], 0x039f, "segment 7: imo, capital omicron");
assert.equal(FRAME[1]! ^ FRAME[6]!, 0x20, "they differ by 0x20, the case cast");
assert.equal(String.fromCodePoint(FRAME[1]!).toUpperCase(), String.fromCodePoint(FRAME[6]!), "ο upper is Ο");

// ── P3: the width ─────────────────────────────────────────────────
assert.equal(FRAME.length * 16, 128, "eight 16-bit segments, 128 bits, an IPv6 address");
assert.ok(FRAME.every((s) => s >= 0 && s <= 0xffff), "each a 16-bit word");

// ── P2 and the found: the period within eight ─────────────────────
for (const C of [0x5a3c, 0x1d1d]) {
  const least: Record<number, number> = {};
  for (let x = 0; x < 65536; x++) {
    let y = x, k = 0;
    do { y = delta(y, C); k++; } while (y !== x && k < 8);
    assert.equal(y, x, `C = ${C.toString(16)}: ${x} returns by step 8`);
    least[k] = (least[k] ?? 0) + 1;
  }
  assert.deepEqual(least, { 1: 8, 2: 56, 4: 4032, 8: 61440 }, `C = ${C.toString(16)}: least periods 1, 2, 4, 8`);
}
assert.deepEqual([8, 8 + 56, 8 + 56 + 4032, 65536], [2 ** 3, 2 ** 6, 2 ** 12, 2 ** 16], "returned by 1, 2, 4, 8 steps: 2^3, 2^6, 2^12, 2^16");
// the falsifier: "exactly eight" is not true of every state
let fixed = 0;
for (let x = 0; x < 65536; x++) if (delta(x, 0x5a3c) === x) fixed++;
assert.equal(fixed, 8, "eight states are fixed: they return in one step, not eight");

// ── P4: the quadratic law ─────────────────────────────────────────
const Q = (x: number, y: number) => 60 * x * x + 16 * x * y + 4 * y * y;
assert.equal(Q(1, 1), 80, "Q(1,1) = 60 + 16 + 4");
assert.equal(Q(2, 3), 4 * (15 * 4 + 4 * 6 + 9), "bqf x y = 4 (15x^2 + 4xy + y^2), omi_pi_proof.v's bqf_decompose");

console.log("I-240: Agreement Is All You Need — the omicron cast, the frame's width, the period within eight — passed");
console.log("  ο (03bf) and Ο (039f) differ by 0x20; eight 16-bit segments, 128 bits; Q = 60x^2 + 16xy + 4y^2, the bqf");
console.log("  delta, C = 5a3c or 1d1d: every state back by step 8; least periods 8 (61440), 4 (4032), 2 (56), 1 (8)");
