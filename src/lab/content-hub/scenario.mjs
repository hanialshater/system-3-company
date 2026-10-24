import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { ContentHub } from './hub.mjs';
import { seed, demoFiles, packageFiles } from './fixtures.mjs';

export function runScenario(root = fs.mkdtempSync(path.join(os.tmpdir(), 's3-content-hub-'))) {
  const hub = new ContentHub(root);
  const results = [];
  const report = (name, facts) => results.push({ name, ...facts });
  try {
    const initial = seed(hub);
    report('initial builds', { statuses: initial.map(j => j.status), jobs: initial.length });
    const alpha = hub.publication('research', 'alpha'), beta = hub.publication('research', 'beta');
    const write = (scope, files) => hub.write('research', { expectedHead: hub.head('research'), scope, files });
    const change = write('demos/alpha', demoFiles('alpha', 4));
    assert.deepEqual(change.jobs.map(j => j.demo), ['alpha']);
    const [changed] = hub.work(); assert.equal(changed.status, 'ready');
    hub.publish('research', 'alpha', changed.id, { expectedGeneration: 1 });
    assert.deepEqual(hub.publication('research', 'beta'), beta);
    report('scoped code edit', { jobs: change.jobs.length, demos: change.jobs.map(j => j.demo), milliseconds: changed.milliseconds });
    assert.equal(write('docs', { 'docs/note.md': 'A documentation-only write' }).jobs.length, 0);
    report('documentation edit', { jobs: 0 });
    write('demos/alpha', { 'demos/alpha/index.ts': 'export const broken: number = "compiler error";' });
    const [failed] = hub.work(); assert.equal(failed.status, 'failed');
    assert.equal(hub.publication('research', 'alpha').job, changed.id);
    report('compiler failure', { status: failed.status, publicationPreserved: true });
    write('demos/alpha', demoFiles('alpha'));
    const [restored] = hub.work(); assert.equal(restored.status, 'cached'); assert.equal(restored.artifact, alpha.artifact);
    report('identical-input restore', { status: restored.status, differentCommit: restored.sha !== alpha.sha, sameArtifact: true });
    hub.publish('research', 'alpha', initial.find(j => j.demo === 'alpha').id, { expectedGeneration: 2, rollback: true });
    report('rollback without compilation', { artifact: hub.publication('research', 'alpha').artifact, generation: 3 });
    assert.equal(write('packages/ui/1.1.0', packageFiles('1.1.0', '#fbbf24')).jobs.length, 0);
    const pin = write('demos/alpha', demoFiles('alpha', 2, '1.1.0'));
    const [upgraded] = hub.work(); assert.equal(upgraded.status, 'ready');
    report('explicit dependency upgrade', { demos: pin.jobs.map(j => j.demo), oldBetaArtifactPreserved: hub.publication('research', 'beta').artifact === beta.artifact });
    const actualBuilds = hub.jobs('research').filter(j => j.status === 'ready' || j.status === 'failed').length;
    // Baseline counts all configured demos at each post-seed source write, without cache reuse.
    report('finite fixture comparison', { scopedCompilerRuns: actualBuilds, rebuildAllCompilerRuns: 14, caveat: 'Counts for this deterministic two-demo sequence; not a throughput benchmark.' });
    return { root, results, jobs: hub.jobs('research') };
  } finally { hub.close(); }
}
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const result = runScenario(process.argv[2]);
  console.log(JSON.stringify(result, null, 2));
}
