// Declared finite construction; no empirical model API or external effect.
export type Result={lines:string[];snapshot:string;graph?:{xy:Record<string,number[]>;edges:string[][];path:string[]};points?:number[][];density?:number[][]};
export const f3=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
function out(lines:string[],snapshot:string,extra:Partial<Result>={}):Result{return {lines,snapshot,...extra};}
export function compute(mode:number):Result{if(!Number.isInteger(mode)||mode<0||mode>2)throw new RangeError("case");const scores=[mode===2?1:.8,.2,0],shares=mode===1?[.2,.3,.5]:[.4,.35,.25],parts=shares.map((x,i)=>x*scores[i]),index=parts.reduce((a,b)=>a+b);return out([`Draft/Decide/Physical · shares=${shares.join('/')}`,`scores=${scores.join('/')} · terms=${parts.map(f3).join('+')}`,`index=${f3(index)} · physical share=${shares[2]}`],`${mode}: index${f3(index)}`);}
