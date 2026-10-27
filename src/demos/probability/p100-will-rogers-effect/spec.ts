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


const a=[1,2],b=[3,4,9],newA=[...a,3],newB=b.filter(v=>v!==3);
const scenarios=[scene('a','After moving 3',table(['A','B'],[[1,3],[2,4],['—',9]]),bars(['A','B'],[mean(newA),mean(newB)]),`Means ${fmt(mean(newA))}, ${fmt(mean(newB))}`),scene('b','Original groups',table(['Moved score'],[[3]]),bars(['A','B'],[mean(a),mean(b)]),`Means ${fmt(mean(a))}, ${fmt(mean(b))}`)];const audit={a:mean(newA),b:mean(newB),oldA:mean(a),oldB:mean(b)};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-will-rogers-effect",
  "family": "group-transfer",
  "predict": {
    "question": "Group A has scores 1,2 and B has 3,4,9. Move score 3 from B into A without changing any score. What happens to both group means?",
    "options": [
      "Both rise",
      "Both fall",
      "Both stay fixed"
    ],
    "answer": 0
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["After reassignment the retained means are 2 and 6.5, versus 1.5 and 5.333 in the original groups. Score 3 is above A’s old mean and below B’s old mean.", "Adding it raises A’s mean, and removing it raises B’s mean. No individual improved: group membership changed. Both group summaries can improve while the combined population remains identical."]
};
