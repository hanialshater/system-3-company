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


const click=[100,150],revenue=[2000,1750],purchases=[40,35];const change=(xs:number[])=>(xs[1]/xs[0]-1)*100;
const scenarios=[scene('a','Revenue guardrail',table(['Base','Variant'],[[...revenue]]),bars(['Base','Variant'],revenue),`Revenue ${fmt(change(revenue))}%`),scene('b','Click target',table(['Purchases'],purchases.map(v=>[v])),bars(['Base','Variant'],click),`Clicks +${fmt(change(click))}%`)];const audit={a:change(revenue),b:change(click),purchaseChange:change(purchases)};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-guardrail-metrics",
  "family": "guardrails",
  "predict": {
    "question": "Per 1,000 visits a baseline has 100 clicks and revenue 2,000; a variant has 150 clicks and revenue 1,750. What revenue change accompanies the click increase?",
    "options": [
      "−12.5%",
      "0.0%",
      "+50.0%"
    ],
    "answer": 0
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The revenue guardrail retains −12.5%, while the click target retains +50%. The variant’s extra clicks do not translate into more purchases in these stipulated counts.", "A target metric can improve while another important outcome worsens. Predeclared guardrails make that tradeoff visible; these aggregate arithmetic differences alone do not establish statistical certainty or a launch decision."]
};
