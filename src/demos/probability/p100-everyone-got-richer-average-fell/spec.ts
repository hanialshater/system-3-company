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


const before=.2*10+.8*30,after=.8*12+.2*32,standard=.2*12+.8*32;
const scenarios=[scene('a','Changing mix',table(['Group','Before','After'],[['A',10,12],['B',30,32]]),bars(['Before','After'],[before,after]),`Pooled ${fmt(before)}→${fmt(after)}`),scene('b','Fixed mix',table(['A share','B share'],[[.2,.8]]),bars(['Before','After'],[before,standard]),`Standardized ${fmt(before)}→${fmt(standard)}`)];const audit={a:after,b:standard,before};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-everyone-got-richer-average-fell",
  "family": "composition",
  "predict": {
    "question": "Group incomes rise 10→12 and 30→32. Their shares change from 20%/80% to 80%/20%. What happens to the pooled mean?",
    "options": [
      "26→16",
      "26→28",
      "20→22"
    ],
    "answer": 0
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["The changing mix retains 26→16, while fixed weights retain 26→28. Each group gained 2; the pooled decline comes from shifting weight toward the lower-income group.", "A group-level improvement and an aggregate decline can coexist. To describe within-group change, use a common population mix; to describe actual aggregate income, retain the changing mix and say what it measures."]
};
