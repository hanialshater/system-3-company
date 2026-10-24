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
const waits=(jobs:number[])=>{let t=0;return jobs.map(d=>{const w=t;t+=d;return w})};const wa=waits([1,2,8]),wb=waits([8,2,1]);const vA=wa.reduce((s,v)=>s+v,0)/3,vB=wb.reduce((s,v)=>s+v,0)/3;const a=bars(['Job1','Job2','Job3'],[1,2,8]),b=bars(['Job1','Job2','Job3'],[8,2,1]);const endA=bars(['Wait1','Wait2','Wait3'],wa),endB=bars(['Wait1','Wait2','Wait3'],wb);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Mean wait: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Mean wait",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Mean wait: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Mean wait",value:f(vB)}]}]}
],reveal:[`The shortest-first case has waits 0, 1 and 3, averaging ${f(vA)} minutes. Arrival order has waits 0, 8 and 10, averaging ${f(vB)}.`,
`Short jobs stop waiting behind the longest job. This toy compares jobs already present, with known durations and no overhead. It does not establish fairness or protection from starvation for an ongoing arrival stream.`]};
}
