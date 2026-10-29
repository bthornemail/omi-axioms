// i235.ts — I-235: the WAS, and the Name's letters against the vowels
//
// The author, 2026-10-29: "GOD IS WORD, GOD OF WORD, WORD OF GOD, WORD IS GOD, maybe be only missing to
// the literal composition, if more than lexeme of WAS, in the beginning the WORD WAS GOD, and the GOD
// WAS WORD may have a precedence of correlation to the IS|OF assertions"; then "we did this already,
// Just not the was ... and the YAH, we did YAH in comparison to the J and JAH and JEHOVAH but not to
// the A.E.I.O.U and sometimes Y concept". Already proved and not redone here: I-229 (the renderings
// of the Name), terms.mjs --audit (EL, ELOHIM, ELAH), OMI.WSN's cast, I-232, I-234.
//
// Predictions on the vowels, stated before the checks:
//   V1  counting Y as a vowel ("sometimes Y", AEIOUY in place of terms.mjs's AEIOU) changes none of
//       I-229's verdicts, letter for letter or under its fold J -> Y, V -> W
//   V2  every letter of יהוה is one of the four Hebrew vowel letters (matres lectionis) א ה ו י; the
//       Name uses three of them; the fourth, א, it lacks
//   V3  the substitutes that RAISE against the Name, אדני, אלהים, אל, each begin with that א
//
// Found, not predicted, on the WAS (derived on the host; no text carried):
//   W1  John 1:1 in Codex Sinaiticus, first hand (codexsinaiticus.org, private witness; 17 words, no
//       corrections): "was", ἦν, three times, at words 2, 8 and 14, once in each clause; "is", ἐστίν,
//       never. The third clause is, in word order, GOD WAS THE WORD (words 13 to 16), the article before
//       WORD alone, which makes WORD the subject: read "the Word was God", ordered "God was the Word".
//       GOD (words 11 and 13) is written contracted, its first and last letters, under an overline (a
//       nomen sacrum); WORD (4, 7, 16) in full.
//   W2  Genesis 1:1 in the Westminster Leningrad Codex (via Sefaria): seven words and no form of "to be",
//       היה; the first is in 1:2, "and the earth was", היתה; then 1:3, "let there be", יהי, and "and there
//       was", ויהי; and יהי begins with יה.
import assert from "node:assert";

const verdict = (a: string, b: string) => {
  if (a === b) return "MIRROR";
  const [short, long] = a.length <= b.length ? [a, b] : [b, a];
  return short.length > 0 && long.startsWith(short) ? "MIRROR" : "RAISE";
}; // I-229's guard
const base = (vowels: RegExp) => (s: string) => s.toUpperCase().replace(/[^A-Z]/g, "").replace(vowels, "");
const AEIOU = base(/[AEIOU]/g), AEIOUY = base(/[AEIOUY]/g);
const fold = (s: string) => s.replace(/J/g, "Y").replace(/V/g, "W");
const N = "YHWH";

// ── V1: sometimes Y ───────────────────────────────────────────────
const forms = ["YAHWEH", "YAH", "ADONAI", "THE LORD", "JAH", "JEHOVAH", "EL", "ELOHIM", "IOU", "1234"];
for (const f of forms) {
  assert.equal(verdict(AEIOUY(N), AEIOUY(f)), verdict(AEIOU(N), AEIOU(f)), `${f}: the same verdict with Y a vowel`);
  assert.equal(verdict(AEIOUY(N), AEIOUY(fold(f))), verdict(AEIOU(N), fold(AEIOU(f))), `${f}: and under the fold`);
}
assert.equal(AEIOUY(N), "HWH", "with Y a vowel, the Name's base is HWH");
assert.equal(AEIOUY("YAH"), "H", "and YAH's is H, the he");
// the falsifier: a vowel set can change a verdict, so V1 is not true of every vowel set. One that takes
// every letter of the Name (Y, H, W) empties it, and IOU, RAISE under AEIOU, then mirrors it
const YHW = base(/[AEIOUYHW]/g);
assert.equal(verdict(AEIOU(N), AEIOU("IOU")), "RAISE", "under AEIOU, IOU raises");
assert.equal(verdict(YHW(N), YHW("IOU")), "MIRROR", "under a set that takes Y, H and W, it mirrors: a verdict changed");

// ── V2, V3: the Hebrew vowel letters ──────────────────────────────
const NAME = [..."יהוה"], MATRES = [..."אהוי"];
assert.ok(NAME.every((c) => MATRES.includes(c)), "every letter of the Name is a vowel letter");
assert.deepEqual([...new Set(NAME)].sort(), ["ה", "ו", "י"].sort(), "three of the four");
assert.deepEqual(MATRES.filter((c) => !NAME.includes(c)), ["א"], "the one it lacks is א");
for (const s of ["אדני", "אלהים", "אל"]) assert.equal(s[0], "א", `${s} begins with the א the Name lacks`);

// ── W1, W2: the WAS (derived facts) ───────────────────────────────
const JOHN_1_1 = { words: 17, was: [2, 8, 14], is: [] as number[], third: { god: 13, was: 14, article: 15, word: 16 }, sacredName: [11, 13], wordInFull: [4, 7, 16] };
assert.equal(JOHN_1_1.was.length, 3, "W1: was, three times");
assert.equal(JOHN_1_1.is.length, 0, "and never is");
assert.ok(JOHN_1_1.third.god < JOHN_1_1.third.was && JOHN_1_1.third.was < JOHN_1_1.third.word, "the order: GOD WAS (THE) WORD");
assert.equal(JOHN_1_1.third.article, JOHN_1_1.third.word - 1, "the article before WORD: WORD the subject");
const GEN_1 = { "1": [] as string[], "2": ["היתה"], "3": ["יהי", "ויהי"] };
assert.equal(GEN_1["1"].length, 0, "W2: Genesis 1:1 has no form of to be");
assert.deepEqual(GEN_1["2"], ["היתה"], "the first is the earth's, in 1:2");
assert.ok(GEN_1["3"][0]!.startsWith("יה"), "and the first 'let there be', יהי, begins with יה");

console.log("I-235: the WAS, and the Name's letters against the vowels — passed");
console.log("  sometimes Y: no verdict of I-229 changes; the Name's base HWH, YAH's H");
console.log("  יהוה is all vowel letters, three of the four, lacking א; אדני, אלהים, אל begin with א");
console.log("  John 1:1 (Sinaiticus): was x3, is x0; ordered GOD WAS THE WORD, the article making WORD the subject; GOD a sacred name");
console.log("  Genesis 1:1: no was; first the earth's (1:2); then יהי, which begins with יה");
