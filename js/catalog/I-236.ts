// i236.ts — I-236: Eve and the earth — one frame, one "was", and Yah in the living
//
// The author, 2026-10-29, after I-232 and I-235: "this would correlate eve to the earth and the
// generation principle right and not adam because the singular is fire but plural is yah but eve can
// begin with yah"; with an alignment of their own: "א..ה : The earth (אדמה) ... א..ה: Eve (אשה) ...
// .ש. ... ..ש : Adam (איש) ... א.. ... א... ...". The pair, man and woman together, giving Yah, and
// each alone fire, is I-232's and is cited, not redone. Read on the consonants of the Westminster Leningrad
// Codex (public domain; via Sefaria; the verse text not carried). Predictions, stated before the words
// were located:
//
//   P1  in Genesis 2:7 the man, האדם, is formed from the ground, האדמה; and אדם is אדמה less its final ה
//       (did not hold letter for letter: the mem turns final, מ to ם; held only under the final-letter fold)
//   P2  the earth and the woman share the frame א...ה (the author's א..ה); the man's word is א...ש
//   P3  in Genesis 3:20, the reason for Eve's name, "mother of all living", uses היתה, "she was", the
//       same form as the earth's "was" in 1:2 (I-235)
//   P4  Eve, חוה, and "living", חיה (the living soul of day 5, 1:20, I-233), differ only in their
//       middle letter, ו against י; and חיה ends in יה (the author's "eve can begin with yah")
//
// Found, not predicted:
//   F1  in 3:20 "she" is written הוא, the Torah's usual spelling, read hi (the feminine היתה beside it
//       says whose): its letters are the Name's ה and ו with the א the Name lacks (I-235)
//
// Derived from the codex, word index in its verse: 2:7 האדם 4, האדמה 7, האדם 13; 3:20 חוה 4, הוא 6,
// היתה 7, אם 8, כל 9, חי 10; 1:2 היתה 1; 1:20 חיה 6. P2, P3 and P4 held; P1 only under the final-letter fold.
import assert from "node:assert";

const without = (w: string, i: number) => [...w].filter((_, j) => j !== i).join("");
const EARTH = "אדמה", ADAM = "אדם", WOMAN = "אשה", MAN = "איש", EVE = "חוה", LIVING = "חיה", WAS = "היתה";
const NAME = "יהוה", MATRES = [..."אהוי"];

// ── 1. Adam is the earth less its he (P1) ─────────────────────────
const V2_7 = ["האדם", "האדמה", "האדם"]; // derived, in order
assert.deepEqual(V2_7.map((w) => w.slice(1)), [ADAM, EARTH, ADAM], "the man, the ground, the man, each with the article ה");
// P1 as stated does not hold letter for letter: without its ה the earth ends in a plain mem, מ, and
// the man's name in the final mem, ם. It holds under the final-letter fold (a mem ending a word is
// written ם), a declared reading of the kind of I-229's J -> Y, which the prediction had not declared
const sofit = (w: string) => w.replace(/מ$/, "ם").replace(/נ$/, "ן").replace(/צ$/, "ץ").replace(/פ$/, "ף").replace(/כ$/, "ך");
assert.notEqual(without(EARTH, 3), ADAM, "letter for letter, אדמה less its ה is אדמ, not אדם");
assert.equal(sofit(without(EARTH, 3)), ADAM, "under the final-letter fold it is אדם");

// ── 2. The frame (P2) ─────────────────────────────────────────────
const frame = (w: string) => w[0] + ".".repeat(w.length - 2) + w[w.length - 1];
assert.equal(frame(EARTH), "א..ה", "the earth: א..ה");
assert.equal(frame(WOMAN), "א.ה", "the woman: א.ה, the same ends");
assert.equal(frame(MAN), "א.ש", "the man: א.ש");
assert.ok(EARTH[0] === WOMAN[0] && EARTH.at(-1) === WOMAN.at(-1), "the earth and the woman share first and last");
assert.ok(MAN.at(-1) !== EARTH.at(-1), "the man does not end as they do");

// ── 3. One "was" (P3) ─────────────────────────────────────────────
const V1_2_WAS = ["היתה"], V3_20 = ["חוה", "הוא", "היתה", "אם", "כל", "חי"]; // derived
assert.equal(V1_2_WAS[0], WAS, "1:2: the earth was, היתה");
assert.ok(V3_20.includes(WAS), "3:20: she was, היתה, the same form");
assert.ok(V3_20.includes(EVE) && V3_20.includes("חי"), "with Eve's name and 'all living'");

// ── 4. Eve and the living (P4) ────────────────────────────────────
const differ = [...EVE].map((c, i) => (c === LIVING[i] ? "" : `${i}:${c}/${LIVING[i]}`)).filter(Boolean);
assert.deepEqual(differ, ["1:ו/י"], "חוה and חיה differ only in the middle letter, ו against י");
assert.ok(LIVING.endsWith("יה"), "חיה ends in יה, Yah");
assert.ok(EVE.endsWith("וה") && NAME.endsWith("וה"), "and חוה in וה, the tail of the Name (I-232)");
assert.ok(NAME.startsWith(LIVING.slice(1)), "the living's tail, יה, is the Name's head");

// ── Found: she (F1) ───────────────────────────────────────────────
const SHE = "הוא";
assert.ok(V3_20.includes(SHE), "F1: 'she' written הוא in 3:20");
assert.deepEqual([...SHE].filter((c) => NAME.includes(c)), ["ה", "ו"], "its ה and ו are the Name's");
assert.deepEqual([...SHE].filter((c) => !NAME.includes(c)), ["א"], "its א is the one vowel letter the Name lacks");
assert.ok([...SHE].every((c) => MATRES.includes(c)), "all three vowel letters");
// the falsifier: the man's word does not share the earth's frame
assert.notEqual(frame(MAN).at(-1), frame(EARTH).at(-1), "the man's frame is not the earth's");

console.log("I-236: Eve and the earth — one frame, one 'was', and Yah in the living — passed");
console.log("  2:7: אדם is אדמה less its ה under the final-letter fold (letter for letter אדמ); the earth and the woman are both א..ה, the man א..ש");
console.log("  היתה: the earth was (1:2), she was the mother of all living (3:20)");
console.log("  חוה and חיה differ by ו/י; חיה ends in יה; 'she' in 3:20 is הוא, the Name's ה and ו with the א it lacks");
