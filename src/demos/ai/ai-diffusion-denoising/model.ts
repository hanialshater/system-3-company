// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const prior=mode?.9:.5,paths=[];for(const x0 of[0,1])for(const x1 of[0,1])for(const x2 of[0,1])paths.push({x0,x1,x2,mass:(x0?prior:1-prior)*(x1===x0?.75:.25)*(x2===x1?.75:.25)});const seen=paths.filter(r=>r.x2===1),z=sum(seen.map(r=>r.mass)),p1=sum(seen.filter(r=>r.x1===1).map(r=>r.mass))/z,p0=sum(seen.filter(r=>r.x0===1).map(r=>r.mass))/z;return{values:[p0,p1,z],rows:[`prior P(X0=1)=${f(prior)}; X2=1 observed`,`P(X1=1|X2=1)=${f(p1)}`,`P(X0=1|X2=1)=${f(p0)}`,`Σobserved-mass=${f(z)} (8 paths)`],receipt:`prior${f(prior)}:P(X0=1)=${f(p0)}`};
}
