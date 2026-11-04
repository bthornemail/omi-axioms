// i253.ts — I-253: the translation fixation in two trilingual inscriptions — which renderings of a name keep its literal, Behistun and Rosetta, by I-229's rule
//
// The author, 2026-11-04, choosing King and Thompson's Behistun (1907) and Budge's Rosetta Stone (1904) as the
// codex's public sources for BEHISTUN and ROSETTA: "can we do the te same translation fixation in assesment ofthem
// both" — the assessment I-229 made of the Name's renderings (YHWH against YAHWEH, YAH, ADONAI, JEHOVAH), made of
// the names in these two. The rule is I-229's, unchanged: a name's base is its letters in upper case, A to Z, the
// vowels A E I O U removed; two bases MIRROR when they are equal or one is a non-empty head of the other, and RAISE
// otherwise. A transliteration's marks are folded away first (NFD, combining marks dropped: â to A, š to S, û to U).
//
// The witnesses, held here as literals, the text not carried:
//   - Behistun: each English name beside King and Thompson's Persian form in brackets, as English Wikisource's
//     transcription of their 1907 edition gives them, read 2026-11-04 (The Persian Text; 37 pairs);
//   - Rosetta: Budge, The Decrees of Memphis and Canopus, vol. 1 (1904), pp. 124 to 126, on Champollion: "KISRS is
//     the hieroglyphic equivalent of that title" (KAISAROS, Caesar); "A . T . KRTR ... a hieroglyphic transcript of
//     the title AYTOKPATHR"; and Alexandros, "al . s entr ." with signs 3 and 4 "K and s" and sign 9 "s", so
//     ALKSENTRS. Ptolemy's and Cleopatra's full values are in a plate the scan's text lost; they are not supplied here.
//
// Predictions, stated before the checks:
//   P1  Persia and Parsa MIRROR, Media and Mada MIRROR, Maka and Maka are one literal
//   P2  Darius and Daryavus RAISE: the Persian keeps a Y and a V the Greek drops
//   P3  Smerdis and Bardiya RAISE, Egypt and Mudraya RAISE, Lydia and Sparda RAISE: a name replaced, as ADONAI
//       replaces YHWH
//   P4  Arabia and Arabaya MIRROR: RB heads RBY
//   P5  fewer than half of the 37 Behistun pairs MIRROR: the Greek renderings mostly replace the literal
//   P6  KAISAROS and KISRS MIRROR; AUTOKRATOR and A.T.KRTR MIRROR
//   P7  ALEXANDROS and ALKSENTRS RAISE letter for letter, and MIRROR under Champollion's own fold, the Greek X as
//       KS (from Hebrew and Syriac, Budge says) and D as T (the hieroglyphs having no D)
// Each prediction held when first run; none was changed to fit.
import assert from "node:assert";

const fold = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toUpperCase();
const base = (s: string) => fold(s).replace(/[^A-Z]/g, "").replace(/[AEIOU]/g, "");
const heads = (a: string, b: string) => a.length > 0 && (b.startsWith(a) || a.startsWith(b));
const verdict = (a: string, b: string) => { const x = base(a), y = base(b); return x === y || heads(x, y) ? "MIRROR" : "RAISE"; };

// ── the guard, as I-229 states it ──
assert.equal(verdict("YHWH", "YAHWEH"), "MIRROR", "I-229: YAHWEH mirrors YHWH");
assert.equal(verdict("YHWH", "ADONAI"), "RAISE", "I-229: ADONAI raises");
assert.equal(verdict("IOU", "YHWH"), "RAISE", "I-229's correction: an empty base heads nothing");

// ── Behistun: King and Thompson's 37 pairs, English then Persian ──
const BEHISTUN: [string, string][] = [
  ["Darius", "Dâryavuš"], ["Persia", "Pârsa"], ["Hystaspes", "Vištâspa"], ["Arsames", "Aršâma"], ["Ariaramnes", "Ariyâramna"],
  ["Teispes", "Cišpiš"], ["Achaemenes", "Haxâmaniš"], ["Elam", "Ûvja"], ["Babylonia", "Bâbiruš"], ["Assyria", "Athurâ"],
  ["Arabia", "Arabâya"], ["Egypt", "Mudrâya"], ["Lydia", "Sparda"], ["Media", "Mâda"], ["Armenia", "Armina"],
  ["Cappadocia", "Katpatuka"], ["Parthia", "Parthava"], ["Drangiana", "Zraka"], ["Aria", "Haraiva"], ["Chorasmia", "Uvârazmîy"],
  ["Bactria", "Bâxtriš"], ["Gandhara", "Gadâra"], ["Scythia", "Saka"], ["Sattagydia", "Thataguš"], ["Arachosia", "Harauvatiš"],
  ["Maka", "Maka"], ["Cyrus", "Kûruš"], ["Cambyses", "Kabûjiya"], ["Smerdis", "Bardiya"], ["Magian", "maguš"],
  ["Intaphrenes", "Vidafarnâ"], ["Otanes", "Utâna"], ["Thukhra", "Thuxra"], ["Gobryas", "Gaubaruva"], ["Mardonius", "Marduniya"],
  ["Hydarnes", "Vidarna"], ["Megabyzus", "Bagabuxša"],
];
assert.equal(BEHISTUN.length, 37, "37 pairs");
assert.equal(new Set(BEHISTUN.map(([e]) => e)).size, 37, "each English name once");

// P1
assert.equal(verdict("Persia", "Pârsa"), "MIRROR", "P1: Persia, Parsa");
assert.equal(verdict("Media", "Mâda"), "MIRROR", "P1: Media, Mada");
assert.equal("Maka", BEHISTUN.find(([e]) => e === "Maka")![1], "P1: Maka is one literal");
// P2
assert.equal(base("Darius"), "DRS"); assert.equal(base("Dâryavuš"), "DRYVS");
assert.equal(verdict("Darius", "Dâryavuš"), "RAISE", "P2: Darius raises");
// P3
for (const [e, p] of [["Smerdis", "Bardiya"], ["Egypt", "Mudrâya"], ["Lydia", "Sparda"]]) assert.equal(verdict(e!, p!), "RAISE", `P3: ${e} raises`);
// P4
assert.equal(verdict("Arabia", "Arabâya"), "MIRROR", "P4: Arabia, Arabaya");
// P5
const mirrors = BEHISTUN.filter(([e, p]) => verdict(e, p) === "MIRROR");
assert.ok(mirrors.length < BEHISTUN.length / 2, `P5: fewer than half mirror (${mirrors.length} of 37)`);

// ── Rosetta: Champollion's fixations, in Budge's words ──
assert.equal(verdict("KAISAROS", "KISRS"), "MIRROR", "P6: KAISAROS, KISRS");
assert.equal(verdict("AUTOKRATOR", "ATKRTR"), "MIRROR", "P6: AUTOKRATOR, A.T.KRTR");
assert.equal(verdict("ALEXANDROS", "ALKSENTRS"), "RAISE", "P7: Alexandros raises letter for letter");
const champollion = (s: string) => fold(s).replace(/X/g, "KS").replace(/D/g, "T");
assert.equal(verdict(champollion("ALEXANDROS"), "ALKSENTRS"), "MIRROR", "P7: and mirrors under X as KS, D as T");

// ── the falsifier: the fold is not free ──
assert.equal(verdict(champollion("Smerdis"), "Bardiya"), "RAISE", "Champollion's fold does not rescue a replaced name");
assert.equal(verdict("Darius", "Dâryavuš".replace(/[yv]/g, "")), "MIRROR", "Darius mirrors only once Y and V are taken from the Persian");

console.log("I-253: the translation fixation in two trilingual inscriptions — which renderings of a name keep its literal, Behistun and Rosetta, by I-229's rule — passed");
console.log(`  Behistun: ${mirrors.length} of 37 English renderings mirror King and Thompson's Persian (${mirrors.map(([e]) => e).join(", ")}); the rest raise`);
console.log("  Rosetta: KAISAROS and KISRS, AUTOKRATOR and A.T.KRTR mirror; ALEXANDROS and ALKSENTRS raise, and mirror under Champollion's X as KS, D as T");
