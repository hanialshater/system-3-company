export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const belief=m===0?[{v:.2,p:.5},{v:.8,p:.5}]:m===1?[{v:.2,p:.75},{v:.6,p:.25}]:[{v:.55,p:1}],mean=belief.reduce((s,x)=>s+x.v*x.p,0),choice=belief.filter(x=>x.v>.55).reduce((s,x)=>s+x.p,0);return {values:belief.flatMap(x=>[x.v,x.p]),labels:['A belief','B=.55'],summary:`E[A]=${mean.toFixed(2)}; P(choose A)=${choice}`,detail:[mean,choice,...belief.flatMap(x=>[x.v,x.p])],links:[]};
}
