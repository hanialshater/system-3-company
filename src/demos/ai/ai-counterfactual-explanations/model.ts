// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const edits=Array.from({length:5},(_,i)=>Array.from({length:5},(_,j)=>[i/2,j/2])).flat(),eligible=edits.filter(([a,b])=>a+b>=2&&(mode===0||b===0)&&(mode!==2||a<=1)).sort((a,b)=>dot(a,a)-dot(b,b)),best=eligible[0]??null,dist=best?Math.sqrt(dot(best,best)):Infinity;return{values:[best?.[0]??-1,best?.[1]??-1,dist],rows:[`constraint=${['free','b=0','b=0 and a≤1'][mode]}`,`approving grid points=${eligible.length}`,`nearest=${best?best.join('/'):'none'}; distance=${f(dist)}`,`observed rule: a+b≥2`],receipt:`${['free','fixed','capped'][mode]} edit=${best?best.join('/'):'infeasible'}`};
}
