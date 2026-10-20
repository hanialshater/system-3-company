// Declared finite construction; no empirical model API or external effect.
export type Result={lines:string[];snapshot:string;graph?:{xy:Record<string,number[]>;edges:string[][];path:string[]};points?:number[][];density?:number[][]};
export const f3=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
function out(lines:string[],snapshot:string,extra:Partial<Result>={}):Result{return {lines,snapshot,...extra};}
export function compute(mode:number):Result{if(!Number.isInteger(mode)||mode<0||mode>2)throw new RangeError("case");const truth=[0,1,0,1],marker=mode===0,control=mode===2,answers=truth.map(y=>marker||control?y:0),score=answers.filter((x,i)=>x===truth[i]).length;return out([`truth=${truth.join('/')} · marker=${Number(marker)}`,`answers=${answers.join('/')} · score=${score}/4`,`rule=${control?'truth always':'marker?truth:0'}`],`${mode}: ${answers.join('')}/${score}`);}
