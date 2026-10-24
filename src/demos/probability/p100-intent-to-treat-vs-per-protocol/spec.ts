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


const willing=.4,effect=5,baseline=3,offered=willing*(baseline+effect),notOffered=willing*baseline,itt=offered-notOffered,naive=baseline+effect;
const scenarios=[scene('a','By assignment',table(['Offer','No offer'],[[offered,notOffered]]),bars(['Offer mean','No-offer mean'],[offered,notOffered]),`Assignment effect ${fmt(itt)}`),scene('b','Selected takers',table(['Type','Takes','Baseline'],[['Willing',1,3],['Other',0,0]]),bars(['Taker','Never-taker'],[naive,0]),`Selected difference ${fmt(naive)}`)];const audit={a:itt,b:naive};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-intent-to-treat-vs-per-protocol",
  "family": "compliance",
  "predict": {
    "question": "In each randomized arm, 40% are willing types with baseline 3 and 60% have baseline 0. Only willing offered people take treatment, which adds 5. What is the assignment effect?",
    "options": [
      "2",
      "5",
      "8"
    ],
    "answer": 0
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["Assignment retains a difference of 2; the selected taker comparison retains 8. The takers combine a treatment gain of 5 with a baseline advantage of 3.", "Analyzing by randomized assignment preserves the randomized comparison and measures the offer’s effect. Comparing people who chose to comply changes the groups; it needs additional assumptions to recover a treatment effect."]
};
