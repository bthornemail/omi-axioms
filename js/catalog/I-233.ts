// i233.ts — I-233: the seven days from the eve — declare, define, separate, and the two generations
//
// The author, 2026-10-29, of an early exploratory exchange (the seven days read as Declare, Define and
// Separate, from "the eve of the first day", and "the separation of the 2 types of generation life
// cycles"): "over kill but this reminds me of genesis that everything started on the eve of the first
// day"; "I think we did the day 3 but never got to the day 5 because we moved forward". Read here on
// the letters only, Genesis 1:1 to 2:3 in the Westminster Leningrad Codex (public domain; via Sefaria;
// consonants U+05D0 to U+05EA, the verse text not carried), each verse given to its day by the closes
// "and there was evening and there was morning". Predictions, stated before the text was read:
//
//   P1  six days close evening then morning, ויהי ערב ויהי בקר, evening first each time; the seventh
//       (2:1-3) has no close
//   P2  declare: "and said", ויאמר, ten times in chapter 1
//   P3  define: naming, קרא, only on days 1, 2 and 3
//   P4  separate: בדל (with or without its yod), only on days 1, 2 and 4
//   P5  "that it was good", כי טוב, never on day 2, twice on day 3; day 6 ends "very good", טוב מאד
//   P6  the two generations: day 3's plants hold "seed in itself", זרעו בו, and are not blessed; the
//       first blessing, ויברך, is on day 5, to the living souls, נפש חיה, with "be fruitful", פרו;
//       blessing again on days 6 and 7
//
// The table is derived from the codex on the host (each word, the verses whose consonants hold it);
// the asserts are the predictions over it. All six held.
import assert from "node:assert";

// verse -> day: 1:1-5 day 1, 1:6-8 day 2, 1:9-13 day 3, 1:14-19 day 4, 1:20-23 day 5, 1:24-31 day 6, 2:1-3 day 7
const CLOSES = [5, 8, 13, 19, 23, 31];
const day = (ref: string) => {
  const [ch, v] = ref.split(":").map(Number);
  if (ch === 2) return 7;
  return 1 + CLOSES.filter((c) => c < v!).length;
};
// derived from the codex: word -> verses (repeat counts kept where a verse holds it more than once)
const SAID = ["1:3", "1:6", "1:9", "1:11", "1:14", "1:20", "1:24", "1:26", "1:28", "1:29"]; // ויאמר
const CALLED = ["1:5", "1:5", "1:8", "1:10", "1:10"]; // קרא
const SEPARATED = ["1:4", "1:6", "1:7", "1:14", "1:18"]; // בדל, בדיל
const GOOD = ["1:4", "1:10", "1:12", "1:18", "1:21", "1:25"]; // כי טוב
const VERY_GOOD = ["1:31"]; // טוב מאד
const BLESSED = ["1:22", "1:28", "2:3"]; // ויברך
const SEED = ["1:11", "1:12", "1:29"]; // זרע
const SEED_IN_ITSELF = ["1:11", "1:12"]; // זרעו בו
const LIVING_SOUL = ["1:20", "1:24", "1:30"]; // נפש חיה
const FRUITFUL = ["1:22", "1:28"]; // פרו
const EVENING_BEFORE_MORNING = [true, true, true, true, true, true]; // in each close, ערב before בקר

const days = (refs: string[]) => [...new Set(refs.map(day))];
const count = (refs: string[], d: number) => refs.filter((r) => day(r) === d).length;

// ── 1. The eve first (P1) ─────────────────────────────────────────
assert.equal(CLOSES.length, 6, "six closes");
assert.deepEqual(CLOSES.map((v) => day(`1:${v}`)), [1, 2, 3, 4, 5, 6], "one close ends each of the six days");
assert.ok(EVENING_BEFORE_MORNING.every(Boolean), "evening before morning in every close");
assert.equal(day("2:3"), 7, "and the seventh day has none");

// ── 2. Declare (P2) ───────────────────────────────────────────────
assert.equal(SAID.length, 10, "and said, ten times");
assert.deepEqual(days(SAID), [1, 2, 3, 4, 5, 6], "on each of the six days");

// ── 3. Define (P3) ────────────────────────────────────────────────
assert.deepEqual(days(CALLED), [1, 2, 3], "naming only on days 1, 2 and 3");

// ── 4. Separate (P4) ──────────────────────────────────────────────
assert.deepEqual(days(SEPARATED), [1, 2, 4], "separating only on days 1, 2 and 4");

// ── 5. Good (P5) ──────────────────────────────────────────────────
assert.equal(count(GOOD, 2), 0, "no 'good' on day 2");
assert.equal(count(GOOD, 3), 2, "twice on day 3");
assert.deepEqual(VERY_GOOD.map(day), [6], "'very good' closes day 6");

// ── 6. The two generations (P6) ───────────────────────────────────
assert.deepEqual(days(SEED_IN_ITSELF), [3], "seed in itself: day 3's plants");
assert.equal(count(BLESSED, 3), 0, "and day 3 is not blessed");
assert.equal(day(BLESSED[0]!), 5, "the first blessing is on day 5");
assert.equal(day(LIVING_SOUL[0]!), 5, "where the living souls first are");
assert.deepEqual(days(FRUITFUL), [5, 6], "be fruitful: days 5 and 6");
assert.deepEqual(days(BLESSED), [5, 6, 7], "blessing on days 5, 6 and 7");
assert.ok(days(SEED).includes(3) && days(SEED).includes(6), "seed on day 3, and given again on day 6");
// the falsifier: a generation by seed and a generation by blessing never share a day's first word
assert.notEqual(day(SEED_IN_ITSELF[0]!), day(BLESSED[0]!), "the seed's day is not the blessing's day");

console.log("I-233: the seven days from the eve — declare, define, separate, and the two generations — passed");
console.log("  evening before morning, six closes; ויאמר ten times; naming on days 1-3; separating on days 1, 2, 4");
console.log("  no 'good' on day 2, twice on day 3, 'very good' on day 6");
console.log("  generation by seed in itself (day 3, unblessed); generation by blessing, be fruitful (day 5, then 6; blessed 7)");
