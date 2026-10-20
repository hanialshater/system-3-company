// Direct CLI execution must survive filesystem aliases; imports must remain inert.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath, pathToFileURL} from 'node:url';

const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
function fixture(t) {
  const root=fs.mkdtempSync(path.join(os.tmpdir(), 's3c-publish-entry-'));
  t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
  fs.mkdirSync(path.join(root,'tools'));
  const tool=path.join(root,'tools/publish-ready.mjs');
  fs.copyFileSync(path.join(repo,'tools/publish-ready.mjs'),tool);
  // Some existing baselines import AMD-013 readiness; standalone baselines do not.
  // Mirror only the copied tool's actual dependency, without adding policy to it.
  if (fs.readFileSync(tool,'utf8').includes('from "./lib/readiness.mjs"')) {
    fs.mkdirSync(path.join(root,'tools/lib'));
    fs.copyFileSync(path.join(repo,'tools/lib/readiness.mjs'),path.join(root,'tools/lib/readiness.mjs'));
  }
  const alias=path.join(root,'alias.mjs');
  fs.symlinkSync(tool,alias);
  const sentinel=path.join(root,'meta.json');
  fs.writeFileSync(sentinel,'{"status":"review","sentinel":true}\n');
  return {root,tool,alias,sentinel,before:fs.readFileSync(sentinel)};
}
function run(root,argv) {
  const result=spawnSync(process.execPath,argv,{cwd:root,encoding:'utf8'});
  assert.equal(result.error,undefined);
  assert.equal(result.signal,null,result.stderr);
  return result;
}

test('normal, canonical and symlink direct paths print help and reject bad arguments without writes',t=>{
  const f=fixture(t);
  for(const script of [f.tool,fs.realpathSync(f.tool),f.alias]) {
    const help=run(f.root,[script,'--help']);
    assert.equal(help.status,0,help.stderr);
    assert.match(help.stdout,/usage: node tools\/publish-ready\.mjs/);
    assert.equal(help.stderr,'');
    const invalid=run(f.root,[script,'--not-a-valid-flag']);
    assert.equal(invalid.status,2,invalid.stdout+invalid.stderr);
    assert.match(invalid.stderr,/unknown argument/);
    assert.match(invalid.stderr,/usage: node tools\/publish-ready\.mjs/);
    assert.deepEqual(fs.readFileSync(f.sentinel),f.before);
  }
});

test('dynamic imports are silent with absent, unresolved or different existing argv',t=>{
  const f=fixture(t);
  const other=path.join(f.root,'other.mjs');
  fs.writeFileSync(other,'// Different existing program, not the imported CLI.\n');
  const target=pathToFileURL(f.tool).href;
  const variants=[
    'delete process.argv[1];',
    `process.argv[1]=${JSON.stringify(path.join(f.root,'missing.mjs'))};`,
    `process.argv[1]=${JSON.stringify(other)};`,
  ];
  for(const setup of variants) {
    // --publish would be destructive if an import accidentally called main().
    // No gate/company file is present, and the sentinel must remain unchanged.
    const program=`${setup}process.argv[2]='--publish';await import(${JSON.stringify(target)});`;
    const result=run(f.root,['--input-type=module','--eval',program]);
    assert.equal(result.status,0,result.stdout+result.stderr);
    assert.equal(result.stdout,'');
    assert.equal(result.stderr,'');
    assert.deepEqual(fs.readFileSync(f.sentinel),f.before);
  }
});
