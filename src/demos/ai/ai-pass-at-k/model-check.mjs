// Builder numerical checks execute the shipped local model; not independent evidence.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const text=fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(text,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {compute,fit,evaluate}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
assert.equal(compute(0).success,.68359375);assert.equal(compute(1).success,.25);assert.equal(compute(2).success,.4375);for(let m=0;m<3;m++){const c=compute(m);assert.ok(Math.abs(c.patterns.reduce((s,p)=>s+p.mass,0)-1)<1e-12);assert.ok(Math.abs(c.patterns.filter(p=>p.bits.some(Boolean)).reduce((s,p)=>s+p.mass,0)-c.success)<1e-12);}
console.log('PASS ai-pass-at-k: primary, changed countercase and boundary');
