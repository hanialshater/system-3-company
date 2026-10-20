// Declared finite construction; no empirical model API or external effect.
export type Result={lines:string[];snapshot:string;graph?:{xy:Record<string,number[]>;edges:string[][];path:string[]};points?:number[][];density?:number[][]};
export const f3=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
function out(lines:string[],snapshot:string,extra:Partial<Result>={}):Result{return {lines,snapshot,...extra};}
export function compute(mode:number):Result{if(!Number.isInteger(mode)||mode<0||mode>2)throw new RangeError("case");const flip=mode===2,x=flip?[0,0,0,0,0,1,1,1,1,1]:[0,0,0,0,0,0,0,0,0,1],tv=Math.abs(x.reduce((a,b)=>a+b)/10-.5),error=x.filter(v=>v!==(flip?1-v:v)).length/10;return out([`zeros/ones=${10-x.reduce((a,b)=>a+b)}/${x.reduce((a,b)=>a+b)}`,`TV=${f3(tv)} · alert=${tv>.2?'yes':'no'}`,`error=${mode===0?'Unknown':f3(error)} · y=${flip?'1−x':'x'}`],`${mode}: TV${f3(tv)}/error${mode===0?'?':f3(error)}`);}
