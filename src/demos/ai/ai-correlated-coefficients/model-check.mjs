// Builder numerical checks execute the shipped local model; not independent evidence.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const text=fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(text,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {compute,fit,evaluate}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
assert.deepEqual(fit(2),[2,0]);assert.ok(Math.abs(fit(2.01)[1]-1)<1e-12);assert.ok(Math.abs(compute(2).on[0]-compute(2).on[1])<1e-12);assert.ok(Math.abs(compute(2).off[0]-compute(2).off[1]-1)<1e-12);assert.equal(compute(3).identical,true);
console.log('PASS ai-correlated-coefficients: primary, changed countercase and boundary');
