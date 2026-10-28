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


const samples=[[0,0],[0,2],[2,0],[2,2]],biased=samples.map(s=>variance(s)),corrected=biased.map(v=>v*2);
const scenarios=[scene('a','Divide by n−1',table(['x1','x2'],samples),bars(['00','02','20','22'],corrected),`Average variance ${fmt(mean(corrected))}`),scene('b','Divide by n',table(['x1','x2'],samples),bars(['00','02','20','22'],biased),`Average variance ${fmt(mean(biased))}`)];const audit={a:mean(corrected),b:mean(biased),population:variance([0,2])};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-why-n-1",
  "family": "variance",
  "predict": {
    "question": "A population contains 0 and 2 with equal probability. Across all size-2 samples, what is the average variance estimate using divisor n−1?",
    "options": [
      "0.5",
      "1.0",
      "2.0"
    ],
    "answer": 1
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["Dividing by n−1 retains average variance 1; dividing by n retains 0.5. The four bars enumerate all equally likely size-two samples.", "Estimating the center from the same sample makes squared deviations too small on average. The n−1 divisor corrects that expectation under independent sampling; it does not make each individual sample variance equal the population variance."]
};
