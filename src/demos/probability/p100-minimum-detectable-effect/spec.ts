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


const mde=(n:number)=>(1.96+.84)*Math.sqrt(.5/n)*100;const ns=[100,400,1600];
const scenarios=[scene('a','100 per arm',table(['Per arm'],[[100]]),{kind:'curve',points:ns.map(x=>({x,y:mde(x)})),xLabel:'n per arm',yLabel:'MDE pp'},`n=100: ${fmt(mde(100))}pp`),scene('b','400 per arm',table(['Per arm'],[[400]]),bars(['100','400'],[mde(100),mde(400)]),`n=400: ${fmt(mde(400))}pp`)];const audit={a:mde(100),b:mde(400),c:mde(1600)};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-minimum-detectable-effect",
  "family": "mde",
  "predict": {
    "question": "A fixed design uses baseline .5, 80% power, and 100 observations per arm. Using MDE=(1.96+.84)√(.5/n), what approximate absolute lift can it detect?",
    "options": [
      "4.950 points",
      "9.899 points",
      "19.799 points"
    ],
    "answer": 2
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The retained approximations are 19.799 points at 100 per arm and 9.899 at 400 per arm. Quadrupling sample size halves this design’s minimum detectable effect.", "This normal approximation fixes the baseline, significance threshold and target power. An MDE describes the design’s detection probability under a specified effect, not a guarantee that any one experiment will detect it."]
};
