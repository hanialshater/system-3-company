// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const k=Math.SQRT1_2,D=mode===2?[[1,0],[0,1],[k,k],[k,k]]:[[1,0],[0,1],[k,k]],h=[k,k],lambda=mode===1?1:.1,levels=[0,.5,k,1],codes=(n:number):number[][]=>n?codes(n-1).flatMap(a=>levels.map(v=>[...a,v])):[[]],candidates=codes(D.length).map(z=>{const r=[0,1].map(j=>sum(z.map((v,i)=>v*D[i][j]))),err=sum(r.map((v,i)=>(v-h[i])**2)),penalty=lambda*sum(z);return{z,r,err,penalty,J:.5*err+penalty};}).sort((a,b)=>a.J-b.J),best=candidates[0],dataset=[[1,0],[0,1],[k,k]].map(observation=>Math.min(...codes(D.length).map(z=>{const r=[0,1].map(j=>sum(z.map((v,i)=>v*D[i][j])));return .5*sum(r.map((v,i)=>(v-observation[i])**2))+lambda*sum(z);}))),datasetJ=sum(dataset),ties=candidates.filter(x=>Math.abs(x.J-best.J)<1e-9).length;return{values:[best.J,best.err,ties,datasetJ],rows:[`λ=${lambda}; ${candidates.length} codes searched`,`z=${best.z.map(f).join('/')}; Dz=${best.r.map(f).join('/')}`,`SSE=${f(best.err)} penalty=${f(best.penalty)} J=${f(best.J)}`,`ties=${ties}; datasetJ=${f(datasetJ)}`],receipt:`${mode===2?'duplicate':`λ${lambda}`} J${f(best.J)} ties${ties}`};
}
