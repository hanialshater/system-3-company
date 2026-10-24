import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { CatalogueIndex } from '../catalogue-index.mjs';

test('dependency invalidation covers barrels, JSON and CSS without selecting unrelated demos', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'catalogue-index-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const files = {
    'src/demos/example/a/Demo.tsx': 'import {x} from "@/shared/barrel"; import data from "./data.json"; import styles from "./style.module.css"; export default ()=>x;',
    'src/demos/example/a/meta.json': '{}', 'src/demos/example/a/data.json': '{"n":1}', 'src/demos/example/a/style.module.css': '.x{color:red}',
    'src/demos/example/b/Demo.tsx': 'export default ()=>1;', 'src/demos/example/b/meta.json': '{}',
    'src/shared/barrel.ts': 'export {x} from "./value";', 'src/shared/value.ts': 'export const x=1;',
  };
  for (const [f, text] of Object.entries(files)) { fs.mkdirSync(path.dirname(path.join(root, f)), { recursive: true }); fs.writeFileSync(path.join(root, f), text); }
  const index = new CatalogueIndex(root, 'compiler');
  for (const f of ['src/shared/value.ts', 'src/demos/example/a/data.json', 'src/demos/example/a/style.module.css']) {
    assert.deepEqual(index.affected([f]), ['example/a']);
    assert.notEqual(index.key('example/a', new Map([[f, files[f] + '\nchanged']])), index.key('example/a'));
    assert.equal(index.key('example/b', new Map([[f, files[f] + '\nchanged']])), index.key('example/b'));
  }
  assert.deepEqual(index.affected(['docs/note.md']), []);
  const demoDir = path.join(root, 'src/demos/example/a');
  fs.cpSync(demoDir, path.join(root, 'src/demos/example/__capacity-0000'), { recursive: true });
  const expanded = new CatalogueIndex(root, 'compiler');
  assert.equal(expanded.key('example/a'), expanded.key('example/__capacity-0000'));
  assert.deepEqual(expanded.affected(['src/shared/value.ts']), ['example/__capacity-0000', 'example/a']);
});
