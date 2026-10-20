// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const lists=[[0,4],[6,7,8]],centers=lists.map(a=>sum(a)/a.length),query=mode===2?7:4.8,probes=mode===1?2:1,order=[0,1].sort((a,b)=>Math.abs(centers[a]-query)-Math.abs(centers[b]-query)),scanned=order.slice(0,probes).flatMap(i=>lists[i]),nearest=(a:number[])=>a.reduce((x,y)=>Math.abs(x-query)<=Math.abs(y-query)?x:y),best=nearest(scanned),exact=nearest(lists.flat()),distance=Math.abs(best-query);return{lists,centers,query,probes,order,scanned,best,exact,distance,snapshot:`q${query}/p${probes}: ${best},checks${scanned.length}`};}
