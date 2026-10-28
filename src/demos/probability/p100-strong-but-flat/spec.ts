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


const x=[1,2,3],small=x.map(v=>v*.01),large=small.map(v=>v*1000);
const make=(ys:number[],id:string)=>scene(id,id==='a'?'Small units':'Large units',table(['x','y'],x.map((v,i)=>[v,ys[i]])),scatter(x,ys),`r=${fmt(correlation(x,ys))}; slope=${fmt(covariance(x,ys)/variance(x))}`);
const scenarios=[make(small,'a'),make(large,'b')];const audit={a:correlation(x,small),b:correlation(x,large),smallSlope:covariance(x,small)/variance(x),largeSlope:covariance(x,large)/variance(x)};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-strong-but-flat",
  "family": "correlation",
  "predict": {
    "question": "The points x=1,2,3 and y=.01,.02,.03 lie on one line. What happens to correlation when y is multiplied by 1,000?",
    "options": [
      "It stays 1",
      "It becomes 0.01",
      "It becomes 1,000"
    ],
    "answer": 0
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["Both cases retain correlation 1, while the slopes are 0.01 and 10. Rescaling the outcome changes its units but preserves the points’ perfect linear ordering.", "Correlation normalizes covariance by both variables’ standard deviations. Slope keeps the units of outcome per predictor, so a near-flat line can still have perfect correlation. The axes show their own scales."]
};
