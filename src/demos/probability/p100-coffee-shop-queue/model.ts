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
const mu=10; const queue=(lambda:number)=>{if(lambda>=mu)throw new Error('unstable queue');const rho=lambda/mu;return rho/(1-rho)};const vA=queue(8),vB=queue(9);const a=bars(['Arrivals','Service'],[8,mu]);const b=bars(['Arrivals','Service'],[9,mu]);const endA=bars(['Waiting+served'],[vA]);const endB=bars(['Waiting+served'],[vB]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Mean people: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Mean people",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Mean people: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Mean people",value:f(vB)}]}]}
],reveal:[`At 8 arrivals/hour, the retained mean is ${f(vA)} people; at 9/hour it is ${f(vB)}. The service rate stays 10/hour.`,
`The toy M/M/1 formula is ρ/(1−ρ), with Poisson arrivals, independent exponential service and one server. Approaching full utilization makes the mean grow nonlinearly; this formula applies only below capacity.`]};
}
