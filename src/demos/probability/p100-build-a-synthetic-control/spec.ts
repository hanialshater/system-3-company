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


const treated=[10,14,25],a=[8,12,16],b=[12,16,20];
const make=(w:number,id:string)=>{const blend=a.map((v,i)=>w*v+(1-w)*b[i]);const gap=treated[2]-blend[2];return scene(id,`${w*100}% donor A`,table(['Pre1','Pre2'],[[treated[0],treated[1]],[blend[0],blend[1]]]),timeline(['Before1','Before2','After'],blend),`Blend ${fmt(blend[2])}; gap ${fmt(gap)}`,[{label:'Pre fit error',value:Math.abs(blend[0]-10)+Math.abs(blend[1]-14)}]);};
const scenarios=[make(.5,'a'),make(.75,'b')];const audit={a:7,b:8,equalBlend:(16+20)/2};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-build-a-synthetic-control",
  "family": "synthetic-control",
  "predict": {
    "question": "A treated region goes 10→14 before policy and reaches 25 afterward. Donors A go 8→12→16 and B go 12→16→20. What post-policy gap does their equal-weight blend imply?",
    "options": [
      "3",
      "7",
      "9"
    ],
    "answer": 1
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The equal blend retains a post-policy value of 18 and gap 7. Changing donor weights gives 17 and gap 8, while worsening the pre-policy match.", "A good pre-policy fit constrains the counterfactual. The gap is causal only if the untreated blend would keep tracking the treated region and no other treated-only shock intervenes."]
};
