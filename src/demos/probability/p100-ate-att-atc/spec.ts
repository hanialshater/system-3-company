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


const effects=[8,2],treatedWeights=[.8,.2],untreatedWeights=[.2,.8],weighted=(w:number[])=>sum(w.map((p,i)=>p*effects[i]));
const scenarios=[scene('a','Treated target',table(['Effect','Weight'],effects.map((v,i)=>[v,treatedWeights[i]])),bars(['Type 1','Type 2'],treatedWeights.map((w,i)=>w*effects[i])),`ATT ${fmt(weighted(treatedWeights))}`),scene('b','Untreated target',table(['Effect','Weight'],effects.map((v,i)=>[v,untreatedWeights[i]])),bars(['Type 1','Type 2'],untreatedWeights.map((w,i)=>w*effects[i])),`ATC ${fmt(weighted(untreatedWeights))}`)];const audit={a:weighted(treatedWeights),b:weighted(untreatedWeights),ate:mean(effects)};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-ate-att-atc",
  "family": "estimands",
  "predict": {
    "question": "Two equally common types have treatment effects 8 and 2. Treatment reaches 80% of responsive types and 20% of less-responsive types. What is the average effect among the treated?",
    "options": [
      "3.2",
      "5.0",
      "6.8"
    ],
    "answer": 2
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The treated population retains ATT=6.8; the untreated population retains ATC=3.2. Equal weighting over the whole population would give ATE=5.", "These are different target populations, not competing calculations of one universal effect. When treatment response varies, changing who receives treatment changes the relevant average even if every individual effect remains fixed."]
};
