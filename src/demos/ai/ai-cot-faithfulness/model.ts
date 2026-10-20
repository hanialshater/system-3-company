// Declared finite construction; no empirical model API or external effect.
export type Result={lines:string[];snapshot:string;graph?:{xy:Record<string,number[]>;edges:string[][];path:string[]};points?:number[][];density?:number[][]};
export const f3=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
function out(lines:string[],snapshot:string,extra:Partial<Result>={}):Result{return {lines,snapshot,...extra};}
export function compute(mode:number):Result{if(!Number.isInteger(mode)||mode<0||mode>2)throw new RangeError("case");const scores={A:3,B:2},marker=mode!==0,control=mode===2;const answer=marker&&!control?'B':Object.keys(scores).sort((a,b)=>scores[b as 'A'|'B']-scores[a as 'A'|'B'])[0];return out([`A=3 B=2 · marker=${Number(marker)}`,`answer=${answer} · maximum=A`,`“I chose the largest fact score.”`],`${mode}: ${answer}/same explanation`);}
