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


const data=[2,4,6],means:number[]=[];
for(const a of data)for(const b of data)for(const c of data)means.push((a+b+c)/3);
const histogram=(xs:number[])=>{const m=new Map<number,number>();xs.forEach(x=>m.set(x,(m.get(x)??0)+1));return bars([...m.keys()].map(x=>fmt(x)),[...m.values()]);};
const scenarios=[scene('a','Size three',table(['Data'],data.map(x=>[x])),histogram(means),`Mean ${fmt(mean(means))}; variance ${fmt(variance(means))}`),scene('b','Size one',table(['Resample size'],[[1]]),histogram(data),`Mean ${fmt(mean(data))}; variance ${fmt(variance(data))}`)];
const audit={a:mean(means),b:variance(means),singleVariance:variance(data),resamples:means.length};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-bootstrap",
  "family": "bootstrap",
  "predict": {
    "question": "Your data are 2, 4, and 6. You enumerate every size-3 resample with replacement and average each. What is the mean of those resample means?",
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
  reveal: ["Both retained resampling means are 4, but the size-three means vary less. The first histogram enumerates all 27 ordered resamples, not 27 new independent observations.", "Resampling explores uncertainty under the empirical distribution of these three values. It cannot add a missing kind of observation or repair biased data."]
};
