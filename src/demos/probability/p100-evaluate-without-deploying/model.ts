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
const q=[.8,.2],pi=[.2,.8],counts=[8,2],reward=[1,3];const weights=pi.map((p,i)=>p/q[i]);const vA=counts.reduce((s,n,i)=>s+n*weights[i]*reward[i],0)/10,vB=(8*1+2*3)/10;const a=bars(['A weight','B weight'],weights),b=bars(['A count','B count'],counts);const endA=bars(['Target IPS'],[vA]),endB=bars(['Logged mean'],[vB]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`IPS value: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"IPS value",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Naive mean: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Naive mean",value:f(vB)}]}]}
],reveal:[`The target-weighted estimate is ${f(vA)}, while the unweighted logged mean is ${f(vB)}. A’s weight is 0.25 and B’s is 4.`,
`Importance weighting changes which policy the rows represent. It requires support for target actions and correct logging probabilities, with appropriate assumptions about reward observation. This finite fixture exactly matches logging proportions; it is not a general low-variance guarantee.`]};
}
