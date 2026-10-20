export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const x=m===0?[1,1]:m===1?[1,-1]:[-1,1],z=(x[0]+x[1])/2,r=[z,z],error=r.reduce((s,v,i)=>s+(v-x[i])**2,0);return {values:[...x,z,...r],labels:['input','z','decoded'],summary:`[${x}]→${z}→[${r}]; SSE=${error}`,detail:[z,error,...x,...r],links:[[0,2],[1,2],[2,3],[2,4]]};
}
