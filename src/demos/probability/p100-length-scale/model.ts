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
const kernel=(d:number,l:number)=>Math.exp(-d*d/(2*l*l));const vA=kernel(1,.5),vB=kernel(1,2);const make=(l:number)=>curve(Array.from({length:21},(_,i)=>({x:i/5,y:kernel(i/5,l)})));const a=make(.25),b=make(1);const endA=make(.5),endB=make(2);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`k(1): ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"k(1)",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`k(1): ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"k(1)",value:f(vB)}]}]}
],reveal:[`At distance 1, correlation is ${f(vA)} for length scale 0.5 and ${f(vB)} for length scale 2. The wider kernel keeps distant points more related.`,
`Length scale controls how quickly this RBF correlation decays with distance. It is distinct from observation noise. The curves use an explicit kernel definition; they do not assert that a real process follows it.`]};
}
