// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const w=[1,3,0][mode],mean=2*w/(1+w),variance=1/(1+w),su=-.2,sc=2*(1-.2),guided=su+w*(sc-su),next=.2+.1*guided;return{values:[mean,variance,next],rows:[`w=${w}; su=${f(su)}; sc=${f(sc)}`,`guided=${f(guided)} → x=${f(next)}`,`mean=${f(mean)} · variance=${f(variance)}`,`|mean−conditional1|=${f(Math.abs(mean-1))}`],receipt:`w${w}:μ${f(mean)},v${f(variance)}`};
}
