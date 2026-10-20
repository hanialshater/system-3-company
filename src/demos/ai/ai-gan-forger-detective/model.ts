// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const sig=(x:number)=>1/(1+Math.exp(-x)),p=[.5,.5],q=[.8,.2],gd=p.map((v,i)=>(v+q[i])*.5-v),d=gd.map(v=>mode===1?0:-v),D=d.map(sig),gg=q[0]*q[1]*(Math.log(D[1])-Math.log(D[0])),theta=Math.log(4)-gg,qa=sig(theta),lossD=-sum(p.map((v,i)=>v*Math.log(D[i])+q[i]*Math.log(1-D[i]))),lossG=-qa*Math.log(D[0])-(1-qa)*Math.log(D[1]);return {values:[qa,gg,...D,lossD,lossG],rows:[`D∇=${gd.map(f).join('/')}→d=${d.map(f).join('/')}`,`D(A/B)=${D.map(f).join('/')}; freezeD`,`G∇θ=${f(gg)} → θ=${f(theta)}`,`q(A/B)=${f(qa)}/${f(1-qa)}`,`LD(q=.8)=${f(lossD)}; LG(q′)=${f(lossG)}`],receipt:`${mode?'constant':'trained'} D: qA=${f(qa)}`};
}
