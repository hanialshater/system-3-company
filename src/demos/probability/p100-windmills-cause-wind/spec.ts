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


const w=[1,2,3];const base=dag(['Wind','Rotation'],[[0,1]]),cut=dag(['Wind','Rotation'],[[0,1,false]]);
const scenarios=[scene('a','Force rotation',base,cut,`Mean wind ${fmt(mean(w))}`,[{label:'Wind',value:'1, 2, 3'}]),scene('b','Select rotation',base,dag(['Wind=3','R=12'],[[0,1]]),`Mean wind ${fmt(mean(w.filter(v=>4*v===12)))}`)];const audit={a:mean(w),b:mean(w.filter(v=>4*v===12))};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-windmills-cause-wind",
  "family": "intervention",
  "predict": {
    "question": "In a toy world, wind W is equally likely 1, 2, or 3 and rotation R=4W. If you force R=12 rather than select R=12, what mean wind remains?",
    "options": [
      "1",
      "2",
      "3"
    ],
    "answer": 1
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["Forcing rotation retains mean wind 2; selecting rotation 12 retains mean wind 3. Forcing cuts the incoming wind-to-rotation arrow, while selecting leaves that arrow intact.", "The model makes wind cause rotation. A rotation measurement carries information about wind; changing the rotation variable by intervention does not change the stipulated wind generator."]
};
