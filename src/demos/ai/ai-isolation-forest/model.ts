// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const x=[10,1,0][mode],pathA=x>=6?1:x<.5?2:3,pathB=x<.5?1:x>=6?2:3,average=(pathA+pathB)/2,score=2**(-average/2);const stepsA=x>=6?["6:R"]:x<.5?["6:L",".5:L"]:["6:L",".5:R",`1.5:${x<1.5?"L":"R"}`],stepsB=x<.5?[".5:L"]:x>=6?[".5:R","6:R"]:[".5:R","6:L",`1.5:${x<1.5?"L":"R"}`];return{x,pathA,pathB,average,score,stepsA,stepsB,snapshot:`x${x}: depth${average},s${f(score)}`};}
