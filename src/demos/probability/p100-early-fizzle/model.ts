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
const extinction=(zero:number)=>zero>=.5?1:zero/(1-zero);const vA=extinction(.4),vB=extinction(.2);const a=bars(['0 offspring','2 offspring'],[.4,.6]),b=bars(['0 offspring','2 offspring'],[.2,.8]);const endA=bars(['Extinction','Survival'],[vA,1-vA]),endB=bars(['Extinction','Survival'],[vB,1-vB]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Extinction: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Extinction",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Extinction: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Extinction",value:f(vB)}]}]}
],reveal:[`Extinction probability is ${f(vA)} with 0-offspring chance 0.4 and ${f(vB)} with chance 0.2. Both models have mean offspring above one.`,
`For this 0-or-2 branching model, extinction is the smallest fixed point q=p₀+(1−p₀)q². Growth in expectation does not guarantee survival of a lineage. Offspring independence and unchanged probabilities are stipulated.`]};
}
