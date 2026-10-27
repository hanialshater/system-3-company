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
const accept=(old:number,next:number)=>Math.min(1,next/old);const vA=accept(3,1),vB=accept(1,3);const a=bars(['Old','Proposed'],[3,1]),b=bars(['Old','Proposed'],[1,3]);const endA=bars(['Accept','Reject'],[vA,1-vA]),endB=bars(['Accept','Reject'],[vB,1-vB]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Acceptance: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Acceptance",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Acceptance: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Acceptance",value:f(vB)}]}]}
],reveal:[`The 3→1 proposal is accepted with probability ${f(vA)}; the reverse proposal with probability ${f(vB)}. The retained cases show both directions.`,
`For symmetric proposals, acceptance is min(1, new target weight / old target weight). Downhill proposals can be accepted. That permission helps the chain explore; it is not a rule to keep only improving states.`]};
}
