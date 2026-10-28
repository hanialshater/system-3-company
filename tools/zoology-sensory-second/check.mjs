import fs from 'node:fs';
import ts from 'typescript';
import assert from 'node:assert/strict';
const m=JSON.parse(fs.readFileSync('company/reviews/zoology-sensory-second/manifest.json','utf8'));
assert.equal(m.length,12);assert.equal(new Set(m.map(x=>x.slug)).size,12);
const questions=new Set();
for(const row of m){
 const dir=`src/demos/life/${row.slug}`,meta=JSON.parse(fs.readFileSync(`${dir}/meta.json`,'utf8')),code=fs.readFileSync(`${dir}/Demo.tsx`,'utf8');
 assert.equal(meta.status,'draft');assert.equal(meta.version,1);assert.equal(meta.slug,row.slug);
 assert.equal(meta.claims.length,3);assert.ok(meta.claims.every(x=>x.status==='unverified'));assert.deepEqual(meta.evidence,{qa:[],simulatedLearner:[],pairwise:[],humanLearners:[]});
 assert.ok(meta.title.length<=40);assert.ok(meta.hook.length<=90);assert.ok(meta.recall.options.length===3 && meta.recall.answer>=0 && meta.recall.answer<3);
 const json=code.match(/const model = ([\s\S]*?);\nexport default/);assert.ok(json);const model=JSON.parse(json[1]);assert.ok(model.answer>=0&&model.answer<model.options.length);assert.equal(new Set(model.options).size,3);assert.ok(model.explanation.length>=120);assert.ok(!questions.has(model.question));questions.add(model.question);
 assert.ok(code.includes('minInteractions={2}')&&code.includes('minHeight:44')&&code.includes('seenRef.current[index]')&&code.includes('Illustrative model · not observed data'));
 const result=ts.transpileModule(code,{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022},reportDiagnostics:true});assert.deepEqual(result.diagnostics.filter(d=>d.category===ts.DiagnosticCategory.Error),[],row.slug);
}
const root='src/demos/life/';
const home=fs.readFileSync(root+'zoo-behavior-home-vector/Demo.tsx','utf8');assert.ok(home.includes('3 steps north and 4 steps east')&&home.includes('Southwest')&&home.includes('3 N')&&home.includes('4 E'));
const cue=fs.readFileSync(root+'zoo-behavior-electric-field-cue/Demo.tsx','utf8');assert.ok(cue.includes('not a measurement of detection range'));
console.log('12 metadata, option, state wiring, TSX syntax and selected scene consistency checks passed');
