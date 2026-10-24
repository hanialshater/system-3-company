import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Books read", "Learning/book", "Grade threshold"];
const outputLabels = ["Learning units", "Reading input", "Target grade"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[4, 2, 8], [2, 2, 8]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = {kind:"graph",nodes:values.map((value,i)=>({id:`n${i}`,label:`${outputLabels[i].slice(0,10)} ${fmt(value)}`,x:60+i*100,y:i===1?45:120})),edges:[{from:"n0",to:"n1",active:input[0]>0},{from:"n1",to:"n2",active:input[1]>0}]};
 const summary=`${index===0?"A":"B"}: Learning units ${fmt(values[0])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[0],value:fmt(values[0])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-pay-for-grades-or-reading",family:"graph",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"A toy learning rule adds two units per completed book. Four books produce how many learning units?",options:["4 units", "6 units", "8 units"],answer:2},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"The input action enters the learning equation, whereas the grade is an outcome threshold. The comparison changes the controllable input. Paying for a target does not by itself specify the mechanism that changes that input."]
};
