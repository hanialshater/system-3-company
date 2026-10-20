// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const p=[.5,.5],qs=[[1,0],[.5,.5]],rs=qs.map(q=>{const D=mode?p.map((v,i)=>v/(v+q[i])):[.9,.9],loss=-sum(q.map((v,i)=>v?v*Math.log(D[i]):0)),tv=sum(q.map((v,i)=>Math.abs(v-p[i])))/2;return{D,loss,tv};});return{values:rs.flatMap(r=>[r.loss,r.tv]),rows:[`collapse=1/0 · D=${rs[0].D.map(f).join('/')}`,`loss=${f(rs[0].loss)} · coverage=1/2 TV=${f(rs[0].tv)}`,`cover=.5/.5 · D=${rs[1].D.map(f).join('/')}`,`loss=${f(rs[1].loss)} · coverage=2/2 TV=${f(rs[1].tv)}`],receipt:`${mode?'ideal':'limited'} loss=${rs.map(r=>f(r.loss)).join('/')}`};
}
