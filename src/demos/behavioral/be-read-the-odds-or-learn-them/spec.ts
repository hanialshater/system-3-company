import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Rare P", "Draws"];
const outputLabels = ["No rare event %", "Draws", "True rare %"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[0.01, 20], [0.01, 200]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = { kind: "curve", points:values.map((y,x)=>({x,y})), xLabel:"Period",yLabel:"Value" };
 const summary=`${index===0?"A":"B"}: No rare event % ${fmt(values[0])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[0],value:fmt(values[0])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-read-the-odds-or-learn-them",family:"curve",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"A toy event has a 1% independent chance per draw. In twenty draws, about what is the chance you never see it?",options:["18.2%", "50.0%", "81.8%"],answer:2},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"A short experience can omit an outcome whose probability is explicitly known. The longer sample reduces that omission chance. A learner’s observed frequency and a described probability are different forms of evidence, especially for rare events."]
};
