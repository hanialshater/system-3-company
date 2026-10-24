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
const residuals=[1,2,2,3,3,4,4,5,6];const radius=(coverage:number)=>residuals[Math.ceil((residuals.length+1)*coverage)-1];const vA=radius(.9),vB=radius(.8);const a=bars(['Rank'],[9]),b=bars(['Rank'],[8]);const endA=intervals(['90%'],[vA*vA]),endB=intervals(['80%'],[vB*vB]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Radius90: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Radius90",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Radius80: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Radius80",value:f(vB)}]}]}
],reveal:[`The selected radii are ${f(vA)} for 90% and ${f(vB)} for 80%. The retained intervals use those finite calibration order statistics around zero.`,
`The rank is ceil((n+1)×coverage), not an interpolated percentile here. Split-conformal coverage relies on exchangeability and applies marginally; this toy rule does not promise 90% coverage separately for every subgroup.`]};
}
