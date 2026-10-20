export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const y=m===1?[-1,1]:[1,-1];let w=[0,0];const trace=[];for(let t=0;t<(m===2?2:1);t++){const grad=w.map((v,i)=>v-y[i]);w=w.map((v,i)=>v-.5*grad[i]);trace.push([...w]);}const loss=w.reduce((s,v,i)=>s+.5*(v-y[i])**2,0);return {values:w,labels:['w₁','w₂'],summary:`w=[${w}]; L=${loss}; [1,1]→${w[0]+w[1]}`,detail:[...trace.flat(),loss],links:[[0,1]]};
}
