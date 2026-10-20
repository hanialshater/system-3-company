export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const up=[[0,1,0],[1,1,1],[0,0,0]],glyph=m===0?up.map(r=>[...r].reverse()):[...up].reverse().map(r=>[...r].reverse());const oracle=m===2?glyph[1].reduce((a,b)=>a+b,0)===3?'Yes':'No':glyph[0][1]?'Up':'Down';const copied=m===2?'Yes':m===3?oracle:'Up';return {values:glyph.flat(),labels:['pixels','copied','oracle'],summary:`${copied}→${oracle}; contradictions ${Number(copied!==oracle)}/2`,detail:[Number(copied!==oracle),...glyph.flat()],links:[]};
}
