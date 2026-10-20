import assert from 'node:assert/strict';import fs from 'node:fs';import ts from 'typescript';
const js=ts.transpileModule(fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const m=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);const arr=(a,b)=>{assert.equal(a.length,b.length);a.forEach((x,i)=>near(x,b[i]));};
near(m.run(0).total,2.5);near(m.run(1).total,1.5);near(m.run(2).total,3.5);near(m.run(3).total,1);arr(m.run(3).parts,[0,0]);near(m.backup(0,.5,.5,6,2).total,2);
const meta=JSON.parse(fs.readFileSync(new URL('./meta.json',import.meta.url),'utf8'));assert.equal(meta.status,'draft');assert.ok(meta.claims.every(c=>c.status==='unverified'&&c.id.startsWith('ai.'+meta.slug+'.c')));console.log(meta.slug+': direct finite model checks pass; not independent review.');
