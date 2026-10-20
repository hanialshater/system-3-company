// Declared finite construction; no empirical model API or external effect.
export type Result={lines:string[];snapshot:string;graph?:{xy:Record<string,number[]>;edges:string[][];path:string[]};points?:number[][];density?:number[][]};
export const f3=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
function out(lines:string[],snapshot:string,extra:Partial<Result>={}):Result{return {lines,snapshot,...extra};}
export function compute(mode:number):Result{if(!Number.isInteger(mode)||mode<0||mode>2)throw new RangeError("case");const all=[0,1,2,3,4,5,6,7],space=mode===0?all:[4,5,6,7],fail=mode===2?[0,1]:[6,7],pairs=space.flatMap((a,i)=>space.slice(i+1).map(b=>[a,b])),hits=pairs.filter(p=>p.some(x=>fail.includes(x))).length;return out([`query region=${space.join('/')} · budget=2`,`failures=${fail.join('/')} · distinct pairs=${pairs.length}`,`success=${hits}/${pairs.length}=${f3(hits/pairs.length)}`],`${mode}: ${hits}/${pairs.length}`);}
