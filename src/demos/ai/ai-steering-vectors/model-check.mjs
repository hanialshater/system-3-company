// Builder repro: executes the shipped numeric model, not an independent gate.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source=fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const m=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
assert.deepEqual([0,1,2].map(i=>[m.compute(i).target,m.compute(i).side]),[[1,2],[2,3],[0,1]]);assert.deepEqual([m.compute(3).target,m.compute(3).side],[1,3]);
console.log('PASS ai-steering-vectors: primary, countercase, boundary');
