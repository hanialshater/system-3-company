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


const full=[0,0,10,10],remaining=full.filter(v=>v>0);const complete=mean(remaining)-mean(full);
const scenarios=[scene('a','Selective dropout',table(['T','C'],full.map(v=>[v,v])),bars(['T mean','C mean'],[mean(remaining),mean(full)]),`Completer difference ${fmt(complete)}`),scene('b','Keep every outcome',table(['Kept T','Kept C'],[[4,4]]),bars(['T mean','C mean'],[mean(full),mean(full)]),'Full difference 0')];const audit={a:complete,b:mean(full)-mean(full)};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-who-drops-out",
  "family": "attrition",
  "predict": {
    "question": "Treatment and control both have outcomes 0,0,10,10. If only the treatment zeros drop out, what difference appears among completers?",
    "options": [
      "0",
      "5",
      "10"
    ],
    "answer": 1
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["Selective dropout retains a completer difference of 5, while keeping every outcome retains 0. The low treatment outcomes disappeared; no outcome improved.", "Comparing completers can break the balance that assignment created. Whether missing outcomes can be recovered depends on the missingness assumptions and available follow-up information, not merely on having randomized the original invitation."]
};
