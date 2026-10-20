import assert from 'node:assert/strict';import fs from 'node:fs';import ts from 'typescript';
const js=ts.transpileModule(fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const m=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
near(m.run(0).value,1/3);near(m.run(1).value,0);near(m.run(2).value,1);near(m.iou([0,0,2,2],[0,0,1,1]).value,.25);assert.throws(()=>m.iou([0,0,0,1],[0,0,1,1]));
assert.throws(()=>m.iou([1,1,0,0],[0,0,1,1]));
const meta=JSON.parse(fs.readFileSync(new URL('./meta.json',import.meta.url),'utf8'));assert.equal(meta.status,'draft');assert.equal(meta.version,1);assert.ok(meta.claims.every(c=>c.status==='unverified'&&c.id.startsWith('ai.'+meta.slug+'.c')));assert.ok(meta.curriculum.prerequisites.length);console.log(meta.slug+': finite primary, countercase and boundary checks pass; no independent verdict.');
