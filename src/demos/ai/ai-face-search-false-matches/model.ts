// Declared finite construction; no empirical model API or external effect.
export type Result={lines:string[];snapshot:string;graph?:{xy:Record<string,number[]>;edges:string[][];path:string[]};points?:number[][];density?:number[][]};
export const f3=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
function out(lines:string[],snapshot:string,extra:Partial<Result>={}):Result{return {lines,snapshot,...extra};}
export function compute(mode:number):Result{if(!Number.isInteger(mode)||mode<0||mode>2)throw new RangeError("case");const N=mode===2?100:1000,f=.001,p=mode===1?f:1-(1-f)**N,posterior=.001*.9/(.001*.9+.999*f);return out([`absent gallery N=${N} · ${mode===1?'correlated':'independent'}`,`P(alert)=${f3(p)} · E(count)=${f3(N*f)}`,`random pair P(true|+)=${f3(posterior)}`],`${N}/${mode===1?'corr':'iid'}: ${f3(p)}`);}
