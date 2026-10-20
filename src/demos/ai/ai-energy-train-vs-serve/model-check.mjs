// Builder repro: executes the shipped numeric model, not an independent gate.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source=fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const m=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
assert.equal(m.compute(0).total,110);assert.equal(m.compute(1).total,200);assert.equal(m.compute(2).crossover,20000);
console.log('PASS ai-energy-train-vs-serve: primary, countercase, boundary');
