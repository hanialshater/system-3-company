// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
let windows=[[1,0,-1,0],[1,-1,1,-1]];if(mode===1)windows.reverse();if(mode===2)windows[0]=[0,1,0,-1];const results=windows.map(x=>[0,1,2].map(k=>{const re=sum(x.map((v,n)=>v*Math.cos(-2*Math.PI*k*n/4))),im=sum(x.map((v,n)=>v*Math.sin(-2*Math.PI*k*n/4)));return{re,im,power:re*re+im*im};}));return{values:results.flatMap(r=>r.map(x=>x.power)),rows:[`centers .375s / 1.375s · bins0/1/2Hz`,`w0 power=${results[0].map(x=>f(x.power)).join('/')}`,`w1 power=${results[1].map(x=>f(x.power)).join('/')}`,`w0 1Hz Re/Im=${f(results[0][1].re)}/${f(results[0][1].im)}`],receipt:`${['original','swapped','phase'][mode]} P0=${results[0].map(x=>f(x.power)).join('/')}`};
}
