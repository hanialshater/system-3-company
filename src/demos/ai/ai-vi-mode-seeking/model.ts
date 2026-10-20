// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const p=[.45,.1,.45],family=mode===1?[[.5,0,.5]]:[[1,0,0],[0,1,0],[0,0,1]],loss=family.map(q=>sum(q.map((v,i)=>v===0?0:v*Math.log(v/p[i])))),minimum=Math.min(...loss),best=loss.map((l,i)=>Math.abs(l-minimum)<1e-10?i:-1).filter(i=>i>=0);return{p,family,loss,minimum,best,snapshot:`${mode===1?'Two-mode':'Delta'}: KL=${f(minimum)}`};}
