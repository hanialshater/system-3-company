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
const k=(x:number)=>Math.exp(-x*x/2);const mean=(x:number)=>4*k(x),variance=(x:number)=>1-k(x)**2;const vA=mean(3),vB=variance(3);const a=curve(Array.from({length:21},(_,i)=>({x:i/5,y:mean(i/5)}))),b=curve(Array.from({length:21},(_,i)=>({x:i/5,y:variance(i/5)})));const endA=table(['x','Mean'],[[0,mean(0)],[1,mean(1)],[3,vA]]),endB=table(['x','Variance'],[[0,variance(0)],[1,variance(1)],[3,vB]]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Mean x3: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Mean x3",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Variance x3: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Variance x3",value:f(vB)}]}]}
],reveal:[`At x=3, posterior mean is ${f(vA)} and variance ${f(vB)}. At the observed point, the table instead has mean 4 and variance 0.`,
`Far from the one noiseless datum, the RBF correlation fades and the posterior returns toward the stipulated prior. These closed-form tables distinguish prediction mean from uncertainty; distance does not create confidence.`]};
}
