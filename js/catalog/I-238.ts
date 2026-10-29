// i238.ts — I-238: day 5 — each kind by its own root, and "created" returns with the living
//
// The author, 2026-10-29: "is it time to continue building on foundations", with the next stick named
// in their relay as day 5, the living soul. Already proved and cited, not redone: the first blessing and
// the first living soul on day 5 (I-233); חיה ending in יה (I-236). Read on the consonants of the
// Westminster Leningrad Codex, Genesis 1:1 to 2:3 (via Sefaria; the verse text not carried; positions
// are word indices). Predictions, stated before the words were located:
//
//   P1  day 5's two kinds are each named with a verb of their own root: "let the waters swarm swarms",
//       ישרצו ... שרץ, and "let fowl fly", עוף יעופף; as day 3's vegetation and herb, תדשא דשא and
//       מזריע זרע, and unlike its tree, עשה פרי, made with another verb
//   P2  "created", ברא (בראשית aside), returns on day 5 (1:21), its first since 1:1, and is absent on
//       days 2, 3 and 4
//   P3  on day 6 the animals are "made", ויעש (1:25), and man "created", three times (1:27)
//
// Found, not predicted:
//   F1  day 5's two kinds mirror in word order: the swarm verb then noun (ישרצו 2, שרץ 4), the fowl noun
//       then verb (ועוף 7, יעופף 8); day 3's two are both verb then noun (תדשא 2, דשא 4; מזריע 6, זרע 7)
//
// All three predictions held.
import assert from "node:assert";

// derived from the codex
const V1_20: [number, string][] = [[2, "ישרצו"], [4, "שרץ"], [7, "ועוף"], [8, "יעופף"]];
const V1_11: [number, string][] = [[2, "תדשא"], [4, "דשא"], [6, "מזריע"], [7, "זרע"], [10, "עשה"]];
const CREATED: [string, number, number][] = [["1:1", 0, 1], ["1:21", 5, 1], ["1:27", 6, 3], ["2:3", 7, 1]]; // verse, day (0: before the first day's work), count
const MADE_1_25 = ["ויעש"];

const idx = (v: [number, string][], w: string) => v.find(([, x]) => x === w)![0];
const shares = (a: string, b: string, root: string) => [a, b].every((w) => [...root].every((c) => w.includes(c)));

// ── P1: each kind by its own root ─────────────────────────────────
assert.ok(shares("ישרצו", "שרץ", "שר") && "ישרצו".includes("שרצ"), "swarm swarms: one root, ש-ר-צ (צ final in שרץ)");
assert.ok(shares("ועוף", "יעופף", "עו"), "fowl fly: one root, ע-ו-פ");
assert.ok(shares("תדשא", "דשא", "דשא"), "day 3: sprout vegetation, one root");
assert.ok(shares("מזריע", "זרע", "זרע"), "day 3: seeding seed, one root");
assert.ok(!shares("עשה", "פרי", "פרי"), "and the tree's fruit is made with another verb");

// ── P2: created returns with the living ───────────────────────────
assert.deepEqual(CREATED.map(([, d]) => d), [0, 5, 6, 7], "created at the beginning, then on days 5, 6 and 7");
assert.ok(![2, 3, 4].some((d) => CREATED.some(([, x]) => x === d)), "never on days 2, 3 and 4");
assert.equal(CREATED[1]![0], "1:21", "its first after 1:1 is the great sea creatures and every living soul");

// ── P3: made and created on day 6 ─────────────────────────────────
assert.deepEqual(MADE_1_25, ["ויעש"], "1:25: the animals made");
assert.equal(CREATED.find(([v]) => v === "1:27")![2], 3, "1:27: man created, three times");

// ── Found: the mirror (F1) ────────────────────────────────────────
assert.ok(idx(V1_20, "ישרצו") < idx(V1_20, "שרץ"), "swarm: verb then noun");
assert.ok(idx(V1_20, "ועוף") < idx(V1_20, "יעופף"), "fowl: noun then verb");
assert.ok(idx(V1_11, "תדשא") < idx(V1_11, "דשא") && idx(V1_11, "מזריע") < idx(V1_11, "זרע"), "day 3: both verb then noun");
// the falsifier: were the fowl verb first like the rest, there would be no mirror
assert.notEqual(idx(V1_20, "ועוף") < idx(V1_20, "יעופף"), idx(V1_20, "ישרצו") > idx(V1_20, "שרץ"), "the two orders are opposite");

console.log("I-238: day 5 — each kind by its own root, and 'created' returns with the living — passed");
console.log("  swarm swarms (ישרצו שרץ), fowl fly (עוף יעופף), as day 3's sprout vegetation and seeding seed; the tree made");
console.log("  created: 1:1, then 1:21 (day 5), 1:27 x3 (day 6), 2:3; never days 2-4; day 6's animals made");
console.log("  found: swarm verb-noun, fowl noun-verb, a mirror; day 3 both verb-noun");
