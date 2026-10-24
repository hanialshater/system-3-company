import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Late benefit", "Social cost", "Fine"];
const outputLabels = ["Net late payoff", "Social cost", "Fine"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[4, 5, 0], [4, 0, 3]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = { kind: "table", columns:["Quantity","Value"], rows:values.map((value,i)=>[outputLabels[i],value]) };
 const summary=`${index===0?"A":"B"}: Net late payoff ${fmt(values[0])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[0],value:fmt(values[0])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-the-fine-becomes-a-price",family:"table",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"In a toy rule, lateness gives four benefit units but costs five social units with no fine. What is the net payoff to lateness?",options:["−1 unit", "+1 unit", "+4 units"],answer:0},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"The comparison replaces a social cost with a money-like fine rather than simply adding the fine. Its modeled incentives can therefore change in either direction. The rule is explicit and is not a claim that every fine crowds out obligation."]
};
