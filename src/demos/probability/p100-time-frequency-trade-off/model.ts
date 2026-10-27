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
const width=(t:number)=>1/(2*Math.PI*t);const vA=width(.5),vB=width(.25);const gaussian=(sigma:number)=>curve(Array.from({length:25},(_,i)=>{const x=(i-12)/8;return{x,y:Math.exp(-x*x/(2*sigma*sigma))}}));const a=gaussian(.5),b=gaussian(.25);const endA=gaussian(vA),endB=gaussian(vB);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Frequency width: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Frequency width",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Frequency width: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Frequency width",value:f(vB)}]}]}
],reveal:[`The Gaussian frequency widths are ${f(vA)} for time width 0.5 and ${f(vB)} for time width 0.25. Halving the time width doubles this frequency width.`,
`The product is 1/(2π) under the stated Gaussian and frequency conventions. This is a specific Fourier pair, not an assertion that all pulse shapes have this equality or even finite standard deviations.`]};
}
