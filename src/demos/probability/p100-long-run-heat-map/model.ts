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
const walk=(start:number,n:number)=>{let a=start;const out=[a];for(let i=0;i<n;i++){a=.9*a+.2*(1-a);out.push(a)}return out};const pa=walk(1,6),pb=walk(0,6);const vA=pa.at(-1)!,vB=pb.at(-1)!;const a=bars(['A','B'],[1,0]),b=bars(['A','B'],[0,1]);const endA=timeline(pa),endB=timeline(pb);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`A after6: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"A after6",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`A after6: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"A after6",value:f(vB)}]}]}
],reveal:[`After six transitions, mass in A is ${f(vA)} from an all-A start and ${f(vB)} from an all-B start. The paths move toward the same balance point, 2/3.`,
`At stationarity, A’s outward flow 0.1A equals B’s return flow 0.2B. A distribution can be stable even though individuals keep moving. Six transitions are shown; they are not claimed to be exact stationarity.`]};
}
