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


const points=[-2,-1,0,1,2].flatMap(x=>[-1,1].map(e=>({x,y:2*x+e})));const narrow=points.filter(p=>Math.abs(p.x)<=1);
const r=(ps:typeof points)=>correlation(ps.map(p=>p.x),ps.map(p=>p.y));
const scenarios=[scene('a','Narrow range',{kind:'scatter',points},{kind:'scatter',points:narrow},`Restricted r=${fmt(r(narrow))}`),scene('b','Full range',table(['x range'],[[-2],[2]]),{kind:'scatter',points},`Full r=${fmt(r(points))}`)];const audit={a:r(narrow),b:r(points)};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-restricted-range",
  "family": "range-restriction",
  "predict": {
    "question": "For each x in −2…2, you have y=2x−1 and y=2x+1. Restricting x to −1,0,1 changes Pearson correlation to about what?",
    "options": [
      "0.000",
      "0.853",
      "0.943"
    ],
    "answer": 1
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The restricted case retains r=0.853; the full range retains r=0.943. The outcome rule and noise stay the same, but the admitted predictor spread changes.", "With less predictor variation, the fixed vertical noise occupies more of the remaining variation. Restricting all the way to a single x would make correlation undefined, not zero."]
};
