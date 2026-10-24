import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Outcome 1", "Outcome 2", "P(outcome 1)"];
const outputLabels = ["Expected payoff", "Low", "High"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[2, 8, 0.5], [8, 8, 1]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = {kind:"intervals",items:[{label:"Payoff",low:values[1],mid:values[0],high:values[2]}]};
 const summary=`${index===0?"A":"B"}: Expected payoff ${fmt(values[0])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[0],value:fmt(values[0])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-leave-the-consequences-hidden",family:"intervals",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"A toy recipient gets either two or eight units with equal probability, while the chooser has not learned which. What is the expected recipient payoff?",options:["2 units", "5 units", "8 units"],answer:1},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"Hidden consequences leave a range of possible recipient outcomes. Revealing a specific outcome changes information, even if the chooser’s own payment is fixed. The expected value is not a guarantee or a diagnosis of fairness."]
};
