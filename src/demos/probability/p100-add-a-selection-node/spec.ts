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


const worlds=[{x:0,y:0},{x:0,y:1},{x:1,y:0},{x:1,y:1}],selected=worlds.filter(w=>w.x||w.y);const prob=(ws:typeof worlds,x:number)=>mean(ws.filter(w=>w.x===x).map(w=>w.y));
const scenarios=[scene('a','Selected worlds',dag(['X','Select','Y'],[[0,1],[2,1]]),{kind:'scatter',points:selected},`P(Y=1|X=0)=${fmt(prob(selected,0)*100)}%`,[{label:'If X=1',value:`${fmt(prob(selected,1)*100)}%`}]),scene('b','All worlds',table(['Worlds'],[[4]]),{kind:'scatter',points:worlds},`P(Y=1|X=0)=${fmt(prob(worlds,0)*100)}%`,[{label:'If X=1',value:'50%'}])];const audit={a:prob(selected,0),b:prob(worlds,0),selectedXOne:prob(selected,1)};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-add-a-selection-node",
  "family": "selection-node",
  "predict": {
    "question": "Independent fair binary X,Y produce four equally likely worlds. Keep a world if X or Y is 1. Among selected worlds with X=0, what is P(Y=1)?",
    "options": [
      "0%",
      "50%",
      "100%"
    ],
    "answer": 2
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["Selection retains P(Y=1|X=0)=100%; the full population retains 50%. In the selected set, a zero X can enter only alongside a one Y.", "The selection rule is a shared effect of X and Y. Conditioning on entry opens that collider and creates dependence between originally independent variables. Adding a selection node makes the filtering operation part of the causal story."]
};
