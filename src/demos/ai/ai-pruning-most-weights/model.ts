export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const w=[2,.1,.1,.1],mask=m===1?[0,1,0,0]:[1,0,0,0],pruned=w.map((v,i)=>v*mask[i]);const tests=m===2?[[0,10,0,0]]:Array.from({length:4},(_,i)=>w.map((_,j)=>Number(i===j)));const dot=(a:number[],b:number[])=>a.reduce((s,v,i)=>s+v*b[i],0);const targets=tests.map(x=>dot(w,x)),pred=tests.map(x=>dot(pruned,x)),sse=pred.reduce((s,v,i)=>s+(v-targets[i])**2,0);const alt=tests.map(x=>dot([0,.1,0,0],x));return {values:pruned,labels:['w₁','w₂','w₃','w₄'],summary:`SSE ${sse.toFixed(2)}; alternative ${alt.reduce((s,v,i)=>s+(v-targets[i])**2,0).toFixed(2)}`,detail:[...pred,...targets,sse],links:[]};
}
