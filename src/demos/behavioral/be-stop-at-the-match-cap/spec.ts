import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Contribution €", "Match cap €", "Match fraction"];
const outputLabels = ["Employer €", "Total saved €", "Above cap €"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[80, 60, 0.5], [40, 60, 0.5]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = { kind: "curve", points:values.map((y,x)=>({x,y})), xLabel:"Period",yLabel:"Value" };
 const summary=`${index===0?"A":"B"}: Employer € ${fmt(values[0])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[0],value:fmt(values[0])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-stop-at-the-match-cap",family:"curve",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"A toy employer matches 50% of contributions only up to €60. You contribute €80. What does the employer add?",options:["€20", "€30", "€40"],answer:1},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"The capped schedule stops adding employer money above the matching threshold. The contrast stays below the cap. This kink explains the displayed marginal incentive, while a complete retirement decision also needs preferences and other constraints."]
};
