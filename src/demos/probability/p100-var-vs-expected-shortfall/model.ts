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
const losses=(tail:number)=>[...Array(18).fill(0),10,tail] as number[];const quantile=(x:number[])=>x[Math.ceil(.95*x.length)-1];const aL=losses(100),bL=losses(1000);const vA=quantile(aL),vB=quantile(bL);const a=bars(['95% VaR','Worst 5%'],[vA,aL.at(-1)!]),b=bars(['Tail'],[1000]);const endA=table(['VaR','ES'],[[vA,100]]),endB=table(['VaR','ES'],[[vB,1000]]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`VaR ${f(vA)}; ES 100`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"95% VaR",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`VaR ${f(vB)}; ES 1,000`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"95% VaR",value:f(vB)}]}]}
],reveal:[`VaR remains ${f(vA)} when the largest loss changes from 100 to 1,000. Expected shortfall over the worst 5% rises from 100 to 1,000.`,
`The stipulated quantile is the 19th ordered value out of 20. It marks a threshold and ignores severity beyond it; expected shortfall averages that tail. The quantile convention and equal probabilities are explicit parts of this toy.`]};
}
