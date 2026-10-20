// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const steps=mode===2?2:4,shared=mode===1,outcomes=shared?[10-steps,10+steps]:Array.from({length:2**steps},(_,bits)=>10+sum(Array.from({length:steps},(_,i)=>((bits>>i)&1)?1:-1))),average=sum(outcomes)/outcomes.length,variance=sum(outcomes.map(x=>(x-average)**2))/outcomes.length,sd=Math.sqrt(variance),mass=outcomes.filter(x=>Math.abs(x-average)<=sd+1e-12).length/outcomes.length,values=Array.from(new Set(outcomes)).sort((a,b)=>a-b),distribution=values.map(x=>({x,p:outcomes.filter(v=>v===x).length/outcomes.length}));return{steps,shared,outcomes,average,variance,sd,mass,distribution,snapshot:`${shared?'Shared':`h${steps}`}: v${variance},band-mass${f(mass)}`};}
