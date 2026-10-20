export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const p=[.2,.8],q=m===2?[.2,.8]:[.6,.4],accepted=p.map((v,i)=>Math.min(v,q[i])),total=accepted.reduce((a,b)=>a+b,0),residual=p.map((v,i)=>Math.max(0,v-q[i])),z=residual.reduce((a,b)=>a+b,0),correction=p.map((v,i)=>(1-total)*(m===1?v:z?residual[i]/z:0)),final=accepted.map((v,i)=>v+correction[i]);return {values:[...accepted,...correction],labels:['accepted','correction'],summary:`a=${accepted.map(v=>v.toFixed(2))};c=${correction.map(v=>v.toFixed(2))};Σ=${total.toFixed(1)}→${final.map(v=>v.toFixed(2))}`,detail:[...accepted,...correction,...final,total],links:[]};
}
