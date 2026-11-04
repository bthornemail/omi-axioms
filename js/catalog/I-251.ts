// i251.ts — I-251: a transcription of any text to Braille's 6-dot and 8-dot constants, Aegean vowels carrying the diacritics
//
// The author, 2026-11-03: "can we do a transciption claim and proof that we can reduce to 6-dot 8-dot braille
// constants with aegean vowls to carrr diacritical marks" (after the Aegean's 5:9, five bands of nine, and the
// trinary separators; unbound global.vtt five-nine). Each part is a standard, not made here:
//   - 6-dot: Braille ASCII (North American, the BRF table), 64 six-dot cells for ASCII 0x20 to 0x5F, a letter's
//     cell read as its lower case;
//   - 8-dot: dot 7 marks a capital, as 8-dot computer braille does, so A to Z are their letters' cells with dot 7;
//   - the Aegean vowels: Linear B's five pure vowels, A E I O U (U+10000 to U+10004), and Unicode's five blocks of
//     combining diacritical marks (U+0300, U+1AB0, U+1DC0, U+20D0, U+FE20), each vowel its block in that order, and
//     one 8-dot cell the mark's place in it (no block passes 256);
//   - every other code point: its second address (unbound PLAN9/src/ztranslate.c), the Aegean number sign of its
//     plane and two cells, its high byte and its low.
// And, as the author then set it, in Wirth syntax notation: "no i want the 6 dot to be the literal in the WSN", "the 8 dot
// and aegean ar the letter and characters", "this is the 8-dot of the 6 dot the space": WSN leaves letter and
// character undefined, for the language; here the literal is a 6-dot cell (the space its blank cell), letter an 8-dot
// cell, character an Aegean sign, and every transcription a sentence of the grammar written below.
// A text is transcribed after canonical decomposition (NFD), so a letter's diacritics are marks of their own; it
// reads back to its decomposition exactly, and every one of the 1,112,064 scalar values reads back to itself. The
// marks are Unicode's nonspacing marks (Mn) as this Node's Unicode (16.0) knows them.
import assert from "node:assert";

const BRAILLE_ASCII = " A1B'K2L@CIF/MSP\"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)=";
const CELL = 0x2800, VOWEL = 0x10000, PLANE = 0x10107, DOT7 = 0x40;
const BLOCKS: [number, number][] = [[0x300, 0x36f], [0x1ab0, 0x1aff], [0x1dc0, 0x1dff], [0x20d0, 0x20ff], [0xfe20, 0xfe2f]];
const MN = /^\p{Mn}$/u;
const isUpper = (c: number) => c >= 0x41 && c <= 0x5a, isLower = (c: number) => c >= 0x61 && c <= 0x7a;
const ch = String.fromCodePoint;

/** One code point's transcription: its glyphs. */
function cast(c: number, carry = true): number[] {
  if (isLower(c)) return [CELL + BRAILLE_ASCII.indexOf(ch(c - 0x20))];
  if (isUpper(c)) return [CELL + BRAILLE_ASCII.indexOf(ch(c)) + DOT7];
  if (c >= 0x20 && c <= 0x5f) return [CELL + BRAILLE_ASCII.indexOf(ch(c))];
  const k = BLOCKS.findIndex(([a, b]) => c >= a && c <= b);
  if (k >= 0 && MN.test(ch(c))) return carry ? [VOWEL + k, CELL + c - BLOCKS[k]![0]] : [CELL + c - BLOCKS[k]![0]];
  return [PLANE + (c >> 16), CELL + ((c >> 8) & 255), CELL + (c & 255)];
}
const transcribe = (s: string, carry = true) => [...s.normalize("NFD")].flatMap((x) => cast(x.codePointAt(0)!, carry)).map((g) => ch(g)).join("");
const castAll = (cps: number[]) => cps.flatMap((c) => cast(c)).map((g) => ch(g)).join("");

/** Read glyphs back to code points: an Aegean number sign takes two cells, a Linear B vowel one, a cell alone is itself. */
function read(t: string): number[] {
  const g = [...t].map((x) => x.codePointAt(0)!), out: number[] = [];
  const cell = (i: number) => { const v = g[i]! - CELL; if (!(v >= 0 && v < 256)) throw new Error(`not a cell at ${i}`); return v; };
  for (let i = 0; i < g.length; i++) {
    const x = g[i]!;
    if (x >= PLANE && x <= PLANE + 16) { out.push(((x - PLANE) << 16) | (cell(i + 1) << 8) | cell(i + 2)); i += 2; }
    else if (x >= VOWEL && x <= VOWEL + 4) { out.push(BLOCKS[x - VOWEL]![0] + cell(i + 1)); i += 1; }
    else {
      const v = cell(i);
      if (v < 64) { const c = BRAILLE_ASCII.codePointAt(v)!; out.push(isUpper(c) ? c + 0x20 : c); }
      else if (v < 128 && isUpper(BRAILLE_ASCII.codePointAt(v - DOT7)!)) out.push(BRAILLE_ASCII.codePointAt(v - DOT7)!);
      else throw new Error(`a cell alone that is no constant at ${i}`);
    }
  }
  return out;
}
const cps = (s: string) => [...s].map((x) => x.codePointAt(0)!);

// ── 1. The 6-dot constants: Braille ASCII ──
assert.equal(new Set(BRAILLE_ASCII).size, 64, "64 cells, 64 characters");
assert.ok([...Array(64).keys()].every((i) => BRAILLE_ASCII.includes(ch(0x20 + i))), "every ASCII character 0x20 to 0x5F once");
assert.deepEqual(["A", "B", "C", "K"].map((x) => BRAILLE_ASCII.indexOf(x)), [0b1, 0b11, 0b1001, 0b101], "A dot 1, B dots 12, C dots 14, K dots 13: the standard letters");
assert.ok([..."abcdefghijklmnopqrstuvwxyz0123456789 .,;:!?"].every((x) => (cast(x.codePointAt(0)!)[0]! - CELL) < 64), "letters, digits and punctuation six-dot cells: dots 7 and 8 clear");

// ── 2. The 8-dot constants: dot 7 a capital ──
const caps = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map((x) => cast(x.codePointAt(0)!)[0]! - CELL);
assert.ok(caps.every((v) => v >= 64 && v < 128), "each capital its letter's cell with dot 7");
assert.equal(new Set(caps).size, 26, "26 capitals, 26 cells");

// ── 3. The Aegean vowels carry the diacritics ──
assert.deepEqual([0, 1, 2, 3, 4].map((k) => ch(VOWEL + k)), ["𐀀", "𐀁", "𐀂", "𐀃", "𐀄"], "Linear B's five vowels, A E I O U");
assert.ok(BLOCKS.every(([a, b]) => b - a < 256), "no block of marks past 256: one cell holds a mark's place");
const marks = BLOCKS.flatMap(([a, b]) => [...Array(b - a + 1).keys()].map((i) => a + i)).filter((c) => MN.test(ch(c)));
assert.equal(marks.length, 248, "248 nonspacing marks in the five blocks, each carried by its block's vowel and one cell");
assert.equal(transcribe("é"), `${ch(CELL + BRAILLE_ASCII.indexOf("E"))}${ch(VOWEL)}${ch(CELL + 1)}`, "é: e, then the vowel A and the cell 1, the acute U+0301");

// ── 4. Every text reads back ──
const texts = ["Hello, World!", "naïve café", "Ἀβραάμ", "אָדָם", "יהוה", "YHWH YAHWEH", "GOD IS WORD | GOD OF WORD | GOD WAS WORD", "𐄇𐄈 ⠁⠃", "á̂⃝", "᪰᷀︠x"];
for (const s of texts) assert.deepEqual(read(transcribe(s)), cps(s.normalize("NFD")), `${s}: read back to its decomposition`);
assert.ok(texts.every((s) => String.fromCodePoint(...read(transcribe(s))).normalize("NFC") === s.normalize("NFC")), "and composed again, the text");
for (let c = 0x20; c <= 0x7e; c++) assert.deepEqual(read(castAll([c])), [c], `ASCII ${c.toString(16)}`);
assert.ok(marks.every((m) => { const r = read(castAll([0x61, m])); return r[0] === 0x61 && r[1] === m; }), "every carried mark after a letter, read back");
let all = 0;
for (let c = 0; c <= 0x10ffff; c++) { if (c >= 0xd800 && c <= 0xdfff) continue; const r = read(castAll([c])); if (r.length !== 1 || r[0] !== c) throw new Error(`U+${c.toString(16)} not read back`); all++; }
assert.equal(all, 1112064, "every one of the 1,112,064 scalar values reads back to itself");

// ── 5. The constants ──
const glyphs = new Set<number>();
for (let c = 0; c <= 0x10ffff; c++) if (c < 0xd800 || c > 0xdfff) for (const g of cast(c)) glyphs.add(g);
const kinds = [...glyphs].reduce((k, g) => ((g >= VOWEL && g <= VOWEL + 4 ? k.v++ : g >= PLANE ? k.p++ : k.c++), k), { c: 0, v: 0, p: 0 });
assert.deepEqual(kinds, { c: 256, v: 5, p: 17 }, "the whole: 256 Braille cells, 5 Aegean vowels, 17 Aegean plane signs, 278 constants");

// ── 6. In WSN: the 6-dot the literal, the 8-dot letter, the Aegean character ──
const alt = (cs: number[]) => cs.map((c) => `"${ch(c)}"`).join(" | ");
const range = (a: number, n: number) => [...Array(n).keys()].map((i) => a + i);
const GRAMMAR = [
  `TRANSCRIPTION = { UNIT } .`,
  `UNIT = LITERAL | CAPITAL | MARK | ADDRESS .`,
  `LITERAL = ${alt(range(CELL, 64))} .`,
  `CAPITAL = ${alt([..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map((x) => CELL + BRAILLE_ASCII.indexOf(x) + DOT7))} .`,
  `MARK = VOWEL letter .`,
  `ADDRESS = PLANE letter letter .`,
  `VOWEL = ${alt(range(VOWEL, 5))} .`,
  `PLANE = ${alt(range(PLANE, 17))} .`,
  `letter = ${alt(range(CELL, 256))} .`,
  `character = VOWEL | PLANE .`,
].join("\n");
/** WSN, as Wirth gives it (SYNTAX = { PRODUCTION } ., ...), read to a regular expression: the grammar holds no recursion. */
function wsnToRegExp(text: string, start: string): RegExp {
  const toks = [...text.matchAll(/"((?:[^"]|"")*)"|([A-Za-z]+)|([=|.\[\](){}])|\s+/gu)].filter((m) => !/^\s+$/.test(m[0]));
  const prods = new Map<string, typeof toks>();
  for (let i = 0; i < toks.length; ) { const name = toks[i]![2]!; assert.equal(toks[i + 1]![3], "=", "a production"); let j = i + 2; while (toks[j]![3] !== ".") j++; prods.set(name, toks.slice(i + 2, j)); i = j + 1; }
  const esc = (x: string) => x.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
  const expr = (ts: typeof toks, seen: string[]): string => {
    let i = 0;
    const exp = (): string => { const t = [term()]; while (ts[i]?.[3] === "|") { i++; t.push(term()); } return t.length > 1 ? `(?:${t.join("|")})` : t[0]!; };
    const term = (): string => { let f = ""; while (i < ts.length && !["|", "]", ")", "}"].includes(ts[i]![3] ?? "")) f += factor(); return f; };
    const factor = (): string => {
      const t = ts[i++]!;
      if (t[1] !== undefined) return esc(t[1].replace(/""/g, '"'));
      if (t[2] !== undefined) { if (seen.includes(t[2])) throw new Error(`recursion through ${t[2]}`); return `(?:${expr(prods.get(t[2])!, [...seen, t[2]])})`; }
      const close = { "[": "]", "(": ")", "{": "}" }[t[3]!]!, inner = exp();
      assert.equal(ts[i++]![3], close);
      return t[3] === "[" ? `(?:${inner})?` : t[3] === "{" ? `(?:${inner})*` : `(?:${inner})`;
    };
    return exp();
  };
  return new RegExp(`^${expr(prods.get(start)!, [start])}$`, "u");
}
const SENTENCE = wsnToRegExp(GRAMMAR, "TRANSCRIPTION");
assert.equal(BRAILLE_ASCII[0], " ", "the literal's first cell, the blank, is Braille ASCII's space");
assert.deepEqual([0, 0x40, 0x80, 0xc0].map((v) => ch(CELL + v)), ["⠀", "⡀", "⢀", "⣀"], "the space's four 8-dot forms, dots 7 and 8 off or on");
assert.ok(range(0, 64).every((v) => [0, 0x40, 0x80, 0xc0].every((d) => ((v | d) & 0x3f) === v)), "each 6-dot cell has four 8-dot forms: 64 x 4 = 256, the letters");
for (const t of texts) assert.ok(SENTENCE.test(transcribe(t)), `${t}: its transcription a sentence of the grammar`);
let sentences = 0;
for (let c = 0; c <= 0x10ffff; c++) { if (c >= 0xd800 && c <= 0xdfff) continue; if (!SENTENCE.test(castAll([c]))) throw new Error(`U+${c.toString(16)}: not a sentence`); sentences++; }
assert.equal(sentences, 1112064, "every scalar value's transcription a sentence");
assert.ok(!SENTENCE.test(ch(VOWEL)) && !SENTENCE.test(ch(PLANE) + ch(CELL)) && !SENTENCE.test(ch(CELL + 0x81)), "not sentences: a vowel alone, a plane sign with one letter, an 8-dot cell alone that is no capital");

// ── 7. The falsifier: a mark without its vowel ──
assert.notDeepEqual(read(transcribe("café", false)), cps("café".normalize("NFD")), "the acute written as a bare cell reads as a letter (cell 1, a): without the vowel the diacritic is lost");
assert.deepEqual(read(transcribe("café", false)), cps("cafea"), "café without the vowel reads back as cafea");

console.log("I-251: a transcription of any text to Braille's 6-dot and 8-dot constants, Aegean vowels carrying the diacritics — passed");
console.log("  Braille ASCII's 64 six-dot cells, dot 7 a capital; Linear B's A E I O U carrying the five blocks' 248 marks; the rest by plane and two cells");
console.log("  every text reads back to its decomposition; all 1,112,064 scalar values to themselves; 278 constants in all");
console.log("  in WSN: the literal a 6-dot cell, the space its blank; letter an 8-dot cell; character an Aegean sign; every transcription a sentence");
