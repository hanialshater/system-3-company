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
const before=[100,40],after=[40,100];const vA=after[1]-before[1],vB=after.reduce((s,v)=>s+v,0)-before.reduce((s,v)=>s+v,0);const a=bars(['A','B'],before),b=bars(['A','B'],after);const endA=bars(['B gain','A change'],[vA,after[0]-before[0]]),endB=bars(['Before total','After total'],[140,140]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`B gain: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"B gain",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Total change: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Total change",value:f(vB)}]}]}
],reveal:[`B gains ${f(vA)} exposures, while A loses 60. Total exposure changes by ${f(vB)} in the retained fixed-slot case.`,
`A gain measured at the boosted item can be a transfer from another item. This toy holds slot traffic fixed; it does not prove that every ranking intervention is zero-sum or that purchases and user value cannot change.`]};
}
