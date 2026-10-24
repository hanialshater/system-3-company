import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Fee/cycle €", "Cycles", "Principal €"];
const outputLabels = ["Cumulative fee €", "Principal €", "Fee/cycle €"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[60, 3, 400], [60, 1, 400]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = {kind:"timeline",events:Array.from({length:input[1]},(_,i)=>({label:`Cycle ${i+1}`,value:input[0]*(i+1)}))};
 const summary=`${index===0?"A":"B"}: Cumulative fee € ${fmt(values[0])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[0],value:fmt(values[0])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-the-loan-in-cumulative-dollars",family:"timeline",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"A toy €400 loan incurs a €60 fee in each of three cycles. What is the cumulative fee?",options:["€60", "€120", "€180"],answer:2},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"Cumulative disclosure adds the fees across cycles without changing the underlying fee schedule. The principal remains a different quantity. Making a total salient is an information change, not an automatic change to the loan’s contractual cost."]
};
