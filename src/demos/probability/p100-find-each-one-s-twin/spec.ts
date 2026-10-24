import type { MiniLabFrame, MiniLabScenario, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";

// Finite illustrative model. No empirical source is simulated or certified here.
const sum=(xs:number[])=>xs.reduce((a,b)=>a+b,0);
const mean=(xs:number[])=>sum(xs)/xs.length;
const variance=(xs:number[])=>mean(xs.map(x=>(x-mean(xs))**2));
const covariance=(xs:number[],ys:number[])=>mean(xs.map((x,i)=>(x-mean(xs))*(ys[i]-mean(ys))));
const correlation=(xs:number[],ys:number[])=>covariance(xs,ys)/Math.sqrt(variance(xs)*variance(ys));
const fmt=(n:number)=>Number(n.toFixed(3)).toString();
const bars=(labels:string[],values:number[]):MiniLabVisual=>({kind:'bars',items:labels.map((label,i)=>({label,value:values[i]}))});
const table=(columns:string[],rows:(string|number)[][]):MiniLabVisual=>({kind:'table',columns,rows});
const grid=(labels:string[],values:number[]):MiniLabVisual=>({kind:'grid',cells:labels.map((label,i)=>({label,value:values[i]}))});
const scatter=(xs:number[],ys:number[]):MiniLabVisual=>({kind:'scatter',points:xs.map((x,i)=>({x,y:ys[i]})),xLabel:'x',yLabel:'y'});
const timeline=(labels:string[],values:number[]):MiniLabVisual=>({kind:'timeline',events:labels.map((label,i)=>({label,value:values[i]}))});
const dag=(labels:string[],edges:([number,number]|[number,number,boolean])[]):MiniLabVisual=>({kind:'graph',nodes:labels.map((label,i)=>({id:String(i),label,x:labels.length===2?80+i*160:40+i*240/(labels.length-1),y:i%2?115:45})),edges:edges.map(e=>({from:String(e[0]),to:String(e[1]),active:e[2]!==false}))});
function scene(id:string,label:string,input:MiniLabVisual,output:MiniLabVisual,summary:string,metrics?:MiniLabFrame['metrics']):MiniLabScenario{return {id,label,frames:[{caption:'Toy model · inputs',visual:input},{caption:`Toy model · ${label}`,visual:output,metrics}],summary};}


const treated=[80,60],controls=[50,70,10],matches=[70,50];const matched=mean(treated.map((v,i)=>v-matches[i])),unmatched=mean(treated)-mean(controls);
const scenarios=[scene('a','Exact-age matches',table(['Age','T','C'],[[60,80,70],[20,60,50]]),bars(['60','20'],treated.map((v,i)=>v-matches[i])),`Matched difference ${fmt(matched)}`),scene('b','All controls',table(['T mean','C mean'],[[mean(treated),mean(controls)]]),bars(['T','C'],[mean(treated),mean(controls)]),`Unmatched difference ${fmt(unmatched)}`)];const audit={a:matched,b:unmatched};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-find-each-one-s-twin",
  "family": "matching",
  "predict": {
    "question": "Treated people aged 60 and 20 have outcomes 80 and 60. Untreated people aged 20, 60, 90 have outcomes 50, 70, 10. What mean difference follows exact-age matching?",
    "options": [
      "10.000",
      "26.667",
      "40.000"
    ],
    "answer": 0
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The matched difference is 10; using every control gives 26.667. Matching uses the same ages instead of letting the unmatched 90-year-old change the comparison.", "Matching can improve comparability on measured variables. It identifies a treatment effect only with adequate overlap and no remaining unmeasured confounding; a neat pair of dots does not establish those assumptions."]
};
