// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const noise=mode===1?1:0, queries=[0,Math.sqrt(2*Math.log(2))], rows=queries.map(x=>{const k=Math.exp(-x*x/2);return{x,k,mean:k/(1+noise),latent:1-k*k/(1+noise),observation:1-k*k/(1+noise)+noise}});return{noise,rows,snapshot:`n${noise}: m${f(rows[0].mean)},latent${f(rows[0].latent)},obs${f(rows[0].observation)}`};}
