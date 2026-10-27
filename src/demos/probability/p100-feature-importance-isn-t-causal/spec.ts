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


const rain=[0,1],wet=mean(rain),g=dag(['Rain','Umbrellas','Wet'],[[0,1],[0,2]]),cut=dag(['Rain','U=0','Wet'],[[0,1,false],[0,2]]);
const scenarios=[scene('a','Ban umbrella sales',g,cut,`Wet probability ${fmt(wet*100)}%`),scene('b','Observe zero sales',g,dag(['Rain=0','U=0','Wet=0'],[[0,1],[0,2]]),'Observed wet probability 0%')];const audit={a:wet,b:0};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-feature-importance-isn-t-causal",
  "family": "predict-vs-act",
  "predict": {
    "question": "Rain R is equally likely 0/1; umbrella sales U=100R and street wetness W=R. If an intervention forces umbrella sales to zero, what wet-street probability remains?",
    "options": [
      "0%",
      "50%",
      "100%"
    ],
    "answer": 1
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["Banning sales retains wet-street probability 50%; observing zero sales retains 0%. In the observational data, sales perfectly predict rain and wetness.", "The prediction works because rain causes both variables. Intervening on umbrella sales cuts their rain-generated assignment without removing rain’s path to wet streets. A model’s predictive feature importance does not by itself measure an intervention effect."]
};
