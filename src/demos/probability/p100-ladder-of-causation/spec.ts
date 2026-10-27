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


const risks=[.2,.8],intervened=mean(risks),observed=.8;const g=dag(['Wealth','T','Buy'],[[0,1],[0,2]]),cut=dag(['Wealth','T=1','Buy'],[[0,1,false],[0,2]]);
const scenarios=[scene('a','Intervention question',g,cut,`Forced-T purchase ${fmt(intervened*100)}%`),scene('b','Association question',g,dag(['High wealth','T=1','Buy'],[[0,1],[0,2]]),`Observed-T purchase ${fmt(observed*100)}%`)];const audit={a:intervened,b:observed,effect:0};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-ladder-of-causation",
  "family": "causal-ladder",
  "predict": {
    "question": "Wealth Z is equally common high/low; treatment T=Z. Purchase risks are .8/.2 by wealth and treatment has no effect. What happens to mean purchase probability if everyone is forced to T=1?",
    "options": [
      "20%",
      "50%",
      "80%"
    ],
    "answer": 1
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["Forcing treatment retains purchase probability 50%; observing treated people retains 80%. In this stipulated world, treatment is only a wealth marker and has no outcome arrow.", "Association describes who was treated; intervention replaces that selection rule. A counterfactual would additionally hold an individual’s upstream state fixed while changing treatment. Those are different questions even when they use the same variable names."]
};
