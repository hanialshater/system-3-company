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


const strata=[{p:.2,m0:.1,m1:.3},{p:.8,m0:.5,m1:.7}];
function aipw(correctP:boolean,correctM:boolean){return mean(strata.map(s=>{const p=correctP?s.p:.5,m0=correctM?s.m0:.4,m1=correctM?s.m1:.4;return m1-m0+s.p*(s.m1-m1)/p-(1-s.p)*(s.m0-m0)/(1-p);}));}
const make=(cp:boolean,cm:boolean,id:string)=>scene(id,cp?'Right propensity':cm?'Right outcomes':'Both wrong',table(['p','Y0','Y1'],strata.map(s=>[s.p,s.m0,s.m1])),bars(['AIPW'],[aipw(cp,cm)]),`AIPW ${fmt(aipw(cp,cm))}`);
const scenarios=[make(true,false,'a'),make(false,false,'b')];const audit={a:aipw(true,false),b:aipw(false,false),rightOutcome:aipw(false,true)};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-doubly-robust",
  "family": "doubly-robust",
  "predict": {
    "question": "A toy population has equal strata, untreated risks .1 and .5, treatment adds .2, and uptake .2 and .8. If the propensity model is right but both outcome models wrongly say .4, what expected AIPW effect results?",
    "options": [
      "0.0",
      "0.2",
      "0.5"
    ],
    "answer": 1
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The correct-propensity case retains AIPW 0.2 even with wrong outcome models. Making both nuisance models constant and wrong retains 0.44.", "The augmentation and weighting errors cancel in expectation when either nuisance model is correct under the identification and overlap assumptions. Double robustness does not rescue failure of both models, hidden confounding, or absent overlap."]
};
