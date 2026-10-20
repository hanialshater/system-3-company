// Builder numerical checks execute the shipped local model; not independent evidence.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const text=fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(text,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {compute,fit,evaluate}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
assert.deepEqual(compute(0).output,[9,3]);assert.deepEqual(compute(1).output,[9,8]);assert.deepEqual(compute(2).output,[9,9,3,8]);assert.equal(compute(3).output[0],Math.max(...compute(3).swapped));for(let m=0;m<4;m++)assert.ok(compute(m).windows.every(w=>w[1]<compute(m).input.length));
console.log('PASS ai-pooling-stride: primary, changed countercase and boundary');
