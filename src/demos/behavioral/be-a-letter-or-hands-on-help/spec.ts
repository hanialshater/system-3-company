import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Control %", "Information %", "Assistance %"];
const outputLabels = ["Info lift pp", "Extra help pp", "Total lift pp"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[6, 11, 18], [6, 11, 11]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = { kind: "bars", items: values.map((value,i)=>({label:outputLabels[i],value})) };
 const summary=`${index===0?"A":"B"}: Extra help pp ${fmt(values[1])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[1],value:fmt(values[1])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-a-letter-or-hands-on-help",family:"bars",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"An illustrative enrollment table has 6% control, 11% information and 18% assistance. What is the extra assistance-versus-information difference?",options:["5 percentage points", "7 percentage points", "12 percentage points"],answer:1},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"Three arms separate contact, information and hands-on help. Combining both treated groups would hide the incremental assistance comparison. These supplied rates permit arithmetic, while causal and transport claims need their own study support."]
};
