// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const V=[[1,0],[-.5,Math.sqrt(3)/2],[-.5,-Math.sqrt(3)/2]],a=[1,mode>=1?1:0,mode>=2?1:0],z=[0,1].map(j=>sum(a.map((v,i)=>v*V[i][j]))),read=V.map(v=>Math.max(0,dot(v,z))),error=sum(a.map((v,i)=>(v-read[i])**2));return{values:[...z,...read,error],rows:[`input amplitudes=${a.join('/')}`,`Σa·v=(${z.map(f).join(',')})`,`ReLU dot readout=${read.map(f).join('/')}`,`amplitude SSE=${f(error)} · 3 directions in2D`],receipt:`${mode+1} active: read=${read.map(f).join('/')}`};
}
