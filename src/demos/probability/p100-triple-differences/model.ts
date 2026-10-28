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
const eligible=(18-10)-(14-10),ineligible=(13-10)-(12-10);const vA=eligible,vB=eligible-ineligible;const a=table(['Group','T Δ','C Δ'],[['Eligible',8,4],['Ineligible',3,2]]),b=a;const endA=bars(['Eligible DiD','Ineligible DiD'],[eligible,ineligible]),endB=bars(['Triple Δ'],[vB]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Eligible DiD: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Eligible DiD",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Triple Δ: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Triple \u0394",value:f(vB)}]}]}
],reveal:[`The eligible difference-in-differences is ${f(vA)}; subtracting the ineligible DiD of 1 gives triple difference ${f(vB)}.`,
`The extra comparison removes the observed differential change in the comparison group. Calling the result causal needs assumptions about the remaining counterfactual differential trends and no relevant spillovers; the third subtraction does not automatically provide them.`]};
}
