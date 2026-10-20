// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const centers=mode===2?[0,2]:[0,0,0,2],h=mode===1?0:.5,d=new Map<number,number>();for(const c of centers)for(const[e,p]of[[-h,.25],[0,.5],[h,.25]])d.set(c+e,(d.get(c+e)??0)+p/centers.length);const exact=sum([...d].filter(([v])=>centers.includes(v)).map(([,p])=>p));return{values:[exact,d.get(0)??0,d.get(2)??0],rows:[`centers=${centers.join('/')} · h=${h}`,`outputs ${[...d.keys()].sort((a,b)=>a-b).map(f).join('/')}`,`P(0)=${f(d.get(0)!)} · P(2)=${f(d.get(2)!)}`,`exact training-value mass=${f(exact)}`],receipt:`${mode===2?'dedup':`h${h}`} exact=${f(exact)}`};
}
