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
const neighbors=(xs:number[],r:number)=>xs.map((x,i)=>xs.filter((y,j)=>i!==j&&Math.abs(y-x)<=r).length);const xa=[0,1,9,10],xb=[0,10/3,20/3,10];const ca=neighbors(xa,1.1),cb=neighbors(xb,1.1);const vA=ca.reduce((s,v)=>s+v,0)/4,vB=cb.reduce((s,v)=>s+v,0)/4;const a=scatter(xa.map(x=>({x,y:0}))),b=scatter(xb.map(x=>({x,y:0})));const endA=bars(['P1','P2','P3','P4'],ca),endB=bars(['P1','P2','P3','P4'],cb);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Mean neighbors: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Mean neighbors",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Mean neighbors: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Mean neighbors",value:f(vB)}]}]}
],reveal:[`The paired points have mean neighbor count ${f(vA)} within radius 1.1; the evenly spaced comparison has ${f(vB)}.`,
`Clustering depends on the scale at which neighbors are counted. The point locations and radius are explicitly fixed. This is an uncorrected finite distance count, not a boundary-corrected spatial K-function or proof that a random process is clustered.`]};
}
