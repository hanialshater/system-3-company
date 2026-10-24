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
const predicted=[.2,.5,.8],observed=[.2,.5,.6];const vA=predicted[2]-observed[2],vB=.6-observed[2];const a=scatter(predicted.map((x,i)=>({x,y:observed[i]}))),b=scatter([.2,.5,.6].map((x,i)=>({x,y:observed[i]})));const endA=bars(['Forecast','Observed'],[.8,.6]),endB=bars(['Forecast','Observed'],[.6,.6]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Gap fraction: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Gap fraction",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Gap fraction: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Gap fraction",value:f(vB)}]}]}
],reveal:[`The final bin’s forecast exceeds its observed fraction by ${f(vA*100)} percentage points. Relabelling that forecast as 0.6 makes this finite-bin gap ${f(vB*100)}.`,
`Observed counts stay fixed while the assigned probability changes. A reliability diagram compares stated probabilities with frequencies in comparable bins. Ten cases provide limited evidence; matching this one bin does not establish population calibration.`]};
}
