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
const p=[.499995,.00001,.499995],qA=[.9998,.0001,.0001],qB=[1/3,1/3,1/3];const kl=(p:number[],q:number[])=>p.reduce((s,v,i)=>s+v*Math.log(v/q[i]),0);const vA=kl(qA,p),vB=kl(qB,p);const a=bars(['Left','Gap','Right'],qA),b=bars(['Left','Gap','Right'],qB);const endA=bars(['q||p','p||q'],[vA,kl(p,qA)]),endB=bars(['q||p','p||q'],[vB,kl(p,qB)]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`KL(q||p): ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"KL(q||p)",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`KL(q||p): ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"KL(q||p)",value:f(vB)}]}]}
],reveal:[`KL(q||p) is ${f(vA)} for qA and ${f(vB)} for uniform qB. The reverse-direction bars use the same distributions with their arguments exchanged.`,
`The nearly empty middle state makes assigning probability there costly under KL(q||p). KL(p||q) instead heavily penalizes neglecting a target mode. This compares two finite candidates; it does not claim a universal optimizer.`]};
}
