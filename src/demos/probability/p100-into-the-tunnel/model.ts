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
const forecast=(n:number)=>1+2*n;const vA=forecast(3),vB=forecast(3)/(forecast(3)+1);const a=timeline([1]),b=timeline([1,3,5,7]);const endA=timeline([1,3,5,vA]),endB=timeline([1,3,5,7,vB]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Variance: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Variance",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Updated variance: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Updated variance",value:f(vB)}]}]}
],reveal:[`Three prediction-only steps raise variance to ${f(vA)}. Adding a returning independent measurement with variance 1 reduces it to ${f(vB)}.`,
`Without measurements, this toy adds process uncertainty at each step. The scalar update then combines that uncertainty with the sensor variance. The result concerns variance, not a guarantee that the estimated position is correct.`]};
}
