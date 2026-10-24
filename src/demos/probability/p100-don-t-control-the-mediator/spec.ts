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


const direct=1,mediated=3*2,total=direct+mediated;const g=dag(['T','M','Y'],[[0,1],[1,2],[0,2]]),held=dag(['T','M fixed','Y'],[[0,1,false],[1,2,false],[0,2]]);
const scenarios=[scene('a','Let M respond',table(['ΔM','M→Y','Direct'],[[2,3,1]]),g,`Total effect ${fmt(total)}`,[{label:'Via M',value:mediated}]),scene('b','Hold M fixed',g,held,`Direct effect ${fmt(direct)}`,[{label:'Via M',value:0}])];const audit={a:total,b:direct,mediated};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-don-t-control-the-mediator",
  "family": "mediator",
  "predict": {
    "question": "A treatment raises mediator M by 2 and outcome obeys Y=3M+T. What total effect follows increasing T from 0 to 1 if you let M respond?",
    "options": [
      "1",
      "6",
      "7"
    ],
    "answer": 2
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["Letting M respond retains total effect 7; holding M fixed retains direct effect 1. The mediator carries 2×3=6 units of the stipulated effect.", "Controlling a treatment consequence removes that pathway from the contrast. A direct-effect question may want that operation, but it is a different question from the total effect and needs its own identification assumptions."]
};
