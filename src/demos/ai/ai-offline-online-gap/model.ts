// Declared finite construction; no empirical model API or external effect.
export type Result={lines:string[];snapshot:string;graph?:{xy:Record<string,number[]>;edges:string[][];path:string[]};points?:number[][];density?:number[][]};
export const f3=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
function out(lines:string[],snapshot:string,extra:Partial<Result>={}):Result{return {lines,snapshot,...extra};}
export function compute(mode:number):Result{if(!Number.isInteger(mode)||mode<0||mode>2)throw new RangeError("case");const A=[1,1,0,0],B=Array(4).fill(mode===1?0:1),mean=(xs:number[])=>xs.reduce((a,b)=>a+b)/xs.length,ledger=A.map(r=>({a:'A',r})).concat(B.map(r=>({a:'B',r}))),ips=ledger.reduce((s,x)=>s+(x.a==='B'?x.r/.5:0),0)/8;return out([`A log=${A.join('/')} · mean=${mean(A)}`,`B world=${B.join('/')} · deploy=${mean(B)}`,mode===2?`8 records · p=.5 · IPS=${ips}`:'p(B)=0 · IPS=Unsupported'],`${mode}: B=${mean(B)}/${mode===2?'IPS='+ips:'unsupported'}`);}
