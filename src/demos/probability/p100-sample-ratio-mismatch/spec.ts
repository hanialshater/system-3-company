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


const chi=(a:number,b:number)=>{const e=(a+b)/2;return (a-e)**2/e+(b-e)**2/e;};
const scenarios=[scene('a','Million users',table(['A','B'],[[508000,492000]]),bars(['Observed A','Observed B'],[508000,492000]),`χ²=${fmt(chi(508000,492000))}`),scene('b','Thousand users',table(['A','B'],[[508,492]]),bars(['Observed A','Observed B'],[508,492]),`χ²=${fmt(chi(508,492))}`)];const audit={a:chi(508000,492000),b:chi(508,492)};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-sample-ratio-mismatch",
  "family": "srm",
  "predict": {
    "question": "A 50/50 test ends with 508,000 and 492,000 users. For expected 500,000 each, what is the Pearson χ² allocation statistic?",
    "options": [
      "0.256",
      "16.000",
      "256.000"
    ],
    "answer": 2
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The million-user case retains χ²=256; the thousand-user case retains 0.256. Both have the same percentage split, but the larger denominator makes that deviation much more surprising under a 50/50 model.", "An allocation mismatch is a diagnostic signal, not proof of one particular bug. Check assignment, eligibility and logging before interpreting outcome differences from the affected experiment."]
};
