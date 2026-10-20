// Builder repro: executes the shipped numeric model, not an independent gate.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source=fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const m=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
assert.deepEqual(m.compute(0).counts,[7,3]);assert.deepEqual(m.compute(1).counts,[3,7]);assert.equal(m.compute(2).p,.5);
console.log('PASS ai-pretraining-data-mix: primary, countercase, boundary');
