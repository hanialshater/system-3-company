import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {validateSpec,advance,initialState,formatNumber} from '../../src/lib/mini-lab/model.ts';
const batch=process.argv[2], dir=`company/reviews/continuation-${batch}`;
const curationPath=process.argv[3]??'tools/continuation/behavioral-2.tsv';
const records=JSON.parse(fs.readFileSync(`${dir}/curation.json`));
const fixtures=JSON.parse(fs.readFileSync(`${dir}/fixtures.json`));
const curricula={}, failures=[], manifest=[];
let assertions=0;
const probabilityNames=new Set(['Prior','P','Probability','Weight','Sensitivity','FalsePositive','Share','Uptake','Fraction','Return','Inertia','Accept','Returned','Catch','Delta','Claimed','Nominal','First','Conditional','RateA','RateB','ActionRisk','InactionRisk']);
for(let i=0;i<records.length;i++){
 const r=records[i], fixture=fixtures[i], folder=`src/demos/${r.domain}/${r.slug}`;
 try {
  const {spec,curation:c}=await import(pathToFileURL(path.resolve(`${folder}/spec.ts`)));
  const {compute}=await import(pathToFileURL(path.resolve(`${folder}/model.ts`)));
  validateSpec(spec);assertions++;
  for(const [p,want] of [[fixture.a,fixture.expectedA],[fixture.b,fixture.expectedB]]){
   const actual=compute(p);assert.equal(actual.length,want.length);
   for(let k=0;k<actual.length;k++) {assert(Math.abs(actual[k]-want[k])<=1e-9*Math.max(1,Math.abs(want[k])),`${r.slug}: independent arithmetic ${k}`);assertions++;}
  }
  let state=advance(spec,initialState(),'run');state=advance(spec,state,'compare');const seen=[...state.witnessed];state=advance(spec,state,'reset');assert.deepEqual(state.witnessed,seen);assert(seen.every(Boolean));assertions++;
  let recallP=null,recallValue;
  for(let j=0;j<c.a.length;j++){
   const p=[...c.a];p[j]=probabilityNames.has(c.labels[j])&&p[j]>=0&&p[j]<=1?p[j]*.8:(Number.isInteger(p[j])?p[j]+1:p[j]+.1);
   try {const v=compute(p)[0];if(Number.isFinite(v)&&formatNumber(v)!==formatNumber(compute(c.a)[0])) {recallP=p;recallValue=v;break;}}catch{}
  }
  assert(recallP,`${r.slug}: no transfer case`);
  const template=c.questionTemplate??c.question;
  const recallQuestion=template.replace(/\{(\w+)\}/g,(_,name)=>formatNumber(recallP[c.labels.indexOf(name)]));
  const position=(r.sourceEntryId+1)%3, delta=Math.max(Math.abs(recallValue)*.4,.1), options=[formatNumber(recallValue-delta),formatNumber(recallValue+delta)];options.splice(position,0,formatNumber(recallValue));
  const modelSource=`${folder}/model.ts; finite explicit model from ${curationPath}; source idea ${r.sourceFile} #${r.sourceEntryId}. Empirical source remains unverified.`;
  const claims=[];const add=(key,text,support='derivation')=>claims.push({id:`${r.domain}.${r.slug}.${key}`,text,support,source:modelSource,status:'unverified'});
  add('predict',spec.predict.question);add('setup',spec.setup,'convention');spec.reveal.forEach((t,k)=>add(`reveal.${k}`,t));
  for(let j=0;j<spec.scenarios.length;j++){
   const s=spec.scenarios[j];add(`case.${j}.witness`,s.summary);
   s.frames.forEach((f,k)=>add(`case.${j}.frame.${k}`,JSON.stringify(f)));
  }
  add('recall',recallQuestion+' Answer '+formatNumber(recallValue)+'.');
  const meta={slug:r.slug,title:r.title,hook:`Two stated cases: explore ${r.lens}.`,domain:r.domain,concept:r.slug,status:'draft',durationSec:60,
   owner:{categoryManager:`cm-${r.domain}`,builder:'demo-builder'},
   learner:{knows:['Reading the stated arithmetic assumptions and a small numerical chart'],doesNotKnow:[`How ${r.lens} affects the stated comparison`]},
   misconception:`The headline alone determines ${c.outputs[0]}, regardless of the stated inputs.`,
   objective:`Compare ${r.lens} in two explicit finite cases; separate model arithmetic from an empirical population claim.`,
   keyState:'Both question and changed cases computed; both parameter/result witnesses retained.',claims,confidence:'',
   recall:{question:recallQuestion,options,answer:position,why:`The same explicit rule gives ${c.outputs[0]} ${formatNumber(recallValue)} for the changed inputs. This is a new numerical case.`},
   evidence:{qa:[],simulatedLearner:[],pairwise:[],humanLearners:[]},version:1,
   curriculum:{primary:`${r.domain}:${r.slug}`,also:[],prerequisites:[],level:'core',references:[],tags:['source-list-continuation',batch,`source-${r.sourceEntryId}`]},format:'single-card',interactions:['choice-before-reveal','computed-case-comparison'],
   provenance:{sourceFile:r.sourceFile,sourceEntryId:r.sourceEntryId,sourceSection:r.sourceSection,sourceEntryOriginal:r.sourceText,modelBoundary:r.lens,sourceVerification:'unverified; not a replication',overlapBoundary:'Source-specific finite model; cross-category publication review remains open.'}};
  assert(meta.title.length<=40,`${r.slug}: title budget`);
  if(meta.hook.length>90) meta.hook=`Two stated cases for ${meta.title.toLowerCase().replace(/\?$/,'')}.`;
  assert(meta.hook.length<=90);
  fs.writeFileSync(`${folder}/meta.json`,JSON.stringify(meta,null,2)+'\n');
  const cur=curricula[r.domain]??=JSON.parse(fs.readFileSync(`content/curriculum/${r.domain}.json`));
  if(!cur.concepts.some(x=>x.id===r.slug))cur.concepts.push({id:r.slug,title:r.title,level:'core',demand:1,prerequisites:[],tags:['source-list-continuation',batch],sourceEntryId:r.sourceEntryId,sourceSection:r.sourceSection,publicationBoundary:'Open; draft numerical illustration, no novelty/source/learner approval.'});
  manifest.push({...r,version:1,status:'draft',claims:claims.length,visualKinds:[...new Set(spec.scenarios.flatMap(s=>s.frames.map(f=>f.visual.kind)))],specSha256:createHash('sha256').update(fs.readFileSync(`${folder}/spec.ts`)).update(fs.readFileSync(`${folder}/model.ts`)).digest('hex')});
 } catch(e){failures.push(`${r.slug}: ${e.stack}`);}
}
if(failures.length){fs.writeFileSync(`/tmp/${batch}-failures.txt`,failures.join('\n\n'));console.error(failures.map(x=>x.split('\n')[0]).join('\n'));process.exit(1);}
for(const [d,c] of Object.entries(curricula))fs.writeFileSync(`content/curriculum/${d}.json`,JSON.stringify(c,null,2)+'\n');
fs.writeFileSync(`${dir}/manifest.json`,JSON.stringify({batch,count:manifest.length,assertions,entries:manifest},null,2)+'\n');
console.log(`${batch}: ${manifest.length} curated drafts; ${assertions} independent arithmetic/schema/state assertions pass.`);
