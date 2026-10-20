// Builder numerical checks execute the shipped local model; not independent evidence.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const text=fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(text,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {compute,fit,evaluate}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
assert.ok(Math.abs(compute(0).best-.6)<1e-12);assert.equal(compute(1).best,1);assert.ok(Math.abs(compute(2).best-.55)<1e-12);assert.deepEqual([0,1,2].map(m=>compute(m).unique),[2,4,4]);assert.deepEqual(compute(2).points,[[0,.8],[.05,.2],[.1,.5],[.15,.1]]);for(let m=0;m<3;m++)assert.equal(compute(m).points.length,4);
console.log('PASS ai-random-vs-grid-search: primary, changed countercase and boundary');
