import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["First seconds", "First intensity", "End seconds", "End intensity"];
const outputLabels = ["Total discomfort", "Peak-end score", "Seconds"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[60, 10, 30, 5], [60, 10, 0, 10]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = {kind:"curve",points:[{x:0,y:input[1]},{x:input[0],y:input[1]},{x:input[0]+input[2],y:input[3]}],xLabel:"Seconds",yLabel:"Intensity"};
 const summary=`${index===0?"A":"B"}: Total discomfort ${fmt(values[0])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[0],value:fmt(values[0])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-a-longer-cold-water-trial",family:"curve",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"A toy trial has sixty seconds at intensity ten, then thirty at intensity five. What is its accumulated discomfort?",options:["600 intensity-seconds", "750 intensity-seconds", "900 intensity-seconds"],answer:1},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"The longer trial accumulates more discomfort but has a lower score under the explicit peak-end rule. The two metrics weight time differently. The toy separates those rules without diagnosing what any individual remembers or prefers."]
};
