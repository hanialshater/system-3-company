// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const T=mode===1?3:2,p=mode===2?.1:.6,paths=[];const grouped=new Map<string,number>();for(let i=0;i<2**T;i++){const path=Array.from({length:T},(_,j)=>(i>>j)&1?'A':'_'),merged=path.filter((x,j)=>j===0||x!==path[j-1]),out=merged.filter(x=>x!=='_').join(''),mass=path.reduce((s,x)=>s*(x==='A'?p:1-p),1);paths.push({path:path.join(''),merged:merged.join(''),out:out||'∅',mass});grouped.set(out,(grouped.get(out)??0)+mass);}const trace=paths.map(r=>`${r.path}→${r.merged}→${r.out}:${f(r.mass)}`);return{values:[grouped.get('A')??0,grouped.get('AA')??0,grouped.get('')??0],rows:[`merge repeats → remove _; T=${T},p=${p}`,...Array.from({length:Math.ceil(trace.length/2)},(_,i)=>trace.slice(i*2,i*2+2).join('   ')),`P(A)=${f(grouped.get('A')??0)} P(AA)=${f(grouped.get('AA')??0)}`],receipt:`T${T}(${p}):A=${f(grouped.get('A')??0)},AA=${f(grouped.get('AA')??0)}`};
}
