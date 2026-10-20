// Builder numerical checks execute the shipped local model; not independent evidence.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const text=fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(text,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {compute,fit,evaluate}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
assert.deepEqual(compute(0).observed,[12,9,14,11,16,13]);assert.deepEqual(compute(0).recovered,[10,11,12,13,14,15]);assert.equal(compute(1).observed[6],18);assert.equal(compute(2).observed[4],12);assert.equal(compute(2).observed[4]-compute(0).observed[4],-4);
console.log('PASS ai-seasonality-decomposition: primary, changed countercase and boundary');
