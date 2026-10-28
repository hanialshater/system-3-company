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
const flip=.1;const vA=1-flip,vB=(1-flip)**2+flip**2;const a=graph(['A','B=1','C'],[[0,1],[1,2]]),b=graph(['A=1','B','C'],[[0,1],[1,2]]);const endA=bars(['C=1','C=0'],[vA,1-vA]),endB=bars(['C=1','C=0'],[vB,1-vB]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`P(C1|B1): ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"P(C1|B1)",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`P(C1|A1): ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"P(C1|A1)",value:f(vB)}]}]}
],reveal:[`Conditioning on B=1 gives C=1 probability ${f(vA)}. Knowing only A=1 gives ${f(vB)} after averaging over B.`,
`In this chain, the middle node screens the last node from the first: once B is known, A supplies no extra information about C. The independent flip mechanism is stipulated, so the conditional independence follows from the toy graph and equations.`]};
}
