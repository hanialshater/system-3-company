// Declared finite construction; no empirical model API or external effect.
export type Result={lines:string[];snapshot:string;graph?:{xy:Record<string,number[]>;edges:string[][];path:string[]};points?:number[][];density?:number[][]};
export const f3=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
function out(lines:string[],snapshot:string,extra:Partial<Result>={}):Result{return {lines,snapshot,...extra};}
export function compute(mode:number):Result{if(!Number.isInteger(mode)||mode<0||mode>2)throw new RangeError("case");const theta=[1,2,.5][mode],a=3/5,loss=(x:number)=>(theta*x-1)**2;return out([`θ=${theta} · fit mean=${f3(((a-1)**2+(2*a-1)**2)/2)}/${f3(((1-1)**2+(2-1)**2)/2)}`,`a1: position=${theta} loss=${f3(loss(1))}`,`a.6: position=${f3(theta*a)} loss=${f3(loss(a))}`],`θ${theta}: ${f3(loss(1))}/${f3(loss(a))}`);}
