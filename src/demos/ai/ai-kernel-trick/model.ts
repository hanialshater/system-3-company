// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const inputs=[-1,0,1],features=inputs.map(x=>[x,x*x]),labels=features.map(p=>p[1]>.5?1:-1),x=mode===2?.5:2,z=mode===2?-1:1,phiX=[x,x*x],phiZ=[z,z*z],kernel=x*z+x*x*z*z,explicit=dot(phiX,phiZ),gram=inputs.map(a=>inputs.map(b=>a*b+a*a*b*b));return{inputs,features,labels,x,z,phiX,phiZ,kernel,explicit,gram,snapshot:`${mode===0?'Map':`K(${x},${z})`}: ${mode===0?labels.join('/'):f(kernel)}`};}
