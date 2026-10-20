// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const rows=[[1,1,0],[1,0,1],mode===1?[0,1,0]:[0,1,1]],cosine=(a:number[],b:number[])=>dot(a,b)/Math.sqrt(dot(a,a)*dot(b,b)),weights=rows.slice(1).map(r=>cosine(rows[0],r)),score=sum(weights.map((w,i)=>w*rows[i+1][2]))/sum(weights);return{rows,weights,score,snapshot:`C${rows[2][2]}: score=${f(score)}`};}
