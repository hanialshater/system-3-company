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


const worlds=[0,1].flatMap(t=>[0,1].map(u=>({t,u,m:t+u,y:2*t+u})));const selected=worlds.filter(w=>w.m===1),meanFor=(ws:typeof worlds,t:number)=>mean(ws.filter(w=>w.t===t).map(w=>w.y)),bad=meanFor(selected,1)-meanFor(selected,0),good=meanFor(worlds,1)-meanFor(worlds,0);
const scenarios=[scene('a','Control M=1',dag(['T','M','U','Y'],[[0,1],[2,1],[0,3],[2,3]]),table(['T','U','Y'],selected.map(w=>[w.t,w.u,w.y])),`Adjusted difference ${fmt(bad)}`),scene('b','No bad control',table(['T','U','Y'],worlds.map(w=>[w.t,w.u,w.y])),bars(['T=0','T=1'],[meanFor(worlds,0),meanFor(worlds,1)]),`Unadjusted difference ${fmt(good)}`)];const audit={a:bad,b:good};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-kitchen-sink-regression",
  "family": "bad-control",
  "predict": {
    "question": "Let independent fair binary T,U generate Y=2T+U and the proposed control M=T+U. Comparing T=1 and T=0 within M=1 gives what outcome difference?",
    "options": [
      "0",
      "1",
      "2"
    ],
    "answer": 1
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["Controlling M=1 retains difference 1; the unadjusted randomized comparison retains 2. At fixed M, treated units must have lower U, so the new comparison changes more than T.", "M is a shared effect of treatment and the outcome’s other cause. More controls can create bias rather than remove it. Choose controls from the causal question and graph, not simply from every available column."]
};
