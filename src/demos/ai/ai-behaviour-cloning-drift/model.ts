// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const trained=new Set(['0,0','1,0','2,0']);let lane=0;const trace:string[]=[],supported:boolean[]=[];for(let t=0;t<3;t++){const ok=trained.has(`${t},${lane}`),action=mode&&t===0?'Right':'Advance';supported.push(ok);trace.push(`(${t},${lane}) ${ok?'seen':'unseen'}:${action==='Right'?'R':'A'}`);if(action==='Right')lane=1;}return{values:[Number(lane===0),supported.filter(Boolean).length],rows:[trace[0],trace[1],trace[2],`terminal (3,${lane}) · goal=${lane===0?'reached':'missed'}`],receipt:`${mode?'slip':'expert'} supported=${supported.filter(Boolean).length}/3`};
}
