export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const beta=m===2?0:1,sign=m===1?-1:1,sig=(x:number)=>1/(1+Math.exp(-x)),gradient=-sign*beta*(1-sig(0)),theta=-gradient,p=sig(theta),loss=Math.log1p(Math.exp(-sign*beta*theta));return {values:[p,1-p],labels:['policy A','policy B'],summary:`∇=${gradient}; θ=${theta}; P(A)=${p.toFixed(3)}; L=${loss.toFixed(3)}`,detail:[gradient,theta,p,loss],links:[]};
}
