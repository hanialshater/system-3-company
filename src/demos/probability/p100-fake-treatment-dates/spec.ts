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


const c=[10,11,12,13,14],t=[12,13,14,20,21],gaps=t.map((v,i)=>v-c[i]);const placebo=mean(gaps.slice(1,3))-gaps[0],actual=mean(gaps.slice(3))-mean(gaps.slice(0,3));
const scenarios=[scene('a','Pre-policy placebo',table(['C','T'],c.slice(0,3).map((v,i)=>[v,t[i]])),timeline(['0','1','2'],gaps.slice(0,3)),`Placebo DiD ${fmt(placebo)}`),scene('b','True policy date',table(['Pre gap','Post gap'],[[mean(gaps.slice(0,3)),mean(gaps.slice(3))]]),timeline(['0','1','2','3','4'],gaps),`Policy DiD ${fmt(actual)}`)];const audit={a:placebo,b:actual};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-fake-treatment-dates",
  "family": "placebo",
  "predict": {
    "question": "Before a true policy, control outcomes are 10,11,12 and treated are 12,13,14. Put a placebo date between the first two points. What fake DiD appears in this pre-policy window?",
    "options": [
      "0",
      "2",
      "5"
    ],
    "answer": 0
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The pre-policy placebo retains DiD 0; the actual policy date retains 5. The pre-policy gap is stable at 2, then the stipulated post-policy gap becomes 7.", "A nonzero pre-policy placebo would challenge this design. Passing this check only removes one visible contradiction; it does not prove parallel untreated trends after policy or eliminate an unobserved policy-time shock."]
};
