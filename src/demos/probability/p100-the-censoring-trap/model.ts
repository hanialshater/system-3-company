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
const s2=1-1/4,s4=s2*(1-1/2);const vA=s4,vB=0;const a=table(['Time','Kind'],[[2,'Event'],[3,'Censor'],[4,'Event'],[5,'Censor']]),b=table(['Time','Kind'],[[2,'Event'],[4,'Event']]);const endA=timeline([1,s2,s2,s4]),endB=timeline([1,.5,0]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`KM survival: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"KM survival",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Drop-censor: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Drop-censor",value:f(vB)}]}]}
],reveal:[`Keeping the at-risk sets gives survival ${f(vA)} after time 4. Dropping censored customers before calculation gives ${f(vB)} instead.`,
`The first event removes 1 of 4 at risk. Censoring at 3 removes someone from later risk sets; the event at 4 removes 1 of the remaining 2. Kaplan–Meier multiplies 3/4 by 1/2. Its usual interpretation requires appropriate non-informative censoring.`]};
}
