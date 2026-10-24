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
const claims=[0,0,15,0,0,6];const path=(start:number)=>{let r=start;return claims.map(c=>(r+=3-c))};const low=path(3),high=path(10);const vA=low[2],vB=high[2];const a=timeline([3]),b=timeline([10]);const endA=timeline([3,...low]),endB=timeline([10,...high]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Reserve step3: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Reserve step3",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Reserve step3: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Reserve step3",value:f(vB)}]}]}
],reveal:[`After the third claim, reserve is ${f(vA)} in case A and ${f(vB)} in case B. Premiums and the disclosed claim sequence are identical.`,
`A negative reserve marks ruin in this toy. Changing the starting cushion changes whether this path crosses zero. This is a fixed stress path, not an estimate of an insurer’s real ruin probability.`]};
}
