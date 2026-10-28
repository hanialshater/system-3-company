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


const weekday=10,weekend=-10,weekly=(5*weekday+2*weekend)/7,traffic=.3*weekday+.7*weekend;
const scenarios=[scene('a','Uniform-day week',table(['Weekday','Weekend'],[[5,2]]),bars(['Weekday pp','Weekend pp'],[weekday,weekend]),`Weekly ${fmt(weekly)}pp`),scene('b','Weekend-heavy visits',table(['Weekday share','Weekend share'],[[.3,.7]]),bars(['Weighted weekday','Weighted weekend'],[.3*weekday,.7*weekend]),`Traffic-weighted ${fmt(traffic)}pp`)];const audit={a:weekly,b:traffic};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-monday-vs-weekend",
  "family": "calendar-mix",
  "predict": {
    "question": "A change adds 10 percentage points on weekdays and loses 10 on weekends. Giving each of seven days equal weight, what is the weekly average?",
    "options": [
      "−4.000 points",
      "4.286 points",
      "10.000 points"
    ],
    "answer": 1
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["Equal-day weighting retains +4.286 points; weekend-heavy traffic retains −4. The treatment responses are unchanged, but the target population mix changes.", "A weekdays-only experiment answers a different weighted question from a full week or a weekend-heavy audience. Choose weights that match the deployment question and check whether treatment response varies with those periods."]
};
