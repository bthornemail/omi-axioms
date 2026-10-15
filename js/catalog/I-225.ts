// i225.ts — I-225: 22 55 — the 2 and the 5 of the base, eleven times, added without a carry
//
// The author, 2026-10-14: "for a 225 it must be the .5 to 5 to 25 to F2, 25 of the
// 225, or maybe even 2F 25"; then "the I-225 needs a 5, that's perfect: I-225 is
// for 22 55". After I-218 (the shift held over 2 types ", 0x22, the Catch-22
// byte), I-219 (25 is the base, 10 = 2 x 5) and I-222 (0x55, half the boot mark).
// The values below are asserted; the readings are the author's.
import assert from "node:assert";

const square = (x: number) => { let r = 0; for (let i = 0; i < 16; i++) if ((x >> i) & 1) r |= 1 << (2 * i); return r; }; // carry-less, GF(2)

// ── 1. .5 → 5 → 25 → 225 ─────────────────────────────────────
assert.equal(0.5 * 10, 5, "the half, in base 10 = 2 x 5, is 5 (I-219)");
assert.equal(5 * 5, 25);
assert.equal(225, 9 * 25, "25 nine times in the 225");
assert.equal(225, (3 * 5) ** 2);

// ── 2. F2: F squared, with and without the carries ───────────
assert.equal(0xf * 0xf, 225, "F squared with carries: 225, this record's number");
assert.equal(square(0xf), 0x55, "F squared in GF(2), without carries: 0x55, the boot mark's half (I-222)");
assert.equal(225 - 0x55, 140, "the carries are the 140 between them");
assert.equal(square(0x5), 0x11, "and 5 squared without carries is 0x11");

// ── 3. 22 55: the 2 and the 5, eleven times, in both bases ───
assert.equal(22, 2 * 11); assert.equal(55, 5 * 11, "decimal: 2 and 5 times eleven");
assert.equal(0x22, 2 * 0x11); assert.equal(0x55, 5 * 0x11, "hexadecimal: 2 and 5 times 0x11, which is 5 squared without carries");
assert.equal(2 * 5, 10, "2 and 5: the two primes of the base");
assert.equal(String.fromCharCode(0x22), '"', "0x22: the quote, Shift + 2 on the teletype (I-218), the Catch-22 byte");
assert.equal(String.fromCharCode(0x55), "U", "0x55: U");

// ── 4. Added without a carry: the sum is the XOR ─────────────
assert.equal(0x22 & 0x55, 0, "they share no bit");
assert.equal(0x22 ^ 0x55, 0x77); assert.equal(0x22 | 0x55, 0x77);
assert.equal(0x22 + 0x55, 0x77, "so adding them carries nothing: the sum, the XOR and the OR agree, 0x77");
assert.equal(22 + 55, 77, "and in decimal too: 22 + 55 = 77");
assert.equal(~(0x22 ^ 0x55) & 0xff, 0x88, "their XNOR: 0x88");
// where F squared needed 140 in carries, 22 and 55 need none: the two arithmetics meet

// ── 5. 2F 25: the escaped slash ──────────────────────────────
assert.equal(String.fromCharCode(0x2f), "/"); assert.equal(String.fromCharCode(0x25), "%");
assert.equal(encodeURIComponent("/"), "%2F", "a URL writes an escaped slash as %2F: the escape character 0x25 carrying 2F");
assert.equal(decodeURIComponent("%2F"), "/");

// ── 6. 0x2255 under the delta law ────────────────────────────
const rotl = (v: number, n: number) => ((v << n) | (v >>> (16 - n))) & 0xffff;
const K = (p: number, C: number) => rotl(p, 1) ^ rotl(p, 3) ^ rotl(p, 14) ^ C;
const orbit = (s: number, C: number) => { const o = [s]; for (let p = K(s, C); p !== s; p = K(p, C)) o.push(p); return o; };
assert.deepEqual(orbit(0x2255, 0x1d1d), [0x2255, 0x038b, 0xc6b1, 0xd45c], "the word 2255: period 4 under 0x1D1D");
assert.equal(orbit(0x2255, 0x1d).length, 8, "and 8 under 0x1D (I-195)");

console.log("I-225: 22 55 — the 2 and the 5 of the base, eleven times, added without a carry — passed");
console.log("  .5 -> 5 -> 25 -> 225 = 9 x 25; F squared is 225 with carries and 0x55 without");
console.log("  22 = 2 x 11, 55 = 5 x 11, and 0x22 = 2 x 0x11, 0x55 = 5 x 0x11; they share no bit: 22 + 55 = 22 XOR 55 = 77");
console.log("  2F 25: %2F, the escaped slash; 0x2255 cycles in 4 under 0x1D1D");
