// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const vector=[.2,.6,1.2,1.6],books=mode===1?[[[0,0],[1,1],[2,2],[0,.5]],[[0,0],[1,1],[2,2],[1,1.5]]]:[[[0,0],[1,1],[2,2]],[[0,0],[1,1],[2,2]]],subs=[vector.slice(0,2),vector.slice(2)],codes=subs.map((sub,j)=>books[j].reduce((a,b)=>sqdist(sub,a)<=sqdist(sub,b)?a:b)),reconstruction=codes.flat(),distortion=sqdist(vector,reconstruction),exact=dot(vector,vector),lookups=codes.map(c=>dot(c,c)),approximate=sum(lookups);return{vector,books,subs,codes,reconstruction,distortion,exact,lookups,approximate,snapshot:`${mode?'Rich':'Coarse'}: D${f(distortion)},d²${f(approximate)}`};}
