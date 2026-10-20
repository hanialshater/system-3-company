export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const records=m===2?['A','A','A','B','B','B','B']:['A','A','A','B'],unique=[...new Set(records)],raw=records.filter(x=>x==='A').length/records.length,dedup=unique.filter(x=>x==='A').length/unique.length;return {values:(m===1?unique:records).map(x=>Number(x==='A')),labels:m===1?unique:records,summary:`raw ${raw.toFixed(3)}; unique ${dedup.toFixed(3)}; n=${records.length}/${unique.length}`,detail:[raw,dedup,records.length,unique.length],links:[]};
}
