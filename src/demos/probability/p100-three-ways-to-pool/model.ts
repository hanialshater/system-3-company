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
const pool=(m:number,n:number)=>(n*m+4*6)/(n+4);const small=pool(2,2),large=pool(10,20);const complete=(2*2+20*10)/22;const vA=small,vB=complete;const a=bars(['Small','Large'],[2,10]),b=a;const endA=bars(['Small','Large'],[small,large]),endB=bars(['Small','Large'],[complete,complete]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Small partial: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Small partial",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Complete: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Complete",value:f(vB)}]}]}
],reveal:[`Partial pooling moves the small-group mean to ${f(vA)}; complete pooling gives both groups ${f(vB)}. The large group’s partial estimate remains closer to its raw mean.`,
`The stipulated prior contributes four observations at mean 6. Its relative weight is larger for the group with only two observations. Partial pooling preserves differences; complete pooling erases them in this example.`]};
}
