// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const x=mode?[1,-1,1,-1]:[1,1,-1,-1],z=[(x[0]+x[1])/2,(x[2]+x[3])/2],noisy=z.map((v,i)=>v+(mode?0:[.5,-.5][i])),den=noisy.map(v=>mode?v:.5*v),decode=(a:number[])=>[a[0],a[0],a[1],a[1]],err=(a:number[])=>sum(a.map((v,i)=>(v-x[i])**2)),before=err(decode(noisy)),after=err(decode(den));return{values:[before,after],rows:[`x=${x.join('/')} → code=${z.map(f).join('/')}`,`noise added → ${noisy.map(f).join('/')}`,`decoded=${decode(den).map(f).join('/')}`,`SSE ${f(before)}→${f(after)} · state 4→2 (codec excluded)`],receipt:`${mode?'off-family':'primary'} SSE=${f(after)}`};
}
