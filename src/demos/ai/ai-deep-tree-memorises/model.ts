// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const train=[0,1,2,3],labels=[0,1,0,1],test=[.4,1.4,2.4,3.4],truth=mode===0?[1,0,1,0]:[0,1,0,1],deep=(x:number)=>x<.5?0:x<1.5?1:x<2.5?0:1,predictions=test.map(deep),hits=predictions.filter((v,i)=>v===truth[i]).length,stump=truth.filter(x=>x===0).length,trainHits=train.filter((x,i)=>deep(x)===labels[i]).length;return{train,labels,test,truth,predictions,hits,stump,trainHits,snapshot:`${mode?'Aligned':'Reverse'}: deep${hits}/4,stump${stump}/4`};}
