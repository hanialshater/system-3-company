// Builder numerical checks execute the shipped local model; not independent evidence.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const text=fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(text,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {compute,fit,evaluate}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
assert.ok(Math.abs(compute(0).slope-.1)<1e-12);assert.ok(Math.abs(compute(1).slope+19/251)<1e-12);assert.ok(Math.abs(compute(1).intercept-250/251)<1e-12);assert.equal(compute(2).slope,1);assert.equal(compute(2).intercept,0);assert.ok(compute(2).points.every(p=>p[0]>=0&&p[0]<=10&&p[1]>=0&&p[1]<=10));
console.log('PASS ai-outlier-leverage: primary, changed countercase and boundary');
