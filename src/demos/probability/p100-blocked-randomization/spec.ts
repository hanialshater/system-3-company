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


const tBalanced=[2,12],cBalanced=[0,10],tUnbalanced=[12,12],cUnbalanced=[0,0];
const scenarios=[scene('a','Block by baseline',table(['T','C'],tBalanced.map((v,i)=>[v,cBalanced[i]])),bars(['T mean','C mean'],[mean(tBalanced),mean(cBalanced)]),`Balanced difference ${fmt(mean(tBalanced)-mean(cBalanced))}`),scene('b','Unbalanced draw',table(['T','C'],tUnbalanced.map((v,i)=>[v,cUnbalanced[i]])),bars(['T mean','C mean'],[mean(tUnbalanced),mean(cUnbalanced)]),`Unbalanced difference ${fmt(mean(tUnbalanced)-mean(cUnbalanced))}`)];const audit={a:mean(tBalanced)-mean(cBalanced),b:mean(tUnbalanced)-mean(cUnbalanced)};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-blocked-randomization",
  "family": "blocking",
  "predict": {
    "question": "Four people have baseline outcomes 0,0,10,10, and treatment adds 2. If each arm gets one low and one high person, what treated-minus-control mean results?",
    "options": [
      "2",
      "7",
      "12"
    ],
    "answer": 0
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The blocked allocation retains difference 2; the unbalanced allocation retains 12. The same treatment rule operates in both, but the second comparison also contains a baseline gap.", "Blocking on this known prognostic feature forces both arms to contain the same baseline mix. It removes this source of allocation variation in the toy population; randomization alone does not guarantee exact balance in each realized draw."]
};
