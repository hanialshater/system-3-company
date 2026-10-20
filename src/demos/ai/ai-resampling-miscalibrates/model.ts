// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const prior=[.5,.1,.2][mode],likelihoodRatio=4,priorOdds=prior/(1-prior),posteriorOdds=priorOdds*likelihoodRatio,posterior=posteriorOdds/(1+posteriorOdds);return{prior,likelihoodRatio,priorOdds,posteriorOdds,posterior,snapshot:`prior${prior}: posterior=${f(posterior)}`};}
