// Builder numerical checks execute the shipped local model; not independent evidence.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const text=fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(text,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {compute,fit,evaluate}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
assert.equal(compute(0).boxBackground,4);assert.equal(compute(1).foreground,5);assert.equal(compute(1).maskBackground,0);assert.equal(compute(2).boxBackground,0);assert.equal(compute(2).foreground,9);
console.log('PASS ai-segmentation-per-pixel: primary, changed countercase and boundary');
