export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const all=[{date:'2026-01-01',value:17},{date:'2026-02-01',value:19},{date:'2026-03-01',value:21}],available=all.slice(0,m===0?2:3),query=m===2?'2025-12-01':'2026-02-15',chosen=available.filter(r=>r.date<=query).sort((a,b)=>b.date.localeCompare(a.date))[0];return {values:available.map(r=>r.value),labels:available.map(r=>r.date.slice(5)),summary:`frozen17; ${query}: ${chosen?.value??'Unknown'} ← ${chosen?.date??'∅'}`,detail:[chosen?.value??-1],links:[]};
}
