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
const estimate=(cap:number)=>(8*Math.min(.25,cap)*1+2*Math.min(4,cap)*3)/10;const vA=estimate(2),vB=estimate(4);const a=bars(['A weight','B weight'],[.25,4]),b=a;const endA=bars(['A capped','B capped','Value'],[.25,2,vA]),endB=bars(['A uncapped','B uncapped','Value'],[.25,4,vB]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Clipped value: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Clipped value",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`IPS value: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"IPS value",value:f(vB)}]}]}
],reveal:[`Capping weights at 2 changes this estimate to ${f(vA)}, compared with uncapped ${f(vB)}. The B rows lose half their weight.`,
`Clipping limits the influence of rare logged actions but changes the target-weighting identity. This fixture shows the resulting bias relative to its exact target value; it does not, by itself, measure the variance reduction across repeated samples.`]};
}
