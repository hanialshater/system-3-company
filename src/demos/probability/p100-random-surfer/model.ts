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
const stationary=(tele:number)=>{const ab=1-tele/2,ba=.5;const A=ba/(ab+ba);return [A,1-A]};const sa=stationary(.2),sb=stationary(1);const vA=sa[1],vB=sb[1];const a=graph(['A','B'],[[0,1],[1,0],[1,1]]),b=graph(['A','B'],[[0,1],[1,0]]);const endA=table(['Page','Share'],[['A',sa[0]],['B',sa[1]]]),endB=table(['Page','Share'],[['A',sb[0]],['B',sb[1]]]);
return {values:[vA,vB],scenarios:[
{id:'a',label:'Question case',summary:`B share: ${f(vA)}`,frames:[{caption:'Toy model: inputs',visual:a},{caption:'Toy model: case A',visual:endA,metrics:[{label:"B share",value:f(vA)}]}]},
{id:'b',label:'Changed case',summary:`B share: ${f(vB)}`,frames:[{caption:'Toy model: inputs',visual:b},{caption:'Toy model: case B',visual:endB,metrics:[{label:"B share",value:f(vB)}]}]}
],reveal:[`B receives ${pct(vA)} of stationary mass with 0.2 teleport and ${pct(vB)} with teleport always on. The retained shares solve the two-state balance equations.`,
`A always sends link-following mass to B, while B sends only half back. Uniform teleport weakens that asymmetry. This is a two-page Markov model, not a full web-ranking implementation.`]};
}
