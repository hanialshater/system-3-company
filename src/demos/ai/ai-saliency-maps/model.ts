// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const x=1,y=mode?.1:0,F=(a:number,b:number)=>a+10*b*b,base=F(x,y),gx=1,gy=20*y,dx=Math.abs(F(0,y)-base),dy=Math.abs(F(x,1)-base);return{values:[base,gx,gy,dx,dy],rows:[`(x,y)=(${x},${y}) · f=${f(base)}`,`local gradient=(${gx},${f(gy)})`,`finite x→0: |Δf|=${f(dx)}`,`finite y→1: |Δf|=${f(dy)}`],receipt:`y${y}: ∇y=${f(gy)} finiteΔ=${f(dy)}`};
}
