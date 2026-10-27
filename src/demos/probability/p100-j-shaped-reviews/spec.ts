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


const ratings=[1,2,3,4,5],full=[20,20,20,20,20],selected=[20,1,1,1,20];const weighted=(ns:number[])=>sum(ns.map((n,i)=>n*ratings[i]))/sum(ns);
const scenarios=[scene('a','Selected reviewers',bars(ratings.map(String),full),bars(ratings.map(String),selected),`Extreme ${fmt(40/43*100)}%; mean ${fmt(weighted(selected))}`),scene('b','Every user reviews',table(['Users'],[[100]]),bars(ratings.map(String),full),`Extreme 40%; mean ${fmt(weighted(full))}`)];const audit={a:40/43,b:weighted(selected),populationMean:weighted(full)};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-j-shaped-reviews",
  "family": "selection",
  "predict": {
    "question": "Each rating 1–5 has 20 users. All 1- and 5-star users review, but only one user at each middle rating does. What share of visible reviews is extreme?",
    "options": [
      "40.000%",
      "80.000%",
      "93.023%"
    ],
    "answer": 2
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The selected reviews retain 93.023% extreme ratings, versus 40% in the full population. Both retained means are 3 because this selection is symmetric.", "Selection can change a distribution’s shape without changing its mean. These counts are a stipulated toy rule, not measured reviewer behavior; an observed J-shape alone does not identify the selection mechanism."]
};
