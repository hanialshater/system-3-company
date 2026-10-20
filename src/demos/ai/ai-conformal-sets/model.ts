// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const calibration=[.1,.2,.3],alpha=mode===2?.1:.25,probabilities=mode===0?[.8,.15,.05]:[.4,.35,.25],rank=Math.ceil((calibration.length+1)*(1-alpha)),threshold=calibration[rank-1]??Infinity,scores=probabilities.map(p=>1-p),members=scores.map(x=>x<=threshold+1e-12);return{calibration,alpha,probabilities,rank,threshold,scores,members,snapshot:`${['Certain','Uncertain','α.1'][mode]}: set={${members.flatMap((yes,i)=>yes?['ABC'[i]]:[]).join(',')}}`};}
