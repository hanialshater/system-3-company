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
const spending=[.005,.01,.015,.02],equal=Array(4).fill(.0125) as number[];const total=(x:number[])=>x.reduce((s,v)=>s+v,0);const cumulative=(x:number[])=>x.map((_,i)=>total(x.slice(0,i+1)));const vA=total(spending),vB=total(equal);const a=timeline(spending),b=timeline(equal);const endA=timeline(cumulative(spending)),endB=timeline(cumulative(equal));
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Alpha total: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Alpha total",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Alpha total: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Alpha total",value:f(vB)}]}]}
],reveal:[`Both spending schedules sum to ${f(vA)}. Their cumulative paths differ, but neither spends more than the 0.05 total in this toy.`,
`The union bound adds valid per-look error bounds and needs no independence assumption. Repeatedly using 0.05 at every look would spend a larger bound. A real sequential test must also ensure its per-look validity; the schedule alone does not do that.`]};
}
