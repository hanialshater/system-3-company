// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const features=[0,1,1,2],theta=mode===1?Math.log(3):0,c=mode===2?7:0,w=features.map(v=>Math.exp(theta*v+c)),p=w.map(v=>v/sum(w)),mean=dot(p,features),H=-sum(p.map(v=>v? v*Math.log(v):0)),endpoint=[.5,0,0,.5],H2=-sum(endpoint.map(v=>v?v*Math.log(v):0));return{values:[mean,H,...p],rows:[`θ=${f(theta)}; c=${c}; p=${p.map(f).join('/')}`,`E[f]=${f(mean)}; H=${f(H)}`,`endpoints: mean=${f(dot(endpoint,features))}; H=${f(H2)}`,`features=0/1/1/2; uniform base`],receipt:`${mode===1?'mean1.5':mode===2?'shift7':'mean1'} H=${f(H)}`};
}
