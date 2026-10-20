// Builder numerical checks execute the shipped local model; not independent evidence.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const text=fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(text,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {compute,fit,evaluate}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
assert.ok(Math.abs(compute(0).rows[0].product-.128)<1e-12);assert.equal(compute(0).rows[1].product,.125);assert.ok(compute(1).rows[0].nll<compute(0).rows[0].nll);assert.equal(compute(2).rows[0].product,0);assert.equal(compute(2).rows[0].nll,Infinity);assert.equal(compute(3).rows[0].loss,compute(0).rows[0].nll/3);
console.log('PASS ai-maximum-likelihood: primary, changed countercase and boundary');
