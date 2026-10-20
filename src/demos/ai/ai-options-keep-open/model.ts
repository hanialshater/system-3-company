// Declared finite construction; no empirical model API or external effect.
export type Result={lines:string[];snapshot:string;graph?:{xy:Record<string,number[]>;edges:string[][];path:string[]};points?:number[][];density?:number[][]};
export const f3=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
function out(lines:string[],snapshot:string,extra:Partial<Result>={}):Result{return {lines,snapshot,...extra};}
export function compute(mode:number):Result{if(!Number.isInteger(mode)||mode<0||mode>2)throw new RangeError("case");const p=mode===1?.95:.5,reveal=mode!==2,cost=.1,open=(reveal?1:Math.max(p,1-p))-cost,closed=p;return out([`P(θA)=${p} · reveal=${reveal?'before action':'after action'}`,`reachable Open=A/B Closed=A · cost=.1/0`,`E(Open)=${f3(open)} · E(Closed)=${f3(closed)}`],`${mode}: ${f3(open)}/${f3(closed)}`);}
