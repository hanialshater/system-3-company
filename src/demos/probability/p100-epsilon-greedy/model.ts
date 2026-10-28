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
const payoff=(eps:number)=>.4+.3*(eps/2);const vA=payoff(.2),vB=payoff(1);const a=bars(['A','B'],[.9,.1]),b=bars(['A','B'],[.5,.5]);const endA=bars(['Expected'],[vA]),endB=bars(['Expected'],[vB]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Expected reward: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Expected reward",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Expected reward: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Expected reward",value:f(vB)}]}]}
],reveal:[`With ε=0.2, B is selected only 10% of the time and expected reward is ${f(vA)}. Uniform exploration gives ${f(vB)}.`,
`The current ranking is deliberately wrong. Exploration can sample the undervalued arm, but this single-step arithmetic does not establish a long-run strategy or learning rate. The true reward means are stipulated, not estimated from an invented experiment.`]};
}
