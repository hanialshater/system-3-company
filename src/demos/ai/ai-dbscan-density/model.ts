// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const points=[0,.1,.2,1,1.1,1.2,5],epsilon=[.15,.05,1][mode],neighbors=points.map(x=>points.flatMap((y,i)=>Math.abs(x-y)<=epsilon+1e-12?[i]:[])),labels=points.map(()=>-1);let count=0;for(let i=0;i<points.length;i++){if(labels[i]>=0||neighbors[i].length<2)continue;const queue=[i];labels[i]=count;while(queue.length){const j=queue.shift()!;for(const n of neighbors[j])if(labels[n]===-1){labels[n]=count;if(neighbors[n].length>=2)queue.push(n)}}count++}return{points,epsilon,neighbors,labels,count,snapshot:`ε${epsilon}: groups${count},noise${labels.filter(x=>x<0).length}`};}
