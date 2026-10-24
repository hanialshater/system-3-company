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
const value=(g:number)=>10*g**3;const vA=value(.8),vB=value(.5);const a=graph(['Now','1','2','3'],[[0,1],[1,2],[2,3]]),b=a;const endA=bars(['Now','Delayed'],[4,vA]),endB=bars(['Now','Delayed'],[4,vB]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Delayed value: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Delayed value",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Delayed value: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Delayed value",value:f(vB)}]}]}
],reveal:[`At γ=0.8, the delayed reward is worth ${f(vA)}, above 4 now. At γ=0.5, it is worth ${f(vB)}, below 4.`,
`The same future reward can change rank when the stipulated discount factor changes. This is an explicit planning objective, not a factual claim that people have one universal discount factor. Reward timing and γ both belong in the decision.`]};
}
