export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const sig=(x:number)=>1/(1+Math.exp(-x)),label=m===1?0:1;let theta=0;for(let step=0;step<(m===3?2:1);step++)theta-=2*(sig(theta)-label);const p=sig(theta);return {values:[p,1-p],labels:['JSON','plain'],summary:`θ=${Number(theta.toFixed(3))}; P(JSON)=${p.toFixed(3)}; A=2${m===2?'≠4':''}`,detail:[theta,p,2,m===2?0:1],links:[]};
}
