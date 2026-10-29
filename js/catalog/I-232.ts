// i232.ts — I-232: Yah between man and woman — the letters of the Name given, moved and kept
//
// The author, 2026-10-29: "I'm actually learning to read the hebrew through you but it seems that in
// genesis that the יהוה one of these characters was given and removed from god to adam in making eve
// and also that it relates to the vocalization differences i think it was something about the YAH
// with eve"; then, to filing it: "yes please this may be important to the double barrel god names,
// and the looping of literals". The teaching is rabbinic, read on Genesis 2:23: man, איש, holds the
// yod; woman, אשה, holds the he; together יה, Yah; take Yah from both and each is אש, fire (as cited:
// Talmud, Sotah 17a). And names that gain, lose and pass a letter of the Name: Abram to Abraham
// (Genesis 17:5), Sarai to Sarah (17:15), Hoshea to Joshua (Numbers 13:16), Sarai's yod said to be the
// yod Joshua received (as cited: Genesis Rabbah 47:1). These are the tradition's readings, not the
// author's: the author recalled the teaching loosely ("I think I read it somewhere"), and Claude named
// the sources; this record checks only their letters. Predictions, stated here before the checks:
//
//   P1  איש less its yod and אשה less its he are one base, אש
//   P2  that pair is the only one: removing one letter from each word gives a common base only for
//       yod from the man's word and he from the woman's
//   P3  the two letters removed, man's then woman's, are יה, the head of יהוה: MIRROR by I-229's rule
//   P4  Eve's name חוה (Genesis 3:20) ends in וה, the tail of יהוה; the man's yod, the woman's he and
//       the tail of her name, in that order, are the four letters of the Name
//   P5  Abram to Abraham adds he; Sarai to Sarah puts he where her yod was; Hoshea to Joshua adds a yod
//       before the name; so across the three, two he are added and one yod leaves one name and one
//       yod enters another: the yod is moved, not made (the loop of literals)
//
// Each word stands in its verse in the Westminster Leningrad Codex (public domain; Tanach with
// Ta'amei Hamikra, via Sefaria), checked on its consonants, U+05D0 to U+05EA, the pointing and accents
// set aside: Genesis 2:23 (מאיש, from-man, and אשה), 3:20 (חוה), 17:5 (אברם, אברהם), 17:15 (שרי, שרה),
// Numbers 13:16 (להושע, to-Hoshea, and יהושע). The verse text is not carried here.
import assert from "node:assert";

const NAME = "יהוה";
const verdict = (a: string, b: string) => {
  if (a === b) return "MIRROR";
  const [short, long] = a.length <= b.length ? [a, b] : [b, a];
  return short.length > 0 && long.startsWith(short) ? "MIRROR" : "RAISE";
}; // I-229's guard
const without = (w: string, i: number) => w.slice(0, i) + w.slice(i + 1);
const letters = (w: string) => [...w];

const ISH = "איש", ISHAH = "אשה", HAVVAH = "חוה";
const ABRAM = "אברם", ABRAHAM = "אברהם", SARAI = "שרי", SARAH = "שרה", HOSHEA = "הושע", JOSHUA = "יהושע";
const YOD = "י", HE = "ה";

// ── 1. The man's yod, the woman's he, one base left (P1) ─────────
assert.equal(letters(ISH)[1], YOD, "the man's word holds the yod");
assert.equal(letters(ISHAH)[2], HE, "the woman's word holds the he");
assert.equal(without(ISH, 1), "אש", "the man's word without its yod is אש");
assert.equal(without(ISHAH, 2), "אש", "the woman's word without its he is אש");

// ── 2. The only pair (P2) ────────────────────────────────────────
const common: string[][] = [];
for (let i = 0; i < ISH.length; i++)
  for (let j = 0; j < ISHAH.length; j++)
    if (without(ISH, i) === without(ISHAH, j)) common.push([letters(ISH)[i]!, letters(ISHAH)[j]!]);
assert.deepEqual(common, [[YOD, HE]], "one letter from each makes a common base only for yod and he");

// ── 3. Yah, the head of the Name (P3) ────────────────────────────
const yah = common[0]!.join("");
assert.equal(yah, "יה", "the letters removed, man's then woman's, are יה");
assert.ok(NAME.startsWith(yah), "יה is the head of יהוה");
assert.equal(verdict(NAME, yah), "MIRROR", "MIRROR by I-229's rule: a verbatim head");
assert.equal(verdict(NAME, [...yah].reverse().join("")), "RAISE", "the falsifier: the other order, הי, heads nothing");

// ── 4. Eve's name and the whole Name (P4) ────────────────────────
assert.ok(HAVVAH.endsWith("וה"), "חוה ends in וה");
assert.ok(NAME.endsWith("וה"), "וה is the tail of יהוה");
assert.equal(YOD + HE + HAVVAH.slice(1), NAME, "the man's yod, the woman's he, the tail of her name: יהוה");
assert.equal(NAME.length, 4, "four letters, given by three words");

// ── 5. A letter gained, a letter moved (P5) ──────────────────────
assert.equal(ABRAM.slice(0, 3) + HE + ABRAM.slice(3), ABRAHAM, "Abram to Abraham: a he before the final mem");
assert.equal(SARAI.slice(0, 2) + HE, SARAH, "Sarai to Sarah: a he where the yod was");
assert.equal(without(SARAI, 2), SARAH.slice(0, 2), "and the yod is what Sarai gives up");
assert.equal(YOD + HOSHEA, JOSHUA, "Hoshea to Joshua: a yod before the name");
const added = [HE, HE, YOD], removed = [YOD];
assert.deepEqual(removed.filter((l) => added.includes(l)), [YOD], "the yod that leaves Sarai is a yod that enters Joshua");
assert.equal(added.filter((l) => l === HE).length, 2, "and two he are added, to Abraham and to Sarah");
assert.ok(JOSHUA.startsWith("יה"), "Joshua's name, with its yod, begins with יה");
assert.equal(verdict(NAME, JOSHUA.slice(0, 2)), "MIRROR", "its head mirrors the Name's");

console.log("I-232: Yah between man and woman — the letters of the Name given, moved and kept — passed");
console.log("  איש less י and אשה less ה are one base, אש; the only such pair; the two letters are יה, the head of יהוה");
console.log("  the man's י, the woman's ה, the tail וה of חוה: יהוה");
console.log("  Abram +ה, Sarai י->ה, Hoshea +י: the yod moved from Sarai to Joshua, two he added; יהושע begins with יה");
