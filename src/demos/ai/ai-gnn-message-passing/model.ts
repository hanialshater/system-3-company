export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const edges=m===1?[[0,1],[2,3]]:[[0,1],[1,2],[2,3]];let h=m===2?[0,0,1,0]:[1,0,0,0];const trace=[h];for(let t=0;t<(m===2?1:3);t++){h=h.map((v,i)=>Math.max(v,...edges.filter(e=>e.includes(i)).map(e=>h[e[0]===i?e[1]:e[0]])));trace.push(h);}return {values:h,labels:['A','B','C','D'],summary:`${trace.map(v=>v.join('')).join('→')}`,detail:trace.flat(),links:edges};
}
