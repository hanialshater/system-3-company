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


const lift=(t:number)=>2+18*Math.exp(-t/3),days=[0,1,2,3,6,9];
const scenarios=[scene('a','Late window',table(['Day','Lift'],[[0,lift(0)],[3,lift(3)]]),timeline(days.map(String),days.map(lift)),`Day 9: ${fmt(lift(9))}pp`),scene('b','Early window',table(['Sustained term'],[[2]]),timeline(['0','1','2','3'],[0,1,2,3].map(lift)),`Day 0: ${fmt(lift(0))}pp`)];const audit={a:lift(9),b:lift(0),day3:lift(3)};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-novelty-effect",
  "family": "novelty",
  "predict": {
    "question": "A stipulated daily lift follows L(t)=2+18 exp(−t/3), in percentage points. What lift remains on day 9?",
    "options": [
      "2.896 points",
      "8.622 points",
      "20.000 points"
    ],
    "answer": 0
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The late window retains 2.896 points on day 9; the early window retains 20 on day 0. The model’s temporary term decays while its sustained term stays at 2.", "A launch-window average would blend those components. This is an explicit hypothetical decay rule, not evidence that real product gains always fade or that day 9 is enough for every experiment."]
};
