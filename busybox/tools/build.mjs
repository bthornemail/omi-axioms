// Build the BusyBox catalogue and its documents from the checks themselves.
//
// Reads every check in busybox/catalog (its header fields and its `# assert:`
// lines), runs each one, and writes:
//   busybox/catalog.json                     every record, its claim, whether it holds
//   busybox-docs/BUSYBOX-PROOF-INDEX.md       the registry
//   busybox-docs/<category>/<TAG>.md          one page per record
// The documents are derived, so they say only what the checks check. No dates
// are written: rebuilding unchanged checks gives the same files.
// Run: node proofs/busybox/tools/build.mjs   (or: make busybox-docs)
import { readFileSync, readdirSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = new URL('../../', import.meta.url);               // proofs/
const catDir = new URL('busybox/catalog/', root);
const docsDir = new URL('busybox-docs/', root);

const field = (src, name) => {
  const m = new RegExp('^#\\s*' + name + ':\\s*(.+)$', 'm').exec(src);
  return m ? m[1].trim() : null;
};
const asserts = (src) => [...src.matchAll(/^#\s*assert:\s*(.+)$/gm)].map((m) => m[1].trim());

const files = readdirSync(catDir).filter((f) => f.endsWith('.sh')).sort();
const records = [];
for (const f of files) {
  const path = fileURLToPath(new URL(f, catDir));
  const src = readFileSync(path, 'utf8');
  const run = spawnSync('sh', [path], { encoding: 'utf8' });
  const holds = run.status === 0;
  records.push({
    tag: field(src, 'tag') ?? f.replace(/^B-|\.sh$/g, ''),
    title: field(src, 'title') ?? f,
    category: field(src, 'category') ?? 'other',
    status: 'P1',
    holds,
    applets: (field(src, 'applets') ?? '').split(/\s+/).filter(Boolean),
    claim: field(src, 'claim') ?? '',
    statements: asserts(src),
    owner: `busybox/catalog/${f}`,
    exit: run.status,
    ...(holds ? {} : { stderr: (run.stderr || '').trim().slice(0, 400) }),
  });
}

writeFileSync(new URL('busybox/catalog.json', root), JSON.stringify(records, null, 2) + '\n');

// ---- documents ----
rmSync(docsDir, { recursive: true, force: true });
mkdirSync(docsDir, { recursive: true });
const mark = (b) => (b ? 'holds' : 'DOES NOT HOLD');
const tick = (b) => (b ? '✓' : '✗');

let index = '# BUSYBOX-PROOF-INDEX\n\n';
index += 'The BusyBox P1 checks, built from `busybox/catalog/`. Each check calls real\n';
index += '`busybox` applets and exits nonzero when its claim does not hold.\n\n';
index += '| tag | title | category | applets | holds |\n|-----|-------|----------|---------|-------|\n';
for (const r of records) {
  index += `| \`${r.tag}\` | ${r.title} | ${r.category} | ${r.applets.join(' ')} | ${tick(r.holds)} |\n`;
}
const held = records.filter((r) => r.holds).length;
index += `\n${held} of ${records.length} hold.\n`;
writeFileSync(new URL('BUSYBOX-PROOF-INDEX.md', docsDir), index);

for (const r of records) {
  const dir = new URL(`${r.category}/`, docsDir);
  mkdirSync(dir, { recursive: true });
  let doc = `# ${r.tag} — ${r.title}\n\n`;
  doc += `- **status:** ${r.status}\n- **category:** ${r.category}\n- **applets:** ${r.applets.join(', ')}\n`;
  doc += `- **owner:** \`${r.owner}\`\n- **result:** ${mark(r.holds)}\n\n`;
  doc += `## Claim\n\n${r.claim}\n\n## Statements\n\n`;
  doc += r.statements.length ? r.statements.map((s) => `- ${s}`).join('\n') + '\n' : '_(none extracted)_\n';
  writeFileSync(new URL(`${r.tag}.md`, dir), doc);
}

console.log(`busybox: ${held}/${records.length} checks hold → busybox/catalog.json, ../busybox-docs/`);
for (const r of records.filter((r) => !r.holds)) console.log(`  DOES NOT HOLD: ${r.tag} (exit ${r.exit})`);
