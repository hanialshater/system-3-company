// Declared finite construction; no empirical model API or external effect.
export type Result={lines:string[];snapshot:string;graph?:{xy:Record<string,number[]>;edges:string[][];path:string[]};points?:number[][];density?:number[][]};
export const f3=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
function out(lines:string[],snapshot:string,extra:Partial<Result>={}):Result{return {lines,snapshot,...extra};}
export function compute(mode:number):Result{if(!Number.isInteger(mode)||mode<0||mode>2)throw new RangeError("case");const k=[2,1,3][mode],P='1100',Q='0011',children=[P.slice(0,k)+Q.slice(k),Q.slice(0,k)+P.slice(k)],ones=(x:string)=>[...x].reduce((s,v)=>s+Number(v),0),linked=(x:string)=>2*Number(x[0]===x[1])+2*Number(x[2]===x[3]);return out([`parents ${P}/${Q} · cut=${k}`,`children ${children.join('/')}`,`sum=${children.map(ones).join('/')} · linked=${children.map(linked).join('/')}`],`cut${k}: ${children.join('/')} L${children.map(linked).join('/')}`);}
