// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const x=mode===2?0:2, likelihood=mode===1?[.8,.2]:[.2,.8], mass=normalise(likelihood.map(p=>p*.5)), predictions=[0,x], average=dot(mass,predictions), variance=sum(predictions.map((y,i)=>mass[i]*(y-average)**2));return {x,mass,predictions,average,variance,snapshot:`${mode===1?'y0':'y1'}@${x}: μ${f(average)},v${f(variance)}`};}
