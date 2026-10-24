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


const n=100,m=10;const de=(rho:number)=>1+(m-1)*rho,eff=(rho:number)=>n/de(rho);
const scenarios=[scene('a','Within-school similarity',table(['n','m','rho'],[[n,m,.2]]),bars(['Actual n','Effective n'],[n,eff(.2)]),`Effective n ${fmt(eff(.2))}`),scene('b','Independent pupils',table(['rho'],[[0]]),bars(['Actual n','Effective n'],[n,eff(0)]),`Effective n ${fmt(eff(0))}`)];const audit={a:eff(.2),b:eff(0),designEffect:de(.2),rhoOne:eff(1)};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-cluster-trials",
  "family": "clustering",
  "predict": {
    "question": "A trial has 100 pupils in 10 schools of size 10. With intraclass correlation .2, use design effect 1+(m−1)ρ. What approximate effective sample size follows?",
    "options": [
      "10.000",
      "35.714",
      "100.000"
    ],
    "answer": 1
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The correlated-school case retains effective n=35.714; independent pupils retain 100. The design effect is 2.8 because classmates supply partly overlapping information.", "This equal-size approximation summarizes a mean-estimation variance penalty. Actual cluster-trial analysis also depends on cluster counts, unequal sizes and design details; 100 pupils do not automatically provide 100 independent observations."]
};
