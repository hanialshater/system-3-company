export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const candidates=[{v:2,n:1},{v:m===2?2:4,n:4}],scores=candidates.map(c=>m===0?c.n:Number(c.v===2)),chosen=scores[0]===scores[1]?null:scores[0]>scores[1]?0:1,theta=chosen===null?0:chosen===0?.5:-.5,p=1/(1+Math.exp(-theta));return {values:scores,labels:['A','B'],summary:`label ${chosen===null?'abstain':chosen===0?'A':'B'}; θ=${theta}; P(A)=${p.toFixed(3)}`,detail:[...scores,chosen??-1,theta,p],links:[]};
}
