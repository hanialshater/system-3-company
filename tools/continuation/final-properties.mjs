import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
let checks=0;const seen=new Map(),counts={behavioral:0,probability:0};
const initial=JSON.parse(fs.readFileSync('company/reviews/behavioral-probability-200/manifest.json'));
const manifests=[initial,...['02','03','04','05','06','07','08'].map(x=>JSON.parse(fs.readFileSync(`company/reviews/continuation-batch-${x}/manifest.json`)))];
for(const m of manifests)for(const r of m.entries){
 const key=`${r.domain}:${r.sourceEntryId}`;assert(!seen.has(key));seen.set(key,r.slug);counts[r.domain]++;
 const root=`src/demos/${r.domain}/${r.slug}`,meta=JSON.parse(fs.readFileSync(`${root}/meta.json`));
 assert.equal(meta.status,'draft');assert(meta.claims.every(c=>c.status==='unverified'));assert(Object.values(meta.evidence).every(v=>v.length===0));checks+=4;
 if(r.slug.includes('-source-')){
  const {curation:c}=await import(`../../${root}/spec.ts`),{compute}=await import(`../../${root}/model.ts`),p=meta.provenance.recallInputs;
  assert(p);assert.notDeepEqual(p,c.a);assert.notDeepEqual(p,c.b);assert(Number.isFinite(compute(p)[0]));checks+=4;
  assert.equal(meta.version,r.version);checks++;
  assert.equal(r.specSha256,createHash('sha256').update(fs.readFileSync(`${root}/spec.ts`)).update(fs.readFileSync(`${root}/model.ts`)).digest('hex'));checks++;
 }
}
assert.deepEqual(counts,{behavioral:500,probability:1000});
for(const [domain,n] of Object.entries(counts))for(let id=1;id<=n;id++)assert(seen.has(`${domain}:${id}`));
const load=async id=>(await import(`../../src/demos/probability/cp-source-${String(id).padStart(4,'0')}/model.ts`)).compute;
const near=(a,b)=>{assert(Math.abs(a-b)<1e-9*Math.max(1,Math.abs(b)),`${a} != ${b}`);checks++;};
const less=(a,b)=>{assert(a<b);checks++;};
let f=await load(903);near(f([1,1,3,0])[0],f([10,1,30,0])[0]);
f=await load(921);let v=f([.99,.01,.4,.1,.1]);near(v.reduce((a,b)=>a+b),1);less(.01,v[0]);
f=await load(923);near(f([1])[0],0);near(f([3])[0],2/3);
f=await load(936);near(f([1])[0],1);less(f([.14])[0],f([.07])[0]);
f=await load(941);near(f([0,3,.4])[0],1.4);near(f([0,3,.4])[1],0);
f=await load(942);near(f([10,0])[0],0);near(f([1,.25])[0],4/Math.PI);
f=await load(945);near(f([20,30])[0],-10);near(f([50,30])[0],-10);
f=await load(950);near(f([0,.5])[0],1);less(f([3,.5])[0],f([1,.5])[0]);
f=await load(954);near(f([0,2,3])[0],9/4);less(f([1,2,3])[0],9/4);
f=await load(955);near(f([1,0,0])[0],1);near(f([1,0,.4])[0],1);
f=await load(957);near(f([20,0])[0],1);near(f([1000,1])[0],Math.cos(1/Math.sqrt(1000))**1000);
f=await load(964);less(f([1,1.3,10])[0],f([.1,1.3,10])[0]);
f=await load(979);near(f([3,1])[0],0);near(f([0,1])[0],1/Math.PI);
f=await load(981);near(f([.1,.2])[0],.08);
f=await load(982);near(f([100,100,0,.2,0])[0],0);near(f([120,100,0,0,1])[0],20);less(f([100,100,.03,.2,1])[0],f([100,100,.03,.5,1])[0]);
// A fixed closed-form benchmark at S=K=100,r=0,sigma=.2,T=1.
near(f([100,100,0,.2,1])[0],7.965567455405804);
f=await load(983);near(f([80,120,100,.5,1])[0],10);near(f([60,140,100,.5,1])[0],20);
f=await load(985);near(f([0,1,1])[1],2);near(f([0,1,4])[1],8);less(f([0,1,4])[0],f([0,1,1])[0]);
f=await load(991);near(f([1000,2,2])[0],500);near(f([1000,2,4])[0],250);
f=await load(992);near(f([0,1])[0],0);
f=await load(998);near(f([2,1000])[0],2000);near(f([10,1000])[0],2000/45);
f=await load(1000);const a=f([1,1,10,0]),b=f([1,1,10,1000]);near(a[0],b[0]);less(a[1],b[1]);
const report={date:'2026-10-26',counts,total:seen.size,checks,uniqueContiguousSourceIds:true,allDraftAndUnverified:true,curatedRecallCases:1300,scope:'Implementation coverage, arithmetic, recorded recall inputs and source hashes; not empirical or learner verification.'};
fs.writeFileSync('company/reviews/continuation-batch-08/final-coverage.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
