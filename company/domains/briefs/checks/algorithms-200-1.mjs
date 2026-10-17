#!/usr/bin/env node
// B2: finite fixtures plus independent brute-force answers and structural certificates.
// No claim is marked verified by this builder's checks.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {register} from 'node:module';
register('../../../../tests/lifehacks/typescript-loader.mjs',import.meta.url);
const root=fileURLToPath(new URL('../../../../',import.meta.url));
const topics=['boundary-search-selection','adaptive-network-sorting','ordered-augmented-trees','priority-queues-meldable-heaps','range-sliding-window'];
const [search,sort,tree,heap,range]=await Promise.all(topics.map(t=>import(pathToFileURL(path.join(root,`src/lib/algorithms/topics/${t}.ts`)))));
const modules=[search,sort,tree,heap,range];
const manifestPath=process.argv.find(a=>a.startsWith('--manifest='))?.slice(11)??path.join(root,'company/domains/briefs/algorithms-200.json');
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
const rows=(manifest.lessons??manifest.topics.flatMap(t=>t.lessons)).filter(l=>topics.includes(l.topicId));
const all=modules.flatMap(m=>m.specs);
assert.equal(all.length,50);assert.equal(new Set(all.map(s=>s.slug)).size,50);assert.equal(rows.length,50);
const get=(run,label)=>{const r=run.frames.at(-1).rows?.find(r=>r.label===label);assert(r,`Missing final row ${label}`);return r.cells.map(c=>c.text);};
const numeric=(run,label)=>get(run,label).map(Number);
const sorted=a=>[...a].sort((a,b)=>a-b);
const permutation=(a,b)=>assert.deepEqual(sorted(a),sorted(b));
const sum=a=>a.reduce((x,y)=>x+y,0);
let checks=0;const eq=(a,b)=>{assert.deepEqual(a,b);checks++;};
const bruteCapacity=(a,bins)=>{let best=Infinity;for(let mask=0;mask<1<<(a.length-1);mask++){let used=1,max=0,current=a[0];for(let i=1;i<a.length;i++){if(mask&(1<<(i-1))){used++;max=Math.max(max,current);current=0;}current+=a[i];}if(used<=bins)best=Math.min(best,Math.max(max,current));}return best;};
const bruteMissing=(a,k)=>{let n=0;for(let x=1;x<100;x++)if(!a.includes(x)&&++n===k)return x;throw Error('bound');};
const brutePair=(a,k)=>{const ds=[];for(let i=0;i<a.length;i++)for(let j=i+1;j<a.length;j++)ds.push(Math.abs(a[i]-a[j]));return sorted(ds)[k-1];};
const bruteWindow=(a,t)=>{let best=Infinity;for(let l=0;l<a.length;l++)for(let r=l;r<a.length;r++)if(sum(a.slice(l,r+1))>=t)best=Math.min(best,r-l+1);return best===Infinity?0:best;};
const bruteWeighted=(a,w)=>{const costs=a.map(x=>sum(a.map((y,i)=>Math.abs(x-y)*w[i])));return a[costs.indexOf(Math.min(...costs))];};
const perms=a=>a.length?a.flatMap((x,i)=>perms(a.filter((_,j)=>j!==i)).map(rest=>[x,...rest])):[[]];
// Search answers are derived independently by scans, enumeration or merging.
for(let n=0;n<=5;n++)for(let code=0;code<3**n;code++){let c=code;const a=Array.from({length:n},()=>{const v=c%3;c=Math.floor(c/3);return v;}).sort((x,y)=>x-y);for(let t=-1;t<=3;t++){const l=a.findIndex(x=>x>=t),u=a.findIndex(x=>x>t);eq(search.bound(a,t).result,l<0?n:l);eq(search.bound(a,t,true).result,u<0?n:u);}}
for(let cut=0;cut<5;cut++){const base=[1,2,3,4,5],a=[...base.slice(cut),...base.slice(0,cut)];for(let t=0;t<=6;t++)eq(search.rotated(a,t).result,a.indexOf(t));}
for(const bins of [1,2,3,4])eq(search.capacity([3,2,2,4,1],bins).result,bruteCapacity([3,2,2,4,1],bins));
for(const [a,b]of [[[1,4,7],[2,3,8]],[[1,2],[3,4,5]],[[-2,5],[1]],[[1],[2]]]){const merged=sorted([...a,...b]),n=merged.length;eq(search.median(a,b).result,n%2?merged[n>>1]:(merged[n/2-1]+merged[n/2])/2);}
for(let k=1;k<=6;k++)eq(search.pairDistance([1,3,4,8],k).result,brutePair([1,3,4,8],k));
for(let k=1;k<=12;k++)eq(search.missing([2,3,6,8],k).result,bruteMissing([2,3,6,8],k));
for(let t=0;t<=9;t++)eq(search.mountain([1,4,8,6,3],t).result,[1,4,8,6,3].indexOf(t));
for(const w of [[1,1,5,1],[4,1,1,2],[1,1,1,1]])eq(search.weighted([1,3,7,9],w).result,bruteWeighted([1,3,7,9],w));
eq(search.staircase([[1,4,7],[2,5,8],[3,6,9]],6).result,4);eq(search.staircase([[1,4,7],[2,5,8],[3,6,9]],10).result,-1);
// Sorting certificates: same multiset, fully ordered output, and useful work metrics.
for(const a of [[1,3,5,2,4,6,0,7],[0,1,2,3], [3,2,1]]){const r=sort.natural(a),runs=a.reduce((n,x,i)=>n+(!i||x<a[i-1]?1:0),0);eq(r.result,runs);eq(numeric(r,'sorted'),sorted(a));}
eq(sort.descending(['5a','4a','4b','2a']).result,2);eq(get(sort.descending(['5a','4a','4b','2a']),'keys'),['4a','5a','4b','2a']);eq(sort.descending(['5a','4a','3a','2a']).result,4);
for(const v of [-1,4,7,10]){const a=[1,3,5,7,9],r=sort.insertion(a,v);eq(r.result,a.filter(x=>x>v).length);eq(numeric(r,'values'),sorted([...a,v]));}
for(const a of [[1,3,6,8,7,5,4,2],[1,2,4,9,8,7,6,3]])eq(numeric(sort.bitonic(a),'values'),sorted(a));
for(const a of perms([1,2,3,4])){const r=sort.oddEven(a);eq(numeric(r,'values'),sorted(a));}
for(const a of perms([1,2,3,4,5])){const r=sort.cycle(a);eq(numeric(r,'values'),sorted(a));eq(r.result,a.filter((x,i)=>x!==i+1).length);}
for(const streams of [[[1,7],[2,5],[3,4,8]],[[0],[2,5],[3,4,8]]]){const r=sort.kmerge(streams);eq(numeric(r,'output'),sorted(streams.flat()));const labeled=streams.flatMap((a,s)=>a.map(v=>({v,s}))).sort((a,b)=>a.v-b.v||a.s-b.s),seen=streams.map(()=>0);let first=0;for(let i=0;i<labeled.length;i++){const s=labeled[i].s;if(++seen[s]===streams[s].length){first=i+1;break;}}eq(r.result,first);}
for(const memory of [2,3]){const a=[6,1,5,2,4,3],r=sort.external(a,memory);eq(numeric(r,'run'),sorted(a));eq(r.result,Math.ceil(a.length/memory));}
for(const a of [[4,1,6,2,7,3,8],[8,7,6,4,3,2,1]]){const r=sort.replacement(a,3);eq(r.result,a[0]===4?6:3);for(const f of r.frames){const run=f.rows?.find(x=>x.label==='run')?.cells.map(c=>Number(c.text));if(run)eq(run,sorted(run));const active=f.rows?.find(x=>x.label==='active')?.cells.map(c=>Number(c.text))??[],frozen=f.rows?.find(x=>x.label==='frozen')?.cells.map(c=>Number(c.text))??[];assert(active.length+frozen.length<=3);checks++;}}
for(const a of [[21,10,22,11,20,12],[10,11,12,20,21,22],[22,21,20,12,11,10]])eq(numeric(sort.flag(a),'keys'),sorted(a));
// Tree certificates validate ordering, cardinality annotations and multiway bounds.
function binaryCertificate(frame,{priority=false,leftist=false}={}){const nodes=frame.nodes??[],by=new Map(nodes.map(n=>[n.id,n])),children=new Map(nodes.map(n=>[n.id,[]]));for(const e of frame.edges??[])children.get(e.from).push(e.to);const roots=nodes.filter(n=>!(frame.edges??[]).some(e=>e.to===n.id));let total=0;function visit(id){const node=by.get(id),[key,annotation]=node.label.split(':').map(Number),cs=children.get(id);let size=1;for(const c of cs){const child=by.get(c),[ck,ca]=child.label.split(':').map(Number);if(priority)assert(annotation<=ca);else if(leftist)assert(key<=ck);else{const descendants=[];function collect(x){descendants.push(Number(by.get(x).label.split(':')[0]));for(const y of children.get(x))collect(y);}collect(c);assert(child.x<node.x?descendants.every(x=>x<key):descendants.every(x=>x>key));}size+=visit(c);}if(!priority&&!leftist)eq(annotation,size);if(leftist){const l=cs.find(c=>by.get(c).x<node.x),r=cs.find(c=>by.get(c).x>node.x),lr=l?Number(by.get(l).label.split(':')[1]):0,rr=r?Number(by.get(r).label.split(':')[1]):0;assert(lr>=rr);eq(annotation,rr+1);}return size;}for(const n of roots)total+=visit(n.id);return total;}
for(let k=1;k<=7;k++){eq(tree.select(k).result,k);eq(tree.rankOf(k).result,k);binaryCertificate(tree.select(k).frames.at(-1));}
for(const q of [[5,6],[13,14],[0,1],[7,9]])eq(tree.interval(q).result,[[1,3],[2,8],[6,7],[9,12]].filter(([l,h])=>l<=q[1]&&h>=q[0]).length);
for(const p of [10,60]){const r=tree.treap(p),f=r.frames.at(-1);eq(binaryCertificate(f,{priority:true}),4);const keys=f.nodes.map(n=>Number(n.label.split(':')[0]));permutation(keys,[1,2,3,4]);eq(r.result,p===10?4:1);}
for(const k of [2,4]){const r=tree.splay(k);eq(r.result,k);eq(binaryCertificate(r.frames.at(-1)),5);}
function bCertificate(run,expected){const f=run.frames.at(-1),by=new Map(f.nodes.map(n=>[n.id,n])),child=new Map(f.nodes.map(n=>[n.id,[]]));for(const e of f.edges)child.get(e.from).push(e.to);const leaves=[],allKeys=[];function visit(id,lo=-Infinity,hi=Infinity,depth=0){const keys=by.get(id).label.split(',').map(Number),cs=child.get(id).sort((a,b)=>by.get(a).x-by.get(b).x);eq(keys,sorted(keys));assert(keys.length>=1&&keys.length<=3);assert(keys.every(x=>x>lo&&x<hi));allKeys.push(...keys);if(!cs.length)leaves.push(depth);else{eq(cs.length,keys.length+1);cs.forEach((c,i)=>visit(c,i?keys[i-1]:lo,i<keys.length?keys[i]:hi,depth+1));}}visit('0');eq(new Set(leaves).size,1);eq(sorted(allKeys),sorted(expected));}
for(const keys of [[1,2,3,4,5,6],[1,2,3,4,5,6,0]])bCertificate(tree.bsplit(keys),keys);
bCertificate(tree.borrow([5,6]),[1,2,4]);bCertificate(tree.borrow([1,2]),[4,5,6]);
for(const [l,h]of [[2,7],[4,5]])eq(tree.bplus(l,h).result,[1,2,4,5,7,8].filter(x=>x>=l&&x<=h).length);
eq(tree.persistent(8).result,4);eq(tree.persistent(3,true).result,3);
for(const [l,r]of [[1,2],[0,0]]){const a=['A','B','C','D','E'],cut=a.splice(l,r-l+1);a.push(...cut);const run=tree.implicit(l,r);eq(get(run,'sequence'),a);eq(run.result,a.indexOf('B'));}
// Heap certificates are independent of the repair implementation.
function heapArray(a,d=2){for(let i=1;i<a.length;i++)assert(a[Math.floor((i-1)/d)]<=a[i],`heap violation ${a}`);checks++;}
for(const a of [[1,3,2,7,6,4,5],[1,2,3]]){const r=heap.deleteMin(a),out=numeric(r,'heap');heapArray(out);permutation(out,a.filter((_,i)=>i));eq(r.result,Math.min(...a.slice(1)));}
for(const [task,key]of [['D',1],['C',3]]){const r=heap.indexed(task,key),out=get(r,'tasks'),entries=out.map(x=>x.split(':'));heapArray(entries.map(x=>Number(x[1])));const indices=numeric(r,'index');for(let i=0;i<4;i++)eq(out[indices[i]].split(':')[0],'ABCD'[i]);eq(r.result,Math.min(2,key));}
for(const key of [9,2]){const r=heap.arbitrary(key),out=numeric(r,'heap');heapArray(out);permutation(out,[1,5,2,9,6,3,4].filter(x=>x!==key));}
for(const [a,b]of [[3,5],[3,3]]){const r=heap.binomial(a,b),f=r.frames.at(-1),roots=f.nodes.filter(n=>!f.edges.some(e=>e.to===n.id)),degrees=roots.map(n=>Number(n.label.split(':')[1]));eq(r.result,(a+b).toString(2).replaceAll('0','').length);eq(new Set(degrees).size,degrees.length);eq(f.nodes.length,a+b);for(const n of f.nodes){const cs=f.edges.filter(e=>e.from===n.id).map(e=>f.nodes.find(c=>c.id===e.to));eq(Number(n.label.split(':')[1]),cs.length);assert(cs.every(c=>Number(c.label.split(':')[0])>=Number(n.label.split(':')[0])));checks++;}}
for(const single of [false,true]){const r=heap.leftist(single);binaryCertificate(r.frames.at(-1),{leftist:true});eq(r.result,single?1:2);}
for(const single of [false,true]){const r=heap.skew(single),f=r.frames.at(-1),keys=f.nodes.map(n=>Number(n.label));for(const e of f.edges)assert(Number(f.nodes.find(n=>n.id===e.from).label)<=Number(f.nodes.find(n=>n.id===e.to).label));permutation(keys,single?[1,5,9,0]:[1,5,9,2,4,6]);eq(r.result,single?1:3);}
for(const children of [[8,3,7,2,6],[8,3,7,2]]){const r=heap.pairing(children);eq(r.result,children.length===5?3:2);eq(Number(get(r,'root')[0]),Math.min(...children));}
for(const k of [1,8]){const r=heap.fibCut(k);eq(r.result,k<7?2:1);const f=r.frames.at(-1),edges=f.edges;eq(edges.length,k<7?1:2);eq(f.nodes.find(n=>n.id==='p').label.includes('*'),k<7);}
for(const [last,a]of [[0,[3,5,6,12]],[3,[5,6,12]]]){const r=heap.radix(last,a);eq(r.result,Math.min(...a));for(const f of r.frames){const keys=f.rows[0].cells.map(c=>Number(c.text)),buckets=f.rows[1].cells.map(c=>Number(c.text)),base=Number(f.metrics[0].value);eq(buckets,keys.map(k=>k===base?0:(k^base).toString(2).length));assert(keys.every(k=>k>=base));checks++;}}
for(const d of [2,3]){const r=heap.dary(d),a=numeric(r,'heap');heapArray(a,d);permutation(a,[2,3,4,5,6,7,8,9]);eq(r.result,4);}
// Range methods checked against direct updates, exhaustive windows and naive interval scans.
for(const overlap of [false,true]){const a=Array(6).fill(0);for(let i=1;i<=4;i++)a[i]+=3;if(overlap)for(let i=3;i<=5;i++)a[i]+=2;eq(numeric(range.difference(overlap),'values'),a);}
const matrix=[[1,2,3],[4,5,6],[7,8,9]];for(const [r1,c1,r2,c2]of [[1,1,2,2],[0,0,1,1],[0,1,2,2]])eq(range.prefix2d(r1,c1,r2,c2).result,sum(matrix.slice(r1,r2+1).flatMap(r=>r.slice(c1,c2+1))));
eq(range.sparse().result,Math.min(...[7,2,6,3,5,1].slice(1,5)));eq(range.sparse(true).result,2*sum([2,6,3,5]));assert.notEqual(range.sparse(true).result,sum([2,6,3,5]));checks++;
for(const right of [3,1]){const a=[1,2,3,4].map((x,i)=>x+(i<=right?5:0));eq(range.lazy(right).result,sum(a.slice(1,3)));}
eq(range.compose().result,7+2);eq(range.compose(false).result,7);assert.notEqual(range.compose().result,range.compose(false).result);checks++;
for(const k of [2,3]){const a=[4,1,3,2,5,0],maxima=Array.from({length:a.length-k+1},(_,i)=>Math.max(...a.slice(i,i+k))),r=range.windowDeque(k);eq(numeric(r,'maxima'),maxima);eq(r.result,sum(maxima));}
for(let t=1;t<=15;t++)eq(range.minWindow(t).result,bruteWindow([2,1,4,3,2],t));
const qs=[[0,1],[4,5],[1,4],[0,5]],array=[1,2,1,3,2,4];for(const ordering of [true,false]){const r=range.mo(ordering),answers=qs.map(([l,h])=>new Set(array.slice(l,h+1)).size);eq(numeric(r,'answers'),answers);const order=ordering?[0,2,3,1]:[0,1,2,3];let l=0,h=-1,moves=0;for(const id of order){moves+=Math.abs(qs[id][0]-l)+Math.abs(qs[id][1]-h);[l,h]=qs[id];}eq(r.result,moves);}
for(const v of [10,0]){const a=[1,2,3,4,5,6,7,8,9];a[4]=v;eq(range.sqrtBlocks(v).result,sum(a.slice(1,8)));}
for(let limit=0;limit<=6;limit++)eq(range.wavelet(limit).result,[3,1,4,1,5,2].slice(1,5).filter(x=>x<=limit).length);
const fixtures=[];
for(const spec of all){const row=rows.find(r=>r.slug===spec.slug);assert(row);eq(spec.topic,row.topicId);const runs=spec.cases.map(c=>c.run());eq(Number(spec.predict.options[spec.predict.answer]),runs[0].result);assert.notDeepEqual(runs[0],runs[1]);for(const [i,run]of runs.entries()){assert(run.frames.length>=2&&run.frames.length<=64);eq(JSON.stringify(spec.cases[i].run()),JSON.stringify(run));assert(spec.reveal(run).join(' ').length>=120);assert(spec.reveal(run).join(' ').split(/\s+/).length<=90);for(const f of run.frames){assert((f.rows?.length??0)<=8);assert((f.rows??[]).every(r=>r.cells.length<=12));assert((f.nodes?.length??0)<=24);for(const n of f.nodes??[])assert(n.x>=0&&n.x<=300&&n.y>=0&&n.y<=180);}checks++;}fixtures.push({slug:spec.slug,inputSpecification:row.fixtureSpecification,checkedAnswer:runs[0].result,countercaseAnswer:runs[1].result,traceFrames:runs.map(r=>r.frames.length),proof:runs[0].proof,status:'builder-model-check; independent verification pending'});}
if(process.argv.includes('--json'))console.log(JSON.stringify({batch:'B2',specs:50,checks,fixtures},null,2));else console.log(`B2: 50 numerical fixtures and countercases; ${checks} brute-force/certificate checks passed. Claims remain unverified.`);
