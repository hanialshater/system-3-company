// Builder numerical checks execute the shipped local model; not independent evidence.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const text=fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(text,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {compute,fit,evaluate}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
assert.deepEqual(compute(0).memberMse,[1,1,1,1]);assert.deepEqual(compute(1).memberMse,[1,1,1,1]);assert.deepEqual(compute(1).mean,[0,0,0,0]);assert.deepEqual([0,1,2].map(m=>compute(m).mse),[1,0,1]);assert.equal(compute(2).singleMse,compute(2).mse);assert.equal(compute(2).copies,true);
console.log('PASS ai-random-forest-decorrelation: primary, changed countercase and boundary');
