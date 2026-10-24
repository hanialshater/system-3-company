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
const targets=[-60,60];const vA=targets.reduce((s,v)=>s+v,0)/2,vB=targets[1];const a=bars(['−60°','+60°'],[.5,.5]),b=a;const endA=graph(['−60°','Mean 0°','+60°'],[[0,1],[1,2]]),endB=bars(['−60°','0°','+60°'],[.5,0,.5]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Mean angle: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Mean angle",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Second mode: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Second mode",value:f(vB)}]}]}
],reveal:[`The mean predictor returns ${f(vA)}°, between the two allowed angles. The second picture keeps probability at −60° and +60° instead.`,
`A squared-error point estimate can minimize numeric error while landing in a forbidden configuration. Retaining multiple possible answers preserves the toy constraint. This example does not say that every averaged prediction is invalid.`]};
}
