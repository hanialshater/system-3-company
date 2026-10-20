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
assert.deepEqual(a.values,[.5,.75,-.125,-.5625]);assert.deepEqual(b.values,[.5,-.25,.375,-.3125]);near(c.values[3],.9375);near(a.detail[4],1.31640625);near(b.detail[4],1.09765625);near(c.detail[4],1.87890625);
console.log("experience-replay: actual local model primary/counter/boundary checks passed; not independent verification");
