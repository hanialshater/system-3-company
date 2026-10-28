import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { ContentHub } from './hub.mjs';

const ROOT = path.resolve(new URL('../../../', import.meta.url).pathname);
const base = path.resolve(process.argv[2] ?? path.join(ROOT, 'artifacts/content-hub-deployment-final'));
const space = 'pilot', demo = 'sum-seven-ignores-first-die', sdk = 'content-hub-react-v1';
const compiler = new URL('./react-compiler.mjs', import.meta.url).pathname;
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const extra = ['package-lock.json','spike/build.mjs','spike/tooling/ts-loader.cjs','spike/tooling/css-module-loader.cjs'].map(f => sha(fs.readFileSync(path.join(ROOT, f)))).join(':');
const hub = new ContentHub(path.join(base, 'hub'), { compiler, sdk, compilerIdentityExtra: extra });
try {
  if (hub.db.prepare('SELECT id FROM spaces WHERE id=?').get(space)) throw new Error('Use a fresh pilot state directory');
  hub.createSpace(space);
  const kit = JSON.parse(fs.readFileSync(path.join(ROOT, 'artifacts/content-hub-catalogue/kit.json'), 'utf8'));
  const assets = Object.fromEntries(['js','css'].map(kind => {
    const file = path.basename(kit[kind].url), bytes = fs.readFileSync(path.join(ROOT, 'artifacts/content-hub-catalogue/dist', kit[kind].url));
    return [kind, { file, sha256: sha(bytes), sri: kit[kind].sri }];
  }));
  const runtimeFiles = {
    'packages/runtime/1.0.0/package.json': '{"name":"runtime","version":"1.0.0","dependencies":{}}',
    'packages/runtime/1.0.0/index.ts': 'export const sdk = "content-hub-react-v1";',
    'packages/runtime/1.0.0/assets.json': JSON.stringify({ version: '1.0.0', ...assets }),
  };
  for (const kind of ['js','css']) runtimeFiles['packages/runtime/1.0.0/' + assets[kind].file] = fs.readFileSync(path.join(ROOT, 'artifacts/content-hub-catalogue/dist', kit[kind].url), 'utf8');
  for (const file of ['Lesson.tsx','controls.tsx','milestones.tsx','random.ts','progress.ts','types.ts']) runtimeFiles['packages/runtime/1.0.0/types/' + file] = fs.readFileSync(path.join(ROOT, 'src/kit', file), 'utf8');
  runtimeFiles['packages/runtime/1.0.0/types/styles.d.ts'] = 'declare module "*.module.css" { const classes: Record<string,string>; export default classes; }';
  hub.write(space, { expectedHead: hub.head(space), scope: 'packages/runtime/1.0.0', files: runtimeFiles });
  const sourceDir = path.join(ROOT, 'src/demos/probability', demo);
  const files = Object.fromEntries(fs.readdirSync(sourceDir).filter(f => f !== 'meta.json').map(f => [`demos/${demo}/${f}`, fs.readFileSync(path.join(sourceDir, f), 'utf8')]));
  files[`demos/${demo}/demo.json`] = JSON.stringify({ entry: 'Demo.tsx', test: 'test.mjs', sdk, dependencies: { runtime: '1.0.0' } });
  files[`demos/${demo}/test.mjs`] = `import {test} from 'node:test';import assert from 'node:assert/strict';import {before,after,same,show} from './model.ts';test('independent enumeration of totals and conditional odds',()=>{assert.deepEqual(before(7),{k:6,of:36});assert.deepEqual(before(8),{k:5,of:36});for(let first=1;first<=6;first++){assert.deepEqual(after(7,first),{k:1,of:6});assert.equal(same(before(7),after(7,first)),true)}assert.deepEqual(after(8,1),{k:0,of:6});assert.equal(same(before(8),after(8,1)),false);assert.equal(show(before(7)),'6/36 = 1/6')});`;
  hub.write(space, { expectedHead: hub.head(space), scope: `demos/${demo}`, files });
  const [a] = hub.work(); assert.equal(a.status, 'ready', a.log);
  hub.publish(space, demo, a.id, { expectedGeneration: 0 });
  const original = files[`demos/${demo}/Demo.tsx`];
  hub.write(space, { expectedHead: hub.head(space), scope: `demos/${demo}`, files: { [`demos/${demo}/Demo.tsx`]: original + '\nexport const contentHubRevision = "B";\n' } });
  const [b] = hub.work(); assert.equal(b.status, 'ready', b.log); assert.notEqual(a.artifact, b.artifact);
  const meta = JSON.parse(fs.readFileSync(path.join(sourceDir, 'meta.json'), 'utf8'));
  const rows = [a,b].map((job, i) => ({ revision: i ? 'B' : 'A', space, slug: demo, title: meta.title, sourceCommit: job.sha, artifact: job.artifact, framePath: `/objects/${space}/${job.artifact}/frame.html`, buildId: job.id, manifest: hub.artifact(space, job.artifact) }));
  const publicRoot = path.join(base, 'artifact-site'); fs.mkdirSync(publicRoot, { recursive: true });
  for (const row of rows) fs.cpSync(path.join(hub.root, 'objects', space, row.artifact), path.join(publicRoot, 'objects', space, row.artifact), { recursive: true });
  fs.writeFileSync(path.join(base, 'publications.json'), JSON.stringify(rows, null, 2));
  fs.writeFileSync(path.join(base, 'prepare.json'), JSON.stringify({ space, demo, sdk, a: {id:a.id,status:a.status,testLog:a.log}, b:{id:b.id,status:b.status,testLog:b.log}, initialPublication:hub.publication(space,demo), compiler, compilerIdentity:hub.compilerIdentity }, null, 2));
  console.log(JSON.stringify({ demo, revisions: rows.map(r=>({revision:r.revision,sourceCommit:r.sourceCommit,artifact:r.artifact})), output:base },null,2));
} finally { hub.close(); }
