// Executes the shipped model. Builder checks are not independent evidence.
import assert from 'node:assert/strict';import fs from 'node:fs';import ts from 'typescript';
const code=ts.transpileModule(fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {compute,sum,dot,sqdist,normalise,f}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
const eq=(a,b)=>assert.deepEqual(a,b),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
eq(compute(0).hits,2);eq(compute(1).hits,0);eq(compute(2).hits,2);eq(Object.keys(compute(1).train),["A"]);
for(let i=0;i<3;i++)assert.ok(compute(i).snapshot);
console.log("PASS ai-group-split-leakage: shipped primary, countercase and boundary");
