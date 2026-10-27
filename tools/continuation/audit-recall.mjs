import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {formatNumber as f,validateSpec} from '../../src/lib/mini-lab/model.ts';
const names=new Set(['Prior','P','Probability','Weight','Sensitivity','FalsePositive','Share','Uptake','Fraction','Return','Inertia','Accept','Returned','Catch','Delta','Claimed','Nominal','First','Conditional','RateA','RateB','ActionRisk','InactionRisk']);
const changes=[];let total=0,changed=0;
for(const batch of ['02','03','04']){
 const file=`company/reviews/continuation-batch-${batch}/manifest.json`,m=JSON.parse(fs.readFileSync(file));
 for(const r of m.entries){
  const folder=`src/demos/${r.domain}/${r.slug}`,{curation:c,spec}=await import(`../../${folder}/spec.ts`),{compute}=await import(`../../${folder}/model.ts`);
  validateSpec(spec);
  const path=`${folder}/meta.json`,meta=JSON.parse(fs.readFileSync(path));
  let p=c.recall??null;
  for(const offset of [1,2,3,5,10])for(let j=0;!p&&j<c.a.length;j++){
   const q=[...c.a];q[j]=names.has(c.labels[j])&&q[j]>=0&&q[j]<=1?q[j]*Math.pow(.8,offset):(Number.isInteger(q[j])?q[j]+offset:q[j]+.1*offset);
   if(q.every((v,k)=>v===c.a[k])||q.every((v,k)=>v===c.b[k]))continue;
   try{const v=compute(q)[0];if(Number.isFinite(v)&&f(v)!==f(compute(c.a)[0]))p=q;}catch{}
  }
  assert(p,`${r.slug} has a new case`);assert.notDeepEqual(p,c.a);assert.notDeepEqual(p,c.b);
  const value=compute(p)[0],question=(c.questionTemplate??c.question).replace(/\{(\w+)\}/g,(_,name)=>f(p[c.labels.indexOf(name)]));
  const position=(r.sourceEntryId+1)%3,delta=Math.max(Math.abs(value)*.4,.1),options=[f(value-delta),f(value+delta)];options.splice(position,0,f(value));
  const recallOptions=c.binary?['0: no / blocked','1: yes / active']:options,answer=c.binary?(value===0?0:1):position;
  assert.equal(new Set(recallOptions).size,recallOptions.length);
  const recallChanged=meta.recall.question!==question||JSON.stringify(meta.recall.options)!==JSON.stringify(recallOptions)||meta.recall.answer!==answer;
  const labelChanged=r.slug==='cp-source-0189'&&meta.claims.some(x=>x.text.includes('RenormalizedFirst'));
  const before=meta.version;
  if(recallChanged){
   meta.recall={question,options:recallOptions,answer,why:`The same explicit rule gives ${c.outputs[0]} ${f(value)} for the changed inputs. This is a new numerical case.`};
   const claim=meta.claims.find(x=>x.id.endsWith('.recall'));assert(claim);claim.text=question+' Answer '+f(value)+'.';claim.status='unverified';
  }
  if(labelChanged)for(const claim of meta.claims)claim.text=claim.text.replaceAll('RenormalizedFirst','FirstProb');
  if(recallChanged||labelChanged){meta.version++;changed++;changes.push({slug:r.slug,batch,recallChanged,labelChanged,fromVersion:before,toVersion:meta.version});}
  meta.provenance.recallInputs=p;
  assert.equal(meta.status,'draft');assert(meta.claims.every(x=>x.status==='unverified'));assert(Object.values(meta.evidence).every(x=>x.length===0));
  fs.writeFileSync(path,JSON.stringify(meta,null,2)+'\n');
  r.version=meta.version;r.specSha256=createHash('sha256').update(fs.readFileSync(`${folder}/spec.ts`)).update(fs.readFileSync(`${folder}/model.ts`)).digest('hex');total++;
 }
 fs.writeFileSync(file,JSON.stringify(m,null,2)+'\n');
}
const report={date:'2026-10-26',total,changed,checks:'All 600 prior continuation recalls use finite inputs distinct from both displayed cases, with unique answer choices. Learner-facing revisions increment version. Source and learner approval remain open.',changes};
fs.writeFileSync('company/reviews/continuation-batch-08/prior-recall-audit.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({total,changed}));
