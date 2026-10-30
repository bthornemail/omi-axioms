// i243.ts — I-243: the declared Delta law — replacement returns, difference collapses to one point
//
// The author, 2026-10-30, after I-242 (the original delta law of four steps, the atomic kernel's of
// twelve, "a delta64 for scaling metamemory"), pointing to boxedPINE core/src/index.ts 291-294 (delta64),
// the Omnicron Meta-Assembler Executable Trace Log Specification (omi-ii Research Lab _import/_abi, lines
// 847-1760: §9 the Delta Coordinate Law, §10 the Algorithmic Clock, the canonical summary) and boxedPINE
// proofs/coq/04-execution/KERNEL.v (kernel_delta64). The specification declares one law, DELTA_W(x) =
// ROTL_W(x,1) XOR ROTL_W(x,3) XOR ROTR_W(x,2) XOR CONSTANT_W, "No implementation may silently change:
// width, rotation jurisdiction, constant derivation, state law", and two state laws, a profile declaring
// exactly one: replacement, x' = DELTA_W(x), and difference, x' = x XOR DELTA_W(x). Predictions, stated
// before:
//
//   P1  the replacement law at 64 bits (§9.1, omnicron_delta64) returns every word by step 32 (W/2)
//   P2  the difference law cannot be undone: over GF(2), (I + L)^(W/2) = L^(W/2) + I = 0, so it brings
//       every word to a single point within W/2 steps; with constant 0 the point is 0
//   P3  the azimuth 0xAA55: its complement is its byte swap, 0x55AA (I-112: swap = presentation)
//       (the author, after: "The azimuth 0xAA55 was specifically used because i was modeling x86 boot kernel
//       and named it that or used that name to bind the modeling of projective geometry to the ascii table,
//       but an azimuth actually is a more specific definition than i abstracted for a canonical use case".
//       It is the boot signature, I-154: bytes 0x55 0xAA at 0x7DFE, read little-endian 0xAA55, big-endian
//       0x55AA: the two readings of one pair of bytes are each other's complement.)
//   P4  the clock 4320 = 6 x 3 x 4 x 60 = 72 x 60 = 6 x 720 (I-239's 72, I-182's 720); the boundaries
//       16^4 = 65,536 (I-241's blob) and 256^4 = 2^32 (I-179's meta-memory)
//
// Found: the difference law's collapse goes by eight a step: at 16 bits 65,536, 8,192, 1,024, 128, 16, 2,
// 1, the one point at step 6; each step quotients by the three-bit space of the replacement law's eight
// fixed points (I-240); at 64 bits, one point at step 22 (of 300 sampled, 64/3 rounded up). And against the
// specification: index.ts's delta64 rotates byte lanes (another rotation jurisdiction); KERNEL.v's
// kernel_delta64 shifts x left by one, takes its right term from a second input (axis) shifted by two,
// drops ROTL 3, and XORs 0x1D...1D: another law than §9's (at x = axis = 1 it gives 1d1d1d1d1d1d1d1f, §9
// gives 5d1d1d1d1d1d1d17), and its one theorem says only that equal inputs give equal outputs.
// All four predictions held.
import assert from "node:assert";

const M64 = (1n << 64n) - 1n;
const rl64 = (x: bigint, n: bigint) => ((x << n) | (x >> (64n - n))) & M64;
const rr64 = (x: bigint, n: bigint) => ((x >> n) | (x << (64n - n))) & M64;
const D64 = (x: bigint, c: bigint) => rl64(x, 1n) ^ rl64(x, 3n) ^ rr64(x, 2n) ^ c; // §9.1, omnicron_delta64
const rl16 = (x: number, n: number) => ((x << n) | (x >>> (16 - n))) & 0xffff;
const rr16 = (x: number, n: number) => ((x >>> n) | (x << (16 - n))) & 0xffff;
const D16 = (x: number, c: number) => rl16(x, 1) ^ rl16(x, 3) ^ rr16(x, 2) ^ c;
const K = 0x1d1d1d1d1d1d1d1dn;

// ── P1: replacement returns by 32 ─────────────────────────────────
for (let i = 0n; i < 200n; i++) {
  const x = (i * 0x9e3779b97f4a7c15n + 0x1234n) & M64;
  let y = x, k = 0; do { y = D64(y, K); k++; } while (y !== x && k <= 64);
  assert.ok(y === x && 32 % k === 0, `word ${i} back by step 32`);
}

// ── P2 and the found: difference collapses ────────────────────────
for (const c of [0, 0x1d1d, 0x5a3c]) {
  let cur = Array.from({ length: 65536 }, (_, x) => x);
  const sizes: number[] = [];
  for (let k = 1; k <= 8; k++) { cur = cur.map((y) => y ^ D16(y, c)); sizes.push(new Set(cur).size); }
  assert.deepEqual(sizes, [8192, 1024, 128, 16, 2, 1, 1, 1], `16 bits, C = ${c.toString(16)}: by eight a step, one at step 6`);
  if (c === 0) assert.equal(cur[0], 0, "with constant 0 the point is 0");
}
let fixed = 0; for (let x = 0; x < 65536; x++) if (D16(x, 0) === x) fixed++;
assert.equal(fixed, 8, "the eight a step: the replacement law's eight fixed points, three bits (I-240)");
let words = Array.from({ length: 300 }, (_, i) => (BigInt(i) * 0xd6e8feb86659fd93n + 7n) & M64);
const at: number[] = [];
for (let k = 1; k <= 32; k++) { words = words.map((y) => y ^ D64(y, 0n)); at.push(new Set(words.map(String)).size); }
assert.equal(at.indexOf(1) + 1, 22, "64 bits: one point at step 22");
assert.equal(at[31], 1, "and still one at step 32");
// the falsifier: replacement never collapses (it is a permutation)
const img = new Set<number>(); for (let x = 0; x < 65536; x++) img.add(D16(x, 0x1d1d));
assert.equal(img.size, 65536, "the replacement law is one-to-one");

// ── P3: the azimuth ───────────────────────────────────────────────
const swap16 = (x: number) => ((x & 0xff) << 8) | (x >> 8);
assert.equal(0xaa55 ^ 0xffff, 0x55aa, "0xAA55's complement is 0x55AA");
assert.equal(swap16(0xaa55), 0x55aa, "and so is its byte swap");
const SIG = Buffer.from([0x55, 0xaa]); // I-154: the boot signature at 0x7C00 + 510
assert.equal(SIG.readUInt16LE(0), 0xaa55, "the boot signature read little-endian is the azimuth");
assert.equal(SIG.readUInt16BE(0), 0x55aa, "read big-endian, its complement");

// ── P4: the clock and the boundaries ──────────────────────────────
assert.equal(6 * 3 * 4 * 60, 4320, "4320 = 6 x 3 x 4 x 60");
assert.equal(72 * 60, 4320, "= 72 x 60");
assert.equal(6 * 720, 4320, "= 6 x 720");
assert.equal(16 ** 4, 65536, "16^4: the blob");
assert.equal(256 ** 4, 2 ** 32, "256^4: the 4 GB meta-memory");

// ── KERNEL.v's kernel_delta64, against §9 ─────────────────────────
const kernelDelta64 = (x: bigint, axis: bigint) => (((x << 1n) ^ (axis >> 2n)) ^ K) & M64;
assert.equal(kernelDelta64(1n, 1n), 0x1d1d1d1d1d1d1d1fn, "KERNEL.v at x = axis = 1");
assert.equal(D64(1n, K), 0x5d1d1d1d1d1d1d17n, "§9 at x = 1");
assert.notEqual(kernelDelta64(1n, 1n), D64(1n, K), "another law");

console.log("I-243: the declared Delta law — replacement returns, difference collapses to one point — passed");
console.log("  64-bit replacement back by 32; difference: 65536 8192 1024 128 16 2 1, one point at step 6 (64 bits: 22), 0 for C = 0");
console.log("  0xAA55: complement = byte swap = 0x55AA; 4320 = 72 x 60 = 6 x 720; 16^4 the blob, 256^4 the meta-memory");
console.log("  KERNEL.v's kernel_delta64 is another law than §9's; index.ts's delta64 another rotation jurisdiction");
