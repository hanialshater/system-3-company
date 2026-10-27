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


const zs=[0,1],doOne=mean(zs.map(z=>2+4*z)),observed=6;const g=dag(['Z','X','Y'],[[0,1],[0,2],[1,2]]),cut=dag(['Z','X=1','Y'],[[0,1,false],[0,2],[1,2]]);
const scenarios=[scene('a','Set X=1',g,cut,`Intervened mean Y=${fmt(doOne)}`,[{label:'Z=0 / Z=1',value:'Y=2 / Y=6'}]),scene('b','Select X=1',g,dag(['Z=1','X=1','Y=6'],[[0,1],[0,2],[1,2]]),`Observed mean Y=${fmt(observed)}`)];const audit={a:doOne,b:observed,doZero:mean(zs.map(z=>4*z))};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-intervene",
  "family": "structural-intervention",
  "predict": {
    "question": "Let fair binary Z generate X=Z and Y=2X+4Z. If you intervene to set X=1, what mean Y follows?",
    "options": [
      "2",
      "4",
      "6"
    ],
    "answer": 1
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["Setting X=1 retains mean Y=4; selecting observed X=1 retains Y=6. Intervention leaves both values of Z represented, while selection identifies Z=1 in this model.", "The difference comes from cutting Z→X rather than conditioning on X. The causal effect of setting X from 0 to 1 is 2, even though the observed group gap is 6."]
};
