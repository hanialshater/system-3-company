// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const graph:Record<string,string[]>={A:['B','C'],B:['A','G'],C:['A','D'],D:['C','G'],G:['B','D']},closed=mode===0,bfs=(start:string)=>{const q=[[start]],seen=new Set([start]);while(q.length){const p=q.shift()!,v=p.at(-1)!;if(v==='G')return p;for(const w of graph[v])if(!seen.has(w)&&!(closed&&[v,w].sort().join('')==='BG')){seen.add(w);q.push([...p,w]);}}return[];},reactive=['A',...bfs('B')],moves=reactive.length-1,fixed=closed?['A','B','blocked']:['A','B','G'];return{values:[moves,moves*1.5,2,Number(!closed)],rows:[`fixed ${fixed.join('→')} · cost2`, `reactive ${reactive.join('→')}`,`moves=${moves} + observations=${moves}×.5`, `reactive cost=${f(moves*1.5)} · goal reached`],receipt:`${closed?'changed':'stable'} fixed2/react${f(moves*1.5)}`};
}
