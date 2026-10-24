import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Deposit €", "Opportunities", "Missed", "Interest %"];
const outputLabels = ["Saved €", "Missed", "Interest %"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[10, 4, 2, 0], [10, 4, 0, 0]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = { kind: "grid", cells: values.map((value,i)=>({label:outputLabels[i],value})) };
 const summary=`${index===0?"A":"B"}: Saved € ${fmt(values[0])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[0],value:fmt(values[0])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-a-reminder-at-the-right-time",family:"grid",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"A toy saver can deposit €10 on four occasions but misses two. With no interest, how much is saved?",options:["€20", "€30", "€40"],answer:0},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"The two cases change missed actions while holding deposit size and return fixed. A reminder mechanism can affect attention without being a subsidy. Whether a real reminder changes those actions remains an empirical question."]
};
