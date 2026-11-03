// i250.ts — I-250: the dominoes' empty places, the stella octangula they make and the Fano plane of its moves
//
// The author, 2026-11-02: "im looking at set of domnioes and im seeing that the line bettwen the 6 dots statys
// empty in every dominion high and low and im seeing its factorial 4 = 24 ... and they have the agen patter of 9
// dots moreso than the 8", naming the places: "vertical row0col1, row2col1, row3col1, row5col1; horizontal
// row1,col0, row1,col2, row1,col3, row1,col5"; then "yes the fano plane"; "the 24 of the 4! of the dminio set is
// the tethrahedreon edge to fac or veritice to face configutaion"; "the four emtypdots are the vertices of the
// tetrahedron and the fano plane is the horziontal and vertical"; "there is a dark and light tetrahedron because
// the stellated is the fano plane", "dark ad light set marker of the dominitoes for the horizontal and veritcal";
// and, of "2! of 4!": "the 2 factrial ar the 2 dots on the high are low vertical and the fet or right horzontial
// view" (unbound global.vtt, domino-fano to domino-halves).
//
// Measured once, 2026-11-02, and held here as literals: Unicode's Domino Tiles, the 49 HORIZONTAL tiles
// (U+1F031 to U+1F061) and the 49 VERTICAL (U+1F063 to U+1F093), rendered in DejaVu Sans and in Noto Sans
// Symbols2, each half read at the nine places of its 3 x 3, the places taken from the 6-6 tile's own pips; both
// fonts gave the same places, and every tile's pips counted its two values. The check does not render; it
// derives from the places read.
//
// Found and checked: the author's places are empty on every tile, two a half, four a tile (the two ends of the
// six's middle line); a quarter turn carries each vertical place to the horizontal place of the same values; the
// 8 empty dots of the two orientations are moved onto themselves by T (the halves swapped), W (each half flipped
// in itself) and D (the quarter turn's pairing), whose 8 moves are three bits, so the 7 moves are the Fano
// plane, T W TW its kept line; joined by the turning moves the dots are a cube whose two colours are the
// vertical and horizontal sets, each a tetrahedron by face diagonals: the stella octangula, dark and light; the
// tetrahedron's 24 flags are 4!, and in the Fano plane the 24 symmetries keeping a line act on the 4 points off
// it as the tetrahedron's on its vertices; in the Hasse diagram of the 16 two-input rules the 24 chains are those
// flags, and 2! x 2! = 4 of them go through each half's two dots. Found against a reading: the seven places a
// half uses are not a Fano plane by the 3 x 3's straight lines.
import assert from "node:assert";

// ── 1. the places read: each place of a half, the values holding a pip there ──
// vertical: (row 0..5, col 0..2), rows 0-2 the high half; horizontal: (row 0..2, col 0..5), cols 0-2 the left half
const V: Record<string, number[]> = { "0,0": [4, 5, 6], "0,2": [2, 3, 4, 5, 6], "1,0": [6], "1,1": [1, 3, 5], "1,2": [6], "2,0": [2, 3, 4, 5, 6], "2,2": [4, 5, 6],
  "3,0": [4, 5, 6], "3,2": [2, 3, 4, 5, 6], "4,0": [6], "4,1": [1, 3, 5], "4,2": [6], "5,0": [2, 3, 4, 5, 6], "5,2": [4, 5, 6] };
const H: Record<string, number[]> = { "0,0": [2, 3, 4, 5, 6], "0,1": [6], "0,2": [4, 5, 6], "0,3": [2, 3, 4, 5, 6], "0,4": [6], "0,5": [4, 5, 6], "1,1": [1, 3, 5],
  "1,4": [1, 3, 5], "2,0": [4, 5, 6], "2,1": [6], "2,2": [2, 3, 4, 5, 6], "2,3": [4, 5, 6], "2,4": [6], "2,5": [2, 3, 4, 5, 6] };
const placesV = [0, 1, 2, 3, 4, 5].flatMap((r) => [0, 1, 2].map((c) => `${r},${c}`));
const placesH = [0, 1, 2].flatMap((r) => [0, 1, 2, 3, 4, 5].map((c) => `${r},${c}`));
const halfV = (p: string) => (+p.split(",")[0]! < 3 ? 0 : 1), halfH = (p: string) => (+p.split(",")[1]! < 3 ? 0 : 1);
for (const [M, places, half] of [[V, placesV, halfV], [H, placesH, halfH]] as const)
  for (let v = 0; v <= 6; v++) for (const h of [0, 1])
    assert.equal(places.filter((p) => half(p) === h && (M[p] ?? []).includes(v)).length, v, `each half of value ${v} holds ${v} pips`);
assert.deepEqual(placesV.filter((p) => !V[p]), ["0,1", "2,1", "3,1", "5,1"], "vertical: row0col1, row2col1, row3col1, row5col1 never hold a pip");
assert.deepEqual(placesH.filter((p) => !H[p]), ["1,0", "1,2", "1,3", "1,5"], "horizontal: row1 col0, col2, col3, col5 never hold a pip");
assert.equal(Object.keys(V).length, 14, "a half uses seven of its nine places, a tile fourteen of eighteen");
const q = (p: string) => { const [r, c] = p.split(",").map(Number); return `${2 - c!},${r}`; };
assert.ok(Object.entries(V).every(([p, v]) => JSON.stringify(H[q(p)]) === JSON.stringify(v)), "a quarter turn carries each vertical place to the horizontal place of the same values, high to left");

// ── 2. the moves of the 8 empty dots: three bits, the Fano plane ──
type Dot = string;	// "v,r,c" or "h,r,c"
const ev: Dot[] = ["v,0,1", "v,2,1", "v,3,1", "v,5,1"], eh: Dot[] = ["h,1,0", "h,1,2", "h,1,3", "h,1,5"], dots = [...ev, ...eh];
const parse = (d: Dot) => { const [o, r, c] = d.split(","); return [o!, +r!, +c!] as const; };
const T = (d: Dot) => { const [o, r, c] = parse(d); return o === "v" ? `v,${(r + 3) % 6},${c}` : `h,${r},${(c + 3) % 6}`; };
const W = (d: Dot) => { const [o, r, c] = parse(d); return o === "v" ? `v,${Math.floor(r / 3) * 3 + 2 - (r % 3)},${c}` : `h,${r},${Math.floor(c / 3) * 3 + 2 - (c % 3)}`; };
const D = (d: Dot) => { const [o, r, c] = parse(d); return o === "v" ? `h,1,${r}` : `v,${c},1`; };
assert.ok(ev.every((d) => D(d) === `h,1,${parse(d)[1]}` && q(`${parse(d)[1]},${parse(d)[2]}`) === `1,${parse(d)[1]}`), "D is the quarter turn on the empty dots");
const gens: Record<string, (d: Dot) => Dot> = { T, W, D };
const move = (w: string, g = gens) => (d: Dot) => [...w].reduce((x, k) => g[k]!(x), d);
const words = ["", "T", "W", "D", "TW", "TD", "WD", "TWD"];
const perm = (w: string, g = gens) => dots.map(move(w, g)).join(" ");
assert.equal(new Set(words.map((w) => perm(w))).size, 8, "the 8 moves distinct");
assert.ok(words.every((w) => dots.every((d) => move(w + w)(d) === d)), "each its own inverse");
assert.ok(["T", "W", "D"].every((a) => ["T", "W", "D"].every((b) => perm(a + b) === perm(b + a))), "all commuting");
assert.ok(dots.every((d) => new Set(words.map((w) => move(w)(d))).size === 8), "from any dot, each move to a different dot");
const vec = (w: string) => ["T", "W", "D"].map((k) => (w.includes(k) ? 1 : 0));
const pts = words.slice(1);
const lines = pts.flatMap((a, i) => pts.slice(i + 1).flatMap((b, j) => pts.slice(i + j + 2).filter((c) => [0, 1, 2].every((k) => (vec(a)[k]! + vec(b)[k]! + vec(c)[k]!) % 2 === 0)).map((c) => [a, b, c])));
assert.equal(lines.length, 7, "the 7 moves, the Fano plane: 7 lines, the triples composing to none");
assert.ok(lines.some((l) => l.join(" ") === "T W TW"), "the kept line, the moves keeping each orientation: T W TW");
assert.deepEqual(["D", "TD", "WD", "TWD"].map((w) => move(w)(ev[0]!)).sort(), [...eh].sort(), "the 4 off it reach the 4 horizontal dots: the tetrahedron the other orientation's empty dots");

// ── 3. the cube and its dark and light tetrahedra: the stella octangula ──
const axes = ["D", "TD", "WD"];
const coord = new Map<Dot, number[]>();
for (const a of [0, 1]) for (const b of [0, 1]) for (const c of [0, 1]) coord.set(move(axes.filter((_, k) => [a, b, c][k]).join(""))(ev[0]!), [a, b, c]);
assert.equal(coord.size, 8, "joined by the turning moves, the 8 dots are a cube's corners");
const dist = (x: Dot, y: Dot) => coord.get(x)!.reduce((s, v, k) => s + (v !== coord.get(y)![k] ? 1 : 0), 0);
const colour = (x: Dot) => dist(x, ev[0]!) % 2;
assert.ok(ev.every((d) => colour(d) === 0) && eh.every((d) => colour(d) === 1), "its two colours: the vertical dots and the horizontal, dark and light");
const diag = (P: Dot[]) => P.flatMap((x, i) => P.slice(i + 1).filter((y) => dist(x, y) === 2)).length;
assert.deepEqual([diag(ev), diag(eh)], [6, 6], "each colour's 4 joined by face diagonals: two tetrahedra");
for (let k = 0; k < 3; k++) for (const v of [0, 1])
  assert.equal(dots.filter((d) => coord.get(d)![k] === v && colour(d) === 0).length, 2, "every face of the cube holds 2 of each");

// ── 4. 4!: the tetrahedron's flags, the Fano plane's 24, the Hasse diagram's chains ──
const perms = (xs: number[]): number[][] => (xs.length ? xs.flatMap((x) => perms(xs.filter((y) => y !== x)).map((p) => [x, ...p])) : [[]]);
const V4 = [0, 1, 2, 3], E = V4.flatMap((a) => V4.filter((b) => b > a).map((b) => [a, b])), F = V4.map((x) => V4.filter((y) => y !== x));
assert.equal(V4.reduce((s, v) => s + F.filter((f) => f.includes(v)).length, 0), 12, "vertex to face: 12");
assert.equal(E.reduce((s, e) => s + F.filter((f) => e.every((x) => f.includes(x))).length, 0), 12, "edge to face: 12");
assert.equal(V4.reduce((s, v) => s + E.filter((e) => e.includes(v)).reduce((t, e) => t + F.filter((f) => e.every((x) => f.includes(x))).length, 0), 0), 24, "flags, a vertex in an edge in a face: 24, 4!");
const fano = [1, 2, 3, 4, 5, 6, 7].flatMap((a) => [1, 2, 3, 4, 5, 6, 7].filter((b) => b > a && (a ^ b) > b).map((b) => [a, b, a ^ b]));
const isLine = (t: number[]) => fano.some((l) => t.every((x) => l.includes(x)));
const syms = perms([1, 2, 3, 4, 5, 6, 7]).filter((p) => fano.every((l) => isLine(l.map((x) => p[x - 1]!))));
assert.equal(syms.length, 168, "the Fano plane's symmetries: 168");
const keep = syms.filter((p) => [1, 2, 3].map((x) => p[x - 1]).sort().join() === "1,2,3");
assert.equal(keep.length, 24, "keeping a line: 168 / 7 = 24");
assert.equal(new Set(keep.map((p) => [4, 5, 6, 7].map((x) => p[x - 1]).join())).size, 24, "and on the 4 points off it, every one of the 4! orders: the tetrahedron's");
const third = (a: number, b: number) => fano.find((l) => l.includes(a) && l.includes(b))!.find((x) => x !== a && x !== b)!;
assert.ok(third(4, 5) === third(6, 7) && third(4, 6) === third(5, 7) && third(4, 7) === third(5, 6), "opposite edges meet the kept line at the same point");
const w = (v: number) => [0, 1, 2, 3].filter((k) => (v >> k) & 1).length;
const chains = (v: number): number[][] => (v === 15 ? [[15]] : [0, 1, 2, 3].filter((k) => !((v >> k) & 1)).flatMap((k) => chains(v | (1 << k)).map((c) => [v, ...c])));
assert.equal([...Array(16).keys()].flatMap((a) => [0, 1, 2, 3].filter((k) => !((a >> k) & 1))).length, 32, "the 16 rules, 32 one-bit steps");
assert.equal(chains(0).length, 24, "the Hasse diagram's chains from FALSE to TRUE: 24, the flags");
assert.ok([...Array(16).keys()].filter((v) => w(v) === 2).every((v) => chains(0).filter((c) => c.includes(v)).length === 4), "2! x 2! = 4 through each weight-2 rule: a half's two dots, then the other's");
const half = (o: number[]) => [o.slice(0, 2).sort().join(), o.slice(2).sort().join()];
assert.equal(perms([0, 1, 2, 3]).filter((o) => half(o)[0] === "0,1").length, 4, "of the 4! orders of a tile's 4 dots, 2! x 2! take the high half's first");

// ── 5. against a reading: the seven places are not a Fano plane by straight lines ──
const used = Object.keys(V).filter((p) => halfV(p) === 0);
const grid = [[0, 1, 2].map((c) => [0, c]), [0, 1, 2].map((c) => [1, c]), [0, 1, 2].map((c) => [2, c]), [0, 1, 2].map((r) => [r, 0]), [0, 1, 2].map((r) => [r, 1]), [0, 1, 2].map((r) => [r, 2]), [0, 1, 2].map((i) => [i, i]), [0, 1, 2].map((i) => [i, 2 - i])]
  .map((l) => l.map(([r, c]) => `${r},${c}`)).filter((l) => l.every((p) => used.includes(p)));
assert.equal(grid.length, 5, "found: the seven places hold five straight lines");
const onLine = (a: string, b: string) => grid.some((l) => l.includes(a) && l.includes(b));
const free = used.flatMap((a, i) => used.slice(i + 1).filter((b) => !onLine(a, b)).map((b) => [a, b]));
assert.equal(free.length, 6, "six pairs on no line");
const addable = used.flatMap((a, i) => used.slice(i + 1).flatMap((b, j) => used.slice(i + j + 2).filter((c) => !onLine(a, b) && !onLine(a, c) && !onLine(b, c))));
assert.equal(addable.length, 0, "and no line can be added: not a Fano plane as drawn");

// ── 6. the falsifier: W replaced by a flip of one half alone ──
const W1 = (d: Dot) => { const [o, r, c] = parse(d); return o === "v" ? (r < 3 ? `v,${2 - r},${c}` : d) : c < 3 ? `h,${r},${2 - c}` : d; };
const bad = { T, W: W1, D };
assert.notEqual(perm("TW", bad), perm("WT", bad), "one half flipped alone: the moves no longer commute");
assert.ok(!(new Set(words.map((x) => perm(x, bad))).size === 8 && words.every((x) => dots.every((d) => move(x + x, bad)(d) === d))), "and make no three bits, no Fano plane");

console.log("I-250: the dominoes' empty places, the stella octangula they make and the Fano plane of its moves — passed");
console.log("  the author's places empty on every tile; the 8 empty dots' moves are three bits: the Fano plane, T W TW kept");
console.log("  the cube's two colours the vertical and horizontal dots, dark and light; 4! the flags, 2! x 2! through each half");
