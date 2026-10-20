// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const x=mode===2?0:2, weights=mode===1?[0,1]:[.2,.8], outcomes=weights.flatMap((p,slope)=>[-1,1].map(noise=>({value:x*slope+noise,p:p/2}))),average=sum(outcomes.map(o=>o.value*o.p)),total=sum(outcomes.map(o=>o.p*(o.value-average)**2)),parameter=total-1;return {x,weights,outcomes,total,parameter,snapshot:`${mode===1?'Known':`x${x}`}: v${f(parameter)}+1=${f(total)}`};}
