// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const scale=mode===1?2:1,users=[[1,0],[0,1],[1,1]].map(r=>r.map(x=>x*scale)),items=[[2,0],[0,3],[1,1]].map(r=>r.map(x=>x/scale)),matrix=users.map(u=>items.map(i=>dot(u,i)));return{users,items,matrix,scale,snapshot:`scale${scale}: U3·C=${matrix[2][2]}`};}
