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
const r1=.9,r2=.8;const vA=1-(1-r1)*(1-r2),vB=r1*r2;const a=graph(['Input','A','B','Out'],[[0,1],[0,2],[1,3],[2,3]]),b=graph(['Input','A','B','Out'],[[0,1],[1,2],[2,3]]);const endA=bars(['Works','Fails'],[vA,1-vA]),endB=bars(['Works','Fails'],[vB,1-vB]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Parallel: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Parallel",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Series: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Series",value:f(vB)}]}]}
],reveal:[`Parallel reliability is ${f(vA)}; series reliability is ${f(vB)} for the same component probabilities.`,
`Series needs both successes. Parallel fails only when both components fail, so its reliability is one minus that joint failure probability. Both calculations assume independent component states; shared failure causes would change the result.`]};
}
