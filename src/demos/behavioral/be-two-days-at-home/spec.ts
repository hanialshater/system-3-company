import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Office quits %", "Hybrid quits %", "Office performance", "Hybrid performance"];
const outputLabels = ["Quit reduction %", "Quit gap pp", "Performance gap"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[6, 4, 100, 100], [6, 6, 100, 100]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = { kind: "table", columns:["Quantity","Value"], rows:values.map((value,i)=>[outputLabels[i],value]) };
 const summary=`${index===0?"A":"B"}: Quit reduction % ${fmt(values[0])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[0],value:fmt(values[0])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-two-days-at-home",family:"table",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"Illustrative quit rates are 6% in office and 4% in hybrid, while performance is 100 in both. What is the relative quit reduction?",options:["2.0%", "33.3%", "50.0%"],answer:1},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"Retention and performance are separate outcomes. The relative quit reduction divides the two-point drop by the original six-percent rate, while the performance gap remains zero in this table. One outcome does not establish a gain in the other."]
};
