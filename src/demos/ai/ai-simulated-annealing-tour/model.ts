// Declared finite construction; no empirical model API or external effect.
export type Result={lines:string[];snapshot:string;graph?:{xy:Record<string,number[]>;edges:string[][];path:string[]};points?:number[][];density?:number[][]};
export const f3=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
function out(lines:string[],snapshot:string,extra:Partial<Result>={}):Result{return {lines,snapshot,...extra};}
export function compute(mode:number):Result{if(!Number.isInteger(mode)||mode<0||mode>2)throw new RangeError("case");const edges:Record<string,number>={AB:2,BC:2,CD:2,AD:2,AC:3,BD:3},length=(t:string[])=>t.slice(1).reduce((s,n,i)=>s+edges[[t[i],n].sort().join('')],0),a=length([...'ABCDA']),b=length([...'ACBDA']),delta=mode===2?a-b:b-a,T=mode===1?.5:2,p=delta<=0?1:Math.exp(-delta/T);return out([`ABCDA=${a} · ACBDA=${b}`,`Δ=${delta} T=${T} · p=${f3(p)}`,`u=.2 · accepted=${.2<p?'yes':'no'}`],`${mode}: Δ${delta}/p${f3(p)}/${.2<p?'yes':'no'}`);}
