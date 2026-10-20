// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const order=[0,9,2,3],query=mode===2?.1:2.6,budget=mode===0?3:mode===1?4:1,inspected=order.slice(0,budget),nearest=(xs:number[])=>xs.reduce((a,b)=>Math.abs(a-query)<=Math.abs(b-query)?a:b),best=nearest(inspected),exact=nearest(order),distance=Math.abs(best-query),recall=Number(best===exact);return{order,query,budget,inspected,best,exact,distance,recall,snapshot:`q${query}/n${budget}: best${best},r${recall}`};}
