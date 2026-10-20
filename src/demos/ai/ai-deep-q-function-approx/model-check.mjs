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
near(a.detail[0],.5);assert.deepEqual(a.values,[.5,1,-.5]);near(b.detail[0],-.25);assert.deepEqual(b.values,[-.25,-.5,.25]);assert.deepEqual(c.values,[.5,0,0]);
console.log("deep-q-function-approx: actual local model primary/counter/boundary checks passed; not independent verification");
