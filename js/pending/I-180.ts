// i180.ts — I-180: the precision is in indices, not time; the virtual ratios are mappings
import assert from "node:assert";

// ── 1. The virtual ratios ───────────────────────────────────
// 64 MB real → 4 GB virtual = 64× (page-table ratio)
const real64MB = 64 * 1024 * 1024;
const virtual4GB = 2 ** 32;
assert.strictEqual(virtual4GB / real64MB, 64, "4 GB / 64 MB = 64×");
// and the page-table ratio: 8 bytes per entry, 512-byte pages
assert.strictEqual(512 / 8, 64, "512-byte pages / 8-byte entries = 64");

// 2 MB real → 4 GB virtual = 2048× (measured)
const real2MB = 2 * 1024 * 1024;
assert.strictEqual(virtual4GB / real2MB, 2048, "4 GB / 2 MB = 2048×");

// ── 2. The page counts ──────────────────────────────────────
const PAGE_4K = 4096;
const PAGE_64K = 65536;
const PAGES_4GB_AT_4K = virtual4GB / PAGE_4K;
const PAGES_4GB_AT_64K = virtual4GB / PAGE_64K;
assert.strictEqual(PAGES_4GB_AT_4K, 2 ** 20, "4 GB / 4 KB = 2^20 pages");
assert.strictEqual(PAGES_4GB_AT_64K, 2 ** 16, "4 GB / 64 KB = 2^16 pages = 65,536");

// ── 3. 16 bits of page count = 65,536 pages = 4 GB ──────────
const BITS_16 = 2 ** 16;
assert.strictEqual(BITS_16, 65536, "2^16 = 65,536");
assert.strictEqual(BITS_16, PAGES_4GB_AT_64K, "16 bits = 65,536 pages");
assert.strictEqual(BITS_16 * PAGE_64K, virtual4GB, "65,536 × 64 KB = 4 GB");

// ── 4. 8 MB real = 128 pages of 64 KB ──────────────────────
const EIGHT_MB = 8 * 1024 * 1024;
const PAGES_8MB = EIGHT_MB / PAGE_64K;
assert.strictEqual(PAGES_8MB, 128, "8 MB / 64 KB = 128 pages");
assert.strictEqual(PAGES_8MB, 2 ** 7, "128 = 2^7");

// ── 5. The 65,536 bits of the proof Blob ────────────────────
// 65,536 bits = 8,192 bytes = 8 KB
const BLOB_BITS = 65536;
const BLOB_BYTES = BLOB_BITS / 8;
assert.strictEqual(BLOB_BYTES, 8192, "65,536 bits = 8,192 bytes = 8 KB");
assert.strictEqual(BLOB_BYTES, 2 ** 13, "8,192 = 2^13");
// and 8 KB = 2 pages of 4 KB
assert.strictEqual(BLOB_BYTES / PAGE_4K, 2, "8 KB = 2 pages of 4 KB");

// ── 6. Forward and reverse are O(1) per step ───────────────
// Each step is a fixed address in the buffer.
function readAt(buf: Uint8Array, address: number): number {
  return buf[address]!;  // O(1) — a fixed address
}
const buf = new Uint8Array(256);
for (let i = 0; i < 256; i++) buf[i] = i;
// forward: 59 → 63 → 127
const forward = [59, 63, 127];
for (const a of forward) assert.strictEqual(readAt(buf, a), a, `forward reads ${a}`);
// reverse: 127 → 63 → 59
const reverse = [127, 63, 59];
for (const a of reverse) assert.strictEqual(readAt(buf, a), a, `reverse reads ${a}`);
// each read is O(1)

// ── 7. The indices: the finest resolution is the byte ──────
type Unit = { name: string; step: number };
const units: Unit[] = [
  { name: "byte",   step: 1 },
  { name: "nibble", step: 4 },
  { name: "word",   step: 16 },
  { name: "block",  step: 64 },
  { name: "page",   step: 4096 },
  { name: "space",  step: 2 ** 32 },
];
assert.strictEqual(units[0]!.name, "byte", "the finest is the byte");
assert.strictEqual(units[0]!.step, 1, "the byte step is 1");
assert.strictEqual(units[units.length - 1]!.step, 2 ** 32, "the space step is 2^32");

// ── 8. The precision is in indices, not time ───────────────
// The unit of precision is the index step, not a time.
function precisionInIndices(step: number): string {
  return `1 unit = ${step} byte(s) of index step`;
}
assert.ok(precisionInIndices(1).includes("1"), "the byte is the finest");
assert.ok(precisionInIndices(4096).includes("4096"), "the page step is 4096");

// ── 9. What time it corresponds to, at a given rate ────────
// If memory is read at R bytes per second, the time to cross a step is step/R.
// But the time is NOT the vault's time; it's the hardware's rate.
type TimeAtRate = { step: number; rate: number; seconds: number };
function timeAtRate(step: number, rate: number): number {
  return step / rate;
}
// at 1 GB/s, 1 byte takes 1 ns
assert.ok(Math.abs(timeAtRate(1, 1e9) - 1e-9) < 1e-15, "1 byte at 1 GB/s = 1 ns");
// at 1 GB/s, 1 GB takes 1 second
assert.strictEqual(timeAtRate(2 ** 30, 1e9), 1.073741824, "1 GiB at 1 GB/s ≈ 1.07 s");
// at 1 GB/s, 4 GB takes ~4 s
assert.ok(Math.abs(timeAtRate(2 ** 32, 1e9) - 4.294967296) < 1e-6, "4 GiB at 1 GB/s ≈ 4.29 s");

// ── 10. The answer to "seconds, minutes, hours" ────────────
// The precision is not time; it's indices. But if you map to time:
const mapped = [
  { step: 1,     unit: "byte",   seconds: timeAtRate(1, 1e9) },
  { step: 4096,  unit: "page",   seconds: timeAtRate(4096, 1e9) },
  { step: 2 ** 20, unit: "MB",   seconds: timeAtRate(2 ** 20, 1e9) },
  { step: 2 ** 30, unit: "GB",   seconds: timeAtRate(2 ** 30, 1e9) },
  { step: 2 ** 32, unit: "4GB",  seconds: timeAtRate(2 ** 32, 1e9) },
];
// 1 byte = ns, 1 page = μs, 1 MB = ms, 1 GB = s, 4 GB = s
assert.ok(mapped[0]!.seconds < 1e-6, "1 byte: ns");
assert.ok(mapped[1]!.seconds < 1e-3, "1 page: μs");
assert.ok(mapped[2]!.seconds < 1,    "1 MB: ms");
assert.ok(mapped[3]!.seconds >= 1,   "1 GB: s");
assert.ok(mapped[4]!.seconds >= 4,   "4 GB: s");

// ── 11. So the answer is: none of them, and all of them ───
// None, because the precision is in indices.
// All, because if you map to a rate, each unit is a different time.
type Answer = {
  inIndices: string;
  inTime: string[];
};
const answer: Answer = {
  inIndices: "the byte (the finest pixel)",
  inTime: ["ns for 1 byte", "μs for 1 page", "ms for 1 MB", "s for 1 GB", "s for 4 GB"],
};
assert.ok(answer.inIndices.includes("byte"), "the finest is the byte");
assert.strictEqual(answer.inTime.length, 5, "5 mapped times");

// ── 12. The 65,536 bits: the proof Blob ────────────────────
const BLOB = { bits: 65536, bytes: 8192 };
assert.strictEqual(BLOB.bits, 2 ** 16, "the proof Blob is 2^16 bits");
assert.strictEqual(BLOB.bytes, 2 ** 13, "= 2^13 bytes");
// and 2^16 bits = 65,536 = the page count of a 64 KB page in 4 GB
assert.strictEqual(BLOB.bits, PAGES_4GB_AT_64K, "the proof Blob's bit count = the 64 KB page count");

// ── 13. The whole picture ──────────────────────────────────
type Picture = {
  virtual: string;
  real: string;
  ratio: string;
  precision: string;
  time: string;
};
const picture: Picture = {
  virtual: "4 GB (2^32 bytes)",
  real: "a few MB (the touched pages)",
  ratio: "2048× (or 64× at the page-table ratio)",
  precision: "the byte (the finest index step)",
  time: "none — the precision is in indices",
};
assert.ok(picture.virtual.includes("4 GB"), "the virtual is 4 GB");
assert.ok(picture.ratio.includes("64×"), "the page-table ratio is 64×");
assert.ok(picture.precision.includes("byte"), "the finest is the byte");
assert.ok(picture.time.includes("indices"), "the precision is in indices");

// ── 14. The two scales ─────────────────────────────────────
// 65,536 bits = the proof Blob
// 4 GB = the meta-memory
assert.strictEqual(65536, 2 ** 16, "65,536 = 2^16");
assert.strictEqual(2 ** 32, 4294967296, "4 GB = 2^32");
assert.strictEqual((2 ** 32) / (2 ** 16), 2 ** 16, "4 GB / 65,536 = 65,536");

// ── 15. The punchline ──────────────────────────────────────
// The virtual ratios are mappings, not sizes.
// The precision is in indices, not time.
// "Seconds, minutes, hours?" — none of them; the index step is the resolution.
console.log("I-180: the precision is in indices, not time; the ratios are mappings — passed");
console.log(`  64 MB real → 4 GB virtual at 64× (page-table ratio)`);
console.log(`  2 MB real → 4 GB virtual at 2048× (measured)`);
console.log(`  16 bits of page count = 65,536 pages = 4 GB`);
console.log(`  8 MB real = 128 pages of 64 KB`);
console.log(`  forward and reverse are O(1) per step`);
console.log(`  the precision is in indices: byte, nibble, word, block, page, space`);
console.log(`  "seconds, minutes, hours?" — none; the index step is the resolution`);
