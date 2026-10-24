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


const full=[20,30,40,50,60];const low=full.slice(0,3),symmetric=full.slice(1,4);
const scenarios=[scene('a','Largest missing',table(['Full'],full.map(v=>[v])),grid(['20','30','40'],low),`Observed mean ${fmt(mean(low))}`),scene('b','Extremes missing',table(['Missing'],[[20],[60]]),grid(['30','40','50'],symmetric),`Observed mean ${fmt(mean(symmetric))}`)];const audit={a:mean(low),b:mean(symmetric),full:mean(full)};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-why-is-data-missing",
  "family": "missingness",
  "predict": {
    "question": "Five salaries are 20, 30, 40, 50, 60. If the two largest are missing, what mean is calculated from the visible salaries?",
    "options": [
      "30",
      "40",
      "50"
    ],
    "answer": 0
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The retained means are 30 when large values are hidden and 40 when the two extremes are hidden. The full five-value mean is 40.", "What disappears matters as much as how much disappears. This finite illustration compares two explicit selection rules; the balanced second rule is not a promise that random missingness is exactly unbiased in every sample."]
};
