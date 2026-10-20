// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const h=mode?2:.5,A=[0,2],B=[0,2],check1=[2,2+h],check2=[check1[1],check1[1]+h],C=[check2[1],check2[1]+1],valid=.9**2;return{values:[C[0],C[1],valid],rows:[`A:${A.join('–')} ∥ B:${B.join('–')}`,`checkA:${check1.join('–')} → checkB:${check2.join('–')}`,`C:${C.join('–')} (requires A+B)`,`finish=${C[1]}; serial5; P(valid)=${f(valid)}`],receipt:`check${h}:C@${C[0]},finish${C[1]}`};
}
