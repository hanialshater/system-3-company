// Run with the existing TS loader:
// node --import ./tests/lifehacks/register.mjs tools/verify-behavioral-probability-batch.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { validateSpec } from '../src/lib/mini-lab/model.ts';

const root = process.cwd();
const base = '60eaf60ac';
const original = new Set(execFileSync('git', ['ls-tree', '-r', '--name-only', base, 'src/demos'], {encoding:'utf8'}).trim().split('\n'));
const entries = [];
const seen = new Set();
for (const domain of ['behavioral', 'probability']) {
  const selectionPath = `company/domains/briefs/2026-10-24-${domain}-100.json`;
  const selection = JSON.parse(fs.readFileSync(selectionPath, 'utf8'));
  assert.equal(selection.entries.length, 100, `${domain}: exactly 100 source entries`);
  assert.equal(new Set(selection.entries.map(e => e.sourceEntryId)).size, 100);
  const curriculum = JSON.parse(fs.readFileSync(`content/curriculum/${domain}.json`, 'utf8'));
  for (const brief of selection.entries) {
    const dir = `src/demos/${domain}/${brief.slug}`;
    assert(!seen.has(brief.slug), `duplicate slug ${brief.slug}`);
    seen.add(brief.slug);
    assert(!original.has(`${dir}/meta.json`), `existing lesson reused: ${brief.slug}`);
    const meta = JSON.parse(fs.readFileSync(`${dir}/meta.json`, 'utf8'));
    assert.equal(meta.slug, brief.slug);
    assert.equal(meta.domain, domain);
    assert.equal(meta.status, 'draft');
    assert.equal(meta.confidence, '');
    assert(meta.title.length <= 40 && meta.hook.length <= 90);
    assert(curriculum.concepts.some(c => c.id === meta.concept));
    assert.equal(meta.curriculum.primary, `${domain}:${meta.concept}`);
    assert(meta.claims.length > 0);
    for (const claim of meta.claims) {
      assert.equal(claim.status, 'unverified', `claim promoted: ${claim.id}`);
      assert(!claim.checkedBy, `builder certification: ${claim.id}`);
      assert(claim.id.startsWith(`${domain}.${brief.slug}.`) && claim.source);
    }
    assert(Object.values(meta.evidence).every(a => Array.isArray(a) && a.length === 0));
    const {spec} = await import(pathToFileURL(path.join(root, dir, 'spec.ts')).href);
    validateSpec(spec);
    assert.equal(spec.id, brief.slug);
    const visuals = [...new Set(spec.scenarios.flatMap(s => s.frames.map(f => f.visual.kind)))].sort();
    entries.push({domain, slug:brief.slug, title:meta.title, version:meta.version, sourceEntryId:brief.sourceEntryId,
      sourceSection:brief.sourceSection, selection:selectionPath, family:spec.family, visuals,
      status:meta.status, claimCount:meta.claims.length,
      filesSha256:createHash('sha256').update(fs.readFileSync(`${dir}/Demo.tsx`)).update(fs.readFileSync(`${dir}/spec.ts`)).update(fs.readFileSync(`${dir}/meta.json`)).update(fs.existsSync(`${dir}/model.ts`)?fs.readFileSync(`${dir}/model.ts`):'').digest('hex')});
  }
}
assert.equal(entries.length, 200);
const manifest = {schema:'behavioral-probability-200-v1', date:'2026-10-24', baseline:base,
  counts:{behavioral:100,probability:100,total:200},
  evidenceBoundary:'Draft implementation manifest and runtime schema checks; no factual verification or learning claim.', entries};
const dest = 'company/reviews/behavioral-probability-200/manifest.json';
if (process.argv.includes('--write')) fs.writeFileSync(dest, JSON.stringify(manifest, null, 2)+'\n');
else assert.deepEqual(JSON.parse(fs.readFileSync(dest,'utf8')), manifest, 'manifest stale; inspect then regenerate with --write');
console.log(`200 new drafts validated: 100 behavioral + 100 probability; ${entries.reduce((n,e)=>n+e.claimCount,0)} claims remain unverified.`);
console.log(`Visible representations: ${[...new Set(entries.flatMap(e=>e.visuals))].sort().join(', ')}.`);
