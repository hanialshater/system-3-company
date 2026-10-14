import { mulberry32, run as absRun } from '../../../../src/demos/economics/mild-preferences-sharp-divides/abm.ts';
const N = 32, EMPTY = 0.1, CAP = 60;
// rough hand-drawn borough polygons, lon/lat, from memory of public geography. NOT surveyed data.
const B = {
 SI: [[-74.26,40.50],[-74.05,40.55],[-74.06,40.60],[-74.08,40.64],[-74.20,40.65],[-74.25,40.56]],
 BK: [[-74.04,40.57],[-73.83,40.57],[-73.86,40.64],[-73.90,40.70],[-73.96,40.74],[-73.99,40.70],[-74.04,40.62]],
 QN: [[-73.96,40.74],[-73.90,40.79],[-73.78,40.80],[-73.70,40.74],[-73.70,40.60],[-73.75,40.59],[-73.85,40.58],[-73.86,40.64],[-73.90,40.70]],
 MN: [[-74.02,40.70],[-73.97,40.71],[-73.93,40.79],[-73.91,40.80],[-73.91,40.87],[-73.93,40.88],[-73.95,40.83],[-74.01,40.75]],
 BX: [[-73.93,40.80],[-73.80,40.81],[-73.75,40.85],[-73.80,40.89],[-73.90,40.92],[-73.92,40.88]],
};
const LON0=-74.27, LON1=-73.69, LAT0=40.48, LAT1=40.93;
function inside(p, poly){let c=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const [xi,yi]=poly[i],[xj,yj]=poly[j];if((yi>p[1])!==(yj>p[1])&&p[0]<(xj-xi)*(p[1]-yi)/(yj-yi)+xi)c=!c;}return c;}
export function mask(){const m=new Uint8Array(N*N);const lab=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++){const lon=LON0+(x+.5)/N*(LON1-LON0),lat=LAT1-(y+.5)/N*(LAT1-LAT0);let k=null;for(const [n,p] of Object.entries(B))if(inside([lon,lat],p))k=n;m[y*N+x]=k?1:0;lab[y*N+x]=k;}return {m,lab};}
const WALL=3;
function shuffle(a,r){for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));const x=a[i];a[i]=a[j];a[j]=x;}return a;}
function nb(c,i){const x=i%N,y=(i-x)/N;let like=0,occ=0;for(let dy=-1;dy<=1;dy++){const yy=y+dy;if(yy<0||yy>=N)continue;for(let dx=-1;dx<=1;dx++){const xx=x+dx;if((!dx&&!dy)||xx<0||xx>=N)continue;const v=c[yy*N+xx];if(v===1||v===2){occ++;if(v===c[i])like++;}}}return [like,occ];}
function unh(c,pct){const o=[];for(let i=0;i<c.length;i++){if(c[i]!==1&&c[i]!==2)continue;const [l,oc]=nb(c,i);if(oc>0&&l*100<pct*oc)o.push(i);}return o;}
function likeShare(c){let s=0,n=0;for(let i=0;i<c.length;i++){if(c[i]!==1&&c[i]!==2)continue;const [l,o]=nb(c,i);if(o>0){s+=l/o;n++;}}return s/n;}
function place(r,m,share1){const cells=[];for(let i=0;i<m.length;i++)if(m[i])cells.push(i);const n=cells.length,e=Math.round(n*EMPTY),occ=n-e,n1=Math.round(occ*share1);
 const a=[];for(let i=0;i<n;i++)a.push(i<n1?1:i<occ?2:0);shuffle(a,r);const c=new Uint8Array(m.length).fill(WALL);cells.forEach((ci,k)=>c[ci]=a[k]);return c;}
function tick(c,pct,r){const mv=shuffle(unh(c,pct),r);const em=[];for(let i=0;i<c.length;i++)if(c[i]===0)em.push(i);for(const f of mv){const k=Math.floor(r()*em.length);const t=em[k];c[t]=c[f];c[f]=0;em[k]=f;}return mv.length;}
export function sim(seed,pct,m,share1){const r=mulberry32(seed);const c=place(r,m,share1);const start=c.slice();let t=0;while(unh(c,pct).length>0&&t<CAP){tick(c,pct,r);t++;}return {start,end:c,ticks:t,settled:unh(c,pct).length===0,like0:likeShare(start),like:likeShare(c)};}
export function D(c,k){const A={},Bm={};let a=0,b=0;for(let i=0;i<c.length;i++){const v=c[i];if(v!==1&&v!==2)continue;const x=i%N,y=(i-x)/N;const key=Math.floor(y/k)*100+Math.floor(x/k);if(v===1){A[key]=(A[key]||0)+1;a++;}else{Bm[key]=(Bm[key]||0)+1;b++;}}
 const keys=new Set([...Object.keys(A),...Object.keys(Bm)]);let s=0;for(const q of keys)s+=Math.abs((A[q]||0)/a-(Bm[q]||0)/b);return s/2;}
// ---- self test: all-ones mask, equal shares, must equal abm.ts run()
if (process.argv[2]==='selftest'){
 const SZ=N; for(const seed of [1,2,3]){const ones=new Uint8Array(N*N).fill(1);const mine=sim(seed,30,ones,0.5);
  const ref=absRun(seed,30,CAP,N,EMPTY);const last=ref.frames[ref.frames.length-1];
  let same=ref.frames.length-1===mine.ticks;for(let i=0;i<last.length;i++)if(last[i]!==mine.end[i])same=false;console.log('selftest seed',seed,'ticks',mine.ticks,ref.frames.length-1,'identical',same);}
}
if (process.argv[2]==='draw'){const {m}=mask();let s='';for(let y=0;y<N;y++){for(let x=0;x<N;x++)s+=m[y*N+x]?'#':'.';s+='\n';}console.log(s);const {lab}=mask();const cnt={};lab.forEach(l=>{if(l)cnt[l]=(cnt[l]||0)+1});console.log(cnt,'total',m.reduce((a,b)=>a+b,0));}
if (process.argv[2]==='check'){
 const {m}=mask();const ks=[1,2,3,4,6,8];
 for(const [name,sh] of [['equal 50/50',0.5],['W vs B 31:20 -> 0.608',31/51]]){
  for(const pct of [30]){console.log('\n==',name,'threshold',pct);
   const rows=[];for(let seed=1;seed<=5;seed++){const s=sim(seed,pct,m,sh);rows.push({seed,ticks:s.ticks,settled:s.settled,like0:+s.like0.toFixed(3),like:+s.like.toFixed(3),D0:ks.map(k=>+D(s.start,k).toFixed(2)),D:ks.map(k=>+D(s.end,k).toFixed(2))});}
   console.log('block sizes',ks.join(','));for(const r of rows)console.log(JSON.stringify(r));
   const mean=(f)=>ks.map((_,i)=>+(rows.reduce((a,r)=>a+f(r)[i],0)/5).toFixed(2));console.log('mean D start',mean(r=>r.D0).join(','),' mean D end',mean(r=>r.D).join(','));}
 }
 console.log('\nthreshold sweep, equal shares, mean D over seeds 1-5 at k=1,2,4,8');
 for(const pct of [0,10,20,30,40,50,60]){const o=[];for(const k of [1,2,4,8]){let t=0;for(let s=1;s<=5;s++)t+=D(sim(s,pct,m,0.5).end,k);o.push((t/5).toFixed(2));}console.log(pct,o.join(' '));}
}
