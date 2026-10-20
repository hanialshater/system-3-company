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
assert.deepEqual(a.values.map(v=>v||0),[1,0,-1,2,2,0,-2,4,0,0,0,0,-1,0,1,-2]);assert.deepEqual(a.detail.slice(0,4),[1,2,0,-1]);assert.deepEqual(b.detail.slice(0,4),[-1,-2,0,1]);assert.equal(c.detail[8],1);assert.equal(c.detail[9],16);
console.log("lora-low-rank: actual local model primary/counter/boundary checks passed; not independent verification");
