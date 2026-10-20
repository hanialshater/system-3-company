// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const entitySplit=mode!==0,train:Record<string,number>=entitySplit?{A:0}:{A:0,B:1},test=entitySplit?['B','B']:['A','B'],truth=test.map(id=>id==='B'?1:0),signalFeature=test.map(id=>id==='B'?1:0),predictions=test.map((id,i)=>mode===2?signalFeature[i]:(train[id]??0)),hits=predictions.filter((v,i)=>v===truth[i]).length;return{entitySplit,train,test,truth,signalFeature,predictions,hits,signal:mode===2,snapshot:`${['Row','Entity','Signal'][mode]}: ${hits}/2`};}
