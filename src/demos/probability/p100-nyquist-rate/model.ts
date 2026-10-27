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
const wave=(freq:number,rate:number)=>Array.from({length:9},(_,n)=>({x:n/rate,y:Math.sin(2*Math.PI*freq*n/rate)}));const low=wave(.2,1),high=wave(1.2,1);const maxGap=(a:{y:number}[],b:{y:number}[])=>Math.max(...a.map((v,i)=>Math.abs(v.y-b[i].y)));const rawGap=maxGap(low,high),vA=rawGap<1e-12?0:rawGap,vB=maxGap(wave(.2,4),wave(1.2,4));const a=curve(low),b=curve(wave(.2,4));const endA=scatter(high),endB=scatter(wave(1.2,4));
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Max gap: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Max gap",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Max gap: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Max gap",value:f(vB)}]}]}
],reveal:[`At 1 sample/second the maximum sampled gap is ${f(vA)} after rounding; at 4/second it is ${f(vB)}. The faster samples distinguish these two sine waves.`,
`Adding one full cycle between integer sample times leaves the sampled phase unchanged. Matching samples therefore need not identify a unique continuous signal. The toy compares two exact frequencies; it does not establish reconstruction for arbitrary signals without a bandwidth assumption.`]};
}
