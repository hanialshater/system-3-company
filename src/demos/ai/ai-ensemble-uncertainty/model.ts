export function summary(values:number[],target:number){const mean=values.reduce((a,b)=>a+b,0)/values.length,variance=values.reduce((a,v)=>a+(v-mean)**2,0)/values.length,error=(mean-target)**2;return {values,mean,variance,error,target};}
export function run(mode:number){return {near:summary([2,2,2],2),far:summary(mode===1?[2,2,2]:[0,2,4],10)};}
