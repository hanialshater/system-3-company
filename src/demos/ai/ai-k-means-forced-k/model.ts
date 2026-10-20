// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const points=[0,1,2,3,4,5];let centers=mode===0?[1,4]:[.5,2.5,4.5],assign:number[]=[];for(let t=0;t<20;t++){assign=points.map(x=>centers.map(c=>(x-c)**2).reduce((best,v,i,a)=>v<a[best]?i:best,0));const next=centers.map((c,j)=>{const members=points.filter((_,i)=>assign[i]===j);return members.length?sum(members)/members.length:c});if(next.every((x,i)=>Math.abs(x-centers[i])<1e-12)){centers=next;break}centers=next}const sse=sum(points.map((x,i)=>(x-centers[assign[i]])**2));return{points,centers,assign,sse,snapshot:`k${centers.length}: SSE=${f(sse)}`};}
