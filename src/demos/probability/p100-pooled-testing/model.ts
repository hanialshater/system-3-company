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
const cost=(p:number)=>1/5+1-(1-p)**5;const vA=cost(.01),vB=cost(.3);const a=bars(['Prevalence'],[.01]),b=bars(['Prevalence'],[.3]);const endA=bars(['Pool positive','Tests/person'],[1-(1-.01)**5,vA]),endB=bars(['Pool positive','Tests/person'],[1-(1-.3)**5,vB]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Tests/person: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Tests/person",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Tests/person: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Tests/person",value:f(vB)}]}]}
],reveal:[`Expected tests per person are ${f(vA)} at 1% prevalence and ${f(vB)} at 30%. More positive pools require more individual retests.`,
`The arithmetic is 1/5 plus the probability at least one of five independent samples is positive. This perfect-test toy omits dilution, dependence and operational costs; it demonstrates a count calculation and supplies no clinical testing recommendation.`]};
}
