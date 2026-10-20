// Builder numerical checks execute the shipped local model; not independent evidence.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const text=fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(text,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {compute,fit,evaluate}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
assert.deepEqual(compute(0).output,[0,1,0,1]);assert.deepEqual(compute(1).output,[1,1,1,1]);assert.equal(compute(1).correct,2);assert.equal(compute(2).correct,4);assert.equal(compute(2).override,false);
console.log('PASS ai-backdoor-trigger: primary, changed countercase and boundary');
