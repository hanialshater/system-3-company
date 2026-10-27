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


const saleIds=Array.from({length:100},(_,i)=>i),duplicate=[...saleIds,...saleIds],raw=duplicate.length,unique=new Set(duplicate).size;
const scenarios=[scene('a','Unique sale IDs',table(['Logged','Unique'],[[raw,unique]]),bars(['Base','Variant'],[saleIds.length,unique]),`Unique lift ${fmt((unique/100-1)*100)}%`),scene('b','Raw event count',table(['Copies per sale'],[[2]]),bars(['Base','Variant'],[saleIds.length,raw]),`Raw lift ${fmt((raw/100-1)*100)}%`)];const audit={a:(unique/100-1)*100,b:(raw/100-1)*100,unique};

export { audit };
export const spec: MiniLabSpec = {
  "id": "p100-twyman-s-law",
  "family": "instrumentation",
  "predict": {
    "question": "Both versions truly have 1,000 visits and 100 sales. The variant logs each sale twice. After de-duplicating by sale ID, what sales lift remains?",
    "options": [
      "0%",
      "50%",
      "100%"
    ],
    "answer": 0
  },
  "setup": "Toy model · two controlled cases",
  "hint": "Run the question case, then compare the changed assumption.",
  scenarios,
  reveal: ["Unique IDs retain lift 0%; raw event counts retain +100%. The apparently spectacular win came from recording every variant sale twice.", "A surprising result is a reason to test the measurement pipeline before inventing a product explanation. This example supplies the bug explicitly; it does not say that every large result is false or that de-duplication solves every logging problem."]
};
