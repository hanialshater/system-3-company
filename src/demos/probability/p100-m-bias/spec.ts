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


const worlds=[{x:0,y:0},{x:0,y:1},{x:1,y:0},{x:1,y:1}],selected=worlds.filter(w=>w.x+w.y===1);const r=(ws:typeof worlds)=>correlation(ws.map(w=>w.x),ws.map(w=>w.y));
const g=dag(['X','M','Y'],[[0,1],[2,1]]);
const scenarios=[scene('a','Condition on M=1',g,{kind:'scatter',points:selected},`Selected r=${fmt(r(selected))}`),scene('b','No conditioning',g,{kind:'scatter',points:worlds},`Full r=${fmt(r(worlds))}`)];const audit={a:r(selected),b:r(worlds)};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-m-bias",
  "family": "m-bias",
  "predict": {
    "question": "Independent fair binary variables U and V generate X=U, Y=V, and M=U+V. Restrict to M=1. What correlation remains between X and Y?",
    "options": [
      "−1",
      "0",
      "1"
    ],
    "answer": 0
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["Conditioning on M=1 retains correlation −1; the full four worlds retain 0. Inside the selected set, knowing one variable is 1 forces the other to be 0.", "M is a collider, a shared effect rather than a shared cause. Adjusting for it creates an association that was absent before selection. The toy graph states the causal assumptions explicitly."]
};
