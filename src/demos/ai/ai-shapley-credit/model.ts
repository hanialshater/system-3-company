// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const a=mode===1?2:1,b=mode===1?0:1,ab=4,orders=[[a,ab-a],[ab-b,b]],credits=[(orders[0][0]+orders[1][0])/2,(orders[0][1]+orders[1][1])/2];return{a,b,ab,orders,credits,snapshot:`vA${a}/vB${b}: φ=${credits.join('/')}`};}
