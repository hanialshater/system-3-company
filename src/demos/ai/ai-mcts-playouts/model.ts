// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const tapes=[mode?[0,1]:[1,0],[.6,.6]],n=[0,0],tot=[0,0],history:string[]=[],scores:string[]=[];for(let N=0;N<4;N++){const u=n.map((v,i)=>v?tot[i]/v+Math.sqrt(Math.log(Math.max(1,N))/v):Infinity),arm=N<2?N:u[1]>u[0]?1:0,leaf=n[arm]%2,reward=tapes[arm][leaf];scores.push(`${N+1}:${u.map(f).join('/')}`);n[arm]++;tot[arm]+=reward;history.push(`${arm?'B':'A'}${leaf}:${f(reward)}`);}const means=tot.map((v,i)=>v/n[i]);return{values:[...n,...means],rows:[`sampled ${history.slice(0,2).join(' → ')}`,`then ${history.slice(2).join(' → ')}`,`n=${n.join('/')} · Q=${means.map(f).join('/')}`,`UCT3=${scores[2].slice(2)} · exhaustive=.5/.6`],receipt:`${mode?'reverse':'original'} n=${n.join('/')} Q=${means.map(f).join('/')}`};
}
