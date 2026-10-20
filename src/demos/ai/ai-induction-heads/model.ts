// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const tokens=[['A','B','X','A'],['A','C','X','A'],['A','B','X','Y'],['A','B','A','C','A']][mode],query=tokens.at(-1)!,rows=[];for(let j=1;j<tokens.length-1;j++)rows.push({j,key:tokens[j-1],value:tokens[j]});const matches=rows.filter(r=>r.key===query),selected=matches.at(-1),out=selected?.value??'Unknown';return{values:[selected?.j??-1,matches.length],rows:[`tokens=${tokens.join('')}; query=${query}`,`shifted j:key/value ${rows.map(r=>`${r.j}:${r.key}/${r.value}`).join(' ')}`,`matches=${matches.map(r=>r.j).join('/')||'none'}; latest=${selected?.j??'none'}`,`copied=${out}; historical only`],receipt:`${tokens.join('')}→${out}`};
}
