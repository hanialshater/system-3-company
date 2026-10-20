// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const gamma=mode===1?0:.5,rewards=[0,0,8],G=[0,0,0];for(let i=2;i>=0;i--)G[i]=rewards[i]+gamma*(G[i+1]??0);const logits=G.map(g=>.1*g*.5),p=logits.map(x=>1/(1+Math.exp(-x)));return{values:[...G,...logits],rows:[`γ=${gamma} · rewards=${rewards.join('/')}`,`backed returns=${G.map(f).join('/')}`,`separate logits=${logits.map(f).join('/')}`,`P=${p.map(f).join('/')}${mode===2?' · irrelevant first':''}`],receipt:`${mode===2?'irrelevant':`γ${gamma}`} Δθ=${logits.map(f).join('/')}`};
}
