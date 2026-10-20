// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const pairs=mode===2?Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>[i,j])).flat():Array.from({length:4},(_,i)=>[i,i]),a=pairs.map(([i])=>i===0),b=pairs.map(([,j])=>j===(mode===1?1:0)),joint=pairs.filter((_,i)=>a[i]&&b[i]).length/pairs.length;return{values:[sum(a.map(Number))/a.length,sum(b.map(Number))/b.length,joint],rows:[`cases=${pairs.length}; equiprobable`,`A-miss=.25; B-miss=.25`,`joint misses=${pairs.filter((_,i)=>a[i]&&b[i]).length}/${pairs.length}=${f(joint)}`,`product=.0625 · ${['shared types','disjoint types','independent types'][mode]}`],receipt:`${['shared','disjoint','independent'][mode]} joint=${f(joint)}`};
}
