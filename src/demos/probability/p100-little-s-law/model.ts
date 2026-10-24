import type { MiniLabVisual } from "@/lib/mini-lab/types";
const f=(x:number)=>x!==0&&Math.abs(x)<.001?x.toExponential(2):Number(x.toFixed(3)).toLocaleString('en-US',{maximumFractionDigits:3});
const pct=(x:number)=>`${f(x*100)}%`;
const bars=(labels:string[],values:number[]):MiniLabVisual=>({kind:'bars',items:labels.map((label,i)=>({label,value:values[i]}))});
const table=(columns:string[],rows:(string|number)[][]):MiniLabVisual=>({kind:'table',columns,rows});
const curve=(points:{x:number;y:number}[]):MiniLabVisual=>({kind:'curve',points});
const scatter=(points:{x:number;y:number}[]):MiniLabVisual=>({kind:'scatter',points});
const timeline=(values:number[]):MiniLabVisual=>({kind:'timeline',events:values.map((value,i)=>({label:`${i}`,value}))});
const intervals=(labels:string[],variances:number[]):MiniLabVisual=>({kind:'intervals',items:labels.map((label,i)=>({label,low:-Math.sqrt(variances[i]),mid:0,high:Math.sqrt(variances[i])}))});
const graph=(labels:string[],edges:number[][]):MiniLabVisual=>({kind:'graph',nodes:labels.map((label,i)=>({id:`${i}`,label,x:40+i*240/Math.max(1,labels.length-1),y:75+(i%2)*45})),edges:edges.map(([from,to])=>({from:`${from}`,to:`${to}`}))});

/** Stipulated finite case; original source report is not verified by this model. */
export function compute(){
const time=(people:number,rate:number)=>people/rate;const vA=time(12,3),vB=time(24,3);const a=bars(['People','Per minute'],[12,3]),b=bars(['People','Per minute'],[24,3]);const endA=bars(['Mean minutes'],[vA]),endB=bars(['Mean minutes'],[vB]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Mean minutes: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Mean minutes",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Mean minutes: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Mean minutes",value:f(vB)}]}]}
],reveal:[`The retained cases show ${f(vA)} and ${f(vB)} minutes. The arrival rate is unchanged; doubling average occupancy doubles the corresponding average time.`,
`Little’s law is L=λW for a stable flow with consistent boundaries and long-run averages. It relates averages, not a promise that each customer waits exactly that long.`]};
}
