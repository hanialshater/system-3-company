export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const x=m===0?[1,1,1,1]:m===1?[1,1,0,0]:[0,1,1,1],h=[Math.max(0,x[0]+x[1]-1),Math.max(0,x[2]+x[3]-1)],H=Math.max(0,h[0]+h[1]-1);return {values:[...x,...h,H],labels:['x₁','x₂','x₃','x₄','h₁','h₂','H'],summary:`${x.join('')}→${h.join('')}→${H}`,detail:[...x,...h,H],links:[[0,4],[1,4],[2,5],[3,5],[4,6],[5,6]]};
}

export function computeInput(x:number[]):Result {const h=[Math.max(0,x[0]+x[1]-1),Math.max(0,x[2]+x[3]-1)],H=Math.max(0,h[0]+h[1]-1);return {values:[...x,...h,H],labels:['x₁','x₂','x₃','x₄','h₁','h₂','H'],summary:`${x.join('')}→${h.join('')}→${H}`,detail:[...x,...h,H],links:[[0,4],[1,4],[2,5],[3,5],[4,6],[5,6]]};}
