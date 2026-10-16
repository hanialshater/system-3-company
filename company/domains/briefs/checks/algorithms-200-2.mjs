#!/usr/bin/env node
// Independent finite-fixture oracles for builder B3. These are example checks,
// not proofs of general correctness, fact-checker verdicts, or browser review.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {fileURLToPath,pathToFileURL} from 'node:url';
import path from 'node:path';
import {register} from 'node:module';
register('../../../../tests/lifehacks/typescript-loader.mjs',import.meta.url);
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../../..');
const ids=['disjoint-offline-connectivity','graph-traversal-decomposition','path-algorithms-witnesses','spanning-matching-flow','sequence-dynamic-programming'];
const specs=new Map();for(const id of ids){const m=await import(pathToFileURL(path.join(root,'src/lib/algorithms/topics',`${id}.ts`)));for(const s of Object.values(m))if(s?.cases)specs.set(s.slug,s);}
let checks=0;function equal(a,b,message){checks++;assert.deepEqual(a,b,message);}function ok(x,message){checks++;assert.ok(x,message);}
const results={};function verify(id,expected){const s=specs.get(`algo-${id}`);ok(s,`${id} exported`);const runs=s.cases.map(c=>c.run());equal(runs.map(r=>r.result),expected,id);runs.forEach((r,i)=>{equal(r,s.cases[i].run(),`${id}/${i} deterministic`);ok(r.frames.length>=2&&r.frames.length<=64,`${id}/${i} bounds`);ok(r.proof.length>0,`${id}/${i} witness`);});results[`algo-${id}`]=runs.map((r,i)=>({case:i,result:r.result,proof:r.proof,frames:r.frames.length}));return runs;}
function combinations(a,k){if(!k)return [[]];if(a.length<k)return [];return combinations(a.slice(1),k-1).map(x=>[a[0],...x]).concat(combinations(a.slice(1),k));}
function perms(a){return a.length?a.flatMap((v,i)=>perms(a.filter((_,j)=>j!==i)).map(p=>[v,...p])):[[]];}
function reach(n,e,s,deleted=-1){const seen=new Set(s===deleted?[]:[s]);for(let k=0;k<n;k++)for(const[a,b]of e){if(a===deleted||b===deleted)continue;if(seen.has(a))seen.add(b);if(seen.has(b))seen.add(a);}return seen;}
function connected(n,e,a,b){return reach(n,e,a).has(b);}
function simplePaths(n,e,s,t,directed=true){const out=[];function dfs(u,seen,cost,cap,edges){if(u===t){out.push({cost,cap,edges});return;}for(let i=0;i<e.length;i++){let[a,b,w]=e[i];if(!directed&&b===u)[a,b]=[b,a];if(a===u&&!seen.has(b))dfs(b,new Set([...seen,b]),cost+w,Math.min(cap,w),[...edges,i]);}}dfs(s,new Set([s]),0,Infinity,[]);return out;}
function treeCosts(n,e){return combinations(e,n-1).filter(es=>reach(n,es,0).size===n).map(es=>es.reduce((s,x)=>s+x[2],0)).sort((a,b)=>a-b);}
function matchingSize(g){let best=0;function dfs(u,used,count){if(u===g.length){best=Math.max(best,count);return;}dfs(u+1,used,count);for(const v of g[u])if(!used.has(v))dfs(u+1,new Set([...used,v]),count+1);}dfs(0,new Set(),0);return best;}
// Topic 6: direct graph states, assignment enumeration, and chronological painting.
verify('rollback-dsu',[connected(4,[[0,1]],0,2),connected(4,[[0,1],[1,2]],0,2)]);
const paritySatisfiable=last=>Array.from({length:8},(_,m)=>[m&1,m>>1&1,m>>2&1]).some(x=>(x[0]^x[1])===1&&(x[1]^x[2])===1&&(x[0]^x[2])===last);
verify('parity-dsu',[!paritySatisfiable(1),!paritySatisfiable(0)]);
const potentialExpected=(delta,claim)=>{const assignments=[];for(let b=-10;b<=10;b++)for(let c=-10;c<=10;c++)if(b===3&&c-b===delta)assignments.push(c);equal(assignments.length,1,'unique anchored potential');return `${assignments[0]}; ${assignments[0]===claim?'consistent':'conflict'}`;};
verify('potential-dsu',[potentialExpected(4,8),potentialExpected(2,5)]);
verify('reverse-deletions',[1,2].map(first=>{let e=[[0,1],[1,2],[2,3]];return [first,0].map(i=>{e=e.filter(([a,b])=>a!==i||b!==i+1);return Number(connected(4,e,0,2));}).join(',');}));
verify('time-segment-connectivity',[[3,1,4],[5,2,5]].map(([ab,s,t])=>Array.from({length:5},(_,i)=>Number(connected(3,[...(i<ab?[[0,1]]:[]),...(i>=s&&i<t?[[1,2]]:[])],0,2))).join(',')));
verify('dsu-component-aggregate',[[2,5,3],[2,5,5]].map(w=>[...reach(3,[[0,1],[0,1],[1,2]],0)].reduce((s,i)=>s+w[i],0)));
const bagCost=ops=>{let groups=[[0],[1],[2,3],[4,5,6]],cost=0;const belongs=[0,1,2,3];for(let[a,b]of ops){a=belongs[a];b=belongs[b];cost+=Math.min(groups[a].length,groups[b].length);groups[a]=groups[a].concat(groups[b]);groups[b]=[];for(let i=0;i<4;i++)if(belongs[i]===b)belongs[i]=a;}equal(groups.reduce((n,g)=>n+g.length,0),7,'bag items conserved');return cost;};
verify('small-to-large-maps',[bagCost([[0,1],[2,3],[0,2]]),bagCost([[0,3],[1,3],[2,3]])]);
verify('dsu-next-unpainted',[3,2].map(start=>{const a=Array(6).fill('·');for(const[l,r,c]of [[1,4,'R'],[start,5,'B']])for(let i=l;i<=r;i++)a[i]=c;return a.join('');}));
verify('kruskal-reconstruction-tree',[5,6].map(w=>{const e=[[0,1,2],[1,2,w],[2,3,7],[0,3,9]];return e.map(e=>e[2]).sort((a,b)=>a-b).find(t=>connected(4,e.filter(e=>e[2]<=t),0,2));}));
const lca=(parents,a,b)=>{const ancestors=new Set();for(let x=a;x>=0;x=parents[x])ancestors.add(x);for(let x=b;x>=0;x=parents[x])if(ancestors.has(x))return 'ABCDE'[x];};
verify('offline-lca',[lca([-1,0,0,1,1],3,4)+','+lca([-1,0,0,1,1],3,2),lca([-1,0,0,1,-1],3,2)+','+lca([-1,0,0,1,-1],1,2)]);
// Topic 7: exhaustive induced subgraphs, permutations, and walk certificates.
verify('articulation-root',[[[0,1],[0,2]],[[0,1],[1,2],[2,0]]].map(e=>reach(3,e,1,0).size<2));
const blockCount=e=>{const sets=[];for(let mask=1;mask<32;mask++){const vs=[0,1,2,3,4].filter(i=>mask>>i&1);if(vs.length<2)continue;const es=e.filter(([a,b])=>vs.includes(a)&&vs.includes(b));if(vs.length===2){if(es.length)sets.push(vs);continue;}if(vs.every(skip=>{const other=vs.filter(v=>v!==skip);const seen=reach(5,es,other[0],skip);return other.every(v=>seen.has(v));}))sets.push(vs);}return sets.filter(a=>!sets.some(b=>b.length>a.length&&a.every(v=>b.includes(v)))).length;};
const twoTriangles=[[0,1],[1,2],[2,0],[2,3],[3,4],[4,2]];verify('biconnected-edge-stack',[blockCount(twoTriangles),blockCount([...twoTriangles,[1,3]])]);
const undirectedEuler=[[0,1],[1,2],[2,0],[2,3]];verify('euler-degree-test',[undirectedEuler,[...undirectedEuler,[0,3]]].map(e=>[0,1,2,3].filter(u=>e.filter(x=>x.includes(u)).length%2).map(u=>'ABCD'[u]).join(',')));
const circuits=verify('hierholzer-splice',['ABCADEA','ABCDECA']);for(const[i,r]of circuits.entries()){const e=i?[[0,1],[1,2],[2,0],[2,3],[3,4],[4,2]]:[[0,1],[1,2],[2,0],[0,3],[3,4],[4,0]],walk=r.result.split('').map(v=>'ABCDE'.indexOf(v));equal(walk[0],walk.at(-1),'Euler closes');equal(walk.length,e.length+1,'Euler length');for(let j=1;j<walk.length;j++){const a=walk[j-1],b=walk[j],index=e.findIndex(([x,y])=>x===a&&y===b||x===b&&y===a);ok(index>=0,'Euler uses existing unused edge');e.splice(index,1);}equal(e.length,0,'Euler all edges used');}
verify('directed-euler-balance',[[[0,1],[1,2],[2,0],[0,3]],[[0,1],[1,2],[2,0],[0,3],[3,0]]].map(e=>{const b=[0,0,0,0];for(const[a,c]of e){b[a]++;b[c]--;}return b.every(x=>x===0)?'circuit':`${'ABCD'[b.indexOf(1)]}→${'ABCD'[b.indexOf(-1)]}`;}));
const edgeClasses=e=>{const t=Array(4).fill(-1),f=Array(4).fill(-1),tree=new Set();let tick=0;function dfs(u){t[u]=tick++;for(const[a,b]of e.filter(e=>e[0]===u).sort((a,b)=>a[1]-b[1]))if(t[b]<0){tree.add(`${a},${b}`);dfs(b);}f[u]=tick++;}dfs(0);const count=[0,0,0,0];for(const[a,b]of e){const k=tree.has(`${a},${b}`)?0:t[b]<=t[a]&&f[a]<=f[b]?1:t[a]<t[b]&&f[b]<f[a]?2:3;count[k]++;}return count.join(',');};
verify('dfs-edge-classes',[edgeClasses([[0,1],[0,2],[1,3],[2,3],[3,1]]),edgeClasses([[0,1],[0,2],[1,3],[2,3]])]);
const odd=verify('bfs-bipartite-witness',[3,0]);for(const[i,e]of [[[0,1],[1,2],[2,0],[2,3],[3,4]],[[0,1],[1,2],[2,3],[3,0]]].entries()){const bip=Array.from({length:1<<5},(_,m)=>e.every(([a,b])=>(m>>a&1)!==(m>>b&1))).some(Boolean);equal(odd[i].result===0,bip,'odd witness versus all colourings');}
verify('dag-path-count',[true,false].map(extra=>simplePaths(4,[[0,1,1],[0,2,1],[1,3,1],[2,3,1],...(extra?[[1,2,1]]:[])],0,3).length));
verify('topological-uniqueness',[false,true].map(extra=>{const e=[[0,1],[0,2],[1,3],[2,3],...(extra?[[1,2]]:[])];return perms([0,1,2,3]).filter(p=>e.every(([a,b])=>p.indexOf(a)<p.indexOf(b))).length===1;}));
const peel=verify('degeneracy-peeling',['2; EDFABC','2; EFABCD']);for(const[i,r]of peel.entries()){const e=[[0,1],[1,2],[2,0],[2,3],[3,4],[1,5],...(i?[[3,1]]:[])];let d=0;for(let mask=1;mask<64;mask++){const vs=[0,1,2,3,4,5].filter(v=>mask>>v&1);d=Math.max(d,Math.min(...vs.map(u=>e.filter(([a,b])=>a===u&&vs.includes(b)||b===u&&vs.includes(a)).length)));}equal(Number(r.result.split(';')[0]),d,'degeneracy exhaustive induced minimum degrees');}
// Topic 8: enumerate simple paths/cycles; Manhattan distance is a separate grid oracle.
const cycleEdges=[[0,1,1],[1,2,-2],[2,3,-2],[3,1,1]];const neg=verify('negative-cycle-witness',[-3,'none']);for(const[i,last]of [1,5].entries()){const e=cycleEdges.map(x=>x.slice());e[3][2]=last;const cycles=[];for(let s=0;s<4;s++)for(const perm of perms([0,1,2,3].filter(x=>x!==s)))for(let k=1;k<=perm.length;k++){const vs=[s,...perm.slice(0,k),s],es=vs.slice(1).map((v,j)=>e.find(([a,b])=>a===vs[j]&&b===v));if(es.every(Boolean))cycles.push(es.reduce((n,e)=>n+e[2],0));}equal(cycles.some(v=>v<0),typeof neg[i].result==='number','negative cycle enumeration');}
verify('floyd-intermediate',[9,4].map(d=>Math.min(...simplePaths(3,[[0,1,3],[1,2,2],[0,2,d],[2,0,4]],0,2).map(p=>p.cost))));
verify('johnson-reweight',[3,1].map(bc=>{const e=[[0,1,-2],[1,2,bc],[0,2,4],[2,0,2]],h=[0,1,2].map(v=>Math.min(0,...[0,1,2].flatMap(s=>simplePaths(3,e,s,v).map(p=>p.cost))));return e.map(([a,b,w])=>w+h[a]-h[b]).join(',');}));
verify('zero-one-bfs',[1,0].map(last=>Math.min(...simplePaths(4,[[0,1,1],[0,2,0],[2,1,0],[1,3,1],[2,3,last]],0,3).map(p=>p.cost))));
verify('multi-source-distance',[[[0,0],[4,4]],[[0,0],[4,4],[2,2]]].map(s=>Math.min(...s.map(([x,y])=>Math.abs(x-2)+Math.abs(y-2)))));
verify('bidirectional-bound',[4,1].map(bt=>Math.min(...simplePaths(4,[[0,1,1],[1,3,9],[0,2,5],[2,3,bt],[1,2,1]],0,3,false).map(p=>p.cost))));
verify('dag-negative-path',[-3,1].map(w=>Math.min(...simplePaths(4,[[0,1,4],[0,2,2],[1,2,w],[2,3,2],[1,3,5]],0,3).map(p=>p.cost))));
verify('widest-path',[5,3].map(bt=>Math.max(...simplePaths(4,[[0,1,8],[1,3,2],[0,2,5],[2,3,bt],[1,2,4]],0,3,false).map(p=>p.cap))));
verify('shortest-path-count',[false,true].map(direct=>{const paths=simplePaths(4,[[0,1,1],[0,2,1],[1,3,1],[2,3,1],...(direct?[[0,3,2]]:[])],0,3),best=Math.min(...paths.map(p=>p.cost));return paths.filter(p=>p.cost===best).length;}));
verify('pareto-path-labels',[4,6].map(limit=>Math.min(...[[1+2,5+2],[4+2,1+2]].filter(([t])=>t<=limit).map(([,c])=>c))));
// Topic 9: exhaustive spanning trees, assignments, vertex covers, cuts, and circulations.
verify('boruvka-components',[4,3].map(bc=>treeCosts(4,[[0,1,1],[1,2,bc],[2,3,2],[0,3,6],[0,2,5]])[0]));
verify('mst-cycle-replacement',[4,7].map(w=>treeCosts(4,[[0,1,2],[1,2,5],[2,3,3],[0,3,w]])[0]));
verify('mst-uniqueness',[[[0,1,1],[1,2,2],[0,2,2]],[[0,1,1],[1,2,1],[0,2,3]]].map(e=>{const c=treeCosts(3,e);return c.filter(x=>x===c[0]).length===1;}));
verify('second-best-tree',[4,3].map(ac=>{const c=treeCosts(4,[[0,1,1],[1,2,2],[2,3,3],[0,3,5],[0,2,ac]]);return c.find(x=>x>c[0]);}));
verify('bipartite-augmenting',[matchingSize([[0,1],[0],[1,2]]),matchingSize([[0],[0],[1,2]])]);
verify('hall-obstruction',['AB','none']);equal(matchingSize([[0],[0],[1,2]]),2,'Hall fixture max matching');equal(matchingSize([[0],[0,1],[1,2]]),3,'Hall changed fixture full matching');
verify('konig-cover',[[[0,0],[0,1],[1,1],[2,1]],[[0,0],[0,1],[1,1],[2,1],[2,2]]].map(e=>{let best=6;for(let m=0;m<64;m++)if(e.every(([a,b])=>(m>>a&1)||(m>>(b+3)&1)))best=Math.min(best,[0,1,2,3,4,5].filter(i=>m>>i&1).length);return best;}));
verify('dinic-levels',[[1,2],[2,3]].map(([sb,bt])=>{const e=[[0,1,2],[0,2,sb],[1,2,1],[1,3,1],[2,3,bt]];let min=Infinity;for(let mask=0;mask<16;mask++)if((mask&1)&&!(mask&8))min=Math.min(min,e.filter(([a,b])=>(mask>>a&1)&&!(mask>>b&1)).reduce((n,e)=>n+e[2],0));return min;}));
verify('min-cost-flow',[9,1].map(by=>Math.min(1+by,2+2)));
verify('lower-bound-flow',[3,1].map(ca=>{for(let ab=2;ab<=3;ab++)for(let bc=1;bc<=3;bc++)for(let c=1;c<=ca;c++)if(ab===bc&&bc===c)return true;return false;}));
// Topic 10: recursively enumerate segmentations, regex/glob paths, index subsets,
// schedules, cuts, contiguous substrings, alignments and subsequences.
const segments=(text,dict)=>{if(!text)return [''];return dict.filter(w=>text.startsWith(w)).flatMap(w=>segments(text.slice(w.length),dict).map(t=>w+(t?'|'+t:'')));};
verify('word-break',[segments('cars',['car','ca','rs'])[0],segments('cars',['car','s'])[0]]);
const reg=(s,p)=>{if(!p)return !s;const first=!!s&&(p[0]==='.'||p[0]===s[0]);return p[1]==='*'?(reg(s,p.slice(2))||first&&reg(s.slice(1),p)):(first&&reg(s.slice(1),p.slice(1)));};
verify('regex-star-dp',[reg('aab','c*a*b'),reg('ab','.*c')]);
const glob=(s,p)=>{if(!p)return !s;if(p[0]==='*')return glob(s,p.slice(1))||!!s&&glob(s.slice(1),p);return !!s&&(p[0]==='?'||p[0]===s[0])&&glob(s.slice(1),p.slice(1));};verify('wildcard-dp',[glob('abcd','a*d'),glob('abcd','a?d')]);
const interleavings=(a,b)=>!a?[b]:!b?[a]:[...interleavings(a.slice(1),b).map(t=>a[0]+t),...interleavings(a,b.slice(1)).map(t=>b[0]+t)];verify('interleaving-dp',['acbd','adbc'].map(t=>interleavings('ab','cd').includes(t)));
const subsequences=s=>Array.from({length:1<<s.length},(_,m)=>s.split('').filter((_,i)=>m>>i&1).join(''));verify('distinct-subsequences',subsequences('babgbag').filter(s=>s==='bag').length===5?[5,subsequences('aaa').filter(s=>s==='aa').length]:[NaN,NaN]);
verify('weighted-interval-dp',[8,12].map(mid=>{const jobs=[[1,3,5],[2,5,mid],[4,6,5]];let best=0;for(let mask=0;mask<8;mask++){const chosen=jobs.filter((_,i)=>mask>>i&1);if(chosen.every((a,i)=>chosen.every((b,j)=>i===j||a[1]<=b[0]||b[1]<=a[0])))best=Math.max(best,chosen.reduce((s,j)=>s+j[2],0));}return best;}));
const isPal=s=>s===s.split('').reverse().join('');const minCuts=s=>{let best=s.length-1;for(let mask=0;mask<(1<<(s.length-1));mask++){let parts=[],start=0;for(let i=0;i<s.length-1;i++)if(mask>>i&1){parts.push(s.slice(start,i+1));start=i+1;}parts.push(s.slice(start));if(parts.every(isPal))best=Math.min(best,parts.length-1);}return best;};verify('palindrome-partition',[minCuts('aabcb'),minCuts('abacdc')]);
const common=(a,b)=>{let best=0;for(let i=0;i<a.length;i++)for(let j=i+1;j<=a.length;j++)if(b.includes(a.slice(i,j)))best=Math.max(best,j-i);return best;};verify('longest-common-substring',[common('ABABC','BABCA'),common('AXBYC','ABC')]);
const align=(open)=>{let best=Infinity;function walk(i,j,last,cost){if(cost>=best)return;if(i===4&&j===2){best=cost;return;}if(i<4&&j<2)walk(i+1,j+1,'M',cost+('ACGT'[i]==='AT'[j]?0:4));if(i<4)walk(i+1,j,'D',cost+(last==='D'?1:open));if(j<2)walk(i,j+1,'I',cost+(last==='I'?1:open));}walk(0,0,'M',0);return best;};verify('sequence-affine-gap',[align(3),align(1)]);
const bitonic=a=>{let best=0;for(let mask=1;mask<1<<a.length;mask++){const s=a.filter((_,i)=>mask>>i&1);if(s.some((_,peak)=>s.every((v,i)=>!i||(i<=peak?v>s[i-1]:v<s[i-1]))))best=Math.max(best,s.length);}return best;};verify('bitonic-subsequence',[bitonic([1,4,2,5,3,1]),bitonic([1,2,3,4])]);
equal(specs.size,50,'B3 exact lesson count');equal(Object.keys(results).length,50,'all 50 have an oracle');
console.log(JSON.stringify({batch:'B3',lessons:50,cases:100,checks,scope:'finite fixture semantic checks only',results},null,2));
