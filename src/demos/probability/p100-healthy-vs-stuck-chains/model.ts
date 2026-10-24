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
const aTrace=[0,0,0,0,1,1,1,1],bTrace=[0,1,0,1,0,1,0,1];const agreement=(x:number[])=>x.slice(1).filter((v,i)=>v===x[i]).length/(x.length-1);const vA=agreement(aTrace),vB=agreement(bTrace);const a=timeline(aTrace.slice(0,2)),b=timeline(bTrace.slice(0,2));const endA=timeline(aTrace),endB=timeline(bTrace);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Agreement: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Agreement",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Agreement: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Agreement",value:f(vB)}]}]}
],reveal:[`The first trace repeats its previous value in ${f(vA*7)} of 7 adjacent pairs; the second in ${f(vB*7)}. Both averages are 0.5.`,
`Matching means do not reveal temporal dependence. These deliberately fixed traces isolate sticking versus alternating. Adjacent agreement is the statistic shown; it is not a formal chain-convergence diagnostic, and an alternating trace is not independent sampling.`]};
}
