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


const pooledT=.1*.8+.9*.4,pooledC=.9*.7+.1*.3,adjusted=(.8-.7+.4-.3)/2;
const confound=dag(['Z','T','Y'],[[0,1],[0,2],[1,2]]),mediator=dag(['T','M','Y'],[[0,1],[1,2],[0,2]]);
const scenarios=[scene('a','Pre-treatment Z',confound,confound,`Adjusted ${fmt(adjusted*100)}pp`,[{label:'Pooled',value:`${fmt((pooledT-pooledC)*100)}pp`}]),scene('b','Post-treatment M',confound,mediator,'Adjusted: direct-path contrast',[{label:'Total effect',value:'Needs mediation assumptions'}])];const audit={a:adjusted,b:pooledT-pooledC};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-split-or-pool",
  "family": "causal-adjustment",
  "predict": {
    "question": "A table has pooled treated 44%, control 66%, but +10 percentage points within each stratum. If the stratum is a pre-treatment confounder and adjustment assumptions hold, which contrast targets the total effect?",
    "options": [
      "Pooled −22 points",
      "Adjusted +10 points",
      "Both always target it"
    ],
    "answer": 1
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The pre-treatment graph retains an adjusted +10-point contrast; the mediator graph changes what adjustment targets. The same numeric table does not identify which story generated it.", "Balancing a confounder blocks a noncausal path. Holding a mediator fixed blocks part of the causal pathway instead; interpreting that as a direct effect requires additional assumptions. The arrows, timing and target matter."]
};
