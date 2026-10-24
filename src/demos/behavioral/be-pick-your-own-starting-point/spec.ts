import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Answered", "Automatic"];
const outputLabels = ["Total enrolled", "Explicit", "Automatic"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[60, 40], [60, 0]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = { kind: "grid", cells: values.map((value,i)=>({label:outputLabels[i],value})) };
 const summary=`${index===0?"A":"B"}: Explicit ${fmt(values[1])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[1],value:fmt(values[1])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-pick-your-own-starting-point",family:"grid",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"A toy enrollment system records 60 explicit choices and 40 automatic enrollments. How many enrollments were explicit choices?",options:["40 choices", "60 choices", "100 choices"],answer:1},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"The same enrollment count can contain different mixtures of active decisions and automatic outcomes. The comparison removes automatic enrollment while preserving explicit choices. Participation alone cannot tell you how each person chose."]
};
