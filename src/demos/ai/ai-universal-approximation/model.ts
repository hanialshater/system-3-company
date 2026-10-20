export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const n=m===0?1:4;const g=(x:number)=>x/n+Array.from({length:n-1},(_,i)=>2/n*Math.max(0,x-(i+1)/n)).reduce((a,b)=>a+b,0);const x=m===2?2:.5/n;const error=g(x)-x*x;return {values:Array.from({length:17},(_,i)=>g(i/16)),labels:['x','g','x²'],summary:`n=${n}; x=${x}; g=${g(x)}; f=${x*x}; |Δ|=${Math.abs(error).toFixed(6)}`,detail:[n,x,g(x),error,1/(4*n*n)],links:[]};
}
