import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source=fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const module={exports:{}};Function('exports',compiled)(module.exports);
const {compute,computeInput}=module.exports;
const near=(x,y)=>assert(Math.abs(x-y)<1e-9,`${x} != ${y}`);
const a=compute(0),b=compute(1),c=compute(2);
for(const v of[a,b,c]){assert(v.values.every(Number.isFinite));assert(v.detail.every(Number.isFinite));assert.equal(typeof v.summary,'string');}
assert.deepEqual(a.values,[1,1,1,1,1,1,1]);assert.deepEqual(b.values.slice(-3),[1,0,0]);assert.deepEqual(c.values.slice(-3),[0,1,0]);
console.log("feature-hierarchy: actual local model primary/counter/boundary checks passed; not independent verification");

for(let bits=0;bits<16;bits++){const x=[0,1,2,3].map(i=>(bits>>i)&1);const v=computeInput(x);assert.equal(v.values[6],Number(x.every(Boolean)));assert.equal(v.values[4],Number(x[0]===1&&x[1]===1));assert.equal(v.values[5],Number(x[2]===1&&x[3]===1));}
