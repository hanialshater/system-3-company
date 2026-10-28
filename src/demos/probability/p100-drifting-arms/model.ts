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
const A=[.8,.8,.2,.2],B=[.4,.4,.7,.7];const avg=(a:number[])=>a.reduce((s,v)=>s+v,0)/a.length;const vA=avg(A.slice(0,3))-avg(B.slice(0,3)),vB=A[2]-B[2];const a=timeline(A.slice(0,3)),b=timeline(B.slice(0,3));const endA=bars(['A','B'],[avg(A.slice(0,3)),avg(B.slice(0,3))]),endB=bars(['A','B'],[A[2],B[2]]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`A−B history: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"A\u2212B history",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`A−B latest: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"A\u2212B latest",value:f(vB)}]}]}
],reveal:[`At period three, all-history averages favor A by ${f(vA)}. The latest-period comparison favors B by ${f(-vB)}.`,
`Older observations still describe the earlier environment and can delay response to this stipulated change. The cases compare averaging rules on fixed rates; they are not sampled rewards or evidence that one window size is always best.`]};
}
