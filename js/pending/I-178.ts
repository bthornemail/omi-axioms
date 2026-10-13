// i178.ts — I-178: the connecting rule is the allocated raw buffer; entropy degradation is a signal
//
// The author, 2026-10-12: "the connecting rule is the allocated raw buffer,
// because entropy degradation is a signal"; asked what replaces the byte at a
// step, "it should be xored by user agent". So a step at index i, by an agent
// carrying the byte u, is Atomics.compareExchange(state, i, b, b ^ u): the
// byte is XORed by the agent, and the exchange lands only if the byte is still
// the b the agent read. The state is the raw buffer as allocated (I-179: it
// reads 0, so any non-zero byte is something an agent wrote).
//
// Rewritten 2026-10-12 from the session's version, which moved the byte by ±1
// with an ordinary read and write. Still waiting: whether the signal is each
// step's change in entropy or the total from start to end. Both are measured
// below; neither is asserted to be the signal.
import assert from "node:assert";

const SIZE = 256;
const INDICES = [59, 63, 127];

function entropy(bytes: Uint8Array): number {
  const counts = new Map<number, number>();
  for (const b of bytes) counts.set(b, (counts.get(b) ?? 0) + 1);
  let h = 0;
  for (const c of counts.values()) h -= (c / bytes.length) * Math.log2(c / bytes.length);
  return h;
}

/** One step: the agent reads the byte, then exchanges it for byte ^ agent if it is still what it read. */
function step(state: Uint8Array, index: number, agent: number): { landed: boolean; actual: number } {
  const expected = Atomics.load(state, index);
  const actual = Atomics.compareExchange(state, index, expected, expected ^ agent);
  return { landed: actual === expected, actual };
}

// ── 1. The allocated raw buffer ──────────────────────────────
const state = new Uint8Array(new SharedArrayBuffer(SIZE));
assert.ok(state.every((b) => b === 0), "the raw buffer reads 0 as allocated");
assert.strictEqual(entropy(state), 0, "and its entropy is 0");

// ── 2. A step XORs the byte by the agent ─────────────────────
const A = 0x55, B = 0xAA;
for (const i of INDICES) assert.ok(step(state, i, A).landed, `agent A's step at ${i} lands`);
for (const i of INDICES) assert.strictEqual(state[i], A, `the byte at ${i} is 0 ^ A`);

// ── 3. A stale exchange does not land, and says what is there ─
// A reads the byte at 59; B steps there first; A's exchange finds B's write.
const read = Atomics.load(state, 59);
step(state, 59, B);
const stale = Atomics.compareExchange(state, 59, read, read ^ A);
assert.strictEqual(stale, A ^ B, "A's stale exchange returns what B left");
assert.strictEqual(state[59], A ^ B, "and leaves it in place");
assert.ok(step(state, 59, A).landed, "A, reading again, lands");
assert.strictEqual(state[59], B, "the byte is 0 ^ A ^ B ^ A: A's two steps cancel");

// ── 4. The order of the agents does not change the bytes ─────
const orders = [[A, B, 0x1D], [0x1D, A, B], [B, 0x1D, A]];
const finals = orders.map((order) => {
  const s = new Uint8Array(new SharedArrayBuffer(SIZE));
  for (const u of order) for (const i of INDICES) step(s, i, u);
  return Array.from(INDICES, (i) => s[i]);
});
for (const f of finals) assert.deepStrictEqual(f, [A ^ B ^ 0x1D, A ^ B ^ 0x1D, A ^ B ^ 0x1D], "each byte is 0 ^ A ^ B ^ 0x1D, in any order");

// ── 5. The same agent again is the reverse ──────────────────
const s = new Uint8Array(new SharedArrayBuffer(SIZE));
for (const i of INDICES) step(s, i, A);
for (const i of [...INDICES].reverse()) step(s, i, A);
assert.ok(s.every((b) => b === 0), "A's steps, walked back, return the buffer to as allocated");

// ── 6. The entropy, measured both ways ──────────────────────
// A walks the three indices, B walks them, A walks them again.
const run = new Uint8Array(new SharedArrayBuffer(SIZE));
const perStep: number[] = [];
for (const u of [A, B, A]) for (const i of INDICES) {
  const before = entropy(run);
  step(run, i, u);
  perStep.push(entropy(run) - before);
}
const total = entropy(run) - 0;
assert.ok(perStep[0]! > 0, "the first write into the raw buffer raises the entropy from 0");
const quiet = new Uint8Array(run);
step(run, 59, 0);
assert.deepStrictEqual(run, quiet, "an agent carrying 0 lands and changes nothing: no change, no signal");

console.log("I-178 (pending): the raw buffer, XORed by agent at 59, 63, 127 — passed");
console.log(`  each step's change: ${perStep.map((d) => d.toFixed(4)).join(" ")}`);
console.log(`  the total, start to end: ${total.toFixed(4)}`);
