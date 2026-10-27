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
const effect=5;const bounds=(d:number)=>({label:`δ=${d}`,low:effect-d,mid:effect,high:effect+d});const vA=effect-3,vB=effect+3;const a={kind:'intervals' as const,items:[bounds(0)]},b={kind:'intervals' as const,items:[bounds(0)]};const endA={kind:'intervals' as const,items:[bounds(3)]},endB={kind:'intervals' as const,items:[bounds(1)]};
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`δ3: ${f(vA)}–${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"Effect bounds",value:`${f(vA)}–${f(vB)}`}]}]},
{id:'b',label:'Changed case',summary:`δ1: ${f(effect-1)}–${f(effect+1)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"Effect bounds",value:`${f(effect-1)}–${f(effect+1)}`}]}]}
],reveal:[`Allowing a trend departure of ±3 gives effect bounds ${f(vA)} to ${f(vB)}. Allowing only ±1 gives 4 to 6.`,
`The result subtracts each allowed untreated differential trend from the observed DiD of 5. Wider departures weaken identification. These stipulated sensitivity bounds omit sampling uncertainty and must not be read as confidence intervals.`]};
}
