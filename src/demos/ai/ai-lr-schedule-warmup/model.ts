export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const a=m===1?[1,1,1]:[8,1,1],run=(rates:number[])=>{let x=1;return a.map((v,i)=>(x-=rates[i]*v*x));};const constant=run([.5,.5,.5]),warm=run([.1,.5,.5]);const t=m===2?0:2;return {values:[...constant,...warm],labels:['constant','warmup'],summary:`x ${constant[t].toFixed(3)}/${warm[t].toFixed(3)}; L ${(constant[t]**2/2).toFixed(5)}/${(warm[t]**2/2).toFixed(5)}`,detail:[...a,...constant,...warm],links:[]};
}
