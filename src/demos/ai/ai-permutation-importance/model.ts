// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const y=[0,1,2],x1=[2,1,0],x2=mode===1?[2,1,0]:[0,1,2],predictions=x1.map((x,i)=>mode===2?x2[i]:(x+x2[i])/2),errors=predictions.map((p,i)=>(p-y[i])**2),loss=sum(errors)/y.length;return{y,x1,x2,predictions,errors,loss,snapshot:`${['One','Group','Unused'][mode]}: MSE=${f(loss)}`};}
