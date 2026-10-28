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
const k=(d:number,l:number)=>Math.exp(-d*d/(2*l*l));const vA=k(1,.2),vB=k(1,3);const sites=[-2,-1,0,1,2],coefficients=[1,-1,.5,-.5,1];const reconstruction=(l:number)=>curve(Array.from({length:41},(_,i)=>{const x=-2+i/10,w=sites.map(s=>k(x-s,l));return{x,y:w.reduce((sum,v,j)=>sum+v*coefficients[j],0)/Math.sqrt(w.reduce((sum,v)=>sum+v*v,0))}}));const a=scatter(sites.map((x,i)=>({x,y:coefficients[i]}))),b=a;const endA=reconstruction(.2),endB=reconstruction(3);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Correlation: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Correlation",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Correlation: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Correlation",value:f(vB)}]}]}
],reveal:[`At distance 1, the stipulated correlations are ${f(vA)} for length scale 0.2 and ${f(vB)} for length scale 3.`,
`Both reconstructions use the same disclosed coefficients [1,−1,0.5,−0.5,1] on sites −2 through 2, with Gaussian basis weights normalized by their squared sum. Longer scale spreads each coefficient farther. This deterministic basis toy illustrates smoothing; it is neither measured geography nor a claimed random Gaussian-field sample.`]};
}
