// Builder numerical checks execute the shipped local model; not independent evidence.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const text=fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(text,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {compute,fit,evaluate}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
assert.deepEqual(compute(0).filled,[5,5,5,5]);assert.equal(compute(0).mean,5);assert.deepEqual(compute(1).indicator,[0,1,0,1]);assert.deepEqual([0,1,2].map(m=>compute(m).correct),[2,4,2]);
console.log('PASS ai-missing-data-signal: primary, changed countercase and boundary');
