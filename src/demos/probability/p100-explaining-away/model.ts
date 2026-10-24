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
const worlds=[{r:0,s:0},{r:0,s:1},{r:1,s:0},{r:1,s:1}];const wet=worlds.filter(w=>w.r||w.s),both=wet.filter(w=>w.s);const vA=wet.filter(w=>w.r).length/wet.length,vB=both.filter(w=>w.r).length/both.length;const a=graph(['Rain','Sprinkler','Wet'],[[0,2],[1,2]]),b=a;const endA=table(['R','S'],wet.map(w=>[w.r,w.s])),endB=table(['R','S'],both.map(w=>[w.r,w.s]));
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Rain|wet: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Rain|wet",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Rain|wet,S: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Rain|wet,S",value:f(vB)}]}]}
],reveal:[`Among wet worlds, rain has probability ${f(vA)}. Among wet worlds where the sprinkler ran, it is ${f(vB)}. The tables enumerate the retained equally likely worlds.`,
`Wet grass couples two initially independent explanations. Learning one cause occurred reduces the need for the other explanation. This calculation depends on the explicit OR rule and fair independent causes; it is not a weather model.`]};
}
