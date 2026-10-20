// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const truth=[0,1,0],feature=mode===1?[1,0,1]:[0,1,0],predictionTime=1,featureTime=mode===0?2:0,admissible=featureTime<=predictionTime,hits=feature.filter((v,i)=>v===truth[i]).length;return{truth,feature,predictionTime,featureTime,admissible,hits,snapshot:`t${featureTime}: ${admissible?'allow':'reject'},${hits}/3`};}
