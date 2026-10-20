// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const initial=mode===1?[1,1]:[0,2],points=[0,2],responsibilities=points.map(x=>normalise(initial.map(m=>Math.exp(-.5*(x-m)**2)))),means=initial.map((_,j)=>sum(points.map((x,i)=>x*responsibilities[i][j]))/sum(responsibilities.map(r=>r[j])));return{initial,points,responsibilities,means,snapshot:`μ${initial.join('/')}: →${means.map(f).join('/')}`};}
