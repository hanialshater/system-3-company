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
near(a.detail[0],1/(1+Math.exp(2)));near(a.detail[2],2.7615941559557644);near(a.detail[3],.3278133254727377);near(b.detail[3],Math.log(2));near(c.detail[0],a.detail[1]);
console.log("rlhf-kl-leash: actual local model primary/counter/boundary checks passed; not independent verification");
