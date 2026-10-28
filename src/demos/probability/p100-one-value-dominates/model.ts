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
const share=(large:number)=>large/(9+large);const vA=share(100),vB=share(10);const a=bars(['Nine small','Largest'],[9,100]),b=bars(['Nine small','Largest'],[9,10]);const endA=bars(['Top share','Other share'],[vA,1-vA]),endB=bars(['Top share','Other share'],[vB,1-vB]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Top share: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Top share",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Top share: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Top share",value:f(vB)}]}]}
],reveal:[`The largest value contributes ${pct(vA)} of the total when it is 100, versus ${pct(vB)} when it is 10. The other nine stay at 1.`,
`A single observation can dominate a sum. These finite values demonstrate concentration; they do not establish a power-law distribution or explain why a real dataset has a heavy tail.`]};
}
