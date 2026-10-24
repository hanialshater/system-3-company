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


const scores=[48,49,50,51,52];const make=(effect:number,id:string)=>{const ys=scores.map(x=>x/10+(x>=50?effect:0));return scene(id,effect?'Scholarship rule':'No scholarship',table(['Score','Eligible'],scores.map(x=>[x,x>=50?1:0])),scatter(scores,ys),`Threshold jump ${fmt(effect)}`);};const scenarios=[make(3,'a'),make(0,'b')];const audit={a:3,b:0,neighborDifference:50/10+3-49/10};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-scholarship-cutoff",
  "family": "rdd",
  "predict": {
    "question": "A toy score rule gives outcome score/10, plus 3 for scores at least 50. What discontinuity at the threshold belongs to treatment, after accounting for the smooth baseline?",
    "options": [
      "0.1",
      "3.0",
      "5.0"
    ],
    "answer": 1
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The scholarship rule retains a threshold jump of 3; the no-treatment comparison retains 0. The adjacent observed scores differ by 3.1 because the smooth baseline also changes by 0.1.", "A regression-discontinuity interpretation separates the jump from that smooth trend. It requires continuity of untreated outcomes and no precise sorting or other change at the same cutoff."]
};
