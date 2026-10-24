import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Forecast P", "Outcome 0/1"];
const outputLabels = ["Squared error", "Forecast", "Outcome"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[0.2, 1], [0.8, 1]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = { kind: "table", columns:["Quantity","Value"], rows:values.map((value,i)=>[outputLabels[i],value]) };
 const summary=`${index===0?"A":"B"}: Squared error ${fmt(values[0])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[0],value:fmt(values[0])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-write-the-forecast-first",family:"table",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"Before an event you record probability 0.2, and the event occurs. What squared-error score does that recorded forecast receive?",options:["0.04", "0.20", "0.64"],answer:2},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"A recorded forecast can be scored against the outcome without relying on later memory. The retrospective probability gives a different score, but rewriting the old forecast after seeing the event does not improve the original prediction."]
};
