import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Telecom before", "Telecom change %", "Fund before", "Fund change %"];
const outputLabels = ["Telecom after", "Fund after", "Fund before"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[100, 20, 50, 0], [100, 20, 50, 20]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = {kind:"graph",nodes:values.map((value,i)=>({id:`n${i}`,label:`${outputLabels[i].slice(0,10)} ${fmt(value)}`,x:60+i*100,y:i===1?45:120})),edges:[{from:"n0",to:"n1",active:input[0]>0},{from:"n1",to:"n2",active:input[1]>0}]};
 const summary=`${index===0?"A":"B"}: Fund after ${fmt(values[1])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[1],value:fmt(values[1])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-mci-or-mcic",family:"graph",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"In a toy market, telecom value rises 20% from 100. A separate fund at fifty has no claim on its cash flow and no change input. What is the fund’s modeled value?",options:["50 units", "60 units", "120 units"],answer:0},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"The correct mapping leaves the unrelated fund unchanged. The contrast deliberately misroutes the telecom’s change to it. Similar names do not create a shared cash-flow claim in this explicit toy model."]
};
