import fs from 'node:fs';
import ts from 'typescript';
const m=JSON.parse(fs.readFileSync('company/reviews/zoology-fish-next/manifest.json','utf8'));
if(m.length!==8 || new Set(m.map(x=>x.slug)).size!==8 || new Set(m.map(x=>x.plan_id)).size!==8)throw Error('manifest count or uniqueness');
for(const x of m){
 const dir=`src/demos/life/${x.slug}`,meta=JSON.parse(fs.readFileSync(`${dir}/meta.json`,'utf8')),src=fs.readFileSync(`${dir}/Demo.tsx`,'utf8');
 const model=JSON.parse(src.match(/const model = ([\s\S]*?);\nexport default/)[1]);
 if(meta.slug!==x.slug || meta.status!=='draft' || meta.version!==1 || meta.concept!==x.slug)throw Error(`${x.slug}: metadata identity`);
 if(!meta.claims.every(c=>c.status==='unverified' && c.source) || Object.values(meta.evidence).some(a=>a.length))throw Error(`${x.slug}: evidence boundary`);
 if(model.options.length!==3 || model.answer<0 || model.answer>=3 || model.explanation.length<120)throw Error(`${x.slug}: prediction`);
 if(meta.recall.options.length!==3 || meta.recall.answer<0 || meta.recall.answer>=3 || meta.recall.question===model.question)throw Error(`${x.slug}: recall`);
 if(!src.includes('minInteractions={2}') || !src.includes('disabled={locked || seen[0]}') || !src.includes('disabled={locked || seen[1]}') || !src.includes('minHeight:44') || !src.includes('seenRef.current[n]'))throw Error(`${x.slug}: interaction wiring`);
 for(const piece of [model.base,model.one,model.two])if(/<script|onload|javascript:/i.test(piece))throw Error(`${x.slug}: unsafe SVG`);
 const result=ts.transpileModule(src,{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2020},reportDiagnostics:true});
 const errs=(result.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error);
 if(errs.length)throw Error(`${x.slug}: TSX parse ${errs.map(e=>e.messageText).join(', ')}`);
}
console.log(`Validated ${m.length} unique draft entries: schema, answer bounds, fresh recall, unverified status, two gated controls, 44px declarations, and TSX transpilation.`);
