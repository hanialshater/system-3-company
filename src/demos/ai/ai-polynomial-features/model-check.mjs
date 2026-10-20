// Builder numerical checks execute the shipped local model; not independent evidence.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const text=fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(text,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {compute,fit,evaluate}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
assert.equal(compute(0).sse,14);assert.equal(compute(0).coefficient,0);assert.equal(compute(0).intercept,2);assert.equal(compute(1).sse,0);assert.equal(compute(1).coefficient,1);assert.equal(compute(1).intercept,0);assert.equal(compute(2).coefficient*9+compute(2).intercept,9);
console.log('PASS ai-polynomial-features: primary, changed countercase and boundary');
