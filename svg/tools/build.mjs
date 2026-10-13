// The Fano icons, read as text, and the Hasse diagrams they make.
//
// The author, 2026-10-13: "we have the Fano plane icons that we can animate to
// compute this to Hasse diagrams; each rule can be a Hasse diagram pair, analog
// to the 14 Fano planes". Each icon in ../fano is read as text: its marked dots
// (point-sized circles on the highlight layer) are located in page coordinates,
// and the file becomes a 7-bit mask, bit n - 1 on when point n is marked. The
// labels 1..7 are taken from the Fano_point_n files themselves, so nothing here
// is told where a point is. The masks are checked: every line's points XOR to 0.
//
// The 16 two-input rules (truth table t, bit a*2 + b = f(a, b)) match the 16
// icons: the constants FALSE and TRUE are the empty and the full plane, and the
// 14 others, paired with their complements (t and t ^ 15), are the 7 points:
// truth tables up to complement form GF(2)^3. Each rule pair is drawn as a pair
// of Hasse diagrams: the rules ordered by implication (the 4-cube, where a rule
// and its complement are opposite corners) and the Fano plane's subspaces (empty,
// the 7 points, the 7 lines, full), with the icons themselves as the nodes.
//
// Writes ../hasse/*.svg and ../../svg-docs/*.md. Deterministic. Fails on any
// check that does not hold.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import assert from 'node:assert';

const here = new URL('..', import.meta.url);
const FANO = new URL('fano/', here), HASSE = new URL('hasse/', here), DOCS = new URL('../svg-docs/', here);
mkdirSync(HASSE, { recursive: true });
mkdirSync(DOCS, { recursive: true });

// ── Reading an icon ──────────────────────────────────────────
const mul = (m, n) => [m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1], m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3], m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5]];
const I = [1, 0, 0, 1, 0, 0];
function parseTransform(s) {
  let m = I;
  for (const [, op, args] of (s ?? '').matchAll(/(matrix|translate|scale)\(([^)]*)\)/g)) {
    const v = args.split(/[\s,]+/).filter(Boolean).map(Number);
    const n = op === 'matrix' ? v : op === 'translate' ? [1, 0, 0, 1, v[0], v[1] ?? 0] : [v[0], 0, 0, v[1] ?? v[0], 0, 0];
    m = mul(m, n);
  }
  return m;
}
const attrs = (s) => Object.fromEntries([...s.matchAll(/([\w:-]+)="([^"]*)"/g)].map((x) => [x[1], x[2]]));

/** The point-sized circles of an icon, in page coordinates, by layer. */
export function readIcon(text) {
  const stack = [{ m: I, layer: null }];
  const dots = { layer1: [], layer2: [] };
  for (const [, close, tag, body, self] of text.matchAll(/<(\/?)([\w:]+)([^>]*?)(\/?)>/g)) {
    if (tag === 'g' && close) { stack.pop(); continue; }
    if (close) continue;
    const a = attrs(body), top = stack[stack.length - 1];
    const m = mul(top.m, parseTransform(a.transform));
    if (tag === 'g' && !self) { stack.push({ m, layer: a.id === 'layer1' || a.id === 'layer2' ? a.id : top.layer }); continue; }
    if (tag === 'circle' && Number(a.r) === 20 && top.layer) {
      const x = Number(a.cx), y = Number(a.cy);
      dots[top.layer].push({ x: m[0] * x + m[2] * y + m[4], y: m[1] * x + m[3] * y + m[5] });
    }
  }
  return dots;
}

const files = readdirSync(FANO).filter((f) => f.endsWith('.svg')).sort();
assert.strictEqual(files.length, 16, 'sixteen icons');
const icons = Object.fromEntries(files.map((f) => [f, readIcon(readFileSync(new URL(f, FANO), 'utf8'))]));

// The labels: where Fano_point_n marks its one dot.
const label = {};
for (let n = 1; n <= 7; n++) {
  const d = icons[`Fano_point_${n}.svg`].layer2;
  assert.strictEqual(d.length, 1, `Fano_point_${n} marks one dot`);
  label[n] = d[0];
}
const near = (p, q) => Math.hypot(p.x - q.x, p.y - q.y) < 1;
for (let a = 1; a <= 7; a++) for (let b = a + 1; b <= 7; b++) assert.ok(!near(label[a], label[b]), `points ${a} and ${b} are apart`);
for (const f of files) for (const d of icons[f].layer1) assert.ok(Object.values(label).some((p) => near(p, d)), `${f}: every base dot is one of the seven`);

/** The 7-bit mask of an icon: bit n - 1 when point n is marked. */
const mask = (f) => icons[f].layer2.reduce((m, d) => {
  const n = Object.keys(label).find((k) => near(label[k], d));
  assert.ok(n, `${f}: a marked dot is on a point`);
  return m | (1 << (n - 1));
}, 0);
const masks = Object.fromEntries(files.map((f) => [f, mask(f)]));
const pointsOf = (m) => [1, 2, 3, 4, 5, 6, 7].filter((n) => m & (1 << (n - 1)));

// The masks by file, for anything outside this folder to read (core's sixteen constants are checked against them).
writeFileSync(new URL('masks.json', FANO), JSON.stringify(Object.fromEntries(files.map((f) => [f, masks[f]])), null, 2) + '\n');

// ── The checks on the icons ─────────────────────────────────
assert.strictEqual(masks['Fano_empty.svg'], 0, 'the empty plane marks nothing');
assert.strictEqual(masks['Fano_full.svg'], 0x7f, 'the full plane marks all seven');
for (let n = 1; n <= 7; n++) assert.strictEqual(masks[`Fano_point_${n}.svg`], 1 << (n - 1), `point ${n}`);
const LINES = files.filter((f) => f.startsWith('Fano_line_'));
assert.strictEqual(LINES.length, 7, 'seven lines');
const lines = LINES.map((f) => {
  const named = f.match(/Fano_line_(\d)_(\d)_(\d)/).slice(1).map(Number);
  const pts = pointsOf(masks[f]);
  assert.deepStrictEqual(pts, [...named].sort(), `${f} marks the points it is named for`);
  assert.strictEqual(pts[0] ^ pts[1] ^ pts[2], 0, `${f}: a ^ b ^ c = 0`);
  return { file: f, pts, mask: masks[f] };
});
const allLines = new Set();
for (let a = 1; a < 8; a++) for (let b = a + 1; b < 8; b++) allLines.add([a, b, a ^ b].sort().join());
assert.deepStrictEqual(new Set(lines.map((l) => l.pts.join())), allLines, 'the seven files are the seven lines {a, b, a ^ b}');

// ── The 16 rules ────────────────────────────────────────────
const NAMES = ['FALSE', 'NOR', 'B AND NOT A', 'NOT A', 'A AND NOT B', 'NOT B', 'XOR', 'NAND', 'AND', 'XNOR', 'B', 'A IMPLIES B', 'A', 'B IMPLIES A', 'OR', 'TRUE'];
const f = (t, a, b) => (t >> (a * 2 + b)) & 1;
const table = (t) => [0, 1].flatMap((a) => [0, 1].map((b) => f(t, a, b))).join('');
// the names, checked against their meaning
const meaning = [() => 0, (a, b) => +!(a | b), (a, b) => +(!a && b), (a) => +!a, (a, b) => +(a && !b), (a, b) => +!b, (a, b) => a ^ b, (a, b) => +!(a & b), (a, b) => a & b, (a, b) => +(a === b), (a, b) => b, (a, b) => +(!a || b), (a) => a, (a, b) => +(a || !b), (a, b) => a | b, () => 1];
for (let t = 0; t < 16; t++) for (const a of [0, 1]) for (const b of [0, 1]) assert.strictEqual(f(t, a, b), meaning[t](a, b), `${NAMES[t]} at ${a}${b}`);
assert.deepStrictEqual([NAMES[0x7], NAMES[0x1], NAMES[0xe], NAMES[0x6], NAMES[0x9], NAMES[0x8]], ['NAND', 'NOR', 'OR', 'XOR', 'XNOR', 'AND'], "the organ's tables (breadboard/esp32): NAND 7, NOR 1, OR E, XOR 6, XNOR 9, AND 8");

/** A rule's point: its truth table up to complement (0 for the constants). */
const pointOf = (t) => (t < 8 ? t : t ^ 15);
const iconOf = (t) => (t === 0 ? 'Fano_empty.svg' : t === 15 ? 'Fano_full.svg' : `Fano_point_${pointOf(t)}.svg`);
for (let t = 1; t < 15; t++) assert.ok(pointOf(t) >= 1 && pointOf(t) <= 7, `${NAMES[t]} has a point`);
for (let p = 1; p <= 7; p++) assert.deepStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].filter((t) => pointOf(t) === p), [p, p ^ 15], `point ${p} is the pair ${NAMES[p]} / ${NAMES[p ^ 15]}`);
// a line's three pairs: any two rules XOR to a rule of the third pair
for (const l of lines) {
  const [p, q, r] = l.pts;
  for (const x of [p, p ^ 15]) for (const y of [q, q ^ 15]) assert.strictEqual(pointOf(x ^ y), r, `${NAMES[x]} XOR ${NAMES[y]} is in the pair of point ${r}`);
}
// the rules by implication: the 4-cube; a rule and its complement are opposite corners
const pop = (x) => x.toString(2).replace(/0/g, '').length;
const cover = [];
for (let t = 0; t < 16; t++) for (let k = 0; k < 4; k++) if (!(t & (1 << k))) cover.push([t, t | (1 << k)]);
assert.strictEqual(cover.length, 32, 'the 16 rules by implication: 32 covering edges (the 4-cube)');
for (let t = 0; t < 16; t++) assert.strictEqual(pop(t ^ (t ^ 15)), 4, `${NAMES[t]} and ${NAMES[t ^ 15]} are four steps apart: opposite corners`);
// the subspaces: 1 + 7 + 7 + 1, with 7 + 21 + 7 covering edges
const subEdges = [...[1, 2, 3, 4, 5, 6, 7].map((n) => ['Fano_empty.svg', `Fano_point_${n}.svg`]), ...lines.flatMap((l) => l.pts.map((n) => [`Fano_point_${n}.svg`, l.file])), ...lines.map((l) => [l.file, 'Fano_full.svg'])];
assert.strictEqual(subEdges.length, 35, 'the Fano subspaces: 7 + 21 + 7 = 35 covering edges');

// ── Drawing ─────────────────────────────────────────────────
const W = 94.931824, H = 85.793999; // the icons' own size
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const hex2 = (m) => '0x' + m.toString(16).padStart(2, '0');
const STYLE = `<style>
  text { font: 13px ui-monospace, monospace; fill: #222; }
  .small { font-size: 11px; fill: #555; }
  .edge { stroke: #bbb; stroke-width: 1.2; }
  .ring { fill: none; stroke: #c0392b; stroke-width: 4; }
  .ring2 { fill: none; stroke: #2a5db0; stroke-width: 4; }
  @media (prefers-color-scheme: dark) { text { fill: #eee; } .small { fill: #aaa; } .edge { stroke: #555; } }
</style>`;

/** The Fano subspace lattice, with the icons as nodes. Returns { svg body, node centre }. */
function fanoLattice(x0, y0, s = 0.7) {
  const rows = [['Fano_empty.svg'], [1, 2, 3, 4, 5, 6, 7].map((n) => `Fano_point_${n}.svg`), lines.map((l) => l.file), ['Fano_full.svg']];
  const gap = W * s + 18, pos = {};
  rows.forEach((row, r) => row.forEach((file, i) => { pos[file] = { x: x0 + (i - (row.length - 1) / 2) * gap, y: y0 + (3 - r) * 150 }; }));
  let out = subEdges.map(([a, b]) => `<line class="edge" x1="${pos[a].x}" y1="${pos[a].y - (H * s) / 2 - 2}" x2="${pos[b].x}" y2="${pos[b].y + (H * s) / 2 + 20}"/>`).join('\n');
  for (const [file, p] of Object.entries(pos)) {
    out += `\n<image href="../fano/${file}" x="${p.x - (W * s) / 2}" y="${p.y - (H * s) / 2}" width="${W * s}" height="${H * s}"/>`;
    out += `\n<text class="small" x="${p.x}" y="${p.y + (H * s) / 2 + 14}" text-anchor="middle">${hex2(masks[file])}</text>`;
  }
  return { out, pos, s };
}
/** The 16 rules by implication (the 4-cube), each with its icon. */
function ruleLattice(x0, y0, s = 0.6) {
  const ranks = [0, 1, 2, 3, 4].map((k) => [...Array(16).keys()].filter((t) => pop(t) === k));
  const gap = 140, pos = {};
  ranks.forEach((row, r) => row.forEach((t, i) => { pos[t] = { x: x0 + (i - (row.length - 1) / 2) * gap, y: y0 + (4 - r) * 125 }; }));
  let out = cover.map(([a, b]) => `<line class="edge" x1="${pos[a].x}" y1="${pos[a].y - (H * s) / 2 - 12}" x2="${pos[b].x}" y2="${pos[b].y + 40}"/>`).join('\n');
  for (const [t, p] of Object.entries(pos).map(([t, p]) => [Number(t), p])) {
    out += `\n<image href="../fano/${iconOf(t)}" x="${p.x - (W * s) / 2}" y="${p.y - (H * s) / 2 - 10}" width="${W * s}" height="${H * s}"/>`;
    out += `\n<text x="${p.x}" y="${p.y + 22}" text-anchor="middle">${esc(NAMES[t])}</text>`;
    out += `\n<text class="small" x="${p.x}" y="${p.y + 36}" text-anchor="middle">${table(t)}</text>`;
  }
  return { out, pos, s };
}
const svg = (w, h, title, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">\n<title>${esc(title)}</title>\n${STYLE}\n${body}\n</svg>\n`;
const ring = (p, r, cls = 'ring') => `<circle class="${cls}" cx="${p.x}" cy="${p.y}" r="${r}"/>`;

const written = [];
const write = (name, text) => { writeFileSync(new URL(name, HASSE), text); written.push(name); };

// 1. The two lattices
{
  const F = fanoLattice(600, 70);
  write('fano-subspaces.svg', svg(1200, 600, 'The Fano plane\'s subspaces, the icons as nodes', F.out));
  const R = ruleLattice(560, 70);
  write('rules.svg', svg(1120, 620, 'The 16 two-input rules by implication, each with its Fano icon', R.out));
}
// 2. Each rule pair as a Hasse diagram pair
const PAIRS = [0, 1, 2, 3, 4, 5, 6, 7].map((p) => (p === 0 ? [0, 15] : [p, p ^ 15]));
for (const [t, u] of PAIRS) {
  const R = ruleLattice(560, 110), F = fanoLattice(1640, 100);
  const marks = [ring(R.pos[t], 46), ring(R.pos[u], 46, 'ring2')];
  if (t === 0) marks.push(ring(F.pos['Fano_empty.svg'], 42), ring(F.pos['Fano_full.svg'], 42, 'ring2'));
  else marks.push(ring(F.pos[iconOf(t)], 42));
  const caption = `<text x="40" y="34">${esc(NAMES[t])} (${table(t)}) and ${esc(NAMES[u])} (${table(u)}): ${t === 0 ? 'the empty and the full plane' : `point ${t}, mask ${hex2(1 << (t - 1))}`}</text>`;
  write(`pair-${t}.svg`, svg(2240, 720, `${NAMES[t]} / ${NAMES[u]}: a Hasse diagram pair`, [caption, R.out, F.out, ...marks].join('\n')));
}
// 3. The seven lines, animated: each line, its three points, and its six rules
{
  const R = ruleLattice(560, 110), F = fanoLattice(1640, 100);
  const dur = lines.length * 2;
  const frames = lines.map((l, i) => {
    const on = lines.map((_, j) => (j === i ? 1 : 0)).concat(i === 0 ? 1 : 0).join(';');
    const keyTimes = [...Array(lines.length + 1).keys()].map((k) => (k / lines.length).toFixed(4)).join(';');
    const rules = l.pts.flatMap((p) => [p, p ^ 15]);
    const [p, q, r] = l.pts;
    return `<g opacity="${i === 0 ? 1 : 0}"><animate attributeName="opacity" values="${on}" keyTimes="${keyTimes}" dur="${dur}s" calcMode="discrete" repeatCount="indefinite"/>
<text x="40" y="34">${l.file.replace('.svg', '')}: points ${l.pts.join(', ')}; ${esc(NAMES[p])} XOR ${esc(NAMES[q])} = ${esc(NAMES[p ^ q])} (point ${r})</text>
${ring(F.pos[l.file], 42)}${l.pts.map((n) => ring(F.pos[`Fano_point_${n}.svg`], 42, 'ring2')).join('')}
${rules.map((x) => ring(R.pos[x], 46, 'ring2')).join('')}
</g>`;
  });
  write('lines.svg', svg(2240, 720, 'The seven lines in turn: a ^ b ^ c = 0, on both diagrams', [R.out, F.out, ...frames].join('\n')));
}

// ── The margins: control codes the image does not show ──────
// The author, 2026-10-13: "the 8 units on each side are for non-printing
// control coded image filtering; if we xor those we can change the
// interpretation without changing the image". Each icon's drawing (the point
// triangle and its dots) sits about 8 units in from every edge. A byte per side
// is written there as eight invisible one-unit cells (present = 1); XOR with a
// key rewrites the bytes. The point mask, read from the drawing, does not move.
const MARGIN = new URL('margin/', here);
mkdirSync(MARGIN, { recursive: true });
const marginCells = (side, byte) => [...Array(8).keys()].filter((i) => (byte >> i) & 1).map((i) => {
  const at = 12 + i * 9;
  const [x, y] = side === 0 ? [at, 1] : side === 1 ? [W - 2, (at * H) / W] : side === 2 ? [at, H - 2] : [1, (at * H) / W];
  return `<rect data-side="${side}" data-bit="${i}" x="${x.toFixed(3)}" y="${y.toFixed(3)}" width="1" height="1" fill="#000" fill-opacity="0"/>`;
}).join('');
const withMargin = (text, bytes) => text.replace(/<\/svg>\s*$/, `<g id="margin">${bytes.map((b, s) => marginCells(s, b)).join('')}</g></svg>\n`);
const readMargin = (text) => { const r = [0, 0, 0, 0]; for (const [, s, i] of text.matchAll(/data-side="(\d)" data-bit="(\d)"/g)) r[s] |= 1 << i; return r; };
// the drawing's extent: the dots' outer edges, as four edge indices
const dotR = 20 * 0.271791;
const edge = {
  left: Math.min(...Object.values(label).map((p) => p.x)) - dotR, right: Math.max(...Object.values(label).map((p) => p.x)) + dotR,
  top: Math.min(...Object.values(label).map((p) => p.y)) - dotR, bottom: Math.max(...Object.values(label).map((p) => p.y)) + dotR,
};
for (const m of [edge.left, W - edge.right, edge.top, H - edge.bottom]) assert.ok(m > 7.9 && m < 8.2, `the drawing sits about 8 units in from each edge (${m.toFixed(3)})`);
// Every cell, for every side and bit (0xff on all four sides): in the margin is
// the OR of four comparisons against the edge indices; on the drawing is the
// overlap of the cell with the drawing's box. Their XNOR is 0: never both, never neither.
for (const [, side, bit, x, y] of withMargin('</svg>', [0xff, 0xff, 0xff, 0xff]).matchAll(/data-side="(\d)" data-bit="(\d)" x="([\d.]+)" y="([\d.]+)"/g)) {
  const cx = Number(x), cy = Number(y);
  const inMargin = +(cx + 1 <= edge.left || cx >= edge.right || cy + 1 <= edge.top || cy >= edge.bottom);
  const onDrawing = +(cx + 1 > edge.left && cx < edge.right && cy + 1 > edge.top && cy < edge.bottom);
  assert.strictEqual(+!(inMargin ^ onDrawing), 0, `side ${side} bit ${bit}: in the margin XNOR on the drawing is 0`);
  assert.strictEqual(inMargin, 1, `side ${side} bit ${bit}: the cell is in the margin`);
  assert.ok(cx >= 0 && cy >= 0 && cx + 1 <= W && cy + 1 <= H, `side ${side} bit ${bit}: the cell is on the canvas`);
}
const CODES = [0x13, 0x3f, 0x1c, 0x1f]; // DC3, ?, FS, US
const KEY = 0xff;
for (const n of [1, 2, 3, 4, 5, 6, 7]) {
  const src = readFileSync(new URL(`Fano_point_${n}.svg`, FANO), 'utf8');
  const a = withMargin(src, CODES), b = withMargin(src, CODES.map((c) => c ^ KEY));
  assert.deepStrictEqual(readMargin(a), CODES, `point ${n}: the margin reads back`);
  assert.deepStrictEqual(readMargin(b).map((x, i) => x ^ readMargin(a)[i]), [KEY, KEY, KEY, KEY], `point ${n}: the two margins differ by the key`);
  assert.deepStrictEqual(readMargin(b).map((x) => x ^ KEY), CODES, `point ${n}: XOR with the key again reads the codes back`);
  for (const text of [a, b]) {
    const d = readIcon(text).layer2;
    assert.strictEqual(d.length, 1, `point ${n}: still one marked dot`);
    assert.ok(near(d[0], label[n]), `point ${n}: the drawing reads as point ${n} still`);
  }
  if (n === 1) { writeFileSync(new URL('Fano_point_1.codes.svg', MARGIN), a); writeFileSync(new URL('Fano_point_1.codes-xor-ff.svg', MARGIN), b); }
}

// ── Docs ────────────────────────────────────────────────────
const doc = [];
doc.push('# The Fano icons and their Hasse diagrams', '', 'Generated by `svg/tools/build.mjs` from the sixteen CC0 icons in `svg/fano` (see `svg/fano/SOURCES.md`). Every number below is read from the icons or computed, and checked when the build runs.', '');
doc.push('## The icons, read as text', '', 'Each file\'s marked dots are located in page coordinates (each circle\'s own transform composed with its groups\'), and the file becomes a 7-bit mask: bit n - 1 is on when point n is marked. The points are labelled by the `Fano_point_n` files themselves.', '', '| File | Mask | Points |', '|------|------|--------|');
for (const file of files) doc.push(`| [${file}](../svg/fano/${file}) | \`${masks[file].toString(2).padStart(7, '0')}\` ${hex2(masks[file])} | ${pointsOf(masks[file]).join(', ') || '(none)'} |`);
doc.push('', 'Every line\'s three points XOR to 0, and the seven files are exactly the seven lines {a, b, a ^ b}.', '');
doc.push('### The 16-index', '', 'The vault\'s sixteen Fano constants (`core/src/verified/fano.ts`) are these sixteen masks; `svg/fano/masks.json` is written for that check (`src/testbed/core.test.ts`). Index i reads the icon below. The author, 2026-10-13: "the 16 are the 16-index and the exponent is the index read": 16^4 reads index 4, point 4; 16^10 reads index 10, line 2-7-5; and 4 ^ 10 = 4 + 10 = 14 reads line 2-6-4, the line through point 4.', '', '| Index | Icon | Mask |', '|-------|------|------|');
const INDEX16 = ['Fano_empty.svg', ...[1, 2, 3, 4, 5, 6, 7].map((n) => `Fano_point_${n}.svg`), 'Fano_line_3_5_6.svg', 'Fano_line_1_7_6.svg', 'Fano_line_2_7_5.svg', 'Fano_line_1_3_2.svg', 'Fano_line_4_7_3.svg', 'Fano_line_1_5_4.svg', 'Fano_line_2_6_4.svg', 'Fano_full.svg'];
INDEX16.forEach((file, i) => doc.push(`| ${i} | ${file.replace('.svg', '')} | ${hex2(masks[file])} |`));
doc.push('');
doc.push('## The rules as the icons', '', 'A two-input rule is its truth table t, bit a·2 + b = f(a, b) (the order the organ uses, `breadboard/esp32`). The constants are the empty and the full plane. The other fourteen, paired with their complements (t and t ^ 15), are the seven points: point p is the pair p / p ^ 15. On every line, two rules from two of its points XOR to a rule of the third.', '', '| Point | Rule | Table | Complement | Table | Hasse pair |', '|-------|------|-------|------------|-------|------------|');
for (const [t, u] of PAIRS) doc.push(`| ${t === 0 ? 'empty / full' : t} | ${NAMES[t]} | \`${table(t)}\` | ${NAMES[u]} | \`${table(u)}\` | [pair-${t}.svg](../svg/hasse/pair-${t}.svg) |`);
doc.push('', '## The diagrams', '');
doc.push('- [fano-subspaces.svg](../svg/hasse/fano-subspaces.svg): the Fano plane\'s subspaces, empty, the 7 points, the 7 lines, full, with 35 covering edges (7 + 21 + 7).');
doc.push('- [rules.svg](../svg/hasse/rules.svg): the 16 rules ordered by implication, the 4-cube, with 32 covering edges; each node carries its icon. A rule and its complement are opposite corners, four steps apart.');
doc.push('- `pair-0.svg` … `pair-7.svg`: each rule pair as a Hasse diagram pair, the rules on the left and the subspaces on the right, both marked.');
doc.push('- [lines.svg](../svg/hasse/lines.svg): the seven lines in turn (SMIL, 2 s each), each with its three points and its six rules.', '');
doc.push('## The margins', '', 'Each icon\'s drawing sits about 8 units in from every edge. The author: "the 8 units on each side are for non-printing control coded image filtering; if we xor those we can change the interpretation without changing the image". [margin/Fano_point_1.codes.svg](../svg/margin/Fano_point_1.codes.svg) carries the bytes 0x13 0x3f 0x1c 0x1f (DC3, ?, FS, US), one per side, as invisible one-unit cells; [margin/Fano_point_1.codes-xor-ff.svg](../svg/margin/Fano_point_1.codes-xor-ff.svg) carries them XORed with 0xff. The build checks, for all seven points, that the bytes read back, that the two margins differ by the key, and that the drawing still reads as the same point.', '', 'Measured once, 2026-10-13: rendered at ten times their size in Chrome (headless), the original Fano_point_1.svg and both copies give byte-identical pixels (SHA-256 7c1dbb9a71293b66…), while the three files differ as text. The build does not render, so it does not repeat that measurement.', '');
doc.push('E8 on its Coxeter plane, in both frames (the 240 roots, 8 rings of 30, the two parity halves of the byte): [E8.md](E8.md).', '');
doc.push('Open the SVGs from `svg/hasse` itself: they draw the icons by relative path (`../fano/…`).', '');
writeFileSync(new URL('README.md', DOCS), doc.join('\n'));

console.log(`svg: ${files.length} icons read, ${lines.length} lines checked, 16 rules paired; wrote ${written.length} diagrams to svg/hasse and svg-docs/README.md`);
