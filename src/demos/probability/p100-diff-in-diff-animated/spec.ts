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


const make=(shock:number,id:string)=>{const c=[10,14+shock],t=[12,21+shock],did=(t[1]-t[0])-(c[1]-c[0]);return scene(id,shock?'Common shock':'Original case',table(['Group','Before','After'],[['C',...c],['T',...t]]),bars(['C change','T change'],[c[1]-c[0],t[1]-t[0]]),`DiD ${fmt(did)}`);};const scenarios=[make(0,'a'),make(3,'b')];const audit={a:(21-12)-(14-10),b:(24-12)-(17-10)};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-diff-in-diff-animated",
  "family": "did",
  "predict": {
    "question": "A control group goes 10→14 and treated group 12→21. Under a parallel-trends assumption, what is the difference-in-differences estimate?",
    "options": [
      "4",
      "5",
      "9"
    ],
    "answer": 1
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["Both retained cases give DiD 5. Adding the same post-period shock changes both group trends by the same amount, so it cancels in the difference of changes.", "The arithmetic alone does not establish causation. Interpreting 5 as a policy effect requires the treated group’s untreated trend to match the control trend, without a competing treated-only shock."]
};
