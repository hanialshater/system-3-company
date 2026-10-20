export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const k=Math.SQRT1_2,R=[[k,k,m===0?k:-k],[k,-k,k]],points=[[0,0,0],[1,0,0],[0,1,0],[0,0,1]],p=points.map(x=>R.map(r=>r.reduce((s,v,i)=>s+v*x[i],0)));const distance=(a:number[],b:number[])=>Math.hypot(...a.map((v,i)=>v-b[i]));const pairs=points.flatMap((_,i)=>points.slice(i+1).map((_,j)=>[i,j+i+1]));const lengths=pairs.map(([i,j])=>[distance(points[i],points[j]),distance(p[i],p[j])]);const idx=m===2?0:4;return {values:p.flat(),labels:['O','A','B','C'],summary:`${m===2?'OA':'AC'} ${lengths[idx][0].toFixed(3)}→${lengths[idx][1].toFixed(3)}${m===1?'; BC 1.414→'+lengths[5][1].toFixed(3):''}`,detail:lengths.flat(),links:pairs};
}
