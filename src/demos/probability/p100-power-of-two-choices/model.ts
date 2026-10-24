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
const pairs=[[0,1],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]];const single=Array(8).fill(0) as number[],two=Array(8).fill(0) as number[];for(const[x,y]of pairs){single[x]++;two[two[x]<two[y]?x:y]++};const vA=Math.max(...two),vB=Math.max(...single);const a=bars(Array.from({length:8},(_,i)=>`${i}`),Array(8).fill(0)),b=a;const endA=bars(Array.from({length:8},(_,i)=>`${i}`),two),endB=bars(Array.from({length:8},(_,i)=>`${i}`),single);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Max queue: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Max queue",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Max queue: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Max queue",value:f(vB)}]}]}
],reveal:[`For this disclosed fixture, shorter-of-two gives a maximum queue of ${f(vA)}; always taking the first gives ${f(vB)}.`,
`The comparison exposes how an alternative destination spreads this particular load. These eight deliberately chosen arrival pairs are an illustrative case, not a random simulation or a benchmark of average performance.`]};
}
