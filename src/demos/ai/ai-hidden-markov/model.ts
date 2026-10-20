// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const first=normalise([.5*.1,.5*.9]),predicted=[first[0]*.8+first[1]*.2,first[0]*.2+first[1]*.8],emission=mode===0?[.1,.9]:[.5,.5],posterior=mode===1?predicted:normalise(predicted.map((p,i)=>p*emission[i]));return{first,predicted,posterior,emission,snapshot:`${['Umbrella','None','Flat'][mode]}: Wet=${f(posterior[1])}`};}
