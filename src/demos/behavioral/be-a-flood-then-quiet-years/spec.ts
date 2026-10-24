import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Initial rise pp", "Retention/year"];
const outputLabels = ["Year 0 pp", "Year 1 pp", "Year 10 pp"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[9, 0.7], [9, 1]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = { kind: "timeline", events:values.map((value,i)=>({label:outputLabels[i],value})) };
 const summary=`${index===0?"A":"B"}: Year 1 pp ${fmt(values[1])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[1],value:fmt(values[1])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-a-flood-then-quiet-years",family:"timeline",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"A toy attention response begins nine percentage points above baseline and retains 70% each year. After one year, what remains?",options:["2.7 percentage points", "6.3 percentage points", "9.0 percentage points"],answer:1},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"The declining path separates a recent-event spike from its persistence. The comparison holds attention constant instead. Extrapolating the immediate response requires a retention assumption; the toy rate is not an estimate of a real community’s insurance choices."]
};
