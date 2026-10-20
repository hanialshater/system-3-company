import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import ts from 'typescript';
const js=ts.transpileModule(fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS}}).outputText;
const sandbox={exports:{}};vm.runInNewContext(js,sandbox);const {compute}=sandbox.exports;
const near=(x,y)=>assert(Math.abs(x-y)<1e-9,`${x} != ${y}`);
// Bring arrays into this realm for structural comparison, not to change their values.
const run=i=>JSON.parse(JSON.stringify(compute(i)));
const a=run(0),b=run(1);
near(a.values[0],.9);near(a.values[2],.84);near(b.values[0],.6);near(b.values[2],.96);near(run(2).values[1],.499);
for(let i=0;i<3;i++){const x=compute(i);assert(x.rows.length>0);assert(x.receipt.length>0);assert.deepEqual(run(i),run(i));}
console.log('ai-generative-eval-tradeoff: model derivation and countercases passed; not independent verification');
