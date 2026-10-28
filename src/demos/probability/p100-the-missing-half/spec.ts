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


const y0=[1,4,2,5],y1=[3,5,2,9],assigned=[0,1,0,1],observed=y0.map((v,i)=>assigned[i]?y1[i]:v),effects=y0.map((v,i)=>y1[i]-v);const masked=table(['Person','Y0','Y1'],y0.map((v,i)=>[i+1,assigned[i]?'?':v,assigned[i]?y1[i]:'?']));
const scenarios=[scene('a','Simulated oracle',masked,table(['Y0','Y1','Effect'],y0.map((v,i)=>[v,y1[i],effects[i]])),`Oracle ATE ${fmt(mean(effects))}`),scene('b','Observed assignment',table(['Assigned T'],assigned.map(v=>[v])),masked,'Four counterfactual cells hidden',[{label:'Observed outcomes',value:observed.join(', ')}])];const audit={a:mean(effects),b:observed.reduce((a,b)=>a+b,0),missing:y0.length};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-the-missing-half",
  "family": "potential-outcomes",
  "predict": {
    "question": "Four simulated people have Y₀=[1,4,2,5] and Y₁=[3,5,2,9]. Only one outcome is observed per person. If an oracle reveals both, what is their average treatment effect?",
    "options": [
      "1.00",
      "1.75",
      "2.25"
    ],
    "answer": 1
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The simulated oracle retains ATE=1.75; the observed assignment retains four hidden counterfactual cells. Each person contributes only the outcome under the treatment actually received.", "The oracle is available only because this is an invented population. Real causal estimation needs a design and assumptions to learn average missing outcomes; observing one person more accurately does not reveal their alternative history."]
};
