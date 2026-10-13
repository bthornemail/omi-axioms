// E8 on its Coxeter plane, in both frames, as SVG proofs.
//
// The author, 2026-10-13: "the sum-30 is the sub cycle of the 60"; "it's the
// -3d or +3d around the 5d" (5 - 3 = 2D, the plane drawn here; 5 + 3 = 8D, where
// E8 lives); "the 30 is either side and the 60 is both"; and, of the archived
// Racket module (devops/Vault/Archive/epistemic-observability-engine/
// substrate-geometry/e8.rkt) whose roots and simple roots sit in mirror
// conventions, "that's the tangent space we have been using ... both frames at
// once". Each half-integer root is a sign pattern on 8 places, a byte; the
// module's roots are the even-parity bytes, its simple roots the odd. Each frame
// has its own Coxeter element c (the product of its 8 simple reflections):
// c^30 = 1 and c^15 = -1 on all of 8D, its 240 roots fall in 8 cycles of 30, and
// on the plane where c is a turn of 360/30 = 12 degrees they lie on 8 rings of 30.
//
// Writes ../e8/*.svg and ../../svg-docs/E8.md. Deterministic; fails on any check
// that does not hold.
import { writeFileSync, mkdirSync } from 'node:fs';
import assert from 'node:assert';

const here = new URL('..', import.meta.url);
const OUT = new URL('e8/', here), DOCS = new URL('../svg-docs/', here);
mkdirSync(OUT, { recursive: true });

// ── The roots, in doubled coordinates (integers): a root has norm^2 8 ──
const integerRoots = [];
for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) for (const si of [2, -2]) for (const sj of [2, -2]) {
  const r = new Array(8).fill(0); r[i] = si; r[j] = sj; integerRoots.push(r);
}
const halfRoots = (parity) => {
  const out = [];
  for (let m = 0; m < 256; m++) {
    let p = 0; for (let b = m; b; b >>= 1) p ^= b & 1;
    if (p === parity) out.push(Array.from({ length: 8 }, (_, k) => ((m >> k) & 1 ? -1 : 1)));
  }
  return out;
};
const FRAMES = {
  even: { name: 'even', roots: [...integerRoots, ...halfRoots(0)], note: 'the module\'s 240 roots: half-integer sign bytes of even parity' },
  odd: { name: 'odd', roots: [...integerRoots, ...halfRoots(1)], note: 'the module\'s simple-root frame: sign bytes of odd parity' },
};
// The module's simple roots (doubled); its first is odd. The even frame takes ½(-1,…,-1), with the same angles.
const tail = [[2, 2, 0, 0, 0, 0, 0, 0], [-2, 2, 0, 0, 0, 0, 0, 0], [0, -2, 2, 0, 0, 0, 0, 0], [0, 0, -2, 2, 0, 0, 0, 0], [0, 0, 0, -2, 2, 0, 0, 0], [0, 0, 0, 0, -2, 2, 0, 0], [0, 0, 0, 0, 0, -2, 2, 0]];
FRAMES.odd.simple = [[-1, -1, -1, -1, -1, -1, -1, 1], ...tail];
FRAMES.even.simple = [[-1, -1, -1, -1, -1, -1, -1, -1], ...tail];

const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const key = (v) => v.join(',');
const refl = (v, a) => { const c = (2 * dot(v, a)) / dot(a, a); return v.map((x, i) => x - c * a[i]); };
const basis = Array.from({ length: 8 }, (_, i) => Array.from({ length: 8 }, (_, j) => (i === j ? 1 : 0)));

for (const F of Object.values(FRAMES)) {
  const set = new Set(F.roots.map(key));
  assert.strictEqual(F.roots.length, 240, `${F.name} frame: 240 roots`);
  for (const s of F.simple) assert.ok(set.has(key(s)), `${F.name} frame: every simple root is one of its roots`);
  const gram = F.simple.map((a) => F.simple.map((b) => dot(a, b) / 4));
  F.gram = gram;
  F.cox = (v) => F.simple.reduce((w, a) => refl(w, a), v);
  const pow = (v, n) => { for (let k = 0; k < n; k++) v = F.cox(v); return v; };
  for (const e of basis) {
    assert.deepStrictEqual(pow(e, 30), e, `${F.name} frame: c^30 = 1 on all of 8D`);
    assert.deepStrictEqual(pow(e, 15), e.map((x) => -x || 0), `${F.name} frame: c^15 = -1 on all of 8D`);
  }
  for (const r of F.roots) assert.ok(set.has(key(F.cox(r))), `${F.name} frame: c keeps the roots`);
  // the cycles of c on the roots
  const seen = new Set(); F.cycles = [];
  for (const r of F.roots) {
    if (seen.has(key(r))) continue;
    const cyc = []; let w = r;
    do { seen.add(key(w)); cyc.push(w); w = F.cox(w); } while (key(w) !== key(r));
    F.cycles.push(cyc);
  }
  assert.deepStrictEqual(F.cycles.map((c) => c.length), new Array(8).fill(30), `${F.name} frame: 8 cycles of 30`);
}
assert.deepStrictEqual(FRAMES.even.gram, FRAMES.odd.gram, 'the two frames\' simple roots meet at the same angles');
const shared = FRAMES.even.roots.filter((r) => FRAMES.odd.roots.some((s) => key(s) === key(r))).length;
assert.strictEqual(shared, 112, 'the frames share the 112 integer roots; their 128 + 128 half-integer roots are the 256 sign bytes');

// ── The Coxeter plane: where c is a turn of 12 degrees ──
// P = (2/30) Σ_k cos(2πk/30) c^k projects onto the plane of the eigenvalues e^{±2πi/30} (exponent 1, multiplicity 1).
function plane(F) {
  const seed = [3, 1, 4, 1, 5, 9, 2, 6];
  const proj = (v) => {
    const acc = new Array(8).fill(0); let w = v;
    for (let k = 0; k < 30; k++) { const c = Math.cos((2 * Math.PI * k) / 30); for (let i = 0; i < 8; i++) acc[i] += (2 / 30) * c * w[i]; w = F.cox(w); }
    return acc;
  };
  const u = proj(seed), nu = Math.hypot(...u), U = u.map((x) => x / nu);
  const cu = F.cox(U);                       // c turns U by 12 degrees within the plane
  const along = dot(cu, U), W0 = cu.map((x, i) => x - along * U[i]), nw = Math.hypot(...W0), W = W0.map((x) => x / nw);
  return (v) => [dot(v, U), dot(v, W)];
}
const TURN = (2 * Math.PI) / 30;
for (const F of Object.values(FRAMES)) {
  const at = plane(F);
  F.at = at;
  // c is exactly a turn of 12 degrees (one way or the other) on the plane
  const sense = Math.sign(Math.atan2(...at(F.cox(F.roots[0])).reverse()) - Math.atan2(...at(F.roots[0]).reverse())) || 1;
  let worst = 0;
  for (const r of F.roots) {
    const [x, y] = at(r), [x2, y2] = at(F.cox(r));
    const a = sense * TURN, rx = x * Math.cos(a) - y * Math.sin(a), ry = x * Math.sin(a) + y * Math.cos(a);
    const e1 = Math.hypot(rx - x2, ry - y2);
    const b = -sense * TURN, sx = x * Math.cos(b) - y * Math.sin(b), sy = x * Math.sin(b) + y * Math.cos(b);
    worst = Math.max(worst, Math.min(e1, Math.hypot(sx - x2, sy - y2)));
  }
  assert.ok(worst < 1e-9, `${F.name} frame: on the plane, c is a turn of 360/30 = 12 degrees (worst ${worst.toExponential(1)})`);
  // the rings: 8 radii, 30 roots on each, one cycle per ring
  const radii = [...new Set(F.roots.map((r) => Math.hypot(...at(r)).toFixed(6)))].map(Number).sort((a, b) => a - b);
  assert.strictEqual(radii.length, 8, `${F.name} frame: 8 rings`);
  for (const rad of radii) assert.strictEqual(F.roots.filter((r) => Math.abs(Math.hypot(...at(r)) - rad) < 1e-5).length, 30, `${F.name} frame: 30 roots on the ring of radius ${rad.toFixed(4)}`);
  for (const cyc of F.cycles) assert.strictEqual(new Set(cyc.map((r) => Math.hypot(...at(r)).toFixed(5))).size, 1, `${F.name} frame: each cycle is one ring`);
  F.radii = radii;
}

// ── Drawing ─────────────────────────────────────────────────
const STYLE = `<style>
  text { font: 13px ui-monospace, monospace; fill: #222; }
  .small { font-size: 11px; fill: #555; }
  .ring { fill: none; stroke: #ddd; stroke-width: 1; }
  .plus { fill: #1f4e9c; } .minus { fill: #9cb6e0; }
  .even { fill: #2f7d4a; } .odd { fill: #c26a2b; }
  .cell { stroke: #fff; stroke-width: 1; }
  @media (prefers-color-scheme: dark) { text { fill: #eee; } .small { fill: #aaa; } .ring { stroke: #444; } .cell { stroke: #111; } }
</style>`;
const svg = (w, h, title, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">\n<title>${title}</title>\n${STYLE}\n${body}\n</svg>\n`;
const f2 = (x) => x.toFixed(2);

function panel(F, cx, cy, R, label) {
  const scale = R / F.radii[F.radii.length - 1];
  let out = F.radii.map((rad) => `<circle class="ring" cx="${cx}" cy="${cy}" r="${f2(rad * scale)}"/>`).join('\n');
  for (const cyc of F.cycles) cyc.forEach((r, k) => {
    const [x, y] = F.at(r);
    out += `\n<circle class="${k < 15 ? 'plus' : 'minus'}" cx="${f2(cx + x * scale)}" cy="${f2(cy - y * scale)}" r="3.2"/>`;
  });
  out += `\n<text x="${cx}" y="${cy + R + 34}" text-anchor="middle">${label}</text>`;
  return out;
}
const written = [];
const write = (name, text) => { writeFileSync(new URL(name, OUT), text); written.push(name); };

write('coxeter-plane.svg', svg(1040, 600, 'E8 on its Coxeter plane, both frames: 8 rings of 30',
  [`<text x="20" y="28">E8: 240 roots, 8 cycles of 30 under c; c^15 = -1, so each 30 is 15 steps (dark) and their negatives (light)</text>`,
    panel(FRAMES.even, 270, 300, 230, 'even frame (the module\'s roots)'),
    panel(FRAMES.odd, 770, 300, 230, 'odd frame (the module\'s simple roots)')].join('\n')));

{
  const F = FRAMES.even, cx = 300, cy = 300, R = 240, scale = R / F.radii[F.radii.length - 1];
  const rings = F.radii.map((rad) => `<circle class="ring" cx="${cx}" cy="${cy}" r="${f2(rad * scale)}"/>`).join('\n');
  let dots = '';
  for (const cyc of F.cycles) cyc.forEach((r, k) => { const [x, y] = F.at(r); dots += `<circle class="${k < 15 ? 'plus' : 'minus'}" cx="${f2(cx + x * scale)}" cy="${f2(cy - y * scale)}" r="3.2"/>`; });
  const values = Array.from({ length: 31 }, (_, k) => `${-12 * k} ${cx} ${cy}`).join(';');
  const keyTimes = Array.from({ length: 31 }, (_, k) => (k / 30).toFixed(4)).join(';');
  write('step.svg', svg(600, 640, 'The Coxeter step: a turn of 12 degrees that carries every root to a root', `${rings}
<g>${dots}<animateTransform attributeName="transform" type="rotate" values="${values}" keyTimes="${keyTimes}" dur="15s" calcMode="discrete" repeatCount="indefinite"/></g>
<text x="20" y="${cy + R + 50}">one step of c = one turn of 12 degrees; 15 steps = -1; 30 steps = 1</text>`));
}

{
  let cells = '';
  for (let m = 0; m < 256; m++) {
    let p = 0; for (let b = m; b; b >>= 1) p ^= b & 1;
    const x = 40 + (m & 15) * 30, y = 50 + (m >> 4) * 30;
    cells += `<rect class="cell ${p ? 'odd' : 'even'}" x="${x}" y="${y}" width="30" height="30"/>`;
  }
  write('frames.svg', svg(560, 600, 'The two frames are the two parity halves of the byte',
    `<text x="40" y="34">each half-integer root is a sign byte (bit k = minus in place k): even parity, one frame; odd, the other</text>
${cells}
<text x="40" y="560">128 even (green) + 128 odd (orange) = 256; one bit flipped crosses from one frame to the other</text>`));
}

// ── Docs ────────────────────────────────────────────────────
const doc = [
  '# E8 on its Coxeter plane, in both frames', '',
  'Generated by `svg/tools/e8.mjs`; every number below is computed and checked when the build runs.', '',
  'The author, 2026-10-13: "the sum-30 is the sub cycle of the 60"; "it\'s the -3d or +3d around the 5d"; "the 30 is either side and the 60 is both"; and, of the archived Racket module `substrate-geometry/e8.rkt` (its roots and its simple roots in mirror conventions), "that\'s the tangent space we have been using ... both frames at once".', '',
  '- **The roots.** 112 integer roots (±e_i ± e_j) and 128 half-integer ones (±½ in every place). A half-integer root is a sign pattern on 8 places: a byte. The module builds the even-parity bytes; its first simple root, ½(-1,…,-1, 1), is an odd one. So the two frames are the two parity halves of the 256 bytes, sharing the 112 integer roots. [frames.svg](../svg/e8/frames.svg)',
  '- **The step.** In each frame, c, the product of its 8 simple reflections, satisfies c^30 = 1 and c^15 = -1 on all of 8D; it carries the 240 roots in 8 cycles of 30, each cycle 15 steps and their negatives. The even frame uses ½(-1,…,-1) as its first simple root; it meets the others at the same angles as the module\'s.',
  `- **The plane.** On the plane of c's eigenvalues e^{±2πi/30}, c is exactly a turn of 360/30 = 12 degrees, and the roots lie on 8 rings of 30 (radii ${FRAMES.even.radii.map((r) => r.toFixed(3)).join(', ')}, in units of the plane), one cycle per ring. [coxeter-plane.svg](../svg/e8/coxeter-plane.svg), [step.svg](../svg/e8/step.svg) (the step, animated)`,
  '', 'So 30 is either side, the whole cycle in each frame, 15 + 15 as + and -; and the two frames together, 30 + 30, are the 60.', '',
];
writeFileSync(new URL('E8.md', DOCS), doc.join('\n'));
console.log(`e8: 240 roots in each frame, 8 cycles of 30, c^15 = -1, a 12-degree turn on 8 rings of 30; wrote ${written.length} diagrams to svg/e8 and svg-docs/E8.md`);
