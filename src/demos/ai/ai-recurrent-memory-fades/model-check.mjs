// Builder numerical checks execute the shipped local model; not independent evidence.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const text=fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(text,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {compute,fit,evaluate}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
assert.equal(compute(0).values[4],.0625);assert.deepEqual(compute(1).values,[1,1,1,1,1]);assert.ok(Math.abs(compute(2).values[4]-2.0736)<1e-12);for(let m=0;m<3;m++)assert.ok(Math.abs(compute(m).values[4]-compute(m).sensitivity)<1e-12);
console.log('PASS ai-recurrent-memory-fades: primary, changed countercase and boundary');
