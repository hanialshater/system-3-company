// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const user=mode===1?[0,0,0,0]:[1,1,0,0],neighbors=[[1,0,1,0],[0,1,1,0]],length=Math.sqrt(dot(user,user)),weights=length?neighbors.map(n=>dot(user,n)/(length*Math.sqrt(dot(n,n)))):null,score=(j:number)=>weights?sum(weights.map((w,i)=>w*neighbors[i][j]))/sum(weights):null,topic=mode===2?1:null;return{user,weights,c:score(2),d:topic??score(3),topic,snapshot:`${['Old','New','Topic'][mode]}: D=${mode===1?'undefined':f(topic??score(3)??0)}`};}
