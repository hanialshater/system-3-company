#!/usr/bin/env node
// Wave J math briefs (cm-math, 2026-10-14): recomputes every number in the 15 briefs. Run: node company/domains/briefs/checks/math-wave-j-check.mjs
// Labels: A1-A5 math.algebra.md, D1-D5 math.discrete.md, G1-G5 math.geometry.md (Wave J sections).
const log=(...a)=>console.log(...a);
// A1 equals
log("A1", [7,12,17].map(x=>[x, 8+4, x+5, 8+4===x+5]));
// A2 proportion
const base=[4,6];
for (const [n,f] of [["+2",([w,h])=>[w+2,h+2]],["x1.5",([w,h])=>[w*1.5,h*1.5]],["+4",([w,h])=>[w+4,h+4]],["x2",([w,h])=>[w*2,h*2]]]) {const [w,h]=f(base); log("A2",n,w,h,(h/w).toFixed(3), h===1.5*w);}
// A3 div zero
for (const d of [3,1,0.5,0.1]) log("A3",d, 6/d, Math.round(6/d));
log("A3 zero", [1,10,100,1e6].map(q=>q*0));
// A4 inequality
for (const [n,f] of [["x2",x=>2*x],["-3",x=>x-3],["x-1",x=>-x],["x-2",x=>-2*x]]) log("A4",n,f(2),f(5), f(2)<f(5)?"<":">");
// A5 quarters
let s=0; for(let k=1;k<=8;k++){s+=1/4**k; log("A5",k,s, (1/3-s).toExponential(2), "pieces at level", 3, "each", 1/4**k);}
// D1 wason: rule vowel -> even. Possible backs: letters A,K ; numbers 4,7
const isV=c=>"AEIOU".includes(c), isEven=n=>n%2===0;
const cards=[["E","letter"],["K","letter"],["4","num"],["7","num"]];
for (const [f,t] of cards){const backs=t==="letter"?[4,7]:["A","K"]; const breaks=backs.filter(b=>{const L=t==="letter"?f:b, N=t==="letter"?b:+f; return isV(L)&&!isEven(N)}); log("D1",f,"backs that break:",breaks);}
// D2 quantifier: circles' colours scenes
const scenes={allRed:["r","r","r","r"],oneBlue:["r","r","r","b"],noneRed:["b","b","b","b"]};
for(const [k,c] of Object.entries(scenes)){const all=c.every(x=>x==="r"),none=c.every(x=>x!=="r"),some_not=c.some(x=>x!=="r"),some=c.some(x=>x==="r"); log("D2",k,{notAll:!all,none,someNot:some_not,someRed:some});}
// D3 regions
function chordsIntersections(angles){const P=angles.map(a=>[Math.cos(a*Math.PI/180),Math.sin(a*Math.PI/180)]);const ch=[];for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++)ch.push([i,j]);
 const pts=[];const per=ch.map(()=>0);
 for(let a=0;a<ch.length;a++)for(let b=a+1;b<ch.length;b++){const [i,j]=ch[a],[k,l]=ch[b]; if(new Set([i,j,k,l]).size<4)continue; const p=P[i],r=[P[j][0]-p[0],P[j][1]-p[1]],q=P[k],sv=[P[l][0]-q[0],P[l][1]-q[1]];const den=r[0]*sv[1]-r[1]*sv[0]; if(Math.abs(den)<1e-12)continue; const t=((q[0]-p[0])*sv[1]-(q[1]-p[1])*sv[0])/den,u=((q[0]-p[0])*r[1]-(q[1]-p[1])*r[0])/den; if(t>1e-9&&t<1-1e-9&&u>1e-9&&u<1-1e-9){pts.push([p[0]+t*r[0],p[1]+t*r[1]]);}}
 // distinct points
 const distinct=[];for(const x of pts){const f=distinct.find(d=>Math.hypot(d.p[0]-x[0],d.p[1]-x[1])<1e-6); if(f)f.n++; else distinct.push({p:x,n:1});}
 const minSep=Math.min(...pts.flatMap((x,i)=>pts.slice(i+1).map(y=>Math.hypot(x[0]-y[0],x[1]-y[1]))).filter(v=>v>1e-6));
 // regions via Euler: V = n + distinct; E = chords segments + arcs ; F interior = E - V + 1
 let segs=0; for(let a=0;a<ch.length;a++){const [i,j]=ch[a]; // count distinct intersection points on chord
   const p=P[i],q=P[j]; const on=distinct.filter(d=>{const cr=(q[0]-p[0])*(d.p[1]-p[1])-(q[1]-p[1])*(d.p[0]-p[0]);return Math.abs(cr)<1e-7}).length; segs+=on+1;}
 const n=P.length,V=n+distinct.length,E=segs+(n>1?n:0); const F=E-V+1; // interior faces (planar, connected incl circle)
 return {n,chords:ch.length,crossings:pts.length,distinct:distinct.length,maxConcurrent:Math.max(0,...distinct.map(d=>d.n)),regions:n===1?1:F,minSep:minSep.toFixed(3)};}
const ang=[0,64,113,179,230,308];
for(let n=1;n<=6;n++){const r=chordsIntersections(ang.slice(0,n)); const C=(a,b)=>{let x=1;for(let i=0;i<b;i++)x=x*(a-i)/(i+1);return x}; log("D3",JSON.stringify(r),"formula",1+C(n,2)+C(n,4));}
log("D3 regular hexagon",JSON.stringify(chordsIntersections([0,60,120,180,240,300])));
// D4 4x4 tilings
function tilings(N,removed){const cells=new Set();for(let r=0;r<N;r++)for(let c=0;c<N;c++)if(!removed.some(([a,b])=>a===r&&b===c))cells.add(r*N+c);
 const go=(s)=>{if(s.size===0)return 1;const m=Math.min(...s);const r=Math.floor(m/N),c=m%N;let t=0;for(const nb of [c+1<N?m+1:-1,m+N]){if(nb>=0&&s.has(nb)){const s2=new Set(s);s2.delete(m);s2.delete(nb);t+=go(s2);}}return t};
 let b=0,w=0;for(const x of cells){((Math.floor(x/N)+x%N)%2===0)?b++:w++}return {cells:cells.size,dark:b,light:w,tilings:go(cells)}}
log("D4 full",tilings(4,[]));log("D4 opposite",tilings(4,[[0,0],[3,3]]));log("D4 sameRow",tilings(4,[[0,0],[0,3]]));log("D4 adjacent-colours two dark",tilings(4,[[0,0],[1,1]]));log("D4 8x8 opp",(()=>{let b=0,w=0;for(let r=0;r<8;r++)for(let c=0;c<8;c++){if((r===0&&c===0)||(r===7&&c===7))continue;((r+c)%2===0)?b++:w++}return [b,w]})());
// D5 combos
const C=(a,b)=>{let x=1;for(let i=0;i<b;i++)x=x*(a-i)/(i+1);return x};log("D5",[0,1,2,3,4,5,6].map(k=>C(6,k)), C(10,2),C(10,8));
// G1 rope
for(const r of [0.11,0.35,6378137]){const C0=2*Math.PI*r; log("G1",r,((C0+1)/(2*Math.PI)-r).toFixed(4));} log("G1 1/2pi",1/(2*Math.PI));
// G2 frame
for(const d of [90,60,30]) log("G2",d,(4*3*Math.sin(d*Math.PI/180)).toFixed(2),"height",(3*Math.sin(d*Math.PI/180)).toFixed(2),"perimeter",14);
// G3 sticks
for(const s of [[2,3,6],[3,4,6],[2,4,6]]){const [a,b,c]=s.sort((x,y)=>x-y); log("G3",s,a+b>c?"closes":a+b===c?"flat":"gap "+(c-a-b));}
// G4 ant
let best=1e9,bt=0;for(let t=0;t<=1;t+=1e-5){const L=Math.hypot(1,t)+Math.hypot(1,1-t);if(L<best){best=L;bt=t}} log("G4",best.toFixed(4),bt.toFixed(3),Math.sqrt(5).toFixed(4),"edges",3,"diag+edge",(1+Math.SQRT2).toFixed(4),"through",Math.sqrt(3).toFixed(4));
// G5 euler
const sol={cube:[8,12,6],tetra:[4,6,4],prism:[6,9,5],pyramid:[5,8,5]};
for(const [k,[V,E,F]] of Object.entries(sol)) log("G5",k,V-E+F);
// cut a corner of degree d: V += d-1, E += d, F += 1
const cut=([V,E,F],d)=>[V+d-1,E+d,F+1];
let cube=sol.cube;let c1=cut(cube,3);log("G5 cube cut1",c1,c1[0]-c1[1]+c1[2]);let c2=cut(c1,3);log("G5 cube cut2",c2,c2[0]-c2[1]+c2[2]);
let p1=cut(sol.pyramid,4);log("G5 pyramid apex cut",p1,p1[0]-p1[1]+p1[2]);
let c8=cube;for(let i=0;i<8;i++)c8=cut(c8,3);log("G5 cube all 8",c8,c8[0]-c8[1]+c8[2]);

// G4: shortest path over the whole cube surface, Dijkstra on a 60-per-edge surface grid with straight in-face segments (an upper bound that matches sqrt 5).
{
// cube [0,1]^3, start (0,0,0), end (1,1,1). Faces: x0,x1,y0,y1,z0,z1. Shortest surface path via brute force on a grid graph over the surface.
const N=60; // grid points per edge
const key=(x,y,z)=>x+","+y+","+z;
const nodes=new Map();
for(let i=0;i<=N;i++)for(let j=0;j<=N;j++)for(let k=0;k<=N;k++){if(i===0||i===N||j===0||j===N||k===0||k===N)nodes.set(key(i,j,k),[i,j,k]);}
// edges: connect points on same face within radius 3 grid steps (straight segments lie on face)
const onFace=(a,b)=>{for(let d=0;d<3;d++){if((a[d]===0&&b[d]===0)||(a[d]===N&&b[d]===N))return true}return false};
const dist=new Map();dist.set(key(0,0,0),0);
// Dijkstra with simple binary heap
const heap=[[0,key(0,0,0)]];const push=(x)=>{heap.push(x);let i=heap.length-1;while(i>0){const p=(i-1)>>1;if(heap[p][0]<=heap[i][0])break;[heap[p],heap[i]]=[heap[i],heap[p]];i=p}};
const pop=()=>{const t=heap[0];const l=heap.pop();if(heap.length){heap[0]=l;let i=0;for(;;){let a=2*i+1,b=a+1,m=i;if(a<heap.length&&heap[a][0]<heap[m][0])m=a;if(b<heap.length&&heap[b][0]<heap[m][0])m=b;if(m===i)break;[heap[m],heap[i]]=[heap[i],heap[m]];i=m}}return t};
const R=4;const done=new Set();
while(heap.length){const [d,k]=pop();if(done.has(k))continue;done.add(k);if(k===key(N,N,N)){console.log("shortest ~",(d/N).toFixed(4),"sqrt5",Math.sqrt(5).toFixed(4));break}
 const a=nodes.get(k);for(let dx=-R;dx<=R;dx++)for(let dy=-R;dy<=R;dy++)for(let dz=-R;dz<=R;dz++){const b=[a[0]+dx,a[1]+dy,a[2]+dz];const kb=key(...b);if(!nodes.has(kb)||done.has(kb))continue;if(!onFace(a,b))continue;const nd=d+Math.hypot(dx,dy,dz);if(nd<(dist.get(kb)??1e18)){dist.set(kb,nd);push([nd,kb])}}}
}

// G3: gap between the free ends of the 2 cm stick (hinged at 0) and 3 cm stick (hinged at 6), both raised by the same angle.
for (const d of [0, 45, 60]) { const t = d * Math.PI / 180; console.log("G3 gap at", d, Math.hypot(6 - 3 * Math.cos(t) - 2 * Math.cos(t), 3 * Math.sin(t) - 2 * Math.sin(t)).toFixed(2)); }
console.log("G3 closest possible (any angles) = 6 - (2 + 3) =", 6 - 5);
