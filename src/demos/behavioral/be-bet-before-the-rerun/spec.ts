import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Forecast 1", "Forecast 2", "Forecast 3", "Forecast 4"];
const outputLabels = ["Mean Brier score", "Chance score", "Correct labels"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[0.8, 0.2, 0.7, 0.3], [0.5, 0.5, 0.5, 0.5]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = { kind: "bars", items: values.map((value,i)=>({label:outputLabels[i],value})) };
 const summary=`${index===0?"A":"B"}: Mean Brier score ${fmt(values[0])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[0],value:fmt(values[0])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-bet-before-the-rerun",family:"bars",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"Four toy preregistered forecasts are 0.8, 0.2, 0.7 and 0.3; outcomes are 1, 0, 1 and 0. What is their mean squared-error score?",options:["0.065", "0.250", "0.500"],answer:0},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"Recording forecasts before the reruns permits an out-of-sample scoring rule. The comparison is an uninformative probability benchmark. Later explanations do not replace a dated forecast, and performance on these four cases does not establish universal forecasting skill."]
};
