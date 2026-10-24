import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Already paid €", "Next visit €", "Benefit units"];
const outputLabels = ["Sunk €", "Marginal €", "Net next"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[60, 0, 8], [0, 10, 8]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = { kind: "table", columns:["Quantity","Value"], rows:values.map((value,i)=>[outputLabels[i],value]) };
 const summary=`${index===0?"A":"B"}: Marginal € ${fmt(values[1])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[1],value:fmt(values[1])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-just-paid-for-the-gym",family:"table",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"A toy membership has already cost €60. The next visit costs €0 and brings eight benefit units. What new cash cost does attending add?",options:["€0", "€10", "€60"],answer:0},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"Already-paid membership fees and the cost of the next visit are different quantities. The alternative case charges for each new visit. Payment timing can influence behavior, but sunk expenditure does not become a new marginal cash cost."]
};
