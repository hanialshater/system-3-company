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


const worlds=[0,1].flatMap(z=>[0,1].map(u=>({z,u,x:z+u,y:2*(z+u)+z}))),intervened=worlds.map(w=>({...w,x:1,y:2+w.z}));
const scenarios=[scene('a','Replace X equation',table(['Z','U','X','Y'],worlds.map(w=>[w.z,w.u,w.x,w.y])),table(['Z','U','X','Y'],intervened.map(w=>[w.z,w.u,w.x,w.y])),`Intervened mean ${fmt(mean(intervened.map(w=>w.y)))}`),scene('b','Natural equations',dag(['Z','U','X','Y'],[[0,2],[1,2],[2,3],[0,3]]),table(['Z','U','X','Y'],worlds.map(w=>[w.z,w.u,w.x,w.y])),`Natural range 0–${Math.max(...worlds.map(w=>w.y))}`)];const audit={a:mean(intervened.map(w=>w.y)),b:Math.max(...worlds.map(w=>w.y)),naturalMean:mean(worlds.map(w=>w.y))};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-structural-equations",
  "family": "structural-equations",
  "predict": {
    "question": "Independent fair binary Z,U generate X=Z+U and Y=2X+Z. After intervening to set X=1 for every world, what is mean Y?",
    "options": [
      "2.0",
      "2.5",
      "3.0"
    ],
    "answer": 1
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The intervention retains mean Y=2.5 and fixes every X at 1. The natural equations retain outcomes ranging from 0 to 5.", "An intervention replaces the X equation; it does not regenerate Z or U. The unchanged upstream worlds feed into the revised outcome rule, which is why the remaining Y variation comes only from Z here."]
};
