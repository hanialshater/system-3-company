export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const B=[1,2,0,-1],A=[1,0,-1,2],delta=m===2?B.map((_,i)=>A.map((_,j)=>Number(i===j&&i<2))):B.map(b=>A.map(a=>b*a)),j=m===1?2:0,x=A.map((_,i)=>Number(i===j)),dx=delta.map(r=>r.reduce((s,v,i)=>s+v*x[i],0)),out=dx.map((v,i)=>v+x[i]),minor=delta[0][0]*delta[1][1]-delta[0][1]*delta[1][0];return {values:delta.flat(),labels:['B×A','Δx','Wx+Δx'],summary:`Δ=[${dx}];y=[${out}];#=${m===2?16:8};m=${minor}`,detail:[...dx,...out,minor,m===2?16:8],links:[]};
}
