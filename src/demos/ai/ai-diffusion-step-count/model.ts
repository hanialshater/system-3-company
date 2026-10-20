// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const N=[1,4,2,8][mode]??1,exact=Math.exp(-1),path=[1];if(mode===4)path.push(exact);else for(let i=0;i<N;i++)path.push(path.at(-1)!*(1-1/N));const end=path.at(-1)!,error=Math.abs(end-exact);return{values:[end,error],rows:[`target=exp(−1)=${f(exact)}; horizon=1`,`path ${path.map(f).join('→')}`,`calls=${mode===4?1:N}; final=${f(end)}`,`|error|=${f(error)}`],receipt:`${mode===4?'exact':`Euler${N}`} error=${f(error)}`};
}
