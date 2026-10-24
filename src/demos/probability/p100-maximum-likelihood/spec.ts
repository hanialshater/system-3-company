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


const ps=[.25,.5,.75];
const likelihood=(heads:number)=>ps.map(p=>p**heads*(1-p)**(4-heads));
const a=likelihood(3),b=likelihood(1);
const scenarios=[scene('a','Three heads',table(['H','T'],[[3,1]]),bars(ps.map(p=>`${p*100}%`),a),'Best: 75% heads'),scene('b','One head',table(['H','T'],[[1,3]]),bars(ps.map(p=>`${p*100}%`),b),'Best: 25% heads')];
const audit={a:a[2],b:b[0],aLow:a[0]};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-maximum-likelihood",
  "family": "likelihood",
  "predict": {
    "question": "You observe 3 heads and 1 tail in four independent coin flips. Which bias makes this exact sequence most likely?",
    "options": [
      "25% heads",
      "50% heads",
      "75% heads"
    ],
    "answer": 2
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The retained cases select 75% heads for three heads and 25% for one head. Each bar multiplies the probabilities of the four observed flips.", "The tallest bar maximizes the likelihood of this sequence among these candidates. It is not the probability that the candidate bias is true; that would also require a prior."]
};
