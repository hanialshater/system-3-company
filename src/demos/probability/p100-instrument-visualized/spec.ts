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


const first=.6-.2,reduced=12-10,clean=reduced/first,bad=(reduced+1)/first;
const good=dag(['Z','T','Y'],[[0,1],[1,2]]),direct=dag(['Z','T','Y'],[[0,1],[1,2],[0,2]]);
const scenarios=[scene('a','Exclusion holds',table(['ΔT','ΔY'],[[first,reduced]]),good,`Wald ${fmt(clean)}`,[{label:'ΔY / ΔT',value:clean}]),scene('b','Direct Z effect',good,direct,`Naive Wald ${fmt(bad)}`,[{label:'ΔY / ΔT',value:bad}])];const audit={a:clean,b:bad};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-instrument-visualized",
  "family": "iv",
  "predict": {
    "question": "An instrument raises treatment probability .2→.6 and outcome mean 10→12. Under relevance, exclusion, independence and monotonicity, what is the Wald estimate?",
    "options": [
      "0.8",
      "5.0",
      "7.5"
    ],
    "answer": 1
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The valid-instrument case retains Wald 5; adding a direct outcome effect of 1 retains a naive 7.5. The denominator is the instrument’s 0.4 change in treatment uptake.", "A direct instrument-to-outcome arrow contaminates the numerator. Under the stated assumptions the ratio identifies a local effect for compliers, not necessarily the effect for every person."]
};
