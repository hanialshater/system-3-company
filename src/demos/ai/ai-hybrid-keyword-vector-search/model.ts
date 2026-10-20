// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const lambda=mode===1?.2:.5,scale=mode===2?10:1,keyword=[1,0,.5],vector=[.1,.9,.4],scores=keyword.map((x,i)=>lambda*x*scale+(1-lambda)*vector[i]),order=[0,1,2].sort((a,b)=>scores[b]-scores[a]||a-b);return{lambda,scale,keyword,vector,scores,order,snapshot:`λ${lambda}×${scale}: ${'ABC'[order[0]]}=${f(scores[order[0]])}`};}
