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
const firstStage=.6-.2,reducedForm=2;const vA=reducedForm/firstStage,vB=reducedForm;const a=bars(['D|Z=0','D|Z=1'],[.2,.6]),b=bars(['Always','Complier','Never'],[.2,.4,.4]);const endA=bars(['Outcome ITT','First stage'],[reducedForm,firstStage]),endB=bars(['Complier effect'],[vA]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Complier effect: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Complier effect",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Outcome ITT: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Outcome ITT",value:f(vB)}]}]}
],reveal:[`The instrument changes outcomes by ${f(vB)} and treatment take-up by 0.4, yielding a Wald ratio of ${f(vA)}.`,
`Under relevance, appropriate instrument independence, exclusion and monotonicity, this ratio identifies an effect for compliers. Always-takers and never-takers do not change treatment with the instrument. Their treatment effects, and hence the population average, are not identified by this arithmetic alone.`]};
}
