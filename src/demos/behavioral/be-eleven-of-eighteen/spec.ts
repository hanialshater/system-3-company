import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Replicated", "Attempted"];
const outputLabels = ["Replicated %", "Replicated n", "Attempted n"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[11, 18], [6, 10]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = { kind: "bars", items: values.map((value,i)=>({label:outputLabels[i],value})) };
 const summary=`${index===0?"A":"B"}: Replicated % ${fmt(values[0])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[0],value:fmt(values[0])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-eleven-of-eighteen",family:"bars",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"In an illustrative sample, eleven of eighteen experiments replicate. What fraction is that, approximately?",options:["36.0%", "50.0%", "61.1%"],answer:2},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"The denominator is the number attempted in this specific sample. A rounded proportion is not a universal success rate for all economics or all science. The comparison shows how a different small sample can yield a nearby percentage."]
};
