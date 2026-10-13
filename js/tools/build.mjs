// Build the I-series catalogue and its documents from the checks themselves.
//
// Reads every check in js/catalog (its header line, its section headings and
// its assertions) and the roll-up I-122.ts (each record's claim, its shape and
// the corrections it lists), runs every check, and writes:
//   js/catalog.json             every record, its owner, category, statement, whether it holds
//   js-docs/JS-PROOF-INDEX.md   the registry, in the manner of coq-docs/PROOF-INDEX.md
//   js-docs/<category>/I-*.md   one RFC-style document per record
// The documents are derived, so they say only what the checks check. No dates
// are written: rebuilding unchanged checks gives the same files.
// Run: node proofs/js/tools/build.mjs   (or: make js-docs)
import { readFileSync, readdirSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tag, classicScript, base64, base64url, sha256, runInVm, runInWorker } from './vm.mjs';

const root = new URL('../../', import.meta.url);
const catalogDir = new URL('js/catalog/', root);
const docsDir = new URL('js-docs/', root);
const CATEGORIES = { 'point/line/duality': 'point-line-duality', 'catch-at-0': 'catch-at-0', 'head/value/tail': 'head-value-tail' };
const category = (shape) => CATEGORIES[shape] ?? 'other';
const order = (a, b) => {
  const [, na, sa = ''] = /^I-(\d+)([a-z]?)$/.exec(a);
  const [, nb, sb = ''] = /^I-(\d+)([a-z]?)$/.exec(b);
  return Number(na) - Number(nb) || sa.localeCompare(sb);
};

/** The assertions of a piece of source, in order, grouped under its "// ── n. heading ──" sections. */
function statements(source) {
  const lines = source.split('\n');
  const out = [];
  let section = null;
  for (let i = 0; i < lines.length; i++) {
    const head = /^\s*\/\/\s*──+\s*(?:\d+\.\s*)?(.+?)\s*─*\s*$/.exec(lines[i]);
    if (head && !/^─+$/.test(head[1])) { section = head[1]; continue; }
    if (!/^\s*assert[.(]/.test(lines[i])) continue;
    let stmt = lines[i].trim();
    while (!/\);\s*(\/\/.*)?$/.test(stmt) && i + 1 < lines.length) stmt += ' ' + lines[++i].trim();
    stmt = stmt.replace(/\s*\/\/.*$/, '');
    const msg = /,\s*(["'`])((?:\\.|(?!\1).)*)\1\s*\);$/.exec(stmt);
    out.push({ section, text: msg ? msg[2] : '`' + stmt.replace(/\s+/g, ' ').slice(0, 140) + '`' });
  }
  return out;
}

// ---- the roll-up: its records, shapes, corrections and engine witnesses ----
const rollupSource = readFileSync(new URL('I-122.ts', catalogDir), 'utf8');
const rollup = new Map();
const starts = [...rollupSource.matchAll(/^record\("([^"]+)",\s*"((?:\\.|[^"])*)",/gm)];
const runnerAt = rollupSource.indexOf('for (const r of records)');
const rollupPreamble = rollupSource.slice(0, rollupSource.search(/^\/\/ ═+\n\/\/ I-108/m) >= 0 ? rollupSource.search(/^\/\/ ═+\n\/\/ I-108/m) : rollupSource.indexOf('record("I-108"'));
starts.forEach((m, k) => {
  const block = rollupSource.slice(m.index, k + 1 < starts.length ? starts[k + 1].index : runnerAt);
  const shape = /\},\s*"([^"]+)"\);\s*(?:\/\/[^\n]*)?\s*(?:\/\/ ═+[\s\S]*)?$/.exec(block.trimEnd().replace(/\n\/\/ ═[\s\S]*$/, ''))?.[1];
  rollup.set(m[1], { claim: m[2], shape, statements: statements(block), block });
});
const notes = (heading) => {
  const at = rollupSource.indexOf(heading);
  if (at < 0) return new Map();
  const text = rollupSource.slice(at, rollupSource.indexOf('`', at));
  const map = new Map();
  for (const line of text.split('\n')) {
    const m = /^\s+(.+?)\s+\((I-\d+[a-z]?)\)\s*$/.exec(line) ?? /^\s+(I-\d+[a-z]?):\s*(.+)$/.exec(line);
    if (!m) continue;
    const [id, what] = m[1].startsWith('I-') ? [m[1], m[2]] : [m[2], m[1]];
    map.set(id, [...(map.get(id) ?? []), what.trim()]);
  }
  return map;
};
const corrections = notes('Threshold corrections:');
const witnesses = notes("Strongest claims (the engine's own words):");

// ---- run everything ----
const rollupRun = spawnSync(process.execPath, [new URL('I-122.ts', catalogDir).pathname], { encoding: 'utf8', timeout: 120000 });
const rollupHolds = new Map();
for (const line of rollupRun.stdout.split('\n')) {
  const m = /^(I-\d+[a-z]?)\s.*(✔ pass|✗ FAIL)\s*$/.exec(line);
  if (m) rollupHolds.set(m[1], m[2] === '✔ pass');
}

const files = readdirSync(catalogDir).filter((f) => /^I-\d+[a-z]?\.ts$/.test(f));
let ORIGINS = {};
try { ORIGINS = JSON.parse(readFileSync(new URL('ORIGINS.json', catalogDir), 'utf8')); } catch {}
const records = new Map();
for (const file of files) {
  const id = file.replace(/\.ts$/, '');
  const source = readFileSync(new URL(file, catalogDir), 'utf8');
  const header = source.split('\n')[0];
  const title = /—\s*(?:I-\d+[a-z]?(?:\s*\([^)]*\))?:\s*)?(.+)$/.exec(header)?.[1]?.trim() ?? id;
  const run = spawnSync(process.execPath, [new URL(file, catalogDir).pathname], { encoding: 'utf8', timeout: 120000 });
  records.set(id, { id, title, owners: [`js/catalog/${file}`], statements: statements(source), holds: run.status === 0 });
}
for (const [id, r] of rollup) {
  const own = records.get(id);
  if (own) { own.owners.push(`js/catalog/I-122.ts (roll-up record ${id})`); own.shape = r.shape; own.holds &&= rollupHolds.get(id) !== false; continue; }
  records.set(id, { id, title: r.claim, owners: [`js/catalog/I-122.ts (roll-up record ${id})`], statements: r.statements, shape: r.shape, holds: rollupHolds.get(id) === true });
}
const rollupRecord = records.get('I-122');
rollupRecord.title = `the roll-up: runs ${rollup.size} records (${[...rollup.keys()].sort(order)[0]} … ${[...rollup.keys()].sort(order).at(-1)}) and reports their shared shapes`;
rollupRecord.statements = [{ section: null, text: `every record in it passes (${[...rollupHolds.values()].filter(Boolean).length} of ${rollupHolds.size})` }];
rollupRecord.holds = rollupRun.status === 0;

const all = [...records.values()].sort((a, b) => order(a.id, b.id));
const NOTES = {
  'I-120': ['Its three stream checks (stdin, stdout, stderr are fds 0, 1, 2) run asynchronously. In the roll-up they finish after the record is already marked passed, so there they do not gate it; only the 3! ordering count does. The vm carrier waits for them, so there they count.', 'Those stream checks hold on a main thread; in a Worker the streams are not fds 0, 1, 2, so its Worker carrier fails on them.'],
  'I-122': ['In a Worker it fails through I-120: there stdin is not fd 0, because a Worker\'s standard streams are piped through the main thread.'],
  'I-177': ['What it checks: the three indices 59, 63, 127 and their spans; one atomic compare-exchange step at each index on a shared buffer; the step-1 and limit cases of the derivative; the forward and reverse chains.', 'What it states but does not check: that I-167, I-170 and I-171 drive those steps as the automaton\'s transition function (nothing connects them to the steps), and that the rate is the derivative (its rate function only checks that sin(59) is finite).', 'Section 3 corrected on 2026-10-12: it asserted 60 ⊕ 68 = 128; 60 ⊕ 68 is 120, and the pole relation is 60 ⊕ 128 = 188.'],
  'I-136': ['In a Worker it fails on "stdin = fd 0 (catch)": a Worker\'s standard streams are not file descriptors 0, 1, 2. The claim holds on a main thread.'],
};
for (const r of records.values()) r.notes = NOTES[r.id] ?? [];
for (const r of all) {
  r.category = category(r.shape);
  r.corrections = corrections.get(r.id) ?? [];
  r.witnesses = witnesses.get(r.id) ?? [];
}

// ---- tags, the classic script, its two base64 dialects, and where it holds ----
const vmDir = new URL('js/vm/', root);
rmSync(vmDir, { recursive: true, force: true });
mkdirSync(vmDir, { recursive: true });
for (const r of all) {
  r.tag = tag(r.id);
  // a record with its own module carries that module; a record found only in the
  // roll-up carries the roll-up's preamble, its own block and one call to run it
  const own = !r.owners[0].startsWith('js/catalog/I-122.ts ');
  const source = own
    ? readFileSync(new URL(r.owners[0].replace(/ \(.*$/, '').replace('js/catalog/', ''), catalogDir), 'utf8')
    : `${rollupPreamble}${rollup.get(r.id).block}\nfor (const rec of records) rec.run();\n`;
  const script = classicScript(source);
  const b64 = base64(script), b64url = base64url(script);
  writeFileSync(new URL(`${r.tag}.b64`, vmDir), b64 + '\n');
  writeFileSync(new URL(`${r.tag}.b64url`, vmDir), b64url + '\n');
  const vmError = await runInVm(b64, 'base64');
  const workerError = await runInWorker(b64url, 'base64url');
  r.carriers = {
    script: { sha256: sha256(script), bytes: Buffer.byteLength(script) },
    base64: `js/vm/${r.tag}.b64`,
    base64url: `js/vm/${r.tag}.b64url`,
    vm: vmError === null ? 'holds' : `fails: ${vmError}`,
    worker: workerError === null ? 'holds' : `fails: ${workerError}`,
  };
}

// ---- the catalogue ----
writeFileSync(new URL('js/catalog.json', root), JSON.stringify(all.map(({ id, tag, title, category, owners, holds, carriers, statements, corrections, witnesses }) =>
  ({ id, tag, title, category, status: 'P1', holds, owners, carriers, statements, corrections, witnesses })), null, 2) + '\n');

// ---- the documents ----
rmSync(docsDir, { recursive: true, force: true });
for (const c of new Set(all.map((r) => r.category))) mkdirSync(new URL(`${c}/`, docsDir), { recursive: true });
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
for (const r of all) {
  const siblings = all.filter((x) => x.category === r.category && x.id !== r.id).map((x) => `[${x.id}](${x.id}.md)`);
  const lines = [
    `# ${r.id}: ${cap(r.title)}`,
    '',
    '| | |',
    '|-|-|',
    `| Record | ${r.id} |`,
    `| Tag | \`${r.tag}\` (the record number in base 36, /A-Z0-9/) |`,
    `| Category | ${r.category} |`,
    `| Status | P1, for consideration: a finite, computable check (PROOF_CANONIZATION.md); not in the Coq registry |`,
    `| Holds | ${r.holds ? 'yes, when this document was built' : '**no**, when this document was built'} |`,
    `| Checked by | ${r.owners.map((o) => `\`${o}\``).join(', ')} |`,
    `| Origin | ${ORIGINS[r.id] ?? "boxedPINE, the I-series session of 2026-10-12, from the author's statements"} |`,
    '',
    '## Abstract',
    '',
    `${cap(r.title)}.`,
    '',
    '## Statement',
    '',
    'The check holds when each of the following holds, in this order (taken from its assertions):',
    '',
  ];
  let section;
  let n = 0;
  for (const s of r.statements) {
    if (s.section && s.section !== section) { section = s.section; lines.push('', `**${cap(section)}**`, ''); }
    lines.push(`${++n}. ${s.text}`);
  }
  lines.push('', '## Carriers', '',
    'The check as one classic script (types stripped; the host supplies `assert`, and `os` or `process` where used), in two base64 dialects that decode to the same bytes:', '',
    '| | |', '|-|-|',
    `| Script | ${r.carriers.script.bytes} bytes, sha256 \`${r.carriers.script.sha256.slice(0, 16)}…\` |`,
    `| base64 | \`${r.carriers.base64}\` |`,
    `| base64url | \`${r.carriers.base64url}\` |`,
    `| As a vm.Script | ${r.carriers.vm} |`,
    `| In a Worker | ${r.carriers.worker} |`);
  if (r.notes?.length) lines.push('', '## Notes', '', ...r.notes.map((n) => `- ${n}`));
  if (r.witnesses.length) lines.push('', '## What the engine itself reports', '', ...r.witnesses.map((w) => `- ${w}`));
  if (r.corrections.length) lines.push('', '## Corrections', '', 'Recorded by the roll-up as corrected during the session:', '', ...r.corrections.map((c) => `- ${c}`));
  lines.push('', '## Relations', '', siblings.length ? `Same category: ${siblings.join(', ')}.` : 'No other record in this category.', '');
  lines.push('## Run', '', '```', ...r.owners.map((o) => `node proofs/${o.replace(/ \(.*$/, '')}`), '```', '');
  writeFileSync(new URL(`${r.category}/${r.id}.md`, docsDir), lines.join('\n'));
}

const index = [
  '# OMI JavaScript Proof Index',
  '',
  'The I-series checks in `js/catalog/` are the authority here; each document in this',
  'folder is built from its check by `js/tools/build.mjs` and says only what the check checks.',
  'Every record is **P1, for consideration** (PROOF_CANONIZATION.md): a finite, computable',
  'check, a target for a P0 Coq proof, and not part of the locked `coq/` registry.',
  '',
  'The categories are the shapes the roll-up (I-122) assigns. The constant relations',
  'among them are indexed by subject, predicate and object in `js/spo/`.',
  '',
  '## Registry',
  '',
  '| Category | Record | Tag | Statement | Checked by | Holds | vm | Worker |',
  '| --- | --- | --- | --- | --- | --- | --- | --- |',
  ...all.map((r) => `| ${r.category} | [${r.id}](${r.category}/${r.id}.md) | \`${r.tag}\` | ${cap(r.title).replace(/\|/g, '\\|')} | \`${r.owners[0].replace(/ \(.*$/, '')}\` | ${r.holds ? 'yes' : '**no**'} | ${r.carriers.vm === 'holds' ? 'yes' : 'no'} | ${r.carriers.worker === 'holds' ? 'yes' : 'no'} |`),
  '',
  '## Counts',
  '',
  ...Object.entries(all.reduce((m, r) => ({ ...m, [r.category]: (m[r.category] ?? 0) + 1 }), {})).map(([c, n]) => `- ${c}: ${n}`),
  `- total: ${all.length} records, ${all.filter((r) => r.holds).length} holding`,
  '',
];
writeFileSync(new URL('JS-PROOF-INDEX.md', docsDir), index.join('\n'));
console.log(`${all.length} records (${all.filter((r) => r.holds).length} holding) -> js/catalog.json, js-docs/JS-PROOF-INDEX.md and ${all.length} documents in ${new Set(all.map((r) => r.category)).size} categories`);
process.exit(all.every((r) => r.holds) ? 0 : 1);
