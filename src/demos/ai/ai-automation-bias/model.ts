// Declared finite construction; no empirical model API or external effect.
export type Result={lines:string[];snapshot:string;graph?:{xy:Record<string,number[]>;edges:string[][];path:string[]};points?:number[][];density?:number[][]};
export const f3=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
function out(lines:string[],snapshot:string,extra:Partial<Result>={}):Result{return {lines,snapshot,...extra};}
export function compute(mode:number):Result{if(!Number.isInteger(mode)||mode<0||mode>2)throw new RangeError("case");const e=mode===0?.1:.04,v=mode===1?.1:.8,machine=1000*e,corrected=machine*v,residual=machine*(1-v);return out([`error=${e} review=${v} · expected cases=1000`,`machine errors=${machine} corrected=${f3(corrected)}`,`residual=${f3(residual)} · reviews=${1000*v}`],`${mode}: ${f3(residual)} errors`);}
