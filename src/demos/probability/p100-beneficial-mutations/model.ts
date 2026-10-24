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
const fixation=(r:number,n:number)=>r===1?1/n:(1-1/r)/(1-1/r**n);const vA=fixation(1.5,10),vB=fixation(1,10);const make=(r:number)=>curve(Array.from({length:10},(_,i)=>({x:i+1,y:r===1?(i+1)/10:(1-r**(-(i+1)))/(1-r**(-10))})));const a=bars(['Relative fitness'],[1.5]),b=bars(['Relative fitness'],[1]);const endA=make(1.5),endB=make(1);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Fixation: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Fixation",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Fixation: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Fixation",value:f(vB)}]}]}
],reveal:[`The single-mutant fixation probabilities are ${pct(vA)} at relative fitness 1.5 and ${pct(vB)} at neutrality. The curves also show other starting mutant counts.`,
`An advantage raises fixation probability in this finite Moran model, but it does not guarantee survival. Population size, update rules and constant relative fitness are stipulated. The neutral 1/N case is the limiting formula, not a division by zero.`]};
}
