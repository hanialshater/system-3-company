// Executes the shipped model. Builder checks are not independent evidence.
import assert from 'node:assert/strict';import fs from 'node:fs';import ts from 'typescript';
const code=ts.transpileModule(fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {compute,sum,dot,sqdist,normalise,f}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
const eq=(a,b)=>assert.deepEqual(a,b),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
near(compute(0).scores[0],.55);eq(compute(1).order[0],1);near(compute(2).scores[0],5.05);eq(compute(0).order,[0,1,2]);
for(let i=0;i<3;i++)assert.ok(compute(i).snapshot);
console.log("PASS ai-hybrid-keyword-vector-search: shipped primary, countercase and boundary");
