// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const beta=mode===0?0:1,means=[.8,.6],sd=[.1,mode===2?.05:.4],scores=means.map((m,i)=>m+beta*sd[i]),winner=scores[0]>=scores[1]?0:1;return{beta,means,sd,scores,winner,snapshot:`β${beta}/sd${sd[1]}: ${'AB'[winner]}=${f(scores[winner])}`};}
