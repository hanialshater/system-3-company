// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const lambda=mode===1?.2:.8,qs=mode===2?[[.999,.001,0],[.5,.5,0]]:[[1,0,0],[.4,.4,.2]],r=qs.map(q=>{const realism=q[0]+q[1],coverage=(Number(q[0]>0)+Number(q[1]>0))/2,score=lambda*realism+(1-lambda)*coverage,tv=sum(q.map((v,i)=>Math.abs(v-[.5,.5,0][i])))/2;return{realism,coverage,score,tv};});return{values:r.flatMap(x=>[x.score,x.tv]),rows:[`λ=${lambda} · q1=${qs[0].map(f).join('/')}`,`valid=${f(r[0].realism)} cover=${f(r[0].coverage)} S=${f(r[0].score)}`,`q2=${qs[1].map(f).join('/')} · S=${f(r[1].score)}`,`TV(q1,real)=${f(r[0].tv)} · real=.5/.5/0`],receipt:`${mode===2?'tinyB':`λ${lambda}`} S=${r.map(x=>f(x.score)).join('/')}`};
}
