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


const durations=[1,4],share=durations[1]/sum(durations);
const scenarios=[scene('a','Uniform-time screen',timeline(['Fast','Slow'],durations),bars(['Fast %','Slow %'],durations.map(v=>v/sum(durations)*100)),`Long-duration ${fmt(share*100)}%`),scene('b','Onset sampling',timeline(['Fast','Slow'],[1,1]),bars(['Fast %','Slow %'],[50,50]),'Long-duration 50%')];const audit={a:share,b:.5};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-length-bias",
  "family": "length-bias",
  "predict": {
    "question": "Two equally frequent toy conditions are detectable for 1 and 4 months. A uniform-time screen samples in proportion to detectable duration. What share of detected cases is long-duration?",
    "options": [
      "20%",
      "50%",
      "80%"
    ],
    "answer": 2
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["Uniform-time screening retains 80% long-duration cases, while sampling at onset retains 50%. The long detectable window offers four times as much opportunity for capture.", "Duration weighting changes which cases enter the observed group. This is a toy exposure model, not clinical evidence or a screening recommendation; comparing the groups’ later outcomes would need to address that selection."]
};
