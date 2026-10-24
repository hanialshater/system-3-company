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
const at=(x:number)=>{const total=2+.5*x;return{total,wait:1/total,birth:2/total}};const aa=at(6),bb=at(2);const vA=aa.birth,vB=bb.birth;const a=bars(['Birth rate','Death rate'],[2,3]),b=bars(['Birth rate','Death rate'],[2,1]);const endA=bars(['Birth chance','Mean wait'],[aa.birth,aa.wait]),endB=bars(['Birth chance','Mean wait'],[bb.birth,bb.wait]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Birth chance: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Birth chance",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Birth chance: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Birth chance",value:f(vB)}]}]}
],reveal:[`At count 6, birth probability is ${f(vA)} and mean wait 0.2. At count 2, birth probability is ${f(vB)} and mean wait 1/3.`,
`A continuous-time reaction step uses the sum of propensities for its exponential waiting rate, then chooses the reaction proportionally to propensity. These are exact next-event calculations, not a sampled gene-expression trajectory or measured cell data.`]};
}
