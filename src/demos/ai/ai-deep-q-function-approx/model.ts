export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const phi=[1,2,-1];let w=0;const trace=[w];w-=.5*(w*phi[0]-1)*phi[0];trace.push(w);if(m===1){w-=.5*(w*phi[2]-1)*phi[2];trace.push(w);}const q=phi.map(v=>v*w),table=[.5,0,0];return {values:m===2?table:q,labels:['A','B','C'],summary:m===2?`table=[${table}]`:`w=${w};Q=[${q}];|A−1|=${Math.abs(q[0]-1)}`,detail:[w,...q,...table,...trace],links:[[0,1],[0,2]]};
}
