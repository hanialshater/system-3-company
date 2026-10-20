import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source=fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const module={exports:{}};Function('exports',compiled)(module.exports);
const {compute}=module.exports;
const near=(x,y)=>assert(Math.abs(x-y)<1e-9,`${x} != ${y}`);
const a=compute(0),b=compute(1),c=compute(2);
for(const v of[a,b,c]){assert(v.values.every(Number.isFinite));assert(v.detail.every(Number.isFinite));assert.equal(typeof v.summary,'string');}
assert.deepEqual(a.values,[0,1,0,1,1,1,0,0,0]);assert.deepEqual(b.values,[0,0,0,1,1,1,0,1,0]);assert.equal(b.detail[0],1);assert.equal(c.detail[0],0);
console.log("data-augmentation: actual local model primary/counter/boundary checks passed; not independent verification");

assert.equal(compute(3).detail[0],0);assert(compute(3).summary.includes('Down→Down'));
