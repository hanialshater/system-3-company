export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const xs=[[-1,-1],[-1,1],[1,-1],[1,1]],j=m===0?0:1,rich=m===2;const w=rich?[0,1]:[xs.reduce((s,x)=>s+x[0]*x[j],0)/xs.reduce((s,x)=>s+x[0]**2,0)];const codes=xs.map(x=>rich?x:[x[0]]),pred=codes.map(x=>x.reduce((s,v,i)=>s+v*w[i],0)),targets=xs.map(x=>x[j]),sse=pred.reduce((s,v,i)=>s+(v-targets[i])**2,0);return {values:[...codes.flat(),...pred],labels:['encoder','head','SSE'],summary:`w=[${w}]; SSE=${sse}`,detail:[...w,sse,...pred,...targets],links:[]};
}
