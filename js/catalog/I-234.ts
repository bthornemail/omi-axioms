// i234.ts — I-234: the two plants of day 3 — the herb seeding seed, the tree making fruit
//
// The author, 2026-10-29, after I-233: "the plants were vegetables and fruits, terms and commands aka
// monads and functors, the difference in seeding constants". Read on the letters only, Genesis 1:11,
// 1:12 and 1:29 in the Westminster Leningrad Codex (public domain; via Sefaria; consonants U+05D0 to
// U+05EA, the verse text not carried; positions are word indices in the verse). Predictions, stated
// before the words were located:
//
//   P1  1:11 names two kinds after "vegetation", דשא: the herb seeding seed, עשב מזריע זרע, and the
//       fruit tree making fruit, עץ פרי עשה פרי
//   P2  "whose seed is in it", זרעו בו, follows the fruit tree, not the herb
//   P3  the herb's verb, מזריע, is of the seed's own root, ז-ר-ע; the tree's verb, עשה, make or do, is not
//   P4  1:12 tells both again, each "after its kind", למינהו
//   P5  1:29 gives both as food, לאכלה
//
// Found, not predicted (recorded as found):
//   F1  the command (1:11, "let the earth sprout") says fruit tree, עץ פרי; what the earth brought forth
//       (1:12) is a tree, עץ, with no פרי before its verb: the command and its execution differ by one
//       word (Rashi on 1:11-12 reads the earth's not doing as commanded; a reading, the author's to take)
//   F2  the seeding verb on day 3 is מזריע (causative, with מ and an inner י); where the same plants are
//       given as food on day 6 (1:29) it is זרע (simple): the seeding word changes form between the days
//
// All five predictions held.
import assert from "node:assert";

// derived from the codex: verse -> the located words, by their index in the verse
const V11: [number, string][] = [[4, "דשא"], [5, "עשב"], [6, "מזריע"], [7, "זרע"], [8, "עץ"], [9, "פרי"], [10, "עשה"], [11, "פרי"], [12, "למינו"], [14, "זרעו"], [15, "בו"]];
const V12: [number, string][] = [[2, "דשא"], [3, "עשב"], [4, "מזריע"], [5, "זרע"], [6, "למינהו"], [7, "ועץ"], [8, "עשה"], [9, "פרי"], [11, "זרעו"], [12, "בו"], [13, "למינהו"]];
const V29: [number, string][] = [[7, "עשב"], [8, "זרע"], [9, "זרע"], [19, "בו"], [20, "פרי"], [21, "עץ"], [22, "זרע"], [23, "זרע"], [26, "לאכלה"]];

const at = (v: [number, string][], w: string) => v.filter(([, x]) => x === w).map(([i]) => i);
const ROOT = "זרע";
const root = (w: string) => [...ROOT].every((c) => w.includes(c));

// ── 1. Two kinds (P1) ─────────────────────────────────────────────
assert.deepEqual(V11.slice(0, 8).map(([, w]) => w), ["דשא", "עשב", "מזריע", "זרע", "עץ", "פרי", "עשה", "פרי"],
  "vegetation; herb seeding seed; fruit tree making fruit");

// ── 2. The seed in it follows the tree (P2) ──────────────────────
assert.ok(at(V11, "זרעו")[0]! > at(V11, "עשה")[0]!, "in 1:11 'whose seed is in it' comes after the tree makes fruit");
assert.ok(at(V12, "זרעו")[0]! > at(V12, "עשה")[0]! && at(V12, "זרעו")[0]! > at(V12, "למינהו")[0]!,
  "and in 1:12 after the tree, past the herb's 'after its kind'");

// ── 3. The verbs (P3) ─────────────────────────────────────────────
assert.ok(root("מזריע"), "מזריע holds the seed's root");
assert.ok(!root("עשה"), "עשה does not");

// ── 4. After its kind, both (P4) ──────────────────────────────────
assert.equal(at(V12, "למינהו").length, 2, "1:12: the herb after its kind, the tree after its kind");
assert.ok(at(V12, "למינהו")[0]! < at(V12, "עשה")[0]! && at(V12, "למינהו")[1]! > at(V12, "עשה")[0]!, "one for each");

// ── 5. Given as food (P5) ─────────────────────────────────────────
assert.ok(at(V29, "עשב").length && at(V29, "עץ").length && at(V29, "לאכלה").length, "1:29: herb and tree, for food");

// ── Found (F1, F2) ────────────────────────────────────────────────
assert.equal(V11.filter(([, w]) => w === "פרי").length, 2, "F1: the command has פרי twice, fruit tree making fruit");
assert.equal(V12.filter(([, w]) => w === "פרי").length, 1, "and the execution once: a tree making fruit");
assert.deepEqual([at(V11, "מזריע").length, at(V12, "מזריע").length, at(V29, "מזריע").length], [1, 1, 0],
  "F2: מזריע on day 3, twice told; not in 1:29");
assert.equal(at(V29, "זרע").length, 4, "where it is זרע: herb seeding seed, and fruit of a tree seeding seed");
// the falsifier: the herb's line has no עשה, the tree's line in 1:11 has no מזריע
assert.ok(at(V11, "עשה")[0]! > at(V11, "עץ")[0]! && at(V11, "מזריע")[0]! < at(V11, "עץ")[0]!,
  "each verb stands with its own kind: מזריע before the tree, עשה after it");

console.log("I-234: the two plants of day 3 — the herb seeding seed, the tree making fruit — passed");
console.log("  1:11 herb מזריע זרע (the seed's own root), tree עשה פרי (make), its seed in it; 1:12 each after its kind; 1:29 both for food");
console.log("  found: the command's עץ פרי is the execution's עץ, one פרי fewer; מזריע on day 3, זרע on day 6");
