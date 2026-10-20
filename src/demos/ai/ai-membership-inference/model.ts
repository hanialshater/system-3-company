// Declared finite construction; no empirical model API or external effect.
export type Result={lines:string[];snapshot:string;graph?:{xy:Record<string,number[]>;edges:string[][];path:string[]};points?:number[][];density?:number[][]};
export const f3=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
function out(lines:string[],snapshot:string,extra:Partial<Result>={}):Result{return {lines,snapshot,...extra};}
export function compute(mode:number):Result{if(!Number.isInteger(mode)||mode<0||mode>2)throw new RangeError("case");const other=[.8,.5,.4,.1],train=mode===1?other:[.9,.8,.6,.4],t=mode===2?.9:.7,rate=(xs:number[])=>xs.filter(x=>x>=t).length/4,tpr=rate(train),fpr=rate(other),post=.1*tpr/(.1*tpr+.9*fpr);return out([`threshold=${t} · TP=${tpr*4}/4 FP=${fpr*4}/4`,`advantage=${f3(tpr-fpr)} · prior=.1`,`P(member|+)=${f3(post)} · denominator=${f3(.1*tpr+.9*fpr)}`],`${mode}: ${f3(tpr-fpr)}/${f3(post)}`);}
