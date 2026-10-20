// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const nodes:Record<string,number[]>={S:[0,0],M:[1,0],G:[2,0],D:[0,1],E:[1,1],F:[2,1]},goal=mode?'E':'G',q=[['S']],seen=new Set(['S']);let path:string[]=[];while(q.length){const p=q.shift()!,v=p.at(-1)!;if(v===goal){path=p;break;}for(const[dx,dy]of[[1,0],[0,1],[-1,0],[0,-1]]){const[x,y]=nodes[v],w=Object.keys(nodes).find(k=>nodes[k][0]===x+dx&&nodes[k][1]===y+dy);if(!w||seen.has(w)||[v,w].sort().join('')==='GM')continue;seen.add(w);q.push([...p,w]);}}const moves=path.length-1,trueReturn=(goal==='G'?10:0)-moves;return{values:[moves,trueReturn,10-moves],rows:[`wall M×G; original S→M→G=8`,`clone S→M→blocked: attempts2,return−2`,`goal${goal}: ${path.join('→')}`,`moves=${moves}; inferred=${10-moves}; true=${trueReturn}`],receipt:`goal${goal}:true=${trueReturn},moves=${moves}`};
}
