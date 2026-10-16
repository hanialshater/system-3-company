#!/usr/bin/env node
// B4 finite teaching fixtures. These are local derivations, never independent learner review.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {register} from 'node:module';
register('../../../../tests/lifehacks/typescript-loader.mjs', import.meta.url);
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../../..');
const ids=['resource-subset-dp','string-indexing-automata','computational-geometry','number-theoretic-algorithms','numerical-linear-algebra'];
const modules=await Promise.all(ids.map(id=>import(pathToFileURL(path.join(root,'src/lib/algorithms/topics',id+'.ts')).href)));
const [D,S,G,N,L]=modules;
const specs=modules.flatMap(m=>Object.values(m).filter(x=>x?.slug&&x?.predict&&x?.cases));
assert.equal(specs.length,50);assert.equal(new Set(specs.map(s=>s.slug)).size,50);
const runs=Object.fromEntries(specs.map(s=>[s.slug.replace('algo-','').replaceAll('-','_'),s.cases[0].run()]));
const result=(id)=>runs[id].result;
const eq=(id,value)=>assert.deepEqual(result(id),value,id);
const near=(a,b,eps=1e-5)=>assert.ok(Math.abs(a-b)<=eps,`${a} ≈ ${b}`);
const subsets=a=>Array.from({length:1<<a.length},(_,mask)=>a.filter((_,i)=>mask>>i&1));
const sum=a=>a.reduce((x,y)=>x+y,0);
const perms=a=>a.length?a.flatMap((v,i)=>perms(a.filter((_,j)=>j!==i)).map(p=>[v,...p])):[[]];
// Resource/subset states: independent enumeration, not recurrence reruns.
const pack=(stock)=>Math.max(...Array.from({length:stock[0]+1},(_,a)=>Array.from({length:stock[1]+1},(_,b)=>[a,b])).flat().filter(([a,b])=>2*a+3*b<=7).map(([a,b])=>3*a+5*b));
eq('unbounded_knapsack',Math.max(...[0,1,2,3].flatMap(a=>[0,1,2].filter(b=>2*a+3*b<=6).map(b=>3*a+4*b))));
eq('bounded_knapsack',pack([2,1]));
assert.ok(subsets([2,3,7]).some(a=>a.join('+')===result('subset_sum_witness')&&sum(a)===9));
eq('equal_partition',subsets([1,5,11,5]).some(a=>sum(a)===11));
const distances=[[0,2,4,3],[2,0,1,5],[4,1,0,2],[3,5,2,0]];
eq('held_karp',Math.min(...perms([1,2,3]).map(p=>sum([0,...p].map((v,i)=>distances[v][[...p,0][i]])))));
const costs=[[4,1,3],[2,0,5],[3,2,2]];
eq('assignment_bitmask',Math.min(...perms([0,1,2]).map(p=>sum(p.map((j,i)=>costs[i][j])))));
eq('digit_dp',Array.from({length:36},(_,n)=>n).filter(n=>sum(String(n).split('').map(Number))%3===0).length);
function tile(mask=0){if(mask===255)return 1;let i=0;while(mask>>i&1)i++;let ways=0;if(i%4<3&&!(mask>>(i+1)&1))ways+=tile(mask|1<<i|1<<(i+1));if(i<4&&!(mask>>(i+4)&1))ways+=tile(mask|1<<i|1<<(i+4));return ways;}
eq('profile_domino',tile());
eq('tree_independent_set',Math.max(...[0,1,2,3,4,5,6,7].filter(m=>!(m&1&&m&2)&&!(m&2&&m&4)).map(m=>sum([4,7,4].filter((_,i)=>m>>i&1)))));
eq('resource_constrained_path',Math.min(...[[2,5],[4,3]].filter(([,fuel])=>fuel<=3).map(([c])=>c)));
// Strings: all substrings, all starts, direct prefix comparisons and end-position classes.
const substrings=s=>new Set(Array.from({length:s.length},(_,i)=>Array.from({length:s.length-i},(_,k)=>s.slice(i,i+k+1))).flat());
const naiveZ=s=>Array.from({length:s.length},(_,i)=>{if(!i)return 0;let n=0;while(i+n<s.length&&s[n]===s[i+n])n++;return n;});
eq('z_function',naiveZ('aabcaabxaaaz').join(','));
const matches=(patterns,text)=>patterns.flatMap(p=>Array.from({length:text.length},(_,i)=>i).filter(i=>text.startsWith(p,i)).map(i=>`${p}@${i}`)).sort();
assert.deepEqual(String(result('aho_failure')).split(',').sort(),matches(['he','she','his','hers'],'ushers'));
assert.deepEqual(String(result('aho_output_links')).split(',').sort(),matches(['a','ba','aba'],'aba'));
eq('suffix_array',[...Array(6).keys()].filter(i=>'banana'.startsWith('ana',i)).join(','));
eq('lcp_distinct_substrings',substrings('ababa').size);
const suffixes=[...Array(6).keys()].sort((a,b)=>'banana'.slice(a)<'banana'.slice(b)?-1:1);
eq('kasai_lcp',suffixes.map((v,i)=>{if(!i)return 0;let n=0;while('banana'[v+n]&&'banana'[v+n]==='banana'[suffixes[i-1]+n])n++;return n;}).join(','));
const classes=new Set([...substrings('abcbc')].map(p=>[...Array(5).keys()].filter(i=>'abcbc'.slice(0,i+1).endsWith(p)).join(',')));
const [states,clones,distinct]=String(result('suffix_automaton')).split('/').map(Number);
assert.equal(states,classes.size+1);assert.equal(clones,states-6);assert.equal(distinct,substrings('abcbc').size);
eq('manacher_radius',Math.max(...[...substrings('abacaba')].filter(p=>p.length%2&&p===[...p].reverse().join('')).map(p=>p.length)));
eq('booth_rotation',[...Array(10).keys()].map(i=>'bbaaccaadd'.slice(i)+'bbaaccaadd'.slice(0,i)).sort()[0]);
// Direct edit scripts: substitute a->u; insert r after ca. Dog needs three substitutions.
eq('levenshtein_automaton','accept,accept');assert.ok(runs.levenshtein_automaton.proof.includes('Distance=[1,1]'));
// Geometry: exact integer certificates and pair enumeration.
eq('segment_orientation','1,0,-1');assert.deepEqual([[1,2],[2,1],[3,0]].map(([x,y])=>Math.sign(4*y-2*x)),[1,0,-1]);
eq('segment_intersection',Math.max(0,2)<=Math.min(4,6));
eq('sweep_active_segments',true); // x=2,y=2 lies on both 0 and 1.
const cloud=[[0,0],[0,5],[2,2],[3,2],[5,0],[5,5]];
const distances2=p=>p.flatMap((a,i)=>p.slice(i+1).map(b=>(a[0]-b[0])**2+(a[1]-b[1])**2));
eq('closest_pair_strip',Math.sqrt(Math.min(...distances2(cloud))));
const rects=[[0,0,3,2],[1,1,4,3],[2,0,5,2]];
eq('rectangle_union_sweep',Array.from({length:5},(_,x)=>Array.from({length:3},(_,y)=>Number(rects.some(([a,b,c,d])=>a<=x&&x<c&&b<=y&&y<d)))).flat().reduce((a,b)=>a+b,0));
// Independent clipped polygon vertices: [0,1],[0,2],[1,3],[3,3],[3,1].
eq('sutherland_hodgman',5);
assert.deepEqual(String(result('liang_barsky')).split(',').map(Number),[Number((2/7).toFixed(4)),Number((2/3).toFixed(4))]);
const pentagon=[[0,0],[4,0],[4,4],[2,2],[0,4]],triangles=String(result('ear_clipping')).split(',').map(t=>[...t].map(Number));
const area=t=>Math.abs((pentagon[t[1]][0]-pentagon[t[0]][0])*(pentagon[t[2]][1]-pentagon[t[0]][1])-(pentagon[t[1]][1]-pentagon[t[0]][1])*(pentagon[t[2]][0]-pentagon[t[0]][0]))/2;
assert.equal(triangles.length,pentagon.length-2);assert.equal(sum(triangles.map(area)),12);
eq('rotating_calipers',Math.max(...distances2([[0,0],[4,0],[5,2],[3,4],[0,3]])));
const points=[[1,1],[2,5],[4,2],[6,6],[8,3]],query=[5,3];
eq('kd_nearest_pruning',points.map((p,i)=>({i,d:(p[0]-query[0])**2+(p[1]-query[1])**2})).sort((a,b)=>a.d-b.d)[0].i);
// Number theory: verify certificates directly; trial division checks sieve outputs.
const [x,y]=String(result('linear_diophantine')).split(',').map(Number);assert.equal(6*x+10*y,14);
const crt=Number(String(result('generalized_crt')).split(' ')[0]);assert.equal(crt%6,2);assert.equal(crt%9,5);assert.equal(crt,14);
assert.equal(Number(result('garner_reconstruction'))%3,2);assert.equal(Number(result('garner_reconstruction'))%5,3);assert.equal(Number(result('garner_reconstruction'))%7,2);
assert.equal(String(result('pollard_rho_factor')).split('×').map(Number).reduce((a,b)=>a*b),91);
const trialGcd=(a,b)=>[...Array(Math.min(a,b)).keys()].map(i=>i+1).filter(d=>a%d===0&&b%d===0).at(-1);
eq('pollard_p_minus_one',trialGcd(2**12-1,91));assert.equal(N.pMinus(91,6).result,7);
const prime=n=>n>=2&&Array.from({length:Math.max(0,Math.floor(Math.sqrt(n))-1)},(_,i)=>i+2).every(d=>n%d!==0);
const primes=(lo,hi)=>Array.from({length:hi-lo+1},(_,i)=>lo+i).filter(prime);
eq('segmented_sieve',primes(30,50).join(','));eq('linear_sieve',`${primes(2,20).join(',')}/${19-primes(2,20).length}`);
eq('wheel_sieve',Array.from({length:60},(_,i)=>i+1).filter(n=>n%2&&n%3).length);
assert.equal(Number(result('tonelli_shanks'))**2%13,10);
eq('baby_step_giant_step',Array.from({length:12},(_,i)=>i).find(i=>Number(2n**BigInt(i)%13n)===5));
// Linear algebra: multiply the proposed factors/solutions; numerical bounds from exact integrals.
const multiply=(a,x)=>a.map(r=>sum(r.map((v,i)=>v*x[i])));
assert.deepEqual(multiply([[0,2],[1,3]],String(result('gaussian_pivot')).split(',').map(Number)),[4,7]);
const solutions=String(result('lu_reuse')).split('|').map(s=>s.split(',').map(Number));
assert.deepEqual(solutions.map(x=>multiply([[2,1],[4,3]],x)),[[5,11],[1,1]]);
const q=String(result('qr_orthogonalize')).split(',').map(Number);near(q[0]+q[1],0);near(sum(q.map(x=>x*x)),1);
const chol=String(result('cholesky_positive')).split('|').map(s=>s.split(',').map(Number));near(chol[0][0]**2,4);near(chol[1][0]*chol[0][0],2);near(sum(chol[1].map(x=>x*x)),3,2e-5);assert.equal(L.cholesky([[1,2],[2,1]]).result,'reject');
const [lo,hi]=String(result('bisection_root')).split(',').map(Number);assert.ok(lo*lo<=2&&hi*hi>=2);assert.equal(hi-lo,1/16);
near(Number(result('secant_root')),Math.sqrt(2));assert.ok(runs.secant_root.proof.includes('First=1.33333'));
near(Number(result('fixed_point_contraction')),0.76396);assert.ok(runs.fixed_point_contraction.proof.includes('shrinking'));assert.ok(L.fixed(false).proof.includes('growing'));
near(Number(result('adaptive_simpson')),1/5);near(Number(L.simpson(8).result),1/9,.001);
eq('kahan_summation',Number(10000000000000000n+1n+1n-10000000000000000n));
near(Number(result('stable_quadratic')),-1e-8,1e-20);near(1e8*Number(result('stable_quadratic'))+1,0,1e-12);
// All owned traces have bounded observable state, distinct transfer recall, and truthful draft ledgers.
const report=[];
for(const spec of specs){
 const m=modules.find(m=>m[spec.slug.replace('algo-','').replaceAll('-','_')]===spec),details=m.lessonDetails[spec.slug];
 assert.notEqual(details.recall.question,spec.predict.question);assert.ok(details.recall.why&&details.mechanism&&details.hook);
 for(const c of spec.cases){const run=c.run();assert.deepEqual(run,c.run());assert.ok(run.frames.length>=2&&run.frames.length<=64);assert.notDeepEqual(run.frames[0],run.frames.at(-1));}
 const meta=JSON.parse(fs.readFileSync(path.join(root,'src/demos/cs',spec.slug,'meta.json'),'utf8'));assert.equal(meta.status,'draft');assert.ok(meta.claims.every(c=>c.status==='unverified'));
 report.push({slug:spec.slug,input:spec.predict.question,checkedAnswer:spec.predict.options[spec.predict.answer],computedResult:spec.cases[0].run().result,proof:spec.cases[0].run().proof,cases:spec.cases.length,frames:spec.cases.map(c=>c.run().frames.length),status:'local-finite-fixture-checked'});
}
console.log(JSON.stringify({batch:'B4',checks:'50 question fixtures; subset/permutation/string/geometry/certificate/numerical oracles; all model cases deterministic and bounded',lessons:report},null,2));
