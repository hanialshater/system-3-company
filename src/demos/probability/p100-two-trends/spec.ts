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


const t=[1,2,3,4,5],rx=[1,-1,0,-1,1],ry=[1,1,-2,1,1],x=t.map((v,i)=>v+rx[i]),y=t.map((v,i)=>3*v+ry[i]);
const scenarios=[scene('a','Remove known trends',scatter(x,y),scatter(rx,ry),`Residual covariance ${fmt(covariance(rx,ry))}`),scene('b','Keep trends',table(['Time'],t.map(v=>[v])),scatter(x,y),`Raw covariance ${fmt(covariance(x,y))}`)];const audit={a:covariance(rx,ry),b:covariance(x,y)};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-two-trends",
  "family": "detrending",
  "predict": {
    "question": "Two sequences are x=t+[1,−1,0,−1,1] and y=3t+[1,1,−2,1,1], for t=1…5. After subtracting the stipulated trends, what covariance remains?",
    "options": [
      "−1",
      "0",
      "1"
    ],
    "answer": 1
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The detrended case retains covariance 0; keeping the calendar trends retains covariance 6. Both variables share time structure in this toy model.", "Subtracting the known trends exposes the residual relationship. In real data the trend is estimated and may be misspecified, so detrending is a model choice rather than proof that all remaining associations are causal."]
};
