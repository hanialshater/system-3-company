#!/usr/bin/env node
// B5 finite-fixture oracles. These are builder derivations, never independent quality approval.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {register} from 'node:module';
import {fileURLToPath,pathToFileURL} from 'node:url';
register('../../../../tests/lifehacks/typescript-loader.mjs',import.meta.url);
const root=fileURLToPath(new URL('../../../../',import.meta.url));
const topicIds=['randomized-streaming','compression-coding-parsing','combinatorial-game-search','approximation-online','transforms-convolution-bitsets'];
const [stream,code,search,online,transform]=await Promise.all(topicIds.map(t=>import(pathToFileURL(path.join(root,`src/lib/algorithms/topics/${t}.ts`)))));
const {validateAlgorithmSpec}=await import(pathToFileURL(path.join(root,'tools/algorithms-200-check.mjs')));
const manifestPath=process.argv.find(x=>x.startsWith('--manifest='))?.slice(11)??path.join(root,'company/domains/briefs/algorithms-200.json');
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
const lessons=manifest.lessons.filter(l=>topicIds.includes(l.topicId));
const specs=[stream,code,search,online,transform].flatMap(m=>m.specs);
let checks=0;const eq=(a,b)=>{assert.deepEqual(a,b);checks++;};const ok=x=>{assert(x);checks++;};
const row=(run,label,index=-1)=>{const found=run.frames.at(index).rows?.find(r=>r.label===label);assert(found,`Missing ${label}`);return found.cells.map(c=>c.text);};
const nums=(run,label,index=-1)=>row(run,label,index).map(Number);
const sum=a=>a.reduce((s,x)=>s+x,0);
const permutations=a=>a.length?a.flatMap((x,i)=>permutations(a.filter((_,j)=>j!==i)).map(p=>[x,...p])):[[]];
// Cancellation certificate: remove disjoint triples ABC and ABD from ABACABDAB.
const streamItems=[...'ABACABDAB'];for(const triple of ['ABC','ABD'])for(const x of triple)streamItems.splice(streamItems.indexOf(x),1);
eq([...new Set(streamItems)].sort().join(','),stream.misra(3).result);eq(stream.misra(2).result,'B');
const counts=Object.fromEntries([...new Set('ABACABDAB')].map(x=>[x,[...'ABACABDAB'].filter(v=>v===x).length]));
for(const [x,n]of Object.entries(counts))if(n>9/3)ok(stream.misra(3).result.split(',').includes(x));
for(const k of [2,3]){const r=stream.space(k),keys=row(r,'keys'),est=nums(r,'estimate'),err=nums(r,'error');for(const [i,x]of keys.entries()){const actual=[...'ABACCDC'].filter(v=>v===x).length;ok(est[i]-err[i]<=actual&&actual<=est[i]);}eq(r.result,k===2?4:3);}
// Exact per-hash certificates: bucket/rank pairs (0,1),(1,2),(2,2); right (0,1),(3,3).
eq(stream.mergeHll().result,[1,2,2,3].join(','));eq(stream.mergeHll(true).result,[1,2,2,1].join(','));
for(const duplicate of [false,true]){const r=stream.kmv(duplicate);eq(r.result,2/.4);eq(nums(r,'kept'),[.1,.2,.4]);eq(nums(r,'draws'),[duplicate?8:6]);}
for(const u of [[.5,.5,.5],[.1,.8,.4]]){const priority=u.map((v,i)=>v**(1/[1,2,4][i]));eq(stream.weighted(u).result,priority.indexOf(Math.max(...priority))+1);}
const aliasRun=stream.alias([0,.75]),thresholds=nums(aliasRun,'threshold'),aliases=nums(aliasRun,'alias'),mass=[0,0,0,0];for(let c=0;c<4;c++){mass[c]+=thresholds[c]/4;mass[aliases[c]]+=(1-thresholds[c])/4;}eq(mass,[1/8,1/8,2/8,4/8]);eq(aliasRun.result,3);eq(stream.alias([0,.25]).result,0);
for(const eps of [.25,.125]){const r=stream.gk(eps);eq(r.result,eps===.25?4:5);for(let n=1;n<r.frames.length;n++){const v=nums(r,'v',n),g=nums(r,'g',n),d=nums(r,'Δ',n),prefix=[8,1,6,2,7,3,5,4].slice(0,n).sort((a,b)=>a-b);eq(sum(g),n);let rankMin=0;v.forEach((x,i)=>{rankMin+=g[i];const exact=prefix.indexOf(x)+1;ok(rankMin<=exact&&exact<=rankMin+d[i]);ok(g[i]+d[i]<=Math.max(1,Math.floor(2*eps*n)));});}}
for(const parity of [0,1]){const r=stream.kll(parity);eq(r.result,(parity?[2,4,6,8]:[1,3,5,7]).join(','));eq(sum(nums(r,'weight')),8);}
const jaccard=(a,b)=>a.filter(x=>b.includes(x)).length/new Set([...a,...b]).size;eq(stream.minhash().result,jaccard(['A','B','C'],['B','C','D']));eq(stream.minhash(true).result,1);
const product=[[1*2+2*1,1*0+2*3],[0*2+1*1,0*0+1*3]];eq(product,[[4,6],[1,3]]);eq(stream.freivaldsRun().result,2);eq(stream.freivaldsRun(true).result,4);
// Arithmetic intervals checked by summing probabilities of every lexicographically preceding message.
function fixedMessages(n){if(!n)return[''];return fixedMessages(n-1).flatMap(p=>['A','B','C'].map(c=>p+c));}
const probability=s=>[...s].reduce((p,c)=>p*({A:.5,B:.25,C:.25}[c]),1);
for(const text of ['ABA','AAC']){const lo=sum(fixedMessages(text.length).filter(s=>s<text).map(probability)),hi=lo+probability(text);eq(code.arithmetic(text).result,`[${lo},${hi})`);}
function decodeLzw(codes){const dictionary=['A','B'];let w=dictionary[codes[0]],out=w;for(const i of codes.slice(1)){const s=dictionary[i]??w+w[0];out+=s;dictionary.push(w+s[0]);w=s;}return out;}
for(const text of ['ABABABA','ABBAAB'])eq(decodeLzw(code.lzw(text).result.split(',').map(Number)),text);
eq(code.lzw('ABABABA').result,'0,1,2,4');
for(const text of ['BANANA$','ABABA$']){const r=code.bwt(text),restored=r.result;eq(restored,text);const rotations=Array.from({length:restored.length},(_,i)=>restored.slice(i)+restored.slice(0,i)).sort();eq(rotations.map(s=>s.at(-1)).join(''),row(r,'L',0)[0]);}
function unMtf(indices){const list=['A','B','C','D'];return indices.map(i=>{const [c]=list.splice(i,1);list.unshift(c);return c;}).join('');}
for(const text of ['ABACAB','DDDD'])eq(unMtf(code.mtf(text).result.split(',').map(Number)),text);
for(const lengths of [[1,2,3,3],[2,2,2,2]]){const r=code.canonical(lengths),codes=row(r,'codes').map(x=>x.split(':')[1]);eq(codes.map(x=>x.length),lengths);eq(sum(lengths.map(l=>2**(-l))),1);for(let i=0;i<4;i++)for(let j=0;j<4;j++)if(i!==j)ok(!codes[j].startsWith(codes[i]));eq(r.result,lengths[0]===1?'111':'11');}
function postfixValue(text){const stack=[];for(const c of text){if(/\d/.test(c))stack.push(Number(c));else{const b=stack.pop(),a=stack.pop();stack.push(c==='+'?a+b:c==='-'?a-b:c==='*'?a*b:c==='/'?a/b:a**b);}}eq(stack.length,1);return stack[0];}
for(const [expression,value]of [['3+4*2',3+4*2],['8-3-2',(8-3)-2],['2^3^2',2**(3**2)]])eq(postfixValue(code.shunt(expression).result),value);
for(const input of ['abb','a'])eq(code.ll(input).result,/^ab*$/.test(input));eq(code.ll('a',true).result,'conflict');
for(const input of ['n+n','n+'])eq(code.lr(input).result,/^n(?:\+n)*$/.test(input));
for(const input of ['ab','aa'])eq(code.cyk(input).result,['ab','ba'].includes(input));
eq(code.pratt('2^3^2').result,2**(3**2));eq(code.pratt('8-3-2').result,(8-3)-2);
// Search certificates: exhaustive subsets, full minimax and breadth-first distances.
const knapsackItems=[[4,8],[3,5],[2,3]];
function bruteKnapsack(items,capacity,valueIndex=1){let best=0;for(let mask=0;mask<1<<items.length;mask++){let w=0,v=0;items.forEach((x,i)=>{if(mask&(1<<i)){w+=x[0];v+=x[valueIndex];}});if(w<=capacity)best=Math.max(best,v);}return best;}
for(const incumbent of [0,13]){const r=search.branch(incumbent);eq(r.result,bruteKnapsack(knapsackItems,7));for(const fr of r.frames){const state=fr.rows.find(r=>r.label==='state')?.cells.map(c=>Number(c.text)),bound=fr.rows.find(r=>r.label==='bound,best')?.cells.map(c=>Number(c.text));if(state&&bound){const [i,w,v]=state;ok(bound[0]+1e-9>=v+bruteKnapsack(knapsackItems.slice(i),7-w));}}}
for(const omitted of [false,true]){const r=search.cover(omitted),chosen=r.result.split('+');eq([...chosen.join('')].sort().join(''),'ABCD');ok(chosen.every(s=>['AB','BC','CD','AD','AC','BD'].includes(s)));if(omitted)ok(!chosen.includes('CD'));}
for(const nested of [false,true]){const r=search.links(nested);eq(r.result,true);eq(nums(r,'unlinks'),[nested?4:2]);const prior=r.frames.at(-2);eq(prior.rows.find(r=>r.label==='sizes').cells.map(c=>Number(c.text)),[2,2,2,2]);eq(prior.rows.find(r=>r.label==='headers').cells.map(c=>c.text),['0:4/1','1:0/2','2:1/3','3:2/4','4:3/0']);}
eq(Math.max(...[[3,5],[2,9],[4,6]].map(a=>Math.min(...a))),4);eq(search.ab().result,5);eq(search.ab(true).result,4);for(const reverse of [false,true])eq(nums(search.ab(reverse),'value'),[4]);
const adjacency={S:['A','B'],A:['C','D'],B:['G'],C:['E','F'],D:[],E:[],F:[],G:[]};function bfs(goal){const queue=[['S',0]];for(let i=0;i<queue.length;i++){const [v,d]=queue[i];if(v===goal)return d;queue.push(...adjacency[v].map(x=>[x,d+1]));}}
for(const goal of ['G','E'])eq(search.deepen(goal).result,bfs(goal));
eq(search.ida().result,'4,5');eq(search.ida(true).result,'0,2,3,5');for(const zero of [false,true])eq(nums(search.ida(zero),'cost'),[Math.min(2+5,3+2)]);
eq(search.transposition([0,2]).result,'cutoff');eq(search.transposition([4,6]).result,'exact:5');ok(3>=2);ok(3<6);eq(Math.max(5,2,4),5);
function csp(z){const solutions=[];for(const x of [1,2])for(const y of [1,2])if(x<y&&y<z)solutions.push([x,y,z]);return solutions;}
for(const z of [2,3])eq(search.ac3(z===3).result,csp(z).length>0);
const legalY=[1,2].filter(y=>y!==2),legalX=[1,2,3].filter(x=>legalY.some(y=>x!==y));eq(row(search.mrv(),'sizes'),[`Y:${legalY.length}`,`X:${legalX.length}`]);eq(search.mrv().result,'Y');eq(search.mrv(false).result,'Y');
for(const target of [24,23]){const witness=search.middle(target).result.split('+').map(Number);eq(sum(witness),target);ok(witness.every(x=>[2,5,8,11,13,17].includes(x)));eq(new Set(witness).size,witness.length);}
// Approximation bounds and exact finite optima are separate certificates.
for(const star of [false,true]){const r=online.vertex(star),edges=star?[[0,1],[0,2],[0,3],[0,4]]:[[0,1],[1,2],[2,3],[3,4]],cover=nums(r,'cover');ok(edges.every(([a,b])=>cover.includes(a)||cover.includes(b)));const [size,matching,opt]=nums(r,'size,matching,optimum');ok(size<=2*opt&&matching<=opt);eq(size,star?2:4);eq(opt,star?1:2);}
for(const cheap of [false,true]){const r=online.greedySet(cheap),selected=nums(r,'chosen'),sets=[[1,2,3],[3,4,5],[5,6],[1,2,4,6]],costs=[2,2,1,cheap?1:3];eq([...new Set(selected.flatMap(i=>sets[i]))].sort(),[1,2,3,4,5,6]);eq(r.result,sum(selected.map(i=>costs[i])));eq(selected,cheap?[3,1]:[2,0,1]);}
for(const width of [2,3]){const r=online.doubleTree(width),tour=nums(r,'tour'),points=[[0,0],[width,0],[width,2],[0,2]],length=sum(tour.slice(1).map((v,i)=>Math.hypot(points[v][0]-points[tour[i]][0],points[v][1]-points[tour[i]][1])));eq(r.result,length);eq(tour[0],tour.at(-1));eq(new Set(tour.slice(0,-1)).size,4);eq(length,2*width+4);ok(length<=2*nums(r,'MST')[0]);}
for(const scale of [3,1]){const items=[[3,11],[4,13],[2,6]].map(([w,v])=>[w,Math.floor(v/scale),v]),r=online.scaling(scale);eq(r.result,bruteKnapsack(items,7));eq(nums(r,'actual'),[24]);eq(nums(r,'weight'),[7]);}
eq(online.scheduling().result,5);eq(online.scheduling(true).result,4);eq(sum([2,2,3])/2,3.5);eq(Math.min(...Array.from({length:8},(_,mask)=>{let a=0,b=0;[2,2,3].forEach((v,i)=>mask&(1<<i)?a+=v:b+=v);return Math.max(a,b);})),4);
for(const buyDay of [4,5]){const costs=[3,4,5].map(d=>d<buyDay?d:buyDay-1+4),ratios=costs.map((c,i)=>c/Math.min([3,4,5][i],4));eq(online.ski(buyDay).result,Math.max(...ratios));}
eq(online.ranking().result,1);eq(online.ranking(true).result,2);
for(const eta of [.5,1]){const r=online.weights(eta),loss=[1,3];eq(r.result,Number(Math.exp(-eta*(loss[0]-loss[1])).toFixed(3)));eq(nums(r,'losses'),loss);}
// Independent position formula: best at j succeeds iff the prefix maximum before j was sampled.
for(const cutoff of [1,2]){let successes=0;for(const p of permutations([1,2,3,4])){const bestAt=p.indexOf(4);if(bestAt<cutoff)continue;const prefix=p.slice(0,bestAt),maxAt=prefix.indexOf(Math.max(...prefix));if(maxAt<cutoff)successes++;}eq(online.secretary(cutoff).result,successes);}
for(const reverse of [false,true]){const r=online.packing(reverse),loads=nums(r,'loads');eq(sum(loads),20);ok(loads.every(x=>x<=10));eq(r.result,reverse?2:3);eq(nums(r,'lower'),[2]);}
// Transform oracles use direct O(n²) definitions or explicit subset enumeration, not butterflies.
const tidy=x=>Math.abs(x)<1e-8?0:Number(x.toFixed(6));
const show=([a,b])=>!tidy(b)?String(tidy(a)):`${tidy(a)}${b>=0?'+':''}${tidy(b)}i`;
function dft(input,inverse=false,normalize=true){const n=input.length;return Array.from({length:n},(_,k)=>{let re=0,im=0;input.forEach(([a,b],j)=>{const t=(inverse?1:-1)*2*Math.PI*j*k/n;re+=a*Math.cos(t)-b*Math.sin(t);im+=a*Math.sin(t)+b*Math.cos(t);});return[tidy(re/(inverse&&normalize?n:1)),tidy(im/(inverse&&normalize?n:1))];});}
for(const impulse of [false,true]){const a=(impulse?[1,0,0,0]:[1,2,3,4]).map(v=>[v,0]);eq(transform.butterfly(impulse).result,dft(a).map(show).join(','));}
const spectrum=dft([[1,0],[2,0],[0,0],[0,0]]);for(const normalize of [true,false])eq(transform.inverse(normalize).result,dft(spectrum,true,normalize).map(show).join(','));
for(const alt of [false,true]){const a=alt?[1,1]:[1,2,3],b=alt?[1,-1]:[4,5],expected=Array.from({length:a.length+b.length-1},(_,k)=>sum(a.map((v,i)=>v*(b[k-i]??0))));eq(transform.convolution(alt).result,expected.join(','));}
const modDft=Array.from({length:4},(_,k)=>sum([1,2,3,4].map((v,j)=>v*(4**((j*k)%4)%17)))%17);eq(transform.ntt().result,modDft.join(','));eq(transform.ntt(1).result,'invalid');eq(transform.ntt(4,7).result,'invalid');
function subsetSums(a){return a.map((_,mask)=>sum(a.filter((_,sub)=>(sub&mask)===sub)));}
for(const alt of [false,true]){const a=alt?[0,1,0,0,0,0,0,0]:[1,2,3,4];eq(transform.zeta(alt).result,subsetSums(a).join(','));const b=alt?[0,1,0,0]:[1,2,3,4],r=transform.zeta(alt,true);eq(r.result,b.join(','));eq(subsetSums(r.result.split(',').map(Number)),nums(r,'values',0));}
for(const alt of [false,true]){const a=alt?[1,0,0,0]:[1,2,0,1],b=[0,1,3,0],out=Array.from({length:4},(_,k)=>sum(a.map((v,i)=>v*b[i^k])));eq(transform.xorConvolution(alt).result,out.join(','));}
const subsetTotals=new Set();for(let mask=0;mask<8;mask++)subsetTotals.add(sum([2,3,5].filter((_,i)=>mask&(1<<i))));eq(transform.bitSubset().result,[...subsetTotals].sort((a,b)=>a-b).join(','));
const reusable=[];for(let t=0;t<=10;t++){let found=false;for(let a=0;a<=5;a++)for(let b=0;b<=3;b++)for(let c=0;c<=2;c++)if(2*a+3*b+5*c===t)found=true;if(found)reusable.push(t);}eq(transform.bitSubset(true).result,reusable.join(','));
for(const cycle of [false,true]){const edges=[[0,1],[1,2],[2,3],[0,4],...(cycle?[[3,1]]:[])],expected=[];for(let s=0;s<5;s++){const reached=new Set([s]),queue=[s];for(let i=0;i<queue.length;i++)for(const [a,b]of edges)if(a===queue[i]&&!reached.has(b)){reached.add(b);queue.push(b);}expected.push(sum([...reached].map(i=>1<<i)));}eq(transform.closure(cycle).result,expected.join(','));}
for(const alt of [false,true]){const text=alt?'aabaa':'ababa',pattern=alt?'aaa':'aba',ends=[];for(let i=0;i+pattern.length<=text.length;i++)if(text.slice(i,i+pattern.length)===pattern)ends.push(i+pattern.length-1);eq(transform.shiftAnd(alt).result,ends.join(',')||'none');}
// Public contract and trace bounds; exact fixture answers retained for manifest closeout.
eq(specs.length,50);eq(new Set(specs.map(s=>s.slug)).size,50);eq(lessons.length,50);
const fixtures=[];for(const spec of specs){const lesson=lessons.find(l=>l.slug===spec.slug);ok(lesson);eq(spec.topic,lesson.topicId);const checked=validateAlgorithmSpec(spec);eq(checked.errors,[]);fixtures.push({slug:spec.slug,inputSpecification:lesson.fixtureSpecification,checkedAnswer:checked.runs[0].result,countercaseAnswer:checked.runs[1].result,allCaseAnswers:checked.runs.map(r=>r.result),prediction:spec.predict,traceFrames:checked.runs.map(r=>r.frames.length),proof:checked.runs[0].proof,status:'builder-model-check; independent verification pending'});}
if(process.argv.includes('--json'))console.log(JSON.stringify({batch:'B5',specs:50,checks,fixtures},null,2));else console.log(`B5: 50 real algorithm models; ${checks} finite oracle/certificate/contract checks passed. Claims remain unverified.`);
