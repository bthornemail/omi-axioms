// i252.ts — I-252: the Name's 0-sphere — YHWH and YAHWEH its poles, YAH the face; GOD IS|OF WORD as sine and cosine, GOD WAS WORD as the tangent
//
// The author, 2026-11-03: "cnyou do a full write-up and claim and proof becuase we are using the GOD IS|OF WORD
// like the sin/cosine archsin/archcosine of the GOD WAS WORD tan/arctan over the 0-SPHERE YHWH and YAHWEH, witu the
// face YAH the projector of IMAGO DEI i think we have in docs". In the record already, and not redone here:
//   - the 0-sphere: {c - r, c + r} is "the root relation: two poles, the first 0-sphere" (wiki OPEN-01 #18,
//     the author 2026-10-07, after _archive/_deprecated/clock.md);
//   - Imago Dei: the lexeme is the centre c of {c - r, c + r}, neither inflection (I-168); the observer is the
//     image and the effect is the Word (I-171);
//   - the Name: YAH and YAHWEH keep YHWH's consonant base, ADONAI replaces it (I-229); man's yod and woman's he
//     are YAH, each less it fire (I-232); John 1:1 writes WAS three times and IS never (I-235).
// The analogy (sine, cosine and their arcs for IS and OF; tangent and its arc for WAS; YAH as the projector) is the
// author's reading. This record checks the literals under it. Claims, stated before the checks:
//
//   C1  the poles are one base: YHWH and YAHWEH, their vowels A E I O U removed (I-229's base), are both YHWH
//   C2  the poles differ by the vowels alone: YAHWEH is YHWH with A and E written in, nothing else changed;
//       letters(YAHWEH) less letters(YHWH) is exactly {A, E}
//   C3  the face projects to both: YAH's base, YH, is a non-empty head of the common base (MIRROR with each pole
//       by I-229's guard)
//   C4  the face touches the poles differently: YAH is a literal head of YAHWEH and not of YHWH; it reaches
//       YHWH only through the base (the vowels set aside)
//   C5  in Braille's 6-dot cells, the XOR of YHWH's cells is dots 1 2 3 (7), and the XOR of YAHWEH's is that
//       XOR A's cell XOR E's cell: the poles' difference is the vowels' cells
//   C6  on the 0-sphere as the circle's two points (angles 0 and pi, c - r and c + r with c = 0, r = 1), sine is
//       0 at both, cosine is the pole's sign, tangent is 0 at both: the poles are told apart by cosine and its arc
//       alone; arcsine and arctangent give 0 at both
//   C7  sine and cosine share a frame: GOD IS WORD and GOD OF WORD have one length and differ only at the copula
//   C8  the arc as the inverse: the reversal, subject and object swapped around the copula, undone by itself
//
// Carried from earlier today (unbound global.vtt name-variations), computed before this filing, asserted here:
//   K1  each line XOR its reversal is 0 exactly at the O of GOD and WORD (place 1) and the final D, for IS, OF
//       and WAS: the reversal's fixed points are the same two letters whatever the copula
//   K2  GOD WAS WORD is one letter longer, so its final D's fixed point stands one place on (11, not 10)
//   K3  FIRE's cells XOR to dots 1 2 3, the same cell as YHWH's
//
// Each claim held when first run; none was changed to fit. Found while filing: the first falsifier written, that a
// line against another copula's reversal fixes more than the two letters, failed; it fixes the same two:
//   F1  GOD IS WORD against WORD OF GOD, and GOD OF WORD against WORD IS GOD, are 0 at the O and the final D only:
//       the two fixed points do not depend on the copula, among the lines of one length
//   F2  GOD IS WORD against WORD WAS GOD, lengths 11 and 12, is 0 at the O only: the tangent's line keeps the O
//       with the others and loses the D, one place out of phase
// The falsifier kept: with LOGOS for WORD the final D is no longer a fixed point.
import assert from "node:assert";

// ── the bases, as I-229 reads them ──
const base = (s: string) => s.toUpperCase().replace(/[^A-Z]/g, "").replace(/[AEIOU]/g, "");
const heads = (a: string, b: string) => a.length > 0 && (b.startsWith(a) || a.startsWith(b));
const verdict = (a: string, b: string) => (a === b || heads(a, b) ? "MIRROR" : "RAISE");
const letters = (s: string) => [...s].sort();
const less = (a: string[], b: string[]) => { const r = [...a]; for (const c of b) { const i = r.indexOf(c); assert.ok(i >= 0, `${c} in ${a.join("")}`); r.splice(i, 1); } return r; };

// ── C1. one base ──
assert.equal(base("YHWH"), "YHWH", "C1: YHWH's base is YHWH");
assert.equal(base("YAHWEH"), "YHWH", "C1: YAHWEH's base is YHWH");
assert.equal(verdict(base("YHWH"), base("YAHWEH")), "MIRROR", "C1: the poles mirror");

// ── C2. the vowels alone ──
assert.deepEqual(less(letters("YAHWEH"), letters("YHWH")), ["A", "E"], "C2: YAHWEH less YHWH is A and E");
assert.equal("YAHWEH".replace(/[AE]/g, ""), "YHWH", "C2: A and E removed in place, YAHWEH is YHWH, the order kept");

// ── C3. the face projects to both ──
assert.equal(base("YAH"), "YH", "C3: YAH's base is YH");
for (const pole of ["YHWH", "YAHWEH"]) assert.equal(verdict(base("YAH"), base(pole)), "MIRROR", `C3: YAH mirrors ${pole}`);
assert.equal(verdict(base("ADONAI"), base("YHWH")), "RAISE", "the control: ADONAI does not (I-229)");

// ── C4. differently ──
assert.ok("YAHWEH".startsWith("YAH"), "C4: YAH heads YAHWEH literally");
assert.ok(!"YHWH".startsWith("YAH"), "C4: YAH does not head YHWH literally");
assert.ok(base("YHWH").startsWith(base("YAH")), "C4: it heads YHWH through the base");

// ── C5. the cells ──
// Unicode Braille, dot k = bit k - 1; the letters' standard 6-dot cells.
const CELL: Record<string, number> = { A: 0x01, B: 0x03, C: 0x09, D: 0x19, E: 0x11, F: 0x0b, G: 0x1b, H: 0x13, I: 0x0a, J: 0x1a, K: 0x05, L: 0x07, M: 0x0d, N: 0x1d, O: 0x15, P: 0x0f, Q: 0x1f, R: 0x17, S: 0x0e, T: 0x1e, U: 0x25, V: 0x27, W: 0x3a, X: 0x2d, Y: 0x3d, Z: 0x35 };
assert.equal(String.fromCodePoint(0x2800 + CELL.Y!), "⠽", "the table: Y is dots 1 3 4 5 6");
const cellXor = (w: string) => [...w].reduce((s, c) => s ^ CELL[c]!, 0);
assert.equal(cellXor("YHWH"), 0b0000111, "C5: YHWH's cells XOR to dots 1 2 3");
assert.equal(cellXor("YAHWEH"), cellXor("YHWH") ^ CELL.A! ^ CELL.E!, "C5: YAHWEH's XOR is YHWH's XOR A XOR E");

// ── C6. the 0-sphere on the circle ──
const c = 0, r = 1, poles = [c - r, c + r];
assert.deepEqual(poles, [-1, 1], "C6: c - r and c + r, the two poles");
const angle = (x: number) => (x === 1 ? 0 : Math.PI);	// +1 at angle 0, -1 at pi
const near = (a: number, b: number) => Math.abs(a - b) < 1e-12;
for (const p of poles) {
  const t = angle(p);
  assert.ok(near(Math.sin(t), 0), `C6: sine 0 at the pole ${p}`);
  assert.ok(near(Math.cos(t), p), `C6: cosine is the pole's sign, ${p}`);
  assert.ok(near(Math.tan(t), 0), `C6: tangent 0 at the pole ${p}`);
  assert.ok(near(Math.acos(Math.cos(t)), t), `C6: arccosine returns the pole's angle, ${t}`);
}
assert.ok(near(Math.asin(Math.sin(0)), 0), "C6: arcsine gives 0 at one pole");
assert.ok(near(Math.asin(Math.sin(Math.PI)), 0) && near(Math.atan(Math.tan(Math.PI)), 0), "C6: arcsine and arctangent give 0 at the other too: they cannot tell the poles apart");

// ── C7, C8. the lines ──
const line = (s: string, k: string, o: string) => `${s} ${k} ${o}`;
const reverse = (l: string) => { const [s, k, o] = l.split(" "); return line(o!, k!, s!); };
const zeros = (a: string, b: string) => [...Array(Math.max(a.length, b.length)).keys()].filter((i) => (a.charCodeAt(i) || 0) === (b.charCodeAt(i) || 0));
const IS = line("GOD", "IS", "WORD"), OF = line("GOD", "OF", "WORD"), WAS = line("GOD", "WAS", "WORD");
assert.equal(IS.length, OF.length, "C7: one length");
assert.deepEqual([...Array(IS.length).keys()].filter((i) => IS[i] !== OF[i]), [4, 5], "C7: they differ only at the copula, places 4 and 5");
for (const l of [IS, OF, WAS]) assert.equal(reverse(reverse(l)), l, `C8: the reversal undoes itself on ${l}`);

// ── K1 to K3, carried ──
for (const l of [IS, OF, WAS]) assert.deepEqual(zeros(l, reverse(l)), [1, l.length - 1], `K1: ${l} XOR its reversal is 0 at the O and the final D only`);
assert.deepEqual(zeros(WAS, reverse(WAS)), [1, 11], "K2: WAS's final D at 11");
assert.deepEqual(zeros(IS, reverse(IS)), [1, 10], "K2: IS's at 10");
assert.equal(cellXor("FIRE"), cellXor("YHWH"), "K3: FIRE and YHWH, one cell");

// ── the falsifiers ──
assert.notEqual(base("ELOHIM"), base("YHWH"), "a pole replaced: ELOHIM's base is not the Name's");
assert.deepEqual(zeros(IS, reverse(OF)), [1, 10], "F1: IS against OF's reversal, the same two");
assert.deepEqual(zeros(OF, reverse(IS)), [1, 10], "F1: OF against IS's reversal, the same two");
assert.deepEqual(zeros(IS, reverse(WAS)), [1], "F2: IS against WAS's reversal, the O alone");
const LOGOS = line("GOD", "IS", "LOGOS");
assert.ok(!zeros(LOGOS, reverse(LOGOS)).includes(LOGOS.length - 1), "a word replaced: with LOGOS the final D is not fixed");
assert.notEqual(cellXor("YAHWEH"), cellXor("YHWH"), "the poles' cells differ: the vowels are not nothing");

console.log("I-252: the Name's 0-sphere — YHWH and YAHWEH its poles, YAH the face; GOD IS|OF WORD as sine and cosine, GOD WAS WORD as the tangent — passed");
console.log("  the poles: one base, YHWH; they differ by A and E alone, in letters and in Braille cells; YHWH's cells XOR to dots 1 2 3, as FIRE's do");
console.log("  the face: YAH heads YAHWEH literally and YHWH through the base; on the circle's two points only cosine and its arc tell the poles apart");
console.log("  the lines: IS and OF one frame, differing at the copula; each reversal undoes itself and fixes the O and the final D, WAS's one place on");
console.log("  found: the O and D are fixed across copulas of one length (IS against OF reversed); WAS against IS keeps the O alone");
