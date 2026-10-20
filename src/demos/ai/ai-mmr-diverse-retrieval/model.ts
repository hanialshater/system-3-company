// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const lambda=mode===0?.5:.9,relevance=[.85,.7],redundancy=[.95,.1],scores=relevance.map((r,i)=>lambda*r-(1-lambda)*redundancy[i]),winner=scores[0]>=scores[1]?'B':'C';return{lambda,relevance,redundancy,scores,winner,snapshot:`λ${lambda}: ${winner} (${scores.map(f).join('/')})`};}
