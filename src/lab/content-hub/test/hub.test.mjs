import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { ContentHub } from '../hub.mjs';
import { seed, demoFiles, demoSource, packageFiles } from '../fixtures.mjs';
import { runScenario } from '../scenario.mjs';

function setup(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hub-test-'));
  const hub = new ContentHub(root);
  t.after(() => { hub.close(); fs.rmSync(root, { recursive: true, force: true }); });
  return hub;
}
function write(hub, space, scope, files, expectedHead = hub.head(space)) {
  return hub.write(space, { expectedHead, scope, files });
}
test('real Git → scoped compilation → artifacts → rollback scenario', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hub-scenario-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const result = runScenario(root);
  assert.equal(result.results.length, 8);
  assert.ok(result.results.find(r => r.name === 'finite fixture comparison').scopedCompilerRuns < 14);
});
test('scope and stale-write validation are atomic before filesystem/Git changes', t => {
  const hub = setup(t); hub.createSpace('one'); const before = hub.head('one');
  for (const files of [
    { 'demos/alpha/ok.ts': '', 'demos/beta/no.ts': '' },
    { 'demos/alpha/../../escape': '' },
    { 'demos/alpha/.git/config': '' },
  ]) assert.throws(() => write(hub, 'one', 'demos/alpha', files));
  assert.equal(hub.head('one'), before);
  assert.equal(fs.existsSync(path.join(hub.repo('one'), 'demos/alpha/ok.ts')), false);
  write(hub, 'one', 'docs', { 'docs/a.md': 'a' });
  assert.throws(() => write(hub, 'one', 'docs', { 'docs/a.md': 'b' }, before), /Stale HEAD/);
});
test('failed tests, unpublished edits, publication CAS and cross-space ownership', t => {
  const hub = setup(t), jobs = seed(hub, 'one');
  const original = hub.publication('one', 'alpha');
  write(hub, 'one', 'demos/alpha', { 'demos/alpha/index.ts': demoSource('alpha', 9) });
  assert.equal(hub.jobs('one').at(-1).status, 'queued');
  assert.deepEqual(hub.publication('one', 'alpha'), original);
  const [failed] = hub.work(); assert.equal(failed.status, 'failed'); assert.match(failed.log, /45|calculation/);
  assert.deepEqual(hub.publication('one', 'alpha'), original);
  assert.throws(() => hub.publish('one', 'alpha', failed.id, { expectedGeneration: 1 }), /successful build/);
  const first = jobs.find(j => j.demo === 'alpha');
  assert.throws(() => hub.publish('one', 'alpha', first.id, { expectedGeneration: 1 }), /stale/);
  assert.throws(() => hub.publish('one', 'alpha', first.id, { expectedGeneration: 0, rollback: true }), /generation/);
  hub.createSpace('two');
  assert.throws(() => hub.publish('two', 'alpha', first.id, { expectedGeneration: 0, rollback: true }), /successful build/);
  assert.throws(() => hub.publish('one', 'beta', first.id, { expectedGeneration: 1, rollback: true }), /successful build/);
  assert.deepEqual(hub.publication('one', 'alpha'), original);
});
test('pinned packages are immutable and unused package writes do not build', t => {
  const hub = setup(t); seed(hub);
  assert.throws(() => write(hub, 'research', 'packages/ui/1.0.0', packageFiles()), /immutable/);
  assert.equal(write(hub, 'research', 'packages/ui/1.1.0', packageFiles('1.1.0')).jobs.length, 0);
  write(hub, 'research', 'demos/alpha', demoFiles('alpha', 2, '9.9.9'));
  assert.equal(hub.jobs('research').at(-1).status, 'failed');
  assert.equal(hub.publication('research', 'alpha').generation, 1);
});
test('transitive dependency inputs are included and undeclared source imports fail', t => {
  const hub = setup(t); hub.createSpace('one');
  write(hub, 'one', 'packages/color/1.0.0', {
    'packages/color/1.0.0/package.json': '{}', 'packages/color/1.0.0/index.ts': 'export const color = "green";',
  });
  const ui = packageFiles(); ui['packages/ui/1.0.0/package.json'] = '{"dependencies":{"color":"1.0.0"}}';
  ui['packages/ui/1.0.0/index.ts'] = 'export { color } from "@space/color";';
  write(hub, 'one', 'packages/ui/1.0.0', ui);
  write(hub, 'one', 'demos/alpha', demoFiles('alpha'));
  const [built] = hub.work(); assert.equal(built.status, 'ready', built.log);
  const manifest = hub.artifact('one', built.artifact);
  assert.ok(manifest.files['packages/color/1.0.0/index.js']);
  write(hub, 'one', 'demos/alpha', { 'demos/alpha/index.ts': 'export { mount } from "../beta/index.js";' });
  assert.equal(hub.work()[0].status, 'failed');
});
test('restart resumes queued builds and Git outbox reconciliation is idempotent', t => {
  const hub = setup(t); hub.createSpace('one');
  write(hub, 'one', 'packages/ui/1.0.0', packageFiles());
  write(hub, 'one', 'demos/alpha', demoFiles('alpha'));
  const second = new ContentHub(hub.root);
  try {
    const [job] = second.work(); assert.equal(job.status, 'ready', job.log);
    second.publish('one', 'alpha', job.id, { expectedGeneration: 0 });
    // Simulate a crash after Git commit but before the revision/job index transaction.
    fs.writeFileSync(path.join(second.repo('one'), 'demos/alpha/index.ts'), demoSource('alpha', 7));
    execFileSync('git', ['-C', second.repo('one'), 'add', '.']);
    execFileSync('git', ['-C', second.repo('one'), '-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', 'commit', '-m', 'Unindexed commit']);
    second.reconcile('one'); second.reconcile('one');
    assert.equal(second.jobs('one').length, 2);
    assert.equal(second.jobs('one').at(-1).status, 'queued');
    assert.equal(second.publication('one', 'alpha').job, job.id);
  } finally { second.close(); }
});
test('artifact tampering prevents publishing', t => {
  const hub = setup(t), jobs = seed(hub);
  const job = jobs[0], manifest = hub.artifact('research', job.artifact);
  fs.appendFileSync(path.join(hub.root, 'objects', 'research', job.artifact, manifest.entry), '\n// tampered');
  assert.throws(() => hub.publish('research', job.demo, job.id, { expectedGeneration: 1 }), /integrity/);
});
