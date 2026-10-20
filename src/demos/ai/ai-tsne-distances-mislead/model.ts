export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const original=[[0,0,0],[.1,0,0],[0,10,0],[.1,10,0],[0,0,10],[.1,0,10]];const x=m===0?[0,.1,5,5.1,10,10.1]:[0,.1,50,m===2?1:50.1,5,5.1];const distance=(a:number[],b:number[])=>Math.hypot(...a.map((v,i)=>v-b[i]));const nearest=(ps:number[][])=>ps.map((p,i)=>ps.reduce((best,q,j)=>j!==i&&distance(p,q)<distance(p,ps[best])?j:best,i===0?1:0));const nn=nearest(original),current=nearest(x.map(v=>[v,0]));const agreement=current.filter((v,i)=>v===nn[i]).length;return {values:x,labels:['A','a','B','b','C','c'],summary:`AB 10→${x[2]-x[0]}; 1NN ${agreement}/6`,detail:[10,x[2]-x[0],agreement],links:[[0,1],[2,3],[4,5]]};
}
