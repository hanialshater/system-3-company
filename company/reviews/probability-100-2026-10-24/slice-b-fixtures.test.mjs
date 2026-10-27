import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const root=process.cwd();
const fixtures=JSON.parse(fs.readFileSync(new URL('./slice-b-fixtures.json',import.meta.url)));
const {validateSpec,initialState,advance}=await import(pathToFileURL(path.join(root,'src/lib/mini-lab/model.ts')));
for(const row of fixtures){
 test(`${row.slug}: finite arithmetic fixture and trace`,async()=>{
  const folder=path.join(root,'src/demos/probability',row.slug);
  const {compute}=await import(pathToFileURL(path.join(folder,'model.ts')));
  const {spec}=await import(pathToFileURL(path.join(folder,'spec.ts')));
  const result=compute();
  row.expected.forEach((value,i)=>assert.ok(Math.abs(result.values[i]-value)<1e-5,`independent fixture ${i}: ${result.values[i]} != ${value}`));
  validateSpec(spec);
  let state=advance(spec,initialState(),'run');
  assert.deepEqual(state.witnessed,[true,false]);
  state=advance(spec,state,'compare');
  assert.deepEqual(state.witnessed,[true,true]);
  assert.deepEqual(advance(spec,state,'reset').witnessed,[true,true]);
  assert.ok(spec.reveal.join(' ').split(/\s+/).length<=90);
 });
}
