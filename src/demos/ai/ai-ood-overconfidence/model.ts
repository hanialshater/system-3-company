// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const x=[1,10,0][mode],p=1/(1+Math.exp(-2*x)),distance=Math.max(0,Math.abs(x)-1);return{values:[p,distance],rows:[`x=${x}; trained x∈[−1,1]`,`logit=2x=${2*x} · P(+)≈${p.toPrecision(10)}`,`outside-distance=${distance}`,`confidence≠support; label unknown`],receipt:`x${x}:P≈${p.toPrecision(3)},distance=${distance}`};
}
