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
const empty=(lambda:number)=>Math.exp(-lambda);const vA=empty(1),vB=empty(2);const dist=(l:number)=>bars(['0','1','2+'],[Math.exp(-l),l*Math.exp(-l),1-Math.exp(-l)*(1+l)]);const a=bars(['Mean'],[1]),b=bars(['Mean'],[2]);const endA=dist(1),endB=dist(2);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`P(empty): ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"P(empty)",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`P(empty): ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"P(empty)",value:f(vB)}]}]}
],reveal:[`The zero-drop probabilities are ${pct(vA)} at mean 1 and ${pct(vB)} at mean 2. Each picture partitions probability into zero, one and two-or-more drops.`,
`These are exact probabilities under a homogeneous Poisson model, not observed tile counts. Empty tiles remain possible even when the mean is one drop per tile.`]};
}
