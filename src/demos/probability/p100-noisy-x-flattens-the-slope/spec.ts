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


const x=[-2,-1,0,1,2],y=x.map(v=>2*v),errors=[1,-2,2,-2,1],noisy=x.map((v,i)=>v+errors[i]);
const slope=(xs:number[])=>covariance(xs,y)/variance(xs);
const scenarios=[scene('a','Noisy ruler',scatter(x,y),scatter(noisy,y),`Slope ${fmt(slope(noisy))}`),scene('b','Exact ruler',scatter(noisy,y),scatter(x,y),`Slope ${fmt(slope(x))}`)];const audit={a:slope(noisy),b:slope(x),errorCov:covariance(x,errors)};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-noisy-x-flattens-the-slope",
  "family": "measurement-error",
  "predict": {
    "question": "You regress y=2x on x values −2,−1,0,1,2. Add predictor errors 1,−2,2,−2,1. What fitted slope do the noisy x values give?",
    "options": [
      "About 0.833",
      "About 2.000",
      "About 4.800"
    ],
    "answer": 0
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The noisy ruler retains a slope of 0.833; the exact ruler retains 2. The outcomes stay fixed while the horizontal positions change.", "Here the added predictor error is uncorrelated with the true predictor. It increases horizontal variance without adding matching outcome covariance, flattening the fitted slope. Other error structures need not behave this way."]
};
