// Declared finite construction; no empirical model API or external effect.
export type Result={lines:string[];snapshot:string;graph?:{xy:Record<string,number[]>;edges:string[][];path:string[]};points?:number[][];density?:number[][]};
export const f3=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
function out(lines:string[],snapshot:string,extra:Partial<Result>={}):Result{return {lines,snapshot,...extra};}
export function compute(mode:number):Result{if(!Number.isInteger(mode)||mode<0||mode>2)throw new RangeError("case");const r=mode===1?[0,1,1,0]:mode===2?[1,0,0,1]:[1,0,1,0],contributions=r.map((x,i)=>x/Math.log2(i+2)),score=contributions.reduce((a,b)=>a+b,0);return out([`relevance: ${r.join('/')}`,`DCG=${contributions.map(f3).join('+')}=${f3(score)}`,`sum=${r.reduce((a,b)=>a+b)} · loss=${f3(1.5-score)}`],`${mode}: DCG${f3(score)} −${f3(1.5-score)}`);}
