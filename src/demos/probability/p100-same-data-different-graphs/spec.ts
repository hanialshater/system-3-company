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


const joint=(a:number,b:number,c:number)=>.5*(a===b?.9:.1)*(c===b?.9:.1);const chain=(a:number,b:number,c:number)=>.5*(a===b?.9:.1)*(c===b?.9:.1);let error=0,total=0;for(const a of [0,1])for(const b of [0,1])for(const c of [0,1]){total+=joint(a,b,c);error=Math.max(error,Math.abs(joint(a,b,c)-chain(a,b,c)));}
const input=table(['A','C','B=0','B=1'],[0,1].flatMap(a=>[0,1].map(c=>[a,c,joint(a,0,c),joint(a,1,c)])));
const scenarios=[scene('a','Common-cause graph',input,dag(['A','B','C'],[[1,0],[1,2]]),`P(000)=${fmt(joint(0,0,0))}`,[{label:'Joint mismatch',value:error}]),scene('b','Chain graph',input,dag(['A','B','C'],[[0,1],[1,2]]),`P(111)=${fmt(chain(1,1,1))}`,[{label:'Joint mismatch',value:error}])];const audit={a:error,b:total,p000:joint(0,0,0),p111:joint(1,1,1)};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-same-data-different-graphs",
  "family": "equivalence",
  "predict": {
    "question": "Fair B independently flips into A and C with 10% error each. A←B→C and a fitted A→B→C factorization reproduce the same joint distribution. Can those observations alone pick the causal direction?",
    "options": [
      "Yes: the first graph",
      "Yes: the second graph",
      "No: both fit these observations"
    ],
    "answer": 2
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["Both retained graphs have joint mismatch 0 and matching corner probabilities 0.405. Their observational factorization is compatible with the same joint table.", "Arrows express causal assumptions beyond a distributional fit. These graphs can imply different interventions even when passive observations agree. Additional temporal, experimental or domain information is needed to distinguish their causal interpretations."]
};
