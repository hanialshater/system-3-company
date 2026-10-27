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
const value=(p:number)=>12*(1-p)**3;const vA=value(.1),vB=value(.3);const a=graph(['Start','1','2','Goal'],[[0,1],[1,2],[2,3]]),b=a;const endA=bars(['Safe','Shortcut'],[8,vA]),endB=bars(['Safe','Shortcut'],[8,vB]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Shortcut EV: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Shortcut EV",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Shortcut EV: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Shortcut EV",value:f(vB)}]}]}
],reveal:[`The shortcut’s expected reward is ${f(vA)} at slip chance 0.1 and ${f(vB)} at 0.3. The safe route pays 8 for certain in both cases.`,
`Success requires all three independent steps, so probability is (1−p)³. The multiplication is the mechanism. Expected reward is not the reward guaranteed on one trip, and these are stipulated game rules.`]};
}
