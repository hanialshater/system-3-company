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
const variance=(rho:number)=>1-rho*rho;const vA=variance(.9),vB=variance(0);const ellipse=(r:number)=>Array.from({length:25},(_,i)=>{const t=i*2*Math.PI/24;return{x:Math.cos(t),y:r*Math.cos(t)+Math.sqrt(1-r*r)*Math.sin(t)}});const a=scatter(ellipse(.9)),b=scatter(ellipse(0));const endA=intervals(['Target','Diagonal'],[1,vA]),endB=intervals(['Target','Diagonal'],[1,vB]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Variance: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Variance",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Variance: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Variance",value:f(vB)}]}]}
],reveal:[`The retained diagonal variances are ${f(vA)} at correlation 0.9 and ${f(vB)} at correlation 0. The target marginal variance remains 1.`,
`For this Gaussian reverse-KL optimum, diagonal precision uses the target precision diagonal. It gives variance 1−ρ² and misses the tilt. The narrower intervals illustrate this restricted approximation, not a claim that every approximate posterior is too narrow.`]};
}
