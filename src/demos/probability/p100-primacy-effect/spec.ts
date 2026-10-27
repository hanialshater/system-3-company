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


const lift=(t:number)=>5-15*Math.exp(-t/3),days=[0,1,3,6,9];
const scenarios=[scene('a','Returning users',table(['Day0','Day9'],[[lift(0),lift(9)]]),timeline(days.map(String),days.map(lift)),`Day 9: ${fmt(lift(9))}pp`),scene('b','New users',table(['User type'],[['New']]),timeline(days.map(String),days.map(()=>5)),'Day 9: 5pp')];const audit={a:lift(9),b:5,day0:lift(0),day3:lift(3)};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-primacy-effect",
  "family": "adaptation",
  "predict": {
    "question": "Returning users follow the toy lift L(t)=5−15 exp(−t/3), in percentage points; new users stay at +5. What returning-user lift is expected on day 9?",
    "options": [
      "−10.000 points",
      "−0.518 points",
      "4.253 points"
    ],
    "answer": 2
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["Returning users retain day-nine lift 4.253 points; new users retain 5. The stipulated adaptation penalty starts large and then decays.", "Early harm can coexist with later gains under this model. An observed early loss does not prove adaptation, though: persistent harm is a competing explanation that needs longer follow-up and an appropriate comparison."]
};
