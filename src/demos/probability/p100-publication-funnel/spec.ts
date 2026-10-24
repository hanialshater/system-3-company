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


const effects=[-2,-1,0,1,2],visible=effects.filter(v=>v>=1);
const scenarios=[scene('a','Selective publication',bars(effects.map(v=>String(v)),effects),bars(visible.map(v=>String(v)),visible),`Visible mean ${fmt(mean(visible))}`),scene('b','All studies',table(['Studies'],[[5]]),bars(effects.map(v=>String(v)),effects),`Complete mean ${fmt(mean(effects))}`)];const audit={a:mean(visible),b:mean(effects)};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-publication-funnel",
  "family": "publication-bias",
  "predict": {
    "question": "Five equally weighted studies estimate −2,−1,0,1,2. If only estimates at least 1 are shown, what mean estimate is visible?",
    "options": [
      "0.0",
      "1.0",
      "1.5"
    ],
    "answer": 2
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The visible literature retains mean 1.5; the complete set retains 0. The selection rule filters estimates, so the published average no longer represents all five studies.", "This finite funnel demonstrates a mechanism, not a measured rate of publication bias. Real evidence synthesis must investigate selection, study precision and heterogeneity rather than assume every missing result is zero."]
};
