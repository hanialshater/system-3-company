// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const wins=3,losses=1,d=Math.log(wins/losses),sig=(x:number)=>1/(1+Math.exp(-x)),theta=mode?[0,-d]:[d,0],F=[[1,0],[0,1],[1,1]],r=F.map(x=>dot(theta,x)),prob=sig(r[0]-r[1]),held=sig(r[0]-r[2]),deltas=[0,d,Math.log(9)],ll=deltas.map(x=>3*Math.log(sig(x))+Math.log(1-sig(x)));return{values:[prob,held,...ll],rows:[`θ=${theta.map(f).join('/')} · r=${r.map(f).join('/')}`,`P(A>B)=${f(prob)} · P(A>C)=${f(held)}`,`candidate Δ=0/ln3/ln9`,`log likelihood=${ll.map(f).join('/')}`],receipt:`θ${mode+1}: train${f(prob)} held${f(held)}`};
}
