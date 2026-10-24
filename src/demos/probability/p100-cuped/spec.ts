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


const x=[1,2,3,4],y=[3,3,5,5],theta=covariance(x,y)/variance(x),adjusted=y.map((v,i)=>v-theta*(x[i]-mean(x)));
const scenarios=[scene('a','Pre-score adjustment',scatter(x,y),scatter(x,adjusted),`Variance ${fmt(variance(adjusted))}`,[{label:'theta',value:theta}]),scene('b','Unadjusted outcome',table(['Y'],y.map(v=>[v])),scatter(x,y),`Variance ${fmt(variance(y))}`)];const audit={a:variance(adjusted),b:variance(y),theta,adjustedMean:mean(adjusted)};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-cuped",
  "family": "cuped",
  "predict": {
    "question": "For pre-score X=1,2,3,4 and post-score Y=3,3,5,5, use θ=cov(X,Y)/var(X)=.8 and Yadj=Y−θ(X−mean X). What variance remains?",
    "options": [
      "0.2",
      "0.8",
      "1.0"
    ],
    "answer": 0
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The adjusted outcome retains variance 0.2; the unadjusted outcome retains 1. The pre-score predicts variation that can be removed without shifting this sample’s mean of 4.", "CUPED uses a pre-treatment covariate rather than a treatment consequence. This exact toy calculation illustrates variance reduction; real uncertainty estimates must respect how the adjustment coefficient and experiment were estimated."]
};
