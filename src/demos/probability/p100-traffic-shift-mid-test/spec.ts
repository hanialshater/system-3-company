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


const pooledA=92/120,pooledB=39/120,balancedA=(.9+.1)/2,balancedB=(.95+.2)/2;
const scenarios=[scene('a','Equal period weights',table(['Period','A','B'],[['Early',.9,.95],['Late',.1,.2]]),bars(['A %','B %'],[balancedA*100,balancedB*100]),`A ${fmt(balancedA*100)}%; B ${fmt(balancedB*100)}%`),scene('b','Raw pooled counts',table(['A n','B n'],[[120,120]]),bars(['A %','B %'],[pooledA*100,pooledB*100]),`A ${fmt(pooledA*100)}%; B ${fmt(pooledB*100)}%`)];const audit={a:balancedB-balancedA,b:pooledA-pooledB};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-traffic-shift-mid-test",
  "family": "traffic-mix",
  "predict": {
    "question": "Early A converts 90/100 and B 19/20; late A converts 2/20 and B 20/100. With equal weight on the two periods, which version wins?",
    "options": [
      "A: 76.667% vs 32.5%",
      "B: 57.5% vs 50%",
      "They tie at 50%"
    ],
    "answer": 1
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["Equal-period weighting retains A=50%, B=57.5%. Pooling instead retains A=76.667%, B=32.5%, because A receives more early traffic and B more late traffic.", "B is better in both periods. Changing assignment shares across time mixes treatment with period composition. A common weighting answers the stated equal-period question; it does not automatically repair every adaptive experiment."]
};
