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
const update=(r:number)=>{const gain=4/(4+r);return{mean:10+gain*(14-10),variance:(1-gain)*4,gain}};const ua=update(1),ub=update(16);const vA=ua.mean,vB=ub.mean;const a=bars(['Prior','Sensor'],[10,14]),b=a;const endA=bars(['Updated','Variance'],[ua.mean,ua.variance]),endB=bars(['Updated','Variance'],[ub.mean,ub.variance]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Position: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Position",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Position: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Position",value:f(vB)}]}]}
],reveal:[`The retained estimates are ${f(vA)} with sensor variance 1 and ${f(vB)} with variance 16. The reading stays 14 in both cases.`,
`Gain is prior variance divided by prior-plus-sensor variance. A noisier sensor receives less weight, so the update stays nearer 10. This scalar Gaussian toy assumes independent prior and measurement errors.`]};
}
