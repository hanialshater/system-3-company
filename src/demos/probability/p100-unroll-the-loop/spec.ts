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


let a=0,b=0;const states=[{a,b}];for(let i=0;i<4;i++){const nextA=.5*b,nextB=a+1;a=nextA;b=nextB;states.push({a,b});}
const step=(t:number,id:string)=>scene(id,`Time ${t}`,table(['A previous','B previous'],[[states[t-1].a,states[t-1].b]]),dag([`A${t-1}`,`B${t-1}`,`A${t}`,`B${t}`],[[0,3],[1,2]]),`A=${fmt(states[t].a)}; B=${fmt(states[t].b)}`,[{label:'Update',value:`A=.5B; B=A+1`}]);
const scenarios=[step(2,'a'),step(4,'b')];const audit={a:states[2].a,b:states[2].b,lateA:states[4].a,lateB:states[4].b};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-unroll-the-loop",
  "family": "time-unroll",
  "predict": {
    "question": "Start A₀=B₀=0 with Aₜ₊₁=.5Bₜ and Bₜ₊₁=Aₜ+1. After two simultaneous updates, what state appears?",
    "options": [
      "A=.0, B=1.0",
      "A=.5, B=1.0",
      "A=.5, B=1.5"
    ],
    "answer": 1
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["Two updates retain A=0.5, B=1; four retain A=0.75, B=1.5. Each update uses the previous time’s values simultaneously.", "The feedback exists across time, not as a same-instant directed cycle. Unrolling time makes each arrow point from a prior state to a later state, giving an acyclic representation of this dynamic system."]
};
