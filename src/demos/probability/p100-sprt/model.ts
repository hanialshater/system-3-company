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
const logPath=(s:string)=>{let x=0;return[0,...[...s].map(c=>(x+=Math.log(c==='H'?1.5:.5)))]};const pa=logPath('HHHHHH'),pb=logPath('HTHTHT');const vA=pa.at(-1)!,vB=pb.at(-1)!;const a=timeline(pa.slice(0,2)),b=timeline(pb.slice(0,2));const endA=timeline(pa),endB=timeline(pb);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`Log ratio: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Log ratio",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`Log ratio: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Log ratio",value:f(vB)}]}]}
],reveal:[`Six heads produce log-ratio ${f(vA)}, above log(9)≈2.197. Alternating HT produces ${f(vB)} and does not cross the upper boundary.`,
`Each observation adds its log likelihood ratio; tails subtract more than a head adds in this comparison. These are fixed sequences with illustrative stopping boundaries, not a demonstration of exact frequentist error guarantees.`]};
}
