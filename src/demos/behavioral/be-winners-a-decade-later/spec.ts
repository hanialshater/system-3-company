import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Initial gain", "Yearly retention"];
const outputLabels = ["Year 0 gain", "Year 5 gain", "Year 10 gain"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[1, 1], [1, 0.5]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = { kind: "curve", points:values.map((y,x)=>({x,y})), xLabel:"Period",yLabel:"Value" };
 const summary=`${index===0?"A":"B"}: Year 10 gain ${fmt(values[2])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[2],value:fmt(values[2])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-winners-a-decade-later",family:"curve",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"A toy satisfaction path starts one unit higher and retains 100% of that gain each year. What gain remains at year ten?",options:["0 units", "0.5 units", "1 unit"],answer:2},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"An initial gain is compatible with either sustained or adapting paths, depending on the retention rule. The contrast makes the long-run assumption visible. A short follow-up alone cannot choose between these paths for real lottery winners."]
};
