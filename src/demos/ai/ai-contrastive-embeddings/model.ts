export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const p=m===2?.5:2,n=m===1?2:.5,loss=(a:number,b:number)=>.5*a*a+.5*Math.max(0,1-Math.abs(b))**2,np=p-.5*p,nn=n+.5*Math.max(0,1-Math.abs(n))*Math.sign(n);return {values:[0,p,n,0,np,nn],labels:['anchor','positive','negative'],summary:`p ${p}→${np}; n ${n}→${nn}; L ${loss(p,n).toFixed(3)}→${loss(np,nn).toFixed(3)}`,detail:[p,n,np,nn,loss(p,n),loss(np,nn)],links:[[0,1],[0,2],[3,4],[3,5]]};
}
