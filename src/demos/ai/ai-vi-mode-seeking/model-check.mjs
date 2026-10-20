// Executes the shipped model. Builder checks are not independent evidence.
import assert from 'node:assert/strict';import fs from 'node:fs';import ts from 'typescript';
const code=ts.transpileModule(fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {compute,sum,dot,sqdist,normalise,f}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
const eq=(a,b)=>assert.deepEqual(a,b),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
near(compute(0).minimum,Math.log(1/.45));eq(compute(0).best,[0,2]);near(compute(1).minimum,Math.log(.5/.45));
for(let i=0;i<2;i++)assert.ok(compute(i).snapshot);
console.log("PASS ai-vi-mode-seeking: shipped primary, countercase and boundary");
