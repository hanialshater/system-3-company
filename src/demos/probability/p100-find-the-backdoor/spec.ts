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


const worlds=[0,1].flatMap(z=>[0,1].map(u=>({z,t:z+u,y:2*(z+u)+3*z})));const slope=covariance(worlds.map(w=>w.t),worlds.map(w=>w.y))/variance(worlds.map(w=>w.t));
const g=dag(['Z','T','Y'],[[0,1],[0,2],[1,2]]);const blocked=dag(['Z fixed','T','Y'],[[0,1,false],[0,2,false],[1,2]]);
const scenarios=[scene('a','Hold Z fixed',g,blocked,'Unit-T effect 2',[{label:'Y change',value:2}]),scene('b','Backdoor open',table(['Z','T','Y'],worlds.map(w=>[w.z,w.t,w.y])),g,`Raw slope ${fmt(slope)}`,[{label:'Raw slope',value:slope}])];const audit={a:2,b:slope};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-find-the-backdoor",
  "family": "backdoor",
  "predict": {
    "question": "Let independent fair Z,U generate T=Z+U and Y=2T+3Z. What outcome change follows increasing T by one while holding Z fixed?",
    "options": [
      "2",
      "3",
      "5"
    ],
    "answer": 0
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["Holding Z fixed retains a unit-treatment effect of 2; the raw association retains slope 3.5. The graph’s T←Z→Y route contributes an extra noncausal association.", "A suitable pre-treatment adjustment blocks that backdoor while preserving T→Y. This toy model supplies the equations and measured confounder; in observed data their completeness is an assumption to investigate."]
};
