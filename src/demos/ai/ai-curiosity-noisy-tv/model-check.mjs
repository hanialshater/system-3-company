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
assert.deepEqual(a.detail,[1,0,.25,0,.25]);assert.deepEqual(b.detail,[1,0,.25,1,.025]);near(c.detail[2],0);assert(a.summary.endsWith('TV'));assert(b.summary.endsWith('Progress'));
console.log("curiosity-noisy-tv: actual local model primary/counter/boundary checks passed; not independent verification");
