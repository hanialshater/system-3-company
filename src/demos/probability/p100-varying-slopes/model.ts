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
const prior=-2,k=4;const partial=(b:number,n:number)=>(b*n+prior*k)/(n+k);const vA=partial(-4,2),vB=partial(-1,20);const line=(s:number)=>curve(Array.from({length:6},(_,x)=>({x,y:20+s*x})));const a=line(-4),b=line(-1);const endA=line(vA),endB=line(vB);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Small slope: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Small slope",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Large slope: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Large slope",value:f(vB)}]}]}
],reveal:[`The retained partial slopes are ${f(vA)} and ${f(vB)}. Both move toward the stipulated prior slope −2, while retaining a difference.`,
`The smaller sample gives the prior a larger fraction of total weight. This is an explicit weighted-average toy, not a hierarchical model fitted to real city data. Its lines show the effect on predicted response as price changes.`]};
}
