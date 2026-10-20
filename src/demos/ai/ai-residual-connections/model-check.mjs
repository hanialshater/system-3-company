// Builder numerical checks execute the shipped local model; not independent evidence.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const text=fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(text,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {compute,fit,evaluate}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
assert.ok(Math.abs(compute(0).sensitivity-.001)<1e-12);assert.ok(Math.abs(compute(1).sensitivity-1.331)<1e-12);assert.equal(compute(2).sensitivity,0);assert.equal(compute(1).identity,1);assert.equal(compute(2).identity+compute(2).branch,0);
console.log('PASS ai-residual-connections: primary, changed countercase and boundary');
