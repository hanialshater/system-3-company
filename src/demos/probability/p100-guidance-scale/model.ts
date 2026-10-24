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
const p=[.4,.3,.2,.1];const sharpen=(g:number)=>{const x=p.map(v=>v**g),s=x.reduce((a,b)=>a+b,0);return x.map(v=>v/s)};const sa=sharpen(2),sb=sharpen(0);const vA=sa[0],vB=sb[0];const a=bars(['A','B','C','D'],p),b=a;const endA=bars(['A','B','C','D'],sa),endB=bars(['A','B','C','D'],sb);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`First share: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"First share",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`First share: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"First share",value:f(vB)}]}]}
],reveal:[`Squaring gives the first output probability ${f(vA)}; exponent zero gives ${f(vB)} for every output. The original probabilities are the same in both cases.`,
`Raising positive probabilities to a higher power concentrates mass, then normalization restores a total of one. This is a toy sharpening transform, not the complete classifier-free guidance algorithm used by an image model.`]};
}
