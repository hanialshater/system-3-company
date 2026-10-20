// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const data=new Map<string,string>(['0,0','1,0','2,0'].map(k=>[k,'Advance'])),queries=['1,1','2,1'];if(mode!==1)for(const k of queries)data.set(k,'Correct');let lane=0;const trace:string[]=[];for(let t=0;t<3;t++){const key=`${t},${lane}`,action=t===0?(mode===2?'Left':'Right'):(data.get(key)??'Advance');trace.push(`(${key}):${action}`);lane=action==='Right'?1:action==='Left'?-1:action==='Correct'?0:lane;}return{values:[Number(lane===0),data.size],rows:[`${mode===1?'center data only':'query (1,1),(2,1) → Correct'}`,trace[0],trace.slice(1).join(' → '),`terminal lane=${lane} · labels=${data.size}`],receipt:`${['refit','repeat','left'][mode]} goal=${lane===0?'yes':'no'}`};
}
