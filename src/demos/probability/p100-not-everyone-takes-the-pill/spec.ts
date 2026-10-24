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


const effect=10,shares=[.2,.5,.8],assignment=shares.map(s=>s*effect);
const scenarios=[scene('a','20% take-up',table(['Effect','Take-up'],[[effect,.2]]),{kind:'curve',points:shares.map((x,i)=>({x:x*100,y:assignment[i]})),xLabel:'Take-up %',yLabel:'Assignment effect'},`20% uptake: effect ${fmt(assignment[0])}`),scene('b','80% take-up',table(['Effect','Take-up'],[[effect,.8]]),bars(['Assignment','Complier'],[assignment[2],effect]),`80% uptake: effect ${fmt(assignment[2])}`)];const audit={a:assignment[0],b:assignment[2],complierEffect:effect};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-not-everyone-takes-the-pill",
  "family": "dilution",
  "predict": {
    "question": "A treatment adds 10 for every complier, and an offer changes nothing else. If only 20% take it up, what mean effect does assignment have?",
    "options": [
      "2",
      "5",
      "10"
    ],
    "answer": 0
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The 20% case retains assignment effect 2; the 80% case retains 8. The stipulated complier effect stays 10 in both cases.", "The offer affects only those whose treatment receipt changes, so lower uptake dilutes the population-average assignment effect. Dividing by uptake needs the exclusion and compliance assumptions; it does not automatically identify effects for people who never comply."]
};
