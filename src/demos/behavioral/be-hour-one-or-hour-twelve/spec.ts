import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Start compliance %", "End compliance %"];
const outputLabels = ["End−start pp", "Start %", "End %"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[90, 81.3], [90, 90]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = {kind:"timeline",events:[{label:"Start %",value:input[0]},{label:"End %",value:input[1]}]};
 const summary=`${index===0?"A":"B"}: End−start pp ${fmt(values[0])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[0],value:fmt(values[0])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-hour-one-or-hour-twelve",family:"timeline",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"Toy compliance is 90% at shift start and 81.3% at the end. What is the end-minus-start change?",options:["−8.7 percentage points", "−9.7 percentage points", "+8.7 percentage points"],answer:0},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"The within-shift comparison measures a change, while the stable case measures none. Time, workload, case mix and other factors may move together. The numerical change alone cannot identify fatigue as its sole cause."]
};
