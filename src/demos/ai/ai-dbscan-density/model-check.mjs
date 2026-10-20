// Executes the shipped model. Builder checks are not independent evidence.
import assert from 'node:assert/strict';import fs from 'node:fs';import ts from 'typescript';
const code=ts.transpileModule(fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {compute,sum,dot,sqdist,normalise,f}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
const eq=(a,b)=>assert.deepEqual(a,b),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
eq(compute(0).labels,[0,0,0,1,1,1,-1]);eq(compute(1).count,0);eq(compute(2).count,1);eq(compute(2).labels[6],-1);
for(let i=0;i<3;i++)assert.ok(compute(i).snapshot);
console.log("PASS ai-dbscan-density: shipped primary, countercase and boundary");
