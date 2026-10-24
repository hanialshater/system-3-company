import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Suggested €", "Gift €", "Minimum €"];
const outputLabels = ["Gift €", "Minimum €", "Above min €"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[20, 5, 0], [20, 5, 20]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = { kind: "grid", cells: values.map((value,i)=>({label:outputLabels[i],value})) };
 const summary=`${index===0?"A":"B"}: Gift € ${fmt(values[0])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[0],value:fmt(values[0])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-the-suggested-donation",family:"grid",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"A campaign suggests €20 but sets no minimum. In this toy rule, is a €5 gift allowed?",options:["Yes, €5 meets the rule", "No, €20 is required", "Only €10 meets the rule"],answer:0},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"A suggested amount and a minimum are different constraints. A recommendation can influence attention while still leaving smaller gifts feasible; introducing an actual minimum changes the available choices."]
};
