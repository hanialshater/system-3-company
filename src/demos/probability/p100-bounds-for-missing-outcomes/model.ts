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
const knownOnes=3,total=10,missing=4;const vA=knownOnes/total,vB=(knownOnes+missing)/total;const a=bars(['Known 1','Known 0','Missing'],[3,3,4]),b=a;const endA={kind:'intervals' as const,items:[{label:'No assumption',low:vA,mid:(vA+vB)/2,high:vB}]},endB={kind:'intervals' as const,items:[{label:'≤2 missing 1',low:vA,mid:.4,high:.5}]};
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Lower bound: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Lower bound",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Upper bound: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Upper bound",value:f(vB)}]}]}
],reveal:[`With no missing-value assumption, the mean ranges from ${f(vA)} to ${f(vB)}. Assuming at most two missing ones narrows the upper bound to 0.5.`,
`The endpoints assign the missing outcomes their smallest or largest allowed values. The narrower interval uses an extra assumption; it is not information recovered from the six observed outcomes. These are identification bounds, not confidence intervals.`]};
}
