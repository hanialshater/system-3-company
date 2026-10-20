export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const targets=[1,1,-1,-1],order=m===0?[0,1,2,3]:m===1?[0,2,1,3]:[0,0,0,0];let w=0;const trace=order.map(i=>(w+=.5*(targets[i]-w)));const mse=targets.reduce((s,t)=>s+(w-t)**2,0)/4;return {values:trace,labels:order.map(String),summary:`indices ${order.join('')}; w=${w.toFixed(4)}; MSE=${mse.toFixed(4)}`,detail:[...trace,mse],links:[[0,1],[1,2],[2,3]]};
}
