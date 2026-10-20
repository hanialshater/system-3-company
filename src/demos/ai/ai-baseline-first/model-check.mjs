// Builder numerical checks execute the shipped local model; not independent evidence.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const text=fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(text,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {compute,fit,evaluate}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
assert.deepEqual([0,1,2].map(m=>compute(m).correct),[8,9,8]);assert.deepEqual([0,1,2].map(m=>compute(m).found),[0,1,2]);assert.equal(compute(2).prediction.filter((v,i)=>v===1&&compute(2).truth[i]===0).length,2);
console.log('PASS ai-baseline-first: primary, changed countercase and boundary');
