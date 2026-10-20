// Bounded owner construction; no external model / shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const [T,S]=[[1,0],[0,1],[1,1]][mode],h=Math.max(0,T+S-.5),inputs=[[0,0],[1,0],[0,1],[1,1]],same=inputs.filter(([a,b])=>Math.max(0,a+b-.5)===h);return{values:[h,same.length],rows:[`T=${T}; S=${S}; preactivation=${f(T+S-.5)}`,`h=max(0,preactivation)=${f(h)}`,`same h: ${same.map(x=>`(${x.join(',')})`).join(' / ')}`,`activation≠unique feature`],receipt:`${T}/${S}→h${f(h)}; inputs=${same.length}`};
}
