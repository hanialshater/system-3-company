// Builder repro: executes the shipped numeric model, not an independent gate.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source=fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const m=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
assert.deepEqual(m.compute(0).distribution,[.6,.3,.1]);assert.deepEqual(m.compute(1).distribution,[.1,.3,.6]);assert.equal(m.compute(2).winner,1);assert.deepEqual(m.compute(3).distribution,[1/3,1/3,1/3]);
console.log('PASS ai-how-llms-are-trained: primary, countercase, boundary');
