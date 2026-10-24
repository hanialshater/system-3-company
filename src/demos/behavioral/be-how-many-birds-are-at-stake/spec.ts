import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Birds", "Stated value €"];
const outputLabels = ["€/1000 birds", "Birds", "Total €"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[2000, 80], [200000, 88]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = { kind: "table", columns:["Quantity","Value"], rows:values.map((value,i)=>[outputLabels[i],value]) };
 const summary=`${index===0?"A":"B"}: €/1000 birds ${fmt(values[0])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[0],value:fmt(values[0])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-how-many-birds-are-at-stake",family:"table",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"An illustrative valuation is €80 to save 2,000 birds. What is that value per thousand birds?",options:["€0.40", "€4.00", "€40.00"],answer:2},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"The total valuation and the value per protected unit answer different questions. The two scopes have nearly similar totals but very different per-unit values. That pattern can be inspected without asserting that every person ignores scope."]
};
