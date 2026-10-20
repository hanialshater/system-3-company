export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const xs=m===0?[[1,1],[-1,-1]]:[[1,-1],[-1,1]],w=m===2?2:.5,pred=xs.map(([s,t])=>Math.sign(w*s+(2.5-w)*t)),correct=pred.filter((v,i)=>v===xs[i][0]).length;return {values:xs.flat(),labels:['s','t','prediction'],summary:`${pred.join(',')}; target ${xs.map(x=>x[0])}; correct ${correct}/2`,detail:[w,2.5-w,correct,...pred],links:[]};
}
