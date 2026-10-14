// The five exceptional Lie algebras on their Coxeter planes, as SVG proofs.
//
// The author, 2026-10-13: the Lie algebra names E8, E6, E7, F4 (and G2) as
// /A-Z0-9/ tag literals (proofs I-194), and "yes perfect plan" to drawing the
// other four as E8 is drawn (svg/e8). Each root system is built from its simple
// roots; c is the product of the simple reflections, of order h (the Coxeter
// number). On the plane of c's eigenvalues e^(±2πi/h) (exponent 1, of
// multiplicity 1 in all five), c is a turn of 360/h degrees and the roots lie
// on rings, one cycle of h per ring, rank cycles in all. Half a cycle (h/2 steps)
// sends every root to its negative in G2, F4, E7 and E8, and not in E6, whose
// Weyl group does not hold -1: checked, and drawn so (dark: the first h/2 steps).
import { mkdirSync, writeFileSync } from 'node:fs';
import assert from 'node:assert';

const here = new URL('..', import.meta.url);
const OUT = new URL('lie/', here), DOCS = new URL('../svg-docs/', here);
mkdirSync(OUT, { recursive: true });

const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const key = (v) => v.join(',');
const refl = (v, a) => { const c = (2 * dot(v, a)) / dot(a, a); return v.map((x, i) => x - c * a[i]); };

const E8 = [[-1, -1, -1, -1, -1, -1, -1, 1], [2, 2, 0, 0, 0, 0, 0, 0], [-2, 2, 0, 0, 0, 0, 0, 0], [0, -2, 2, 0, 0, 0, 0, 0], [0, 0, -2, 2, 0, 0, 0, 0], [0, 0, 0, -2, 2, 0, 0, 0], [0, 0, 0, 0, -2, 2, 0, 0], [0, 0, 0, 0, 0, -2, 2, 0]];
const SYSTEMS = [
  { name: 'G2', simple: [[1, -1, 0], [-2, 1, 1]], roots: 12, h: 6, negates: true },
  { name: 'F4', simple: [[0, 2, -2, 0], [0, 0, 2, -2], [0, 0, 0, 2], [1, -1, -1, -1]], roots: 48, h: 12, negates: true },
  { name: 'E6', simple: E8.slice(0, 6), roots: 72, h: 12, negates: false },
  { name: 'E7', simple: E8.slice(0, 7), roots: 126, h: 18, negates: true },
  { name: 'E8', simple: E8, roots: 240, h: 30, negates: true },
];

for (const S of SYSTEMS) {
  const rank = S.simple.length, n = S.simple[0].length;
  assert.strictEqual(rank, Number(S.name[1]), `${S.name}: rank ${rank}, the digit of its name`);
  // the roots, by reflection
  const roots = new Map(S.simple.map((s) => [key(s), s]));
  for (let grew = true; grew; ) { grew = false; for (const r of [...roots.values()]) for (const s of S.simple) { const t = refl(r, s); if (!roots.has(key(t))) { roots.set(key(t), t); grew = true; } } }
  S.all = [...roots.values()];
  assert.strictEqual(S.all.length, S.roots, `${S.name}: ${S.roots} roots`);
  S.cox = (v) => S.simple.reduce((w, a) => refl(w, a), v);
  const pow = (v, k) => { let w = v; for (let i = 0; i < k; i++) w = S.cox(w); return w; };
  // c^h = 1 on the whole space; c^(h/2) = -1 exactly where expected
  const basis = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
  assert.ok(S.all.every((r) => key(pow(r, S.h)) === key(r)), `${S.name}: c^${S.h} returns every root`);
  const neg = S.all.every((r) => key(pow(r, S.h / 2)) === key(r.map((x) => -x)));
  assert.strictEqual(neg, S.negates, `${S.name}: c^${S.h / 2} ${S.negates ? 'is' : 'is not'} -1 on the roots`);
  // the cycles: rank of them, each of length h
  const seen = new Set(); S.cycles = [];
  for (const r of S.all) { if (seen.has(key(r))) continue; const cyc = [r]; seen.add(key(r)); for (let w = S.cox(r); key(w) !== key(r); w = S.cox(w)) { cyc.push(w); seen.add(key(w)); } S.cycles.push(cyc); }
  assert.strictEqual(S.cycles.length, rank, `${S.name}: ${rank} cycles`);
  assert.ok(S.cycles.every((c) => c.length === S.h), `${S.name}: each cycle has ${S.h} roots`);
  // the plane of e^(±2πi/h): project with P = (2/h) Σ cos(2πk/h) c^k
  const seed = Array.from({ length: n }, (_, i) => [3, 1, 4, 1, 5, 9, 2, 6][i]);
  const proj = (v) => { const acc = new Array(n).fill(0); let w = v; for (let k = 0; k < S.h; k++) { const c = Math.cos((2 * Math.PI * k) / S.h); for (let i = 0; i < n; i++) acc[i] += (2 / S.h) * c * w[i]; w = S.cox(w); } return acc; };
  // keep the seed inside the span of the roots (G2 lives in the plane x + y + z = 0)
  const span = S.name === 'G2' ? seed.map((x) => x - seed.reduce((s, y) => s + y, 0) / n) : seed;
  const u = proj(span), U = u.map((x) => x / Math.hypot(...u));
  const cu = S.cox(U), along = dot(cu, U), W0 = cu.map((x, i) => x - along * U[i]), W = W0.map((x) => x / Math.hypot(...W0));
  S.at = (v) => [dot(v, U), dot(v, W)];
  // on the plane, c is a turn of 360/h degrees
  const turn = (2 * Math.PI) / S.h;
  let worst = 0;
  for (const r of S.all) {
    const [x, y] = S.at(r), [x2, y2] = S.at(S.cox(r));
    const err = (a) => Math.hypot(x * Math.cos(a) - y * Math.sin(a) - x2, x * Math.sin(a) + y * Math.cos(a) - y2);
    worst = Math.max(worst, Math.min(err(turn), err(-turn)));
  }
  assert.ok(worst < 1e-9, `${S.name}: on the plane c is a turn of ${360 / S.h} degrees (worst ${worst.toExponential(1)})`);
  for (const cyc of S.cycles) assert.strictEqual(new Set(cyc.map((r) => Math.hypot(...S.at(r)).toFixed(5))).size, 1, `${S.name}: each cycle is one ring`);
  S.radii = [...new Set(S.cycles.map((c) => Math.hypot(...S.at(c[0])).toFixed(6)))].map(Number).sort((a, b) => a - b);
}

// ── Drawing ─────────────────────────────────────────────────
const STYLE = `<style>
  text { font: 13px ui-monospace, monospace; fill: #222; }
  .small { font-size: 11px; fill: #555; }
  .ring { fill: none; stroke: #ddd; stroke-width: 1; }
  .plus { fill: #1f4e9c; } .minus { fill: #9cb6e0; }
  @media (prefers-color-scheme: dark) { text { fill: #eee; } .small { fill: #aaa; } .ring { stroke: #444; } }
</style>`;
const f2 = (x) => x.toFixed(2);
function panel(S, cx, cy, R) {
  const scale = R / S.radii[S.radii.length - 1], dotR = S.roots > 100 ? 3 : 4.2;
  let out = S.radii.map((rad) => `<circle class="ring" cx="${cx}" cy="${cy}" r="${f2(rad * scale)}"/>`).join('\n');
  for (const cyc of S.cycles) cyc.forEach((r, k) => { const [x, y] = S.at(r); out += `\n<circle class="${k < S.h / 2 ? 'plus' : 'minus'}" cx="${f2(cx + x * scale)}" cy="${f2(cy - y * scale)}" r="${dotR}"/>`; });
  out += `\n<text x="${cx}" y="${cy + R + 30}" text-anchor="middle">${S.name} · tag I-${parseInt(S.name, 36)}</text>`;
  out += `\n<text class="small" x="${cx}" y="${cy + R + 48}" text-anchor="middle">${S.roots} roots, ${S.cycles.length} cycles of ${S.h}${S.negates ? '' : '; h/2 is not -1'}</text>`;
  return out;
}
const W = 1250, H = 360, R = 95;
const body = [`<text x="20" y="28">The exceptional Lie algebras on their Coxeter planes: c a turn of 360/h; dark the first h/2 steps of each cycle</text>`,
  ...SYSTEMS.map((S, i) => panel(S, 130 + i * 247, 160, R))].join('\n');
writeFileSync(new URL('coxeter-planes.svg', OUT), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">\n<title>G2, F4, E6, E7, E8 on their Coxeter planes</title>\n${STYLE}\n${body}\n</svg>\n`);

const doc = ['# The exceptional Lie algebras on their Coxeter planes', '',
  'Generated by `svg/tools/lie.mjs`; every number is checked when the build runs. The author, 2026-10-13: the names E8, E6, E7, F4 (and G2) as `/A-Z0-9/` tag literals (proofs I-194). E8 alone, in both frames, is in [E8.md](E8.md).', '',
  '![the five on their Coxeter planes](../svg/lie/coxeter-planes.svg)', '',
  '| Name | Tag | Rank | Roots | Coxeter number h | Rings (cycles) | c^(h/2) = -1 |', '|---|---|---|---|---|---|---|',
  ...SYSTEMS.map((S) => `| ${S.name} | I-${parseInt(S.name, 36)} | ${S.simple.length} | ${S.roots} | ${S.h} | ${S.cycles.length} of ${S.h} | ${S.negates ? 'yes' : 'no'} |`), '',
  '- **Built, not assumed.** Each root system comes from its simple roots by reflection; c is the product of the simple reflections; every root returns after h steps.',
  '- **The plane.** Projected onto the plane of c\'s eigenvalues e^(±2πi/h), c is a turn of 360/h degrees and each cycle of h roots lies on one ring: rank rings in all.',
  '- **Half a cycle.** In G2, F4, E7 and E8, h/2 steps send every root to its negative, so each ring is h/2 roots (dark) and their negatives (light). E6 is the exception: its Weyl group does not hold -1, and h/2 = 6 steps do not negate.',
  '- **The tags.** E6, E7, E8 read in base 36 are I-510, I-511, I-512: 2^9 - 2, 2^9 - 1, 2^9.', ''];
writeFileSync(new URL('LIE.md', DOCS), doc.join('\n'));
console.log(`lie: G2, F4, E6, E7, E8 built and checked on their Coxeter planes; wrote svg/lie/coxeter-planes.svg and svg-docs/LIE.md`);
