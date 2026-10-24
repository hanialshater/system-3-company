import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Quoted €", "Rounding €"];
const outputLabels = ["Low €", "Mid €", "High €"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[5000, 1000], [4988, 1]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = {kind:"intervals",items:[{label:"Quoted €",low:values[0],mid:values[1],high:values[2]}]};
 const summary=`${index===0?"A":"B"}: Mid € ${fmt(values[1])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[1],value:fmt(values[1])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-a-precise-opening-offer",family:"intervals",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"A toy quote is rounded to the nearest €1,000 and shown as €5,000. Which range could round to that quote?",options:["€4,500–€5,500", "€4,900–€5,100", "€4,999–€5,001"],answer:0},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"Under the stated rounding convention, precision changes the implied interval around the quote. A precise first offer may convey different information, but this arithmetic does not predict a negotiator’s response."]
};
