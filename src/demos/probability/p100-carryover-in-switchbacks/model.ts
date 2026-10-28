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
const newMean=10,oldContaminated=5;const vA=newMean-oldContaminated,vB=10-0;const a=timeline([10,5,10,5]),b=timeline([10,10,0,0]);const endA=bars(['New','Old'],[10,5]),endB=bars(['New stable','Old stable'],[10,0]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Switch contrast: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Switch contrast",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Buffered contrast: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Buffered contrast",value:f(vB)}]}]}
],reveal:[`Immediate switching yields contrast ${f(vA)}; comparing stable periods after a one-period buffer gives ${f(vB)}. The assumed carryover lasts exactly one period.`,
`An old-policy slot can still contain effects of the previous treatment. Here that contaminates the comparison. The buffer result follows from the stipulated duration; real carryover may be longer or different, so dropping one period is not a universal remedy.`]};
}
