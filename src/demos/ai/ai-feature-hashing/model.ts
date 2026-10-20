// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const counts=[1,2,mode===2?0:1],buckets=[0,1,0],signs=[1,1,mode===0?1:-1],vector=[0,0],contributions=counts.map((c,i)=>c*signs[i]);contributions.forEach((x,i)=>vector[buckets[i]]+=x);return{counts,buckets,signs,contributions,vector,snapshot:`${['Unsigned','Signed','NoC'][mode]}: [${vector.join(',')}]`};}
