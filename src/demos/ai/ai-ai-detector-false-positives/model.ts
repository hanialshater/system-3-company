// Declared finite construction; no empirical model API or external effect.
export type Result={lines:string[];snapshot:string;graph?:{xy:Record<string,number[]>;edges:string[][];path:string[]};points?:number[][];density?:number[][]};
export const f3=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
function out(lines:string[],snapshot:string,extra:Partial<Result>={}):Result{return {lines,snapshot,...extra};}
export function compute(mode:number):Result{if(!Number.isInteger(mode)||mode<0||mode>2)throw new RangeError("case");const p=mode===2?.5:.01,abstain=mode===1,tp=10000*p*(abstain?.6:.9),fp=10000*(1-p)*(abstain?.01:.05),unknown=abstain?10000*p*.3+10000*(1-p)*.04:0;return out([`expected · prevalence=${p} · N=10000`,`trueflags=${tp} falseflags=${fp} abstain=${unknown}`,`P(machine|flag)=${f3(tp/(tp+fp))}`],`${mode}: ${tp}/${fp}/?${unknown} P${f3(tp/(tp+fp))}`);}
